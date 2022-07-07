const NotFoundError = require('../errors/notFoundError');
const salesModel = require('../models/salesModel');

const salesService = {
  async getAll() {
  const sales = await salesModel.getAll();

  return sales;
  },

  async getById(id) {
    const sale = await salesModel.getById(id);

    if (!sale.length) throw new NotFoundError('Sale not found');

    return sale;
  },

  register: async (itemsSold) => {
    const id = await salesModel.register();

    await Promise.all(itemsSold.map((item) => salesModel
      .registerProd(id, item)));

    return { id, itemsSold };
  },

  async delete(id) {
    const exists = await salesModel.exists(id);

    if (!exists) throw new NotFoundError('Sale not found');

    await salesModel.delete(id);
  },
};

module.exports = salesService;