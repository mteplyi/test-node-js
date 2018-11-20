require('dotenv/config');

const {
  WEBHOOK_VERIFY_TOKEN,
} = process.env;

module.exports = (ctx) => {
  const {
    'hub.mode': mode,
    'hub.verify_token': token,
    'hub.challenge': challenge,
  } = ctx.query;

  ctx.assert(mode && token === WEBHOOK_VERIFY_TOKEN, 403);

  ctx.body = challenge;
};
