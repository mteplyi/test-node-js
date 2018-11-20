require('dotenv/config');
const axios = require('axios');
const { DateTime } = require('luxon');

const {
  FACEBOOK_ACCESS_TOKEN,
  FACEBOOK_APP_SECRET,
} = process.env;

const appSecretProof = require('crypto').createHmac('sha256', FACEBOOK_APP_SECRET)
  .update(FACEBOOK_ACCESS_TOKEN)
  .digest('hex');

const fbClient = axios.create({
  baseURL: 'https://graph.facebook.com/v3.2',
  data: {
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    appsecret_proof: appSecretProof,
  },
});

exports.fbClient = fbClient;

exports.sendTextMessage = async (userId, text) => fbClient.post('/me/messages', {
  messaging_type: 'RESPONSE',
  recipient: {
    id: userId,
  },
  message: {
    text,
  },
});

exports.sendReminder = (userId, reminderId, name) => fbClient.post('/me/messages', {
  messaging_type: 'MESSAGE_TAG',
  tag: 'CONFIRMED_EVENT_REMINDER',
  recipient: {
    id: userId,
  },
  message: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: name,
            buttons: [
              {
                type: 'postback',
                title: 'Accept',
                payload: `ACCEPT:${reminderId}`,
              }, {
                type: 'postback',
                title: 'Snooze',
                payload: `SNOOZE:${reminderId}`,
              },
            ],
          },
        ],
      },
    },
  },
});

exports.sendReminderList = (userId, reminders) => fbClient.post('/me/messages', {
  messaging_type: 'RESPONSE',
  recipient: {
    id: userId,
  },
  message: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: reminders.map(({ reminderId, name, dateTime }) => ({
          title: name,
          subtitle: new DateTime(dateTime).toLocaleString(DateTime.DATETIME_MED),
          buttons: [
            {
              type: 'postback',
              title: 'Delete',
              payload: `DELETE:${reminderId}`,
            },
          ],
        })),
      },
    },
  },
});
