const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/:id', productsController.getById);

productsRoute.get('/', productsController.getAll);

productsRoute.post('/', productsController.register);

module.exports = productsRoute;