from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import joblib
import os

# Initialize FastAPI App
app = FastAPI(title="Spam Detector API")

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dynamic path resolving for Model loading
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "spam_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "model", "vectorizer.pkl")

# Load Trained Model and Vectorizer
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

# Define Input Data Format
class EmailInput(BaseModel):
    text: str

@app.post("/predict")
def predict_spam(data: EmailInput):
    # Step 1: Transform text to numerical vector
    vec_text = vectorizer.transform([data.text])
    
    # Step 2: Predict class and confidence
    prediction = model.predict(vec_text)[0]
    probabilities = model.predict_proba(vec_text)[0]
    confidence = float(max(probabilities) * 100)
    
    # Step 3: Format output response
    is_spam = bool(prediction == 1)
    result_label = "SPAM" if is_spam else "NOT SPAM"
    
    return {
        "label": result_label,
        "is_spam": is_spam,
        "confidence": round(confidence, 2)
    }

# 🚀 Serve Static Frontend Files
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# Mount CSS, JS, Images folder
app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")

# Serve index.html on root route "/"
@app.get("/")
def serve_frontend():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
