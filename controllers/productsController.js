const productsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const products = await productsService.getAll();

    res.status(200).json(products);
  },

  getById: async (req, res) => {
    const id = Number(req.params.id);
    const product = await productsService.getById(id);

    res.status(200).json(product);
  },
};

module.exports = productsController;