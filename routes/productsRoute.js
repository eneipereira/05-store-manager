const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/:id', async (req, res) => {
  const product = await productsController.getById(req.params);

  res.json(product);
});

productsRoute.get('/', async (_req, res) => {
  const products = await productsController.getAll();

  res.json(products);
});

module.exports = productsRoute;