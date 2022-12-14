const db = require('./connection');

const salesModel = {
  async getAll() {
    const query = `select s.id as saleId, s.date, sp.product_id as productId, sp.
    quantity from StoreManager.sales s left join
    StoreManager.sales_products sp on sp.sale_id = s.id order by s.id, sp.product_id;`;

    const [sales] = await db.query(query);
    
    return sales;
  },

  async getById(id) {
    const query = `select s.date, sp.product_id as productId, sp.
    quantity from StoreManager.sales s left join
    StoreManager.sales_products sp on sp.sale_id = s.id where id = ? order by sp.product_id;`;

    const [sale] = await db.query(query, [id]);

    return sale;
  },

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

  async update(id, { productId, quantity }) {
    const query = `update StoreManager.sales_products set
    quantity = ? where sale_id = ? and product_id = ?;`;

    await db.query(query, [quantity, id, productId]);
  },
  
  async exists(id) {
    const query = 'select 1 from StoreManager.sales where id = ?;';

    const [[exists]] = await db.query(query, [id]);

    return !!exists;
  },

  async delete(id) {
    const query = 'delete from StoreManager.sales where id = 1;';

    await db.query(query, [id]);
  },
};

module.exports = salesModel;