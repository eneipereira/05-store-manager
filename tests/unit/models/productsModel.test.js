const { expect } = require("chai");
const Sinon = require("sinon");
const db = require("../../../models/connection");
const productsModel = require("../../../models/productsModel");
const products = require("../dbMock");

describe('models/productsModel', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should return an objects array as result', () => {
      Sinon.stub(db, 'query').resolves([products])
      
      const result = productsModel.getAll();
      
      return expect(result).to.eventually.deep.eq(products)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()
      
      const result = productsModel.getAll();
      
      return expect(result).to.eventually.be.rejected
    })
  })
  
  describe('getById', () => {
    const product = products[2];
    it('should return an object with the right product as result', () => {
      Sinon.stub(db, 'query').resolves([[product]])

      const result = productsModel.getById(product.id)

      return expect(result).to.eventually.deep.eq(product)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      const result = productsModel.getById(22)

      return expect(result).to.eventually.be.rejected
    })
  })
})