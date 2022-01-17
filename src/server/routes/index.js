const express = require('express');
const bodyParser = require('body-parser');
const login = require('./login');

// eslint-disable-next-line no-unused-vars
const { authenticateToken, errorHandler } = require('../middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(login);
app.use(authenticateToken);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res) => res.status(404)
  .send({ error: `Page not found ${req.path}` }));

app.use(errorHandler);

module.exports = app;


