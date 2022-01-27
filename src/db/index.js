const {Pool} = require('pg');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllUsers: async () => {
      try {
        const data = await (client.query('SELECT * FROM users'));
        return data.rows;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    testConnection: async () => {
      try {
        const isConnected = await (client.query('SELECT NOW()'));
        console.log('hello from pg test connection');
        return isConnected;
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

        if (!email) {
          throw new Error('ERROR: No email defined');
        }

        const res = await client.query(
          'SELECT * From users WHERE email like $1 ',
          [`%${  email  }%`]
        );

        return  res.rows;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    createUser: async ({username, surname, patronymic,
      email, password}) => {
      try {
        // TODO validation
        const res = await client.query(
          `INSERT INTO users(username, surname, patronymic, email, password)
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [username, surname,
            patronymic, email, password]
        );
        console.log('New User created');
        return res.rows[0];
        // TODO log
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    deleteUser: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
        await client.query('DELETE FROM users WHERE id = $1', [id]);
        // TODO log
        return 'User deleted';
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
    updateUser: async ({id, ...user}) => {
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
           WHERE id = ${id} RETURNING *`,
          values
        );

        console.log(`DEBUG:  User updated: ${JSON.stringify(res.rows[0])}`);
        return res.rows[0];

      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
    addRefreshToken:async ({email,RToken})=>{
      try {
        if(!email){
          console.log('ERROR:No email defined');
        }if(!RToken){
          console.log('ERROR:No token defined');
        }
        const res=await client.query(
          'UPDATE users SET refresh_token=$2 where email=$1 returning * ',
          [email,RToken]
        );
        return res.rows;
      }catch (err){
        console.log(err);
        throw err;
      }
    }
  };
};
