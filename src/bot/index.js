const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

const router = new Router()
  .get('/webhookie', verifyWebhook)
  .post('/webhookie', bodyParser(), messageWebhook);

new Koa()
  .use(router.routes())
  .listen(5050);
