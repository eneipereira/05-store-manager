const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorHandler;