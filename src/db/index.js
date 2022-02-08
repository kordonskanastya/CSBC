const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllUsers: async () => {
      try {
        const data = await client.query('SELECT * FROM users');
        return data.rows;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
    getUserByID: async ({ id }) => {
      try {
        if (!id) {
          throw new Error('ERROR: No user id defined');
        }

        const validId = await client.query('SELECT id from users where id=$1', [
          id,
        ]);
        if (validId.rows.length === 0) {
          throw new Error('ERROR:User not find');
        }

        const res = await client.query('SELECT * From users WHERE id=$1 ', [
          id,
        ]);

        return res.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
    testConnection: async () => {
      try {
        console.log('hello from pg test connection');
        return await client.query('SELECT NOW()');
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log('INFO: Closing pg DB wrapper');
      client.end();
    },

    getUserByEmail: async (email) => {
      try {
       const res = await client.query(
          'SELECT * From users WHERE email like $1',
          [`%${ email }%`],
        );

        return res.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    createUser: async ({
      username,
      surname,
      patronymic,
      email,
      password,
      role
    }) => {
      try {
        const res = await client.query(
          `INSERT INTO users(id, username, surname,
            patronymic, email, password, role)
           VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [username, surname, patronymic, email, password, role],
        );
        console.log('New User created');
        return res.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    deleteUser: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No user id defined');
        }
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
        console.error(err.message || err);
        throw err;
      }
    },
    updateUser: async ({ id, ...user }) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
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
      } catch (err) {
        console.error(err.message || err);
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
        console.log(err);
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
        console.error(err.message || err);
      }
    },
  };
};
