import google.generativeai as genai
import os
from dotenv import load_dotenv

# This will load your GEMINI_API_KEY from your .env file
load_dotenv() 

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# List all available models
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)