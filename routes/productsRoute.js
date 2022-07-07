const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/:id', productsController.getById);
productsRoute.put('/:id', productsController.update);
productsRoute.delete('/:id', productsController.delete);
productsRoute.post('/', productsController.register);
productsRoute.get('/', productsController.getAll);

module.exports = productsRoute;