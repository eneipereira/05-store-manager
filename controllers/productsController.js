const productsService = require('../services/productsService');
const validators = require('../validators/validators');

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

  register: async (req, res) => {
    const body = await validators.validateProdBodyReq(req.body);
    const { name } = await validators.validateProdBodyMin(body);
    const newProduct = await productsService.register(name);

    res.status(201).json(newProduct);
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const body = await validators.validateProdBodyReq(req.body);
    const { name } = await validators.validateProdBodyMin(body);

    const updProduct = await productsService.update(id, name);

    res.status(200).json(updProduct);
  },
};

module.exports = productsController;