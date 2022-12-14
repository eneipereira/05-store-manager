const Joi = require('joi');
const NotFoundError = require('../errors/notFoundError');
const SemanticError = require('../errors/semanticError');
const productsModel = require('../models/productsModel');
const runSchema = require('./runSchema');

const validators = {
  validateProdBodyReq: runSchema(Joi.object({
    name: Joi.string().required().messages({
      'any.required': '"name" is required',
    }),
  })),

  validateProdBodyMin: runSchema(Joi.object({
    name: Joi.string().min(5)
      .error(new SemanticError('"name" length must be at least 5 characters long')),
  })),

  validateSaleBodyReq: runSchema(Joi.array().required().items(Joi.object({
    productId: Joi.number().integer().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: Joi.number().integer().required().messages({
      'any.required': '"quantity" is required',
    }),
  }))),

  validateSaleBodyMin: runSchema(Joi.array().required().items(Joi.object({
    quantity: Joi.number().min(1)
      .error(new SemanticError('"quantity" must be greater than or equal to 1')),
  }))),

  checkExistsId: async (items) => {
    const ids = await productsModel.getAll();

    const notExists = items.filter((item) => !ids.some(({ id }) => item.productId === id));

    if (notExists.length) throw new NotFoundError('Product not found');
  },
};

module.exports = validators;