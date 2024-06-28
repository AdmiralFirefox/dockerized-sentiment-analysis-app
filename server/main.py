from flask import Flask, jsonify, request
from flask_cors import CORS
import re
import joblib
import uuid
from datetime import datetime

# App instance
app = Flask(__name__)
CORS(app)

# Setting up endpoint
@app.route("/api/analyze_text", methods=["POST"])
def analyze_text():
    data = request.get_json()
    input = data.get("userInput") # defined in useState
    word_count = len(input.split(" "))

    predicted_class = []

    classes = []
    probability_classes = []

    sentiment_analysis(input, predicted_class, classes, probability_classes);

    # Get Current Date and Time
    now = datetime.now()
    dt_string = now.strftime("%B %d, %Y, %I:%M %p")

    probabilities_info = [{"id": uuid.uuid4(), "class": probability_class, "probability": probability} for probability_class, probability in zip(classes, probability_classes)]
    
    return jsonify({
        "id": uuid.uuid4(),
        "timestamp": dt_string,
        "user_input": input,
        "word_length": word_count,
        "predicted_class": predicted_class,
        "probabilities": probabilities_info,
    })

# Clean text data
def clean_text(text):
    text = re.sub(r'\W', ' ', text) # Remove special characters
    text = re.sub(r'\s+', ' ', text) # Remove extra whitespace
    text = text.lower() # Convert to lowercase
    return text

def sentiment_analysis(text_input, predicted_class, classes, probability_classes):
    # Load the vectorizer 
    vectorizer = joblib.load('saved_models/vectorizer.pkl')

    # Initialize the classifier
    nb_classifier = joblib.load('saved_models/naive_bayes_model.pkl')

    # Clean and vectorize text input
    new_text_cleaned = clean_text(text_input)
    new_X = vectorizer.transform([new_text_cleaned])

    # Predict sentiment
    predictions = nb_classifier.predict(new_X)
    probabilities = nb_classifier.predict_proba(new_X)

    # Map the predicted class labels to sentiment
    status_mapping = {2: "positive", 1: "neutral", 0: "negative"}
    recommendation_status = [status_mapping[pred] for pred in predictions]

    # Display the prediction results
    predicted_class.append(recommendation_status)

    # Displaying the probabilites of the predicted classes
    class_labels = ['negative', 'neutral', 'positive']
    probability_dict = {label: prob for label, prob in zip(class_labels, probabilities[0])}

    for status, prob in probability_dict.items():
        classes.append(status)
        probability_classes.append(prob)

if __name__ == "__main__":
    app.run(port=8000)