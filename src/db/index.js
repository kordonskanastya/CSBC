const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    getAllData: async () => {
      try {
        const data = await(client.query('SELECT * FROM products'));
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

    createProduct: async ({ item, type, measure = 'weight',
      measureValue = 1, priceType = 'pricePerKilo', priceValue = '$0' }) => {
      try {
        if(!item) {
          throw new Error('ERROR: No product item defined');
        }
        if(!type) {
          throw new Error('ERROR: No product type defined');
        }
        const timestamp = new Date();

        const res = await client.query(
          `INSERT INTO products(item, type, measure, measureValue, priceType,
            priceValue, created_at, updated_at, deleted_at)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
          [item, type, measure, measureValue, priceType,
            priceValue, timestamp, timestamp, null]
        );

        console.log(`DEBUG: New product created:
          ${JSON.stringify(res.rows[0])}`);
        return res.rows[0];
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    getProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
        const res = await client.query(
          'SELECT * From products WHERE id = $1 AND deleted_at IS NULL',
          [id],
        );
        return res.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    updateProduct: async ({id, ...product}) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }

        const query = [];
        const values = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const [i, [k, v]] of Object.entries(product).entries()) {
          query.push(`${k} = $${i + 1}`);
          values.push(v);
        }

        if(!values.length) {
          throw new Error('ERROR: Nothing to update');
        }

        values.push(id);

        const res = await client.query(
          `UPDATE products SET ${query.join(',')}
          WHERE id = $${values.length} RETURNING *`,
          values
        );

        console.log(`DEBUG:  Product updated: ${JSON.stringify(res.rows[0])}`);
        return res.rows[0];

      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    deleteProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
        // await client.query('DELETE FROM products WHERE id = $1', [id]);
        await client.query(
          'UPDATE products SET deleted_at = $1 WHERE id = $2',
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
