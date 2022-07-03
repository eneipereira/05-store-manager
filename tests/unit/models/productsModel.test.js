const { expect } = require("chai");
const Sinon = require("sinon");
const db = require("../../../models/connection");
const productsModel = require("../../../models/productsModel");
const { products, newProduct } = require("../dbMock");

describe('models/productsModel', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should return an objects array as result', () => {
      Sinon.stub(db, 'query').resolves([products])
      
      return expect(productsModel.getAll())
        .to.eventually.deep.eq(products)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()
      
      return expect(productsModel.getAll())
        .to.eventually.be.rejected
    })
  })
  
  describe('getById', () => {
    const product = products[2];
    it('should return an object with the right product as result', () => {
      Sinon.stub(db, 'query').resolves([[product]])

      return expect(productsModel.getById(product.id))
        .to.eventually.deep.eq(product)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      return expect(productsModel.getById(22))
        .to.eventually.be.rejected
    })
  })

  describe('register', () => {
    it('should return an object with the registered product', () => {
      Sinon.stub(db, 'query').resolves([{ insertId: 4 }])

      return expect(productsModel.register(newProduct.name))
        .to.eventually.deep.eq(newProduct)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      return expect(productsModel.register(newProduct.name))
        .to.eventually.be.rejected
    })
  })
})