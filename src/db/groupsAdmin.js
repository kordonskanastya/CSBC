const { Pool } = require('pg');
const Constants = require('../utils/constants');
const { env } = require('../config');
const roles = require('../config/roles');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllGroups: async () => {
      try {
        const data = await client.query('SELECT * FROM groups');
        return data.rows;
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    getGroupByID: async ({ id }) => {
      try {
        const res = await client.query(
          'SELECT * From groups WHERE id=$1 ',
        [id]);
        if (!res.rows[0]) {
          throw  new Error('ERROR: No group find');
        }
        return res.rows[0];
      } catch (err) {
        if ( env === Constants.env.dev ) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    createGroup: async ({
      name,
      curatorId,
      entryYear,
      graduationYear,
      fkSpecialityId
      }) => {
      try {
        const curatorRoleCheck = await client.query(
          'SELECT FROM users WHERE id=$1 AND role=$2',
          [curatorId, roles[2]]);
        if (!curatorRoleCheck.rows[0]) {
          throw new Error(`this user is not a ${roles[2]}!`);
        }
        const spetialityCheck = await client.query(
          'SELECT FROM specialities WHERE id=$1',
          [fkSpecialityId]);
        if (!spetialityCheck.rows[0]) {
          throw new Error('No such speciality');
        }
        const res = await client.query(
          `INSERT INTO groups(name, curator_id, entry_year,
            graduation_year, fk_speciality_id)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [
            name,
            curatorId,
            entryYear,
            graduationYear,
            fkSpecialityId
          ],
        );
        if ( env === Constants.env.dev ) {
          console.log('New Group created');
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
