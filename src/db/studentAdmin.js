const { Pool } = require('pg');
const Constants = require('../utils/constants');
const { env } = require('../config');
const roles = require('../config/roles');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllStudents: async () => {
      try {
        const data = await client.query('SELECT * FROM students');
        return data.rows;
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    getStudentByID: async ({ id }) => {
      try {
        const res = await client.query(
          'SELECT * From student WHERE id=$1 ',
        [id]);
        if (!res.rows[0]) {
          throw  new Error('ERROR: No student find');
        }
        return res.rows[0];
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    createStudent: async ({
      edeboId,
      groupId,
      userId
      }) => {
      try {
        const studentRoleCheck = await client.query(
          'SELECT FROM users WHERE id=$1 AND role=$2',
          [userId, roles[1]]);
        if (!studentRoleCheck.rows[0]) {
          throw new Error(`this user is not a ${roles[1]}!
            or this user does not exist`);
        }
        const groupCheck = await client.query(
          'SELECT FROM groups WHERE id=$1',
          [groupId]);
        if (!groupCheck.rows[0]) {
          throw new Error('No such group');
        }
        const res = await client.query(
          `INSERT INTO students(edebo_id, fk_group_id, fk_user_id)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [
            edeboId,
            groupId,
            userId
          ],
        );
        if ( env === Constants.env.dev ) {
          console.log('New Student created');
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
