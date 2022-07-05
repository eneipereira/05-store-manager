const runSchema = (schema) => async (value) => {
  const result = await schema.validateAsync(value, { stripUnknown: true });

  return result;
};

module.exports = runSchema;
