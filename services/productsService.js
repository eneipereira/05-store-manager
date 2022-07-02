const NotFoundError = require('../errors/notFoundError');
const productsModel = require('../models/productsModel');

const productsService = {
  getAll: async () => {
    const products = await productsModel.getAll();
    
    products.sort((a, b) => a.id - b.id);
    
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
};

module.exports = productsService;