const { expect, use } = require("chai")
const chaiAsPromised = require("chai-as-promised")
const Sinon = require("sinon")
const salesController = require("../../../controllers/salesController")
const salesService = require("../../../services/salesService")
const validators = require("../../../validators/validators")
const { newSale } = require("../dbMock")

use(chaiAsPromised)

describe('controllers/salesController', () => {
  beforeEach(Sinon.restore)

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
      Sinon.stub(validators, 'validateProdBodyReq').resolves()
      Sinon.stub(validators, 'validateProdBodyMin').resolves()
      Sinon.stub(validators, 'checkExistsId').rejects()

      return expect(salesController.register({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if salesService.register throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').resolves()
      Sinon.stub(validators, 'validateProdBodyMin').resolves()
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
})