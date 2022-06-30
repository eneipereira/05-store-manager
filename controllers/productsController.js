const productsService = require('../services/productsService');

const productsController = {
  getAll: async () => {
    const products = await productsService.getAll();
    
    return products;
  },

  getById: async (params) => {
    const id = Number(params.id);
    const product = await productsService.getById(id);

    return product;
  },
};

module.exports = productsController;