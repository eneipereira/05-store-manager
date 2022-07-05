const NotFoundError = require('../errors/notFoundError');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const checkExistsId = async (items) => {
  const ids = await productsModel.getAll();

  const exists = items.filter((item) => !ids.some(({ id }) => item.productId === id));

  if (exists.length) throw new NotFoundError('Product not found');
};

const salesService = {
  register: async (items) => {
    const id = await salesModel.register();

    items.map(({ productId, quantity }) => salesModel.registerProd(id, { productId, quantity }));

    return { id, itemsSold: items };
  },
};

module.exports = { salesService, checkExistsId };