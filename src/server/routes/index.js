const express = require('express');
const bodyParser = require('body-parser');
const { env } = require('../../config');
const login = require('./login');
const admin = require('./admin/index');
const swagger = require('../../utils');
const {authenticateToken, errorHandler} = require('../middlewares');
const constants = require('../../utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', login);

if ( env === constants.env.dev ) {
  app.use(
    '/api/docs',
    swagger.swaggerUI.serve,
    swagger.swaggerUI.setup(swagger.swaggerDocs)
  );
}

app.use(authenticateToken);

app.use('/admin/users', admin.users);
app.use('/admin/courses',admin.subjects);
app.use('/admin/groups',admin.groups);
app.use('/admin/specialities',admin.specialities);
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res) => res.status(404)
  .send({error: `Page not found ${req.path}`}));
app.use(errorHandler);

module.exports = app;


