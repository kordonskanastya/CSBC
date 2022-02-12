const express = require('express');
const bodyParser = require('body-parser');
const { env } = require('../../config');
const login = require('./login');
const admin = require('./admin');
const swagger = require('../../utils');
const {authenticateToken, errorHandler} = require('../middlewares');
const Constants = require('../../Constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', login);

if ( env === Constants.env.dev ) {
  app.use(
    '/api/docs',
    swagger.swaggerUI.serve,
    swagger.swaggerUI.setup(swagger.swaggerDocs)
  );
}

app.use(authenticateToken);

app.use('/admin', admin);
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res) => res.status(404)
  .send({error: `Page not found ${req.path}`}));
app.use(errorHandler);

module.exports = app;


