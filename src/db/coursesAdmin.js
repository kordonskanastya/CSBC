const { Pool } = require('pg');
const Constants = require('../utils/constants');
const { env } = require('../config');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllCourses: async () => {
      try {
        const data = await client.query('SELECT * FROM courses');
        return data.rows;
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    getCourseByID: async ({ id }) => {
      try {
        if (!id) {
          return new Error('ERROR: No course id defined');
        }

        // eslint-disable-next-line max-len
        const validId = await client.query('SELECT id from courses where id=$1', [
          id,
        ]);
        if (validId.rows.length === 0) {
          return  new Error('ERROR:User course find');
        }

        const res = await client.query('SELECT * From users WHERE id=$1 ', [
          id,
        ]);

        return res.rows[0];
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    createCourse: async ({
                         lecturerId,
                         credits,
                         name
                       }) => {
      try {
        const res = await client.query(
          `INSERT INTO courses(lecturer_id,
            credits, name)
           VALUES ( $1, $2, $3)
           RETURNING *`,

          [lecturerId, credits, name],
        );
        console.log('New Subject created');
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
