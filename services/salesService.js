const salesModel = require('../models/salesModel');

const salesService = {
  register: async (itemsSold) => {
    const id = await salesModel.register();

    await Promise.all(itemsSold.map((item) => salesModel
      .registerProd(id, item)));

    return { id, itemsSold };
  },
};

module.exports = salesService;