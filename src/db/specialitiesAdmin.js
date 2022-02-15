const { Pool } = require('pg');
const Constants = require('../utils/constants');
const { env } = require('../config');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllSpecialities: async () => {
      try {
        const data = await client.query('SELECT * FROM specialities');
        return data.rows;
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    getSpecialityByID: async ({ id }) => {
      try {
        const res = await client.query(
          'SELECT * FROM specialities WHERE id=$1 ',
          [id]);
        if (!res.rows[0]) {
          throw  new Error('ERROR: No speciality find');
        }
        return res.rows[0];
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    createSpeciality: async ({
                          name,
                          code
                        }) => {
      try {
        const res = await client.query(
          `INSERT INTO specialities(name,code)
           VALUES ($1, $2)
           RETURNING *`,
          [
            name,
            code,
          ],
        );
        if ( env === Constants.env.dev ) {
          console.log('New Speciality created');
        }
        return res.rows[0];
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
  };
};
