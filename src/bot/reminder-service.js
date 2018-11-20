require('dotenv/config');
const { DateTime } = require('luxon');

const {
  sendTextMessage,
  sendReminder,
  sendReminderList,
} = require('../utils/axios');
const knex = require('../utils/knex');

const schedulerTick = async () => {
  await knex.transaction(async (trx) => {
    const reminders = await trx('reminder')
      .select('reminderId', 'userId', 'name')
      .where({ delivered: false })
      .andWhere('remindAt', '<', DateTime.local().toISO())
      .update({ delivered: true })
      .returning('*');
    if (reminders.length) {
      console.log('Remind:', reminders);
      await Promise.all(reminders.map(
        ({ reminderId, userId, name }) => sendReminder(userId, reminderId, name),
      ));
    }
  });
  setTimeout(schedulerTick, 60000);
};
setTimeout(schedulerTick, 1000);

exports.schedule = async (userId, name, dateTime) => knex('reminder')
  .insert({
    userId,
    name,
    remindAt: dateTime,
  });

exports.accept = async (reminderId) => knex('reminder')
  .first()
  .where({ reminderId })
  .del();

exports.snooze = async (reminderId, dateTime) => knex('reminder')
  .first()
  .where({ reminderId })
  .update({
    remindAt: dateTime,
    delivered: false,
  });

exports.listAll = async (userId) => {
  const reminders = await knex('reminder')
    .select('reminderId', 'name', { dateTime: 'remindAt' })
    .where({ userId });
  return reminders.length
    ? sendReminderList(userId, reminders)
    : sendTextMessage(userId, 'List is empty!');
};

exports.delete = async (reminderId) => knex('reminder')
  .first()
  .where({ reminderId })
  .del();
