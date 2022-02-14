const statusCode = require('../statusCode');

function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

module.exports = successMessage;
