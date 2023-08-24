from flask import Flask, render_template, request
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)

# Download VADER lexicon (if not already downloaded)
import nltk

nltk.download('vader_lexicon')


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_input = request.form["text_input"]
        sentiment = perform_sentiment_analysis(user_input)
        return render_template("index.html", sentiment=sentiment)
    return render_template("index.html")


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


if __name__ == "__main__":
    app.run(debug=True)
