const { Pool } = require('pg');
const Constants = require('../utils/constants');
const { env } = require('../config');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllUsers: async () => {
      try {
        const data = await client.query('SELECT * FROM users');
        return data.rows;
      } catch (err) {
        if (env === Constants.env.dev) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    getUserByID: async ({ id }) => {
      try {
        const validId = await client.query('SELECT id from users where id=$1', [
          id,
        ]);
        if (validId.rows.length === 0) {
          throw new Error('ERROR:User not find');
        }
        const res = await client.query('SELECT * From users WHERE id=$1 ', [
          id,
        ]);
        const timestamp = Date.now();
        await client.query(
          `INSERT INTO logs (operation_type, description, timeStamp, changed_by)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
          [
            'getUser',
            res.rows[0],
            timestamp,
            1,
          ],
        );

        return res.rows[0];
      } catch (err) {
        if (env === Constants.env.dev) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    createUser: async ({
      username,
      surname,
      patronymic,
      email,
      password,
      role,
    }) => {
      try {
        const emailUser = await client.query(
          'Select email from users where email=$1 ',
          [email],
        );
        if (emailUser.rows.length !== 0) {
          // eslint-disable-next-line max-len
          throw new Error(
            `ERROR:Email ${email} is defined,please try another email`,
          );
        } else {
          const res = await client.query(
            `INSERT INTO users(id, username, surname,
            patronymic, email, password, role)
           VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
           RETURNING *`,
            [username, surname, patronymic, email, password, role],
          );
          console.log('New User created');
          return res.rows[0];
        }
      } catch (err) {
        if (env === Constants.env.dev) {
          console.error(err.message || err);
        }
        throw err;
      }
    },

    deleteUser: async (id) => {
      try {
        const idUser = await client.query('SELECT id from users where id=$1', [
          id,
        ]);
        if (idUser.rows.length === 0) {
          throw new Error('ERROR:User not found');
        } else {
          await client.query('DELETE FROM users WHERE id = $1', [id]);
          console.log('DEBUG:User Deleted');
          return 'User deleted';
        }
      } catch (err) {
        if (env === Constants.env.dev) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
    updateUser: async ({ id, ...user }) => {
      try {
        const emailUser = await client.query(
          'Select email from users where email=$1 ',
          [user.email],
        );
        if (emailUser.rows.length !== 0) {
          // eslint-disable-next-line max-len
          throw new Error(
            `ERROR: Email${user.email} is defined,please try another email`,
          );
        } else {
          const query = [];
          const values = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const [i, [k, v]] of Object.entries(user).entries()) {
            query.push(`${k} = $${i + 1}`);
            values.push(v);
          }

          if (!values.length) {
            throw new Error('ERROR: Nothing to update');
          }

          const res = await client.query(
            `UPDATE users
           SET ${query.join(',')}
           WHERE id = ${id}
           RETURNING *`,
            values,
          );

          if (!res.rows.length) {
            throw new Error('ERROR:User not found');
          }

          console.log(`DEBUG:  User updated: ${JSON.stringify(res.rows[0])}`);
          return res.rows[0];
        }
      } catch (err) {
        if (env === Constants.env.dev) {
          console.error(err.message || err);
        }
        throw err;
      }
    },
  };
};
