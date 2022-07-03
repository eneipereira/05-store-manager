const Joi = require('joi');
const SemanticError = require('../errors/semanticError');
const runSchema = require('./runSchema');

const validators = {
  validateBodyRegisterReq: runSchema(Joi.object({
    name: Joi.string().required().empty('').messages({
      'any.required': '"name" is required',
      'any.empty': '"name" is required',
    }),
  })),
  validateBodyRegisterMin: runSchema(Joi.object({
    name: Joi.string().min(5)
      .error(new SemanticError('"name" length must be at least 5 characters long')),
  })),
};

module.exports = validators;