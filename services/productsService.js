const NotFoundError = require('../errors/notFoundError');
const productsModel = require('../models/productsModel');

const productsService = {
  async getAll() {
    const products = await productsModel.getAll();
        
    return products;
  },

  getById: async (id) => {
    const product = await productsModel.getById(id);

    if (!product) throw new NotFoundError('Product not found');

    return product;
  },

  register: async (name) => {
    const newProduct = await productsModel.register(name);

    return newProduct;
  },

  async update(id, name) {
    const exists = await productsModel.exists(id);

    if (!exists) throw new NotFoundError('Product not found');

    const updProduct = await productsModel.update(name, id);

    return updProduct;
  },
};

module.exports = productsService;