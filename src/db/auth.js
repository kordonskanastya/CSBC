const { Pool } = require('pg');
const Constants = require('../utils/constants');
const { env } = require('../config');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getUserByEmail: async (email) => {
      try {
       const res = await client.query(
          'SELECT * From users WHERE email like $1',
          [`%${ email }%`],
        );

        return res.rows[0];
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    putRefreshToken: async (email, refreshToken) => {
      try {
        if (!email) {
          console.log('ERROR:No email defined');
        }
        if (!refreshToken) {
          console.log('ERROR:No token defined');
        }
        const res = await client.query(
          'UPDATE users SET refreshToken=$2 where email=$1 returning * ',
          [email, refreshToken],
        );
        return res.rows;
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    // eslint-disable-next-line consistent-return
    changePassword: async ({ email, newPassword }) => {
      try {
        const res = await client.query(
          'Update users SET password=$2 where email=$1 returning *',
          [email, newPassword],
        );
        if(res.rows.length === 0){
          return {result: 'User not found'};
        }
        return {result: 'Password successfully changed'};
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
      }
    },
  };
};
