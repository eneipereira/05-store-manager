const db = require('./connection');

const productsModel = {
  getAll: async () => {
    const query = 'select * from StoreManager.products;';

    const [products] = await db.query(query);

    return products;
  },
  
  getById: async (id) => {
    const query = 'select * from StoreManager.products where id = ?;';

    const [[product]] = await db.query(query, [id]);

    return product;
  },
};

module.exports = productsModel;