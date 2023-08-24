//const { spawn } = require('child_process');
//
//exports.handler = async function (event, context) {
//  try {
//    const userInput = JSON.parse(event.body).text;
//    const result = await performSentimentAnalysis(userInput);
//    return {
//      statusCode: 200,
//      body: JSON.stringify({ sentiment: result }),
//    };
//  } catch (error) {
//    return {
//      statusCode: 500,
//      body: JSON.stringify({ error: 'An error occurred' }),
//    };
//  }
//};
//
//function performSentimentAnalysis(text) {
//  return new Promise((resolve, reject) => {
//    const process = spawn('python', ['app.py', 'analyze', text]);
//
//    let sentiment = '';
//
//    process.stdout.on('data', (data) => {
//      sentiment += data.toString();
//    });
//
//    process.on('close', (code) => {
//      if (code === 0) {
//        resolve(sentiment.trim());
//      } else {
//        reject(new Error('Sentiment analysis failed'));
//      }
//    });
//  });
//}

//
//const spawn = require('child_process').spawn;
//
//exports.handler = async function (event, context) {
//  try {
//    const userInput = JSON.parse(event.body).text;
//    const result = await performSentimentAnalysis(userInput);
//    return {
//      statusCode: 200,
//      body: JSON.stringify({ sentiment: result }),
//    };
//  } catch (error) {
//    return {
//      statusCode: 500,
//      body: JSON.stringify({ error: 'An error occurred' }),
//    };
//  }
//};
//
//function performSentimentAnalysis(text) {
//  return new Promise((resolve, reject) => {
//    const process = spawn('python', ['app.py', 'analyze', text]);
//
//    let sentiment = '';
//
//    process.stdout.on('data', (data) => {
//      sentiment += data.toString();
//    });
//
//    process.on('close', (code) => {
//      if (code === 0) {
//        resolve(sentiment.trim());
//      } else {
//        reject(new Error('Sentiment analysis failed'));
//      }
//    });
//  });
}






const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const userInput = JSON.parse(event.body).text;
    const response = await performSentimentAnalysis(userInput);
    return {
      statusCode: 200,
      body: JSON.stringify({ sentiment: response.data.sentiment }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};

async function performSentimentAnalysis(text) {
  const apiUrl = 'YOUR_FLASK_APP_URL'; // Replace with your Flask app's URL
  const response = await axios.post(apiUrl, { text });
  return response;
}

