import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Load Dataset (CSV with 'text' and 'label' columns)
# Label: 1 for Spam, 0 for Ham (Not Spam)
data = pd.DataFrame({
    'text': [
        "Congratulations! You won a free $1000 gift card. Click here now!",
        "Hey, are we still meeting for lunch today at 1 PM?",
        "URGENT! Your account password has expired. Verify your details.",
        "Please find attached the report for yesterday's meeting.",
        "Win cash prize! Call 1800-SPAM-NOW to claim your reward.",
        "Hi Harish, can you review the latest pull request on GitHub?"
    ],
    'label': [1, 0, 1, 0, 1, 0]
})

# 2. Split Data into Train and Test sets
X_train, X_test, y_train, y_test = train_test_split(
    data['text'], data['label'], test_size=0.2, random_state=42
)

# 3. Convert Text into Numbers using TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english')
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 4. Train the Naive Bayes Classifier
model = MultinomialNB()
model.fit(X_train_vec, y_train)

# 5. Evaluate the Model
predictions = model.predict(X_test_vec)
print(f"Model Accuracy: {accuracy_score(y_test, predictions) * 100:.2f}%")

# 6. Save Model and Vectorizer to disk
joblib.dump(model, 'model/spam_model.pkl')
joblib.dump(vectorizer, 'model/vectorizer.pkl')
print("Model and Vectorizer saved successfully! 🎉")