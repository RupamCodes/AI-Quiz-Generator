import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env file")

# Initialize the NEW Client (from google-genai SDK)
client = genai.Client(api_key=API_KEY)

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class QuizRequest(BaseModel):
    topic: str

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    answer: str
    difficulty: str

# Define the schema for structured output
# The new SDK allows defining the schema as a standard Python dictionary or Pydantic model
# We will use a schema definition that enforces the JSON structure
QUIZ_SCHEMA = {
    "type": "ARRAY",
    "items": {
        "type": "OBJECT",
        "properties": {
            "question": {"type": "STRING"},
            "options": {
                "type": "ARRAY",
                "items": {"type": "STRING"}
            },
            "answer": {"type": "STRING"},
            "difficulty": {"type": "STRING"}
        },
        "required": ["question", "options", "answer", "difficulty"]
    }
}

@app.post("/api/generate-quiz", response_model=list[QuizQuestion])
async def generate_quiz(request: QuizRequest):
    try:
        prompt = f"""Generate a total of 15 multiple-choice questions about "{request.topic}".
        The questions must be structured into three difficulty levels: 5 Simple, 5 Moderate, and 5 Difficult.
        For each question, provide:
        1. The question text.
        2. An array of 4 multiple-choice options.
        3. The correct answer, which must be one of the options.
        """

        # Call Gemini 2.0 Flash using the new SDK syntax
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=QUIZ_SCHEMA
            )
        )
        
        # The new SDK typically returns the parsed object directly if schema is provided,
        # but sometimes returns text depending on the version. 
        # Safest way is to parse the text.
        if response.text:
            questions_data = json.loads(response.text)
        else:
            # Fallback if the SDK parsed it automatically into response.parsed
            questions_data = response.parsed

        # Basic validation
        validated_questions = []
        for q in questions_data:
            if q['answer'] not in q['options']:
                q['options'][0] = q['answer']
            validated_questions.append(q)

        return validated_questions

    except Exception as e:
        print(f"Error generating quiz: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)