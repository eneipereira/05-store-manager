const db = require('./connection');

const productsModel = {
  getAll: async () => {
    const query = 'select * from StoreManager.products order by id asc;';

    const [products] = await db.query(query);

    return products;
  },
  
  getById: async (id) => {
    const query = 'select * from StoreManager.products where id = ?;';

    const [[product]] = await db.query(query, [id]);

    return product;
  },

  register: async (name) => {
    const query = 'insert into StoreManager.products (name)values (?)';

    const [{ insertId }] = await db.query(query, [name]);

    return {
      id: insertId,
      name,
    };
  },
};

module.exports = productsModel;