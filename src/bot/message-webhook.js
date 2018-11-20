const processMessage = require('./process-message');
const processPostback = require('./process-postback');

module.exports = (ctx) => {
  const {
    body,
  } = ctx.request;
  console.log(body);

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.postback && event.postback.payload) {
          processPostback(event);
        } else if (event.message && event.message.text) {
          processMessage(event);
        }
      });
    });

    ctx.status = 200;
  }
};
