from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# Initialize FastAPI App
app = FastAPI(title="Spam Detector API")

# Enable CORS (Cross-Origin Resource Sharing) so Frontend can communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Trained Model and Vectorizer
model = joblib.load('model/spam_model.pkl')
vectorizer = joblib.load('model/vectorizer.pkl')

# Define Input Data Format
class EmailInput(BaseModel):
    text: str

@app.post("/predict")
def predict_spam(data: EmailInput):
    # Step 1: Logic explanation - Transform incoming raw text into TF-IDF numerical vector
    vec_text = vectorizer.transform([data.text])
    
    # Step 2: Predict class (0 or 1) and calculate probability score
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