const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use('/sales', salesRoute);

app.use(errorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;