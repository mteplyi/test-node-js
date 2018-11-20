require('dotenv/config');
const { DateTime } = require('luxon');

const reminderService = require('./reminder-service');
const { sendTextMessage } = require('../utils/axios');
const { detectEventIntent } = require('../utils/dialogflow');

module.exports = async (event) => {
  const userId = event.sender.id;
  const { payload } = event.postback;

  if (payload === 'CREATE') {
    const responses = await detectEventIntent(userId, payload);
    const result = responses[0].queryResult;
    await sendTextMessage(userId, result.fulfillmentText);
  } else if (payload === 'LIST') {
    await reminderService.listAll(userId);
  } else {
    const [action, reminderId] = payload.split(':');
    switch (action) {
      case 'ACCEPT': {
        await reminderService.accept(reminderId);
        break;
      }
      case 'SNOOZE': {
        const dateTime = DateTime.local().plus({ minutes: 15 }).toISO();
        await reminderService.snooze(reminderId, dateTime);
        break;
      }
      case 'DELETE': {
        await reminderService.delete(reminderId);
        break;
      }
      // no default
    }
  }
};
