require('dotenv/config');
const dialogFlow = require('dialogflow');

const {
  DIALOGFLOW_PROJECT_ID,
  DIALOGFLOW_PRIVATE_KEY,
  DIALOGFLOW_CLIENT_EMAIL,
} = process.env;

const sessionClient = new dialogFlow.SessionsClient({
  credentials: {
    private_key: DIALOGFLOW_PRIVATE_KEY,
    client_email: DIALOGFLOW_CLIENT_EMAIL,
  },
});

exports.detectTextIntent = (sessionId, text) => sessionClient.detectIntent({
  session: sessionClient.sessionPath(DIALOGFLOW_PROJECT_ID, sessionId),
  queryInput: {
    text: {
      text,
      languageCode: 'en-US',
    },
  },
});

exports.detectEventIntent = (sessionId, event) => sessionClient.detectIntent({
  session: sessionClient.sessionPath(DIALOGFLOW_PROJECT_ID, sessionId),
  queryInput: {
    event: {
      name: event,
      languageCode: 'en-US',
    },
  },
});
