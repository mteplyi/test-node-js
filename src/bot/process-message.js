require('dotenv/config');

const reminderService = require('./reminder-service');
const { sendTextMessage } = require('../utils/axios');
const { detectTextIntent } = require('../utils/dialogflow');

module.exports = async (event) => {
  const userId = event.sender.id;
  const { text } = event.message;

  detectTextIntent(userId, text)
    .then(async (responses) => {
      const result = responses[0].queryResult;
      if (result.action === 'input.create' && result.allRequiredParamsPresent) {
        const { name, dateTime } = result.parameters.fields;
        await reminderService.schedule(
          userId,
          name.stringValue,
          dateTime.stringValue
          || dateTime.structValue.fields.startDateTime.stringValue,
        );
      }
      await sendTextMessage(userId, result.fulfillmentText);
    })
    .catch(console.error);
};
