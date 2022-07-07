const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

const newProduct = {
  id: 4,
  name: 'Manopla do Infinito'
}

const sales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const sale = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const newSale = {
  id: 1,
  itemsSold: [
    {
    "productId": 1,
    "quantity": 1
    }
  ]
}

const updProduct = {
  id: 1,
  name: "Martelo do Batman"
}

const updSale = {
  saleId: 1,
  itemsUpdated: [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

module.exports = {
  products,
  newProduct,
  updProduct,
  sales,
  sale,
  newSale,
  updSale
};