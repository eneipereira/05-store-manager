const { expect, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Sinon = require("sinon");
const db = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");
const { sales, sale } = require("../dbMock");

use(chaiAsPromised)

describe('models/salesModel', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should return an objects array as result', () => {
      Sinon.stub(db, 'query').resolves([sales])

      return expect(salesModel.getAll())
        .to.eventually.deep.eq(sales)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      return expect(salesModel.getAll())
        .to.eventually.be.rejected
    })
  })

  describe('getById', () => {
    it('should return an object with the right product as result', () => {
      Sinon.stub(db, 'query').resolves([sale])

      return expect(salesModel.getById(sales[0].saleId))
        .to.eventually.deep.eq(sale)
    })

    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      return expect(salesModel.getById(22))
        .to.eventually.be.rejected
    })
  })

  describe('register', () => {
    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      return expect(salesModel.register(1))
        .to.eventually.be.rejected
    });

    it('should return the insertId as result', () => {
      Sinon.stub(db, 'query').resolves([{insertId: 4}])

      return expect(salesModel.register(1))
        .to.eventually.deep.eq(4)
    });
  })

  describe('registerProd', () => {
    it('should throw an error if db.query throws', () => {
      Sinon.stub(db, 'query').rejects()

      return expect(salesModel.registerProd(1))
        .to.eventually.be.rejected
    });

    it('should return if there is no error', () => {
      Sinon.stub(db, 'query').resolves()

      return expect(salesModel.registerProd(1, {}))
        .to.eventually.be.undefined
    });
  })
})