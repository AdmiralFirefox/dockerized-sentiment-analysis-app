from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import re
import joblib
import uuid

# App instance
app = Flask(__name__)
CORS(app)

# Setting up endpoint
@app.route("/api/home", methods=["POST"])
def return_home():
    data = request.get_json()
    input = data.get("userInput") # defined in useState
    word_count = len(input.split(" "))

    predicted_class = []

    classes = []
    probability_classes = []

    sentiment_analysis(input, predicted_class, classes, probability_classes);

    probabilities_info = [{"id": uuid.uuid4(),"class": probability_class, "probability": probability} for probability_class, probability in zip(classes,  probability_classes)]
    
    return jsonify({
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
    # Load the dataset
    df = pd.read_csv("data/tweet.csv")

    # Clean the text data in the dataframe
    df['cleaned_text'] = df['text'].astype(str).apply(clean_text)

    # Map sentiment labels to numerical values
    label_mapping = {'positive': 2, 'neutral': 1, 'negative': 0}
    df['label'] = df['sentiment'].map(label_mapping)

    # Load the vectorizer and transform the cleaned text data
    vectorizer = joblib.load('saved_models/vectorizer.pkl')

    # Initialize the classifier
    nb_classifier = joblib.load('saved_models/naive_bayes_model.pkl')

    # Clean and vectorize new reviews
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
    app.run(debug=True, port=8000)