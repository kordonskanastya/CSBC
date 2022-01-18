const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllUsers: async () => {
      try {
        const data = await(client.query('SELECT * FROM users'));
        return data.rows;
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    testConnection: async () => {
      try {
        console.log('hello from pg test connection');
        return await(client.query('SELECT NOW()'));
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log('INFO: Closing pg DB wrapper');
      client.end();
    },

    getUser: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
        const res = await client.query(
          'SELECT * From users WHERE id = $1 AND deleted_at IS NULL',
          [id],
        );
        return res.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    createUser: async ({ userId, userName, userSurname,
      userPatronymic, userEmail, userPasswordHash, fkUserRoleId }) => {
      try {
        if(!userId) {
          throw new Error('ERROR: No user id defined');
        }
        if(!userId) {
          throw new Error('ERROR: No user id defined');
        }

        const res = await client.query(
          `INSERT INTO users(user_name, user_surname,
            user_patronymic, user_email, user_password_hash)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`,
          [userName, userSurname,
            userPatronymic, userEmail, userPasswordHash]
        );

        console.log(`DEBUG: New product created:
          ${JSON.stringify(res.rows[0])}`);
        return res.rows[0];
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    deleteUser: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
        // await client.query('DELETE FROM products WHERE id = $1', [id]);
        await client.query(
          'UPDATE users SET deleted_at = $1 WHERE id = $2',
          [new Date(), id]
        );
        return true;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
  };
};
