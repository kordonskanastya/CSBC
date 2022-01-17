const express = require('express');
const bodyParser = require('body-parser');

const { authenticateToken, errorHandler } = require('../middlewares');

const app = express();

app.use(authenticateToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res) => res.status(404)
  .send({ error: `Page not found ${req.path}` }));

app.use(errorHandler);

module.exports = app;


