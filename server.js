const express = require('express');

const knex = require('knex');

const accountsRouter = require('./accounts/accountsRouter');

const db = require('./data/dbConfig.js');

const server = express();

const logger = require('morgan');

server.use(express.json());
server.use(logger('dev'));
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>Web DB I Challenge</h2>
  `)
});

module.exports = server;