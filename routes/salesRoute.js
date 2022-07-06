const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/:id', salesController.getById);
salesRoute.get('/', salesController.getAll);
salesRoute.post('/', salesController.register);

module.exports = salesRoute;