# Document Chatbot Service

Welcome to the **Document Chatbot Service**! This is a free, open-source service that allows users to upload, update, and delete documents, and interact with them through a chat interface. The system stores the conversation history, so users can revisit their past chats. It also provides the flexibility to add or update AI models, and you can specify which OpenAI models you want to use for the Retrieval-Augmented Generation (RAG) system.

## Features

- **Document Management:**
  - **Upload Documents:** Users can upload their documents (PDF, DOCX, and other formats supported) to start chatting with the document.
  - **Update Documents:** Users can update the documents they've uploaded to make changes or correct information.
  - **Delete Documents:** Users can delete their uploaded documents as needed.

- **Chat History:** The system retains conversation history for users to refer back to previous interactions.
  
- **AI Model Customization:**
  - **Add or Update AI Models:** Easily add or update the AI models used by the chatbot.
  - **Specify OpenAI Models:** Choose and specify the OpenAI models you want the RAG system to use.

- **Customizable AI Responses:** The chatbot responds to user queries based on the content of the uploaded document and the configured AI models.
  
- **Simple Integration:** Hosted on GitHub, this service can be easily cloned and deployed for free.

## Project Structure

This project is divided into the following directories and files:


## Prerequisites

Before running the project locally, make sure you have the following installed:

- **Node.js** (for Angular frontend)
- **Python** (for FastAPI backend)
- **MongoDB** (for storing chat history)

## Installation

### Frontend (Angular)

1. Clone the repository:

```bash
git clone https://github.com/yourusername/document-chatbot-service.git
cd document-chatbot-service


cd UI
npm install

cd ../ai_chatbot
pip install -r requirements.txt


# OpenAI API Key for AI Chatbot
LANGCHAIN_OPENAI_KEY="your-openai-api-key"

# Enable tracking for Langchain (set to true or false)
LANGCHAIN_TRACKING_V2=true

# Your Langchain Project ID (if applicable) not required
LANGCHAIN_PROJECT="your-langchain-project-id"

# MongoDB URL for chat history storage
MONGO_DB_URL="mongodb://your-mongo-db-url"

# OpenAI API Key for OpenAI models (make sure it's valid)
OPENAI_API_KEY="your-openai-api-key"

# Optional API Key for restricted access (set your own key for controlling access)
API_KEY="your-api-key"  # Only authorized users will be able to access the service
