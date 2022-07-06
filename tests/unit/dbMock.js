const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

const newProduct = {
  id: 4,
  name: 'Manopla do Infinito'
}

const newSale = {
  id: 1,
  itemsSold: [
    {
    "productId": 1,
    "quantity": 1
    }
  ]
}

module.exports = {
  products,
  newProduct,
  newSale
};