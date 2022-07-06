const { expect, use  } = require("chai")
const chaiAsPromised = require("chai-as-promised")
const Sinon = require("sinon")
const NotFoundError = require("../../../errors/notFoundError")
const salesModel = require("../../../models/salesModel")
const salesService = require("../../../services/salesService")
const { newSale, sales, sale } = require("../dbMock")

use(chaiAsPromised)

describe('services/salesService', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should return an objects array as result', () => {
      Sinon.stub(salesModel, 'getAll').resolves(sales)

      return expect(salesService.getAll())
        .to.be.eventually.deep.eq(sales)
    })

    it('should throw an error if productModel.getAll throws', () => {
      Sinon.stub(salesModel, 'getAll').rejects();

      return expect(salesService.getAll())
        .to.eventually.be.rejected
    })
  })

  describe('getById', () => {
    it('should return an objects array with the right product as result', async () => {
      Sinon.stub(salesModel, 'getById').resolves(sale)

      expect(await salesService.getById(sales[0].saleId))
        .to.be.deep.eq(sale)
    })

    it('should throw an error if salesModel.getById throws', () => {
      Sinon.stub(salesModel, 'getById').rejects();

      return expect(salesService.getById(22))
        .to.eventually.be.rejected
    })

    it('should throw an error if salesModel.getById return empty', () => {
      Sinon.stub(salesModel, 'getById').resolves([]);

      return expect(salesService.getById(22))
        .to.eventually.be.rejectedWith(NotFoundError)
    })
  })

  describe('register', () => {
    it('should throw an error if salesModel.register throws', () => {
      Sinon.stub(salesModel, 'register').rejects()

      return expect(salesService.register([])).to.eventually.be.rejected
    })

    it('should return an object with right id and items', () => {
      Sinon.stub(salesModel, 'register').resolves(1)

      return expect(salesService.register(newSale.itemsSold))
        .to.eventually.be.deep.eq(newSale)
    })
  })
})