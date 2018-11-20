require('dotenv/config');
const Knex = require('knex');

const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
const knexConfig = require('./../../knexfile')[ENVIRONMENT];

module.exports = new Knex(knexConfig);
