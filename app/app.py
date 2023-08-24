# app/app.py
from flask import Flask, render_template, request, jsonify
from textblob import TextBlob  # You can replace this with your sentiment analysis model

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data['text']
    analysis = TextBlob(text)
    sentiment = analysis.sentiment.polarity
    if sentiment > 0:
        sentiment_label = "Positive"
    elif sentiment < 0:
        sentiment_label = "Negative"
    else:
        sentiment_label = "Neutral"
    return jsonify({"sentiment": sentiment_label})

if __name__ == '__main__':
    app.run(debug=True)
