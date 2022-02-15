const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CHSBC API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],

    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/server/routes/*.js',
    './src/server/routes/admin/*.js',
    './src/swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {swaggerDocs, swaggerUI};
