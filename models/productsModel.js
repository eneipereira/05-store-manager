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
  
  async update(name, id) {
    const query = 'update StoreManager.products set name = ? where id = ?;';
    
    await db.query(query, [name, id]);
    
    return {
      id,
      name,
    };
  },
  
  async exists(id) {
    const query = 'select 1 from StoreManager.products where id = ?;';
    
    const [[exists]] = await db.query(query, [id]);
    
    return !!exists;
  },
  
  async delete(id) {
    const query = 'delete from StoreManager.products where id = ?;';
    
    await db.query(query, [id]);
  },

  async search(term) {
    const query = `select * from StoreManager.products
    where name like concat('%', ?, '%');`;
  
    const [product] = await db.query(query, [term]);
  
    return product;
  },
};

module.exports = productsModel;