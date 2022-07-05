const db = require('./connection');

const salesModel = {
  register: async () => {
    const query = 'insert into StoreManager.sales (date) values (current_timestamp())';

    const [{ insertId }] = await db.query(query);

    return insertId;
  },

  registerProd: async (saleId, { productId, quantity }) => {
    const query = `insert into StoreManager.sales_products
    (sale_id, product_id, quantity) values (?, ?, ?)`;

    await db.query(query, [saleId, productId, quantity]);
  },
};

module.exports = salesModel;