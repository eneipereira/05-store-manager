const { expect, use } = require("chai")
const chaiAsPromised = require("chai-as-promised")
const Sinon = require("sinon")
const salesController = require("../../../controllers/salesController")
const salesService = require("../../../services/salesService")
const validators = require("../../../validators/validators")
const { newSale, sales, sale, updSale } = require("../dbMock")

use(chaiAsPromised)

describe('controllers/salesController', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should throw an error if salesService.getAll throws', () => {
      Sinon.stub(salesService, 'getAll').rejects()

      return expect(salesController.getAll({}, {}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(salesService, 'getAll').resolves(sales)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await salesController.getAll({}, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(sales)
    })
  })

  describe('getById', () => {
    it('should throw an error if salesService.getById throws', () => {
      Sinon.stub(salesService, 'getById').rejects()

      return expect(salesController.getById({}, {}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(salesService, 'getById').resolves(sale)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await salesController.getById({ params: {} }, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(sale)
    })
  })

  describe('register', () => {
    it('should throw an error if validators.validateSaleBodyReq throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').rejects()

      return expect(salesController.register({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if validators.validateSaleBodyMin throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').resolves()
      Sinon.stub(validators, 'validateSaleBodyMin').rejects()

      return expect(salesController.register({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if validators.checkExistsId throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').resolves()
      Sinon.stub(validators, 'validateSaleBodyMin').resolves()
      Sinon.stub(validators, 'checkExistsId').rejects()

      return expect(salesController.register({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if salesService.register throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').resolves()
      Sinon.stub(validators, 'validateSaleBodyMin').resolves()
      Sinon.stub(validators, 'checkExistsId').resolves()
      Sinon.stub(salesService, 'register').rejects()

      return expect(salesController.register({}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(salesService, 'register').resolves(newSale)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await salesController.register({body: []}, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(201)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(newSale)
    })
  })

  describe('update', () => {
    it('should throw an error if validators.validateSaleBodyReq throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').rejects()

      return expect(salesController.update({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if validators.validateSaleBodyMin throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').resolves()
      Sinon.stub(validators, 'validateSaleBodyMin').rejects()

      return expect(salesController.update({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if productsService.update throws', () => {
      Sinon.stub(validators, 'validateSaleBodyReq').resolves()
      Sinon.stub(validators, 'validateSaleBodyMin').resolves()
      Sinon.stub(salesService, 'update').rejects()

      return expect(salesController.update({}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(salesService, 'update').resolves(updSale)

      const req = {
        body: updSale.itemsUpdated,
        params: { id: updSale.saleId }
      }

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await salesController.update(req, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(updSale)
    })
  })

  describe('delete', () => {
    it('should throw an error if salesService.delete throws', () => {
      Sinon.stub(salesService, 'delete').rejects()

      return expect(salesController.delete({}, {}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(salesService, 'delete').resolves()

      const res = {
        sendStatus: Sinon.stub().callsFake(() => res),
      }

      await salesController.delete({ params: {} }, res)

      expect(res.sendStatus.getCall(0).args[0]).to.be.eq(204)
    })
  })
})