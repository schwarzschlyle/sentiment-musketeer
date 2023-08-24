import json
from flask import Flask, request

app = Flask(__name__)

@app.route('/.netlify/functions/sentiment', methods=['POST'])
def sentiment_analysis():
    data = json.loads(request.data)
    text = data.get('text')

    if text is None:
        return json.dumps({'error': 'Text not provided'}), 400

    sentiment = perform_sentiment_analysis(text)
    return json.dumps({'sentiment': sentiment})

from nltk.sentiment.vader import SentimentIntensityAnalyzer

def perform_sentiment_analysis(text):
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(text)

    if sentiment_scores['compound'] >= 0.05:
        sentiment = "Positive"
    elif sentiment_scores['compound'] <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return sentiment


if __name__ == '__main__':
    app.run(debug=True)
