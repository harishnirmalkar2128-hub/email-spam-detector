# 📧 AI-Powered Email Spam Detector

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A high-performance, full-stack Machine Learning application designed to detect and filter email spam in real-time. Built with **FastAPI** for low-latency backend responses and **Scikit-Learn** for natural language classification, presented through a sleek **Glassmorphism UI**.

---

## 📸 Key Features

* ⚡ **Real-Time Analysis:** Get instant predictions (`Spam` vs. `Ham`) with probability confidence scores.
* 🎯 **Smart Keyword Highlighting:** Detects and flags potential spam trigger words dynamically.
* 🎲 **Sample Generator:** Built-in loader to test random email templates instantly.
* 📜 **Live Scan History:** Log and review recent predictions during your active session.
* 🎨 **Modern Dark UI:** Responsive glassmorphism interface with custom CSS animations.

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    UI[User Input UI (HTML/CSS/JS App)] <--> Backend[FastAPI Backend (Python Server)]
    Backend <--> Model[TF-IDF Vectorizer & Naive Bayes Model]



1. **Text Preprocessing:** The backend cleans raw text by stripping unnecessary noise.
2. **Feature Extraction:** **TF-IDF Vectorizer** turns text into numerical matrices based on term importance.
3. **Classification:** A pre-trained **Multinomial Naive Bayes** model calculates probabilities to output predictions.

```

## 🛠️ Tech Stack & Tools

| Component | Technology Used |
| :--- | :--- |
| **Backend Framework** | FastAPI (Python 3.10+) |
| **Server** | Uvicorn |
| **Machine Learning** | Scikit-Learn, Joblib |
| **NLP Technique** | TF-IDF (Term Frequency-Inverse Document Frequency) |
| **Algorithm** | Multinomial Naive Bayes |
| **Frontend** | HTML5, Modern CSS3 (Glassmorphism), JavaScript (Fetch API) |

---

## 📁 Project Structure

email-spam-detector/
│
├── app.py               # Main FastAPI server script
├── train_model.py       # ML Model training script
├── spam_model.pkl       # Trained Naive Bayes model
├── vectorizer.pkl       # Fitted TF-IDF Vectorizer
├── requirements.txt     # Python project dependencies
├── README.md            # Project documentation
│
└── static/              # Frontend assets
├── index.html       # Dashboard HTML layout
├── style.css        # Glassmorphism styling
└── script.js        # API integration script

---

## 🚀 Quickstart & Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR-USERNAME/email-spam-detector.git](https://github.com/YOUR-USERNAME/email-spam-detector.git)
cd email-spam-detector

```
## ✍️ Let's Connect!

| Profile Details | Links & Networks |
| :--- | :--- |
| **Name** 🧑‍💻 | Harish Nirmalkar |
| **Education** 🎓 | MCA Student @ Rungta International Skills University |
| **Let's Talk** 💬 | Open for collaborations, learning discussions, or just a friendly hi! |
| **Professional** 💼 | [Connect on LinkedIn 🌐](https://linkedin.com/in/harish-nirmalkar-b23776394) |
