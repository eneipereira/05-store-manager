const NotFoundError = require('../errors/notFoundError');

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case NotFoundError.name:
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorHandler;