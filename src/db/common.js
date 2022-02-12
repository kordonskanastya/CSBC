const { Pool } = require('pg');
const Constants = require('../Constants');
const { env } = require('../config');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    testConnection: async () => {
      try {
        console.log('hello from pg test connection');
        return await client.query('SELECT NOW()');
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    close: async () => {
      console.log('INFO: Closing pg DB wrapper');
      client.end();
    }
  };
};
