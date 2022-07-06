const salesService = require('../services/salesService');
const validators = require('../validators/validators');

const salesController = {
  register: async (req, res) => {
    await validators.validateSaleBodyReq(req.body);
    await validators.validateSaleBodyMin(req.body);

    await validators.checkExistsId(req.body);

    const newSale = await salesService.register(req.body);

    res.status(201).json(newSale);
  },
};

module.exports = salesController;
