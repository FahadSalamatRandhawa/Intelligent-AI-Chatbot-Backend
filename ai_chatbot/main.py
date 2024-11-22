import os
from os import getenv
from fastapi import FastAPI, UploadFile, File, HTTPException,Body,Depends
from pymongo import MongoClient
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from io import BytesIO
import pdfplumber
from langchain.vectorstores import VectorStore
from langchain_mongodb import MongoDBAtlasVectorSearch
from fastapi.middleware.cors import CORSMiddleware


from dotenv import find_dotenv,load_dotenv
from ai_chatbot.Model__OpenAI import OpenAIModel

from datetime import datetime
from typing import List, Dict

def DEP_verifyAPIKey(apiKey: str = Body(...)):
    if getenv('API_KEY') != apiKey:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    return True

# Initialize FastAPI app
app = FastAPI()

# Allow all origins or specific origins to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only your Angular app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


_:bool=load_dotenv(find_dotenv())

# Initialize OpenAI Embeddings through LangChain
openai_api_key = os.getenv("OPENAI_API_KEY")
embeddings_model = OpenAIEmbeddings(openai_api_key=openai_api_key)

# Initialize MongoDB client
client = MongoClient(os.getenv("MONGO_DB_URL"))
db = client.rag_database

# --------------------------------------- AI Model Endpoints -------------------------------- #
from pydantic import BaseModel
class ModelItem(BaseModel):
    name: str
    id: str

@app.get("/models/available")
async def list_available_models():
    db = client.rag_database
    collection = db['ai_models']
    
    # Fetch the document containing available models and the default model ID
    document = collection.find_one({}, {"available_models": 1, "default_model": 1})
    
    if not document:
        raise HTTPException(status_code=404, detail="No models found in the collection")
    
    # Extract data from the document
    available_models = document.get("available_models", [])
    default_model = document.get("default_model")
    
    # Return the available models and the default model ID
    return {
        "available_models": available_models,
        "default_model_id": default_model
    }

import openai

# Initialize OpenAI API key
openai.api_key = openai_api_key

@app.post("/models/add")
async def add_model(model: ModelItem):
    # Initialize MongoDB client
    db = client.rag_database
    collection = db['ai_models']

    # Check if the model ID already exists in the available_models array
    existing_model = collection.find_one({"available_models.id": model.id})
    
    if existing_model:
        raise HTTPException(status_code=400, detail="Model ID already exists in the available models")

    try:
        # Get the list of models from OpenAI
        openai_models = openai.models.list()

        model_ids = [m.id for m in openai_models.data]  # List of model IDs available in OpenAI

        # Check if the provided model ID exists in OpenAI
        if model.id not in model_ids:
            raise HTTPException(status_code=400, detail="Invalid model ID: Not found in OpenAI")

    except openai.NotFoundError as e:
        # Handle OpenAI API errors (e.g., invalid API key, rate limiting, etc.)
        raise HTTPException(status_code=500, detail=f"Error communicating with OpenAI API: {str(e)}")

    # If model doesn't exist, add it to the collection
    collection.update_one(
        {},
        {
            "$addToSet": {"available_models": model.dict()},
            "$set": {"updated_at": datetime.utcnow()},
        },
        upsert=True
    )
    
    return {"message": "Model added successfully"}


@app.delete("/models/remove/{model_id}")
async def remove_model(model_id: str):
    db = client.rag_database
    collection = db['ai_models']
    
    # Find the current document and check if the model_id matches the default model
    document = collection.find_one({}, {"default_model": 1})
    if not document:
        raise HTTPException(status_code=404, detail="No models found in the collection")
    
    if document.get("default_model") == model_id:
        raise HTTPException(status_code=400, detail="Cannot remove the default model")

    # Attempt to remove the model from the available_models array
    result = collection.update_one(
        {},
        {
            "$pull": {"available_models": {"id": model_id}}
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Model not found or not removed")

    return {"message": "Model removed successfully"}


@app.put("/models/set_default")
async def set_default_model(model_id: str):
    model_id = model_id.strip()  # Strip any whitespace for a cleaner match

    db = client.rag_database
    collection=db['ai_models']

    # Check if the model exists in the `available_models` array
    model_exists = collection.find_one({"available_models.id": model_id})
    
    if not model_exists:
        raise HTTPException(status_code=404, detail="Model ID not found in available models")
    
    # Update the default model and timestamp
    collection.update_one(
        {},
        {
            "$set": {
                "default_model": model_id,
                "updated_at": datetime.utcnow()
            }
        }
    )
    return {"message": f"Default model set to {model_id}"}


# ---------------------------- Chat Endpoint ---------------------------#

# Collection for RAG documents
collection = db.document_vectors
from datetime import datetime
from fastapi import HTTPException
from pymongo import UpdateOne

@app.post("/chat")
async def chat_with_context(messages: List[dict[str, str]]=Body(...), user_id: str=Body(...)):
    try:
        # Access AI Models collection
        ai_collection = db['ai_models']

        # Get the default model from the database
        ai_model_data = ai_collection.find_one({}, {"default_model": 1, "available_models": 1})
        if not ai_model_data:
            raise HTTPException(status_code=404, detail="No default model found")

        # Get the default model ID from the db
        default_model_id = ai_model_data.get("default_model")
        if not default_model_id:
            raise HTTPException(status_code=404, detail="No default model ID set in the database")

        chat_collection = db['user_conversations']

        # Initialize the chat model
        chat_model = OpenAIModel(model=default_model_id)

        # Get the content of the last message
        query = messages[-1].get('content')
        if not query:
            raise HTTPException(status_code=400, detail="Message is required")

        # Create the VectorStore interface for MongoDB
        vector_search = MongoDBAtlasVectorSearch(
            collection=db['document_vectors'],
            embedding=embeddings_model,
            index_name="vector_search_index"
        )


        # Perform similarity search
        results = vector_search.similarity_search(query=query, k=3)
        context = ""
        for result in results:
            context += result.page_content

        chat_messages = [
            {
                "role": "system",
                "content": (
                    "You are an assistant designed to answer questions with concise, informative responses. "
                    "Use the following conversation history to inform your responses. "
                    "When providing answers, make sure to incorporate previous messages and context from the conversation. "
                    "If you're unsure of the answer, simply say 'I don't know.' Always aim to be clear and to the point.\n\n"
                    f"{context}\n\n"
                    "In cases where you are answering questions related to song lyrics, poems, recipes, sheet music, or other short creative works: "
                    "- Do not provide the full text in any form, whether directly or through transformations like translations or changes in structure. "
                    "- Instead, provide brief summaries, analysis, or commentary, and include a link to the original source for further reading. "
                    "Remember, the goal is to assist without directly repeating or regurgitating the content in full."
                )
            }
        ]

        # Extend the list with user-provided messages
        chat_messages.extend(messages)

        print("Current messages being passed : ",chat_messages)

        # Invoke the model with the constructed messages
        ai_msg = chat_model.llm.invoke(chat_messages)

        # Store the conversation in the database
        conversation = {
            "user_id": user_id,
            "conversation_on": datetime.now(),
            "messages": [
                {"role": "user", "content": query},
                {"role": "assistant", "content": ai_msg.content}
            ]
        }

        # Update the existing conversation or insert a new one
        chat_collection.update_one(
            {"user_id": user_id},
            {
                "$setOnInsert": {"conversation_on": conversation["conversation_on"]},
                "$push": {"messages": {"$each": conversation["messages"]}}
            },
            upsert=True
        )

        return {"content": ai_msg.content}

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while processing the request: {str(e)}")


@app.get("/conversations")
async def get_all_conversations():
    try:
        # Access the user_conversations collection
        chat_collection = db['user_conversations']

        # Retrieve all conversations
        conversations = list(chat_collection.find({}, {"_id": 0}))  # Exclude MongoDB's _id field for clean output

        # If no conversations found, return an empty list
        if not conversations:
            return {"conversations": []}

        return {"conversations": conversations}

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching conversations: {str(e)}")


# ----------------------------------- Document Manage Endpoints ----------------------#
@app.post("/upload")
async def upload_document(file: UploadFile = File(...),verify: None = Depends(DEP_verifyAPIKey)):
    collection = db.document_vectors
    try:
        # Check if a document with the same filename already exists in the database
        existing_document = collection.find_one({"filename": file.filename})
        if existing_document:
            raise HTTPException(status_code=400, detail=f"Document with filename '{file.filename}' already exists.")

        document_text = ""

        if file.filename.endswith('.pdf'):
            # Extract text from PDF
            with pdfplumber.open(BytesIO(await file.read())) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        document_text += page_text + "\n"

            if not document_text.strip():
                raise HTTPException(status_code=400, detail="Could not extract text from the PDF")

        else:
            # Read the file content directly for non-PDF files
            content = await file.read()
            document_text = content.decode("utf-8")  # Assuming UTF-8 encoding

        # Split the document into chunks using LangChain's text splitter
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = text_splitter.split_text(document_text)

        # Current timestamp
        current_time = datetime.utcnow()

        # Embed and store each chunk in MongoDB
        for chunk in chunks:
            if chunk.strip():  # Skip empty chunks
                embedding = embeddings_model.embed_query(chunk)
                collection.insert_one({
                    "filename": file.filename,
                    "text": chunk,
                    "embedding": embedding,  # Embedding stored as a list
                    "UploadedAt": current_time,
                    "UpdatedAt": current_time
                })

        return {"message": f"File '{file.filename}' uploaded and processed successfully."}

    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Unsupported file encoding. Only UTF-8 and PDFs are supported.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    

@app.put("/update")
async def update_document(filename: str=Body(...), verify: None = Depends(DEP_verifyAPIKey),file: UploadFile = File(...)):
    collection = db.document_vectors
    try:
        # Check if the document exists
        existing_document = collection.find_one({"filename": filename})
        if not existing_document:
            raise HTTPException(status_code=404, detail=f"No such document as '{filename}'")

        # Delete the existing document chunks
        collection.delete_many({"filename": filename})

        # Extract and process the new content
        document_text = ""
        if file.filename.endswith('.pdf'):
            # Extract text from PDF
            with pdfplumber.open(BytesIO(await file.read())) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        document_text += page_text + "\n"

            if not document_text.strip():
                raise HTTPException(status_code=400, detail="Could not extract text from the PDF")

        else:
            # Read the file content directly for non-PDF files
            content = await file.read()
            document_text = content.decode("utf-8")  # Assuming UTF-8 encoding

        # Split the document into chunks using LangChain's text splitter
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = text_splitter.split_text(document_text)

        # Current timestamp for updating
        updated_at = datetime.utcnow()

        # Embed and store each chunk in MongoDB
        for chunk in chunks:
            if chunk.strip():  # Skip empty chunks
                embedding = embeddings_model.embed_query(chunk)
                collection.insert_one({
                    "filename": file.filename,
                    "text": chunk,
                    "embedding": embedding,
                    "UploadedAt": existing_document.get("UploadedAt", updated_at),  # Retain original upload time
                    "UpdatedAt": updated_at  # Update time set to now
                })

        return {"message": f"Document '{filename}' updated successfully."}

    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Unsupported file encoding. Only UTF-8 and PDFs are supported.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/list")
async def list_documents():
    # Querying the files collection to get unique documents based on filename and metadata
    pipeline = [
        {
            "$group": {
                "_id": "$filename",
                "filename": {"$first": "$filename"},  # Retain the filename in the result
                "UploadedAt": {"$first": "$UploadedAt"},  # Retain the first entry for each unique filename
                "UpdatedAt": {"$first": "$UpdatedAt"},
                "active": {"$first": "$active"} 
            }
        }
    ]
    
    # Execute the aggregation pipeline
    documents = collection.aggregate(pipeline)
    
    return {"documents": list(documents)}  # Convert the cursor to a list and return


@app.delete("/delete")
async def delete_document(filename: str=Body(...),verify: None = Depends(DEP_verifyAPIKey)):
    result = collection.delete_many({"filename": filename})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="File not found in the database")
    return {"message": f"Documents with filename '{filename}' deleted successfully."}
