const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'SemanticError':
      res.status(422).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorHandler;