const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/:id', salesController.getById);
salesRoute.put('/:id', salesController.update);
salesRoute.delete('/:id', salesController.delete);
salesRoute.post('/', salesController.register);
salesRoute.get('/', salesController.getAll);

module.exports = salesRoute;