const salesService = require('../services/salesService');
const validators = require('../validators/validators');

const salesController = {
  async getAll(_req, res) {
    const sales = await salesService.getAll();

    res.status(200).json(sales);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const sale = await salesService.getById(id);

    res.status(200).json(sale);
  },

  register: async (req, res) => {
    await validators.validateSaleBodyReq(req.body);
    await validators.validateSaleBodyMin(req.body);

    await validators.checkExistsId(req.body);

    const newSale = await salesService.register(req.body);

    res.status(201).json(newSale);
  },

  async delete(req, res) {
    const id = Number(req.params.id);

    await salesService.delete(id);

    res.sendStatus(204);
  },
};

module.exports = salesController;
