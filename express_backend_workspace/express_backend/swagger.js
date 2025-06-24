const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio/Blog Express API',
      version: '1.0.0',
      description: 'API for portfolio blog and contact, documented with Swagger',
    }
  },
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js'
  ], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
