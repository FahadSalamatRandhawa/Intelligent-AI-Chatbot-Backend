import getpass
import os

from langchain_openai import ChatOpenAI

class OpenAIModel():
    def __init__(self,model:str,temperature=0):
        if "OPENAI_API_KEY" not in os.environ:
            os.environ["OPENAI_API_KEY"] = getpass.getpass("Enter your OpenAI API key: ")
        
        self.llm=ChatOpenAI(model=model,temperature=temperature,max_retries=2)