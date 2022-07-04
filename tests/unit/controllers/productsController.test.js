const { expect } = require("chai")
const Sinon = require("sinon")
const productsService = require("../../../services/productsService")
const productsController = require("../../../controllers/productsController")
const { products, newProduct } = require("../dbMock")
const validators = require("../../../validators/validators")

describe('controllers/productsController', () => {
  beforeEach(Sinon.restore)
  
  describe('getAll', () => {
    it('should throw an error if productsService.getAll throws', () => {
      Sinon.stub(productsService, 'getAll').rejects()
  
      return expect(productsController.getAll({}, {}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(productsService, 'getAll').resolves(products)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await productsController.getAll({}, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(products)
    })
  })

  describe('getById', () => { 
    it('should throw an error if productsService.getById throws', () => {
      Sinon.stub(productsService, 'getById').rejects()
      
      return expect(productsController.getById({}, {}))
      .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(productsService, 'getById').resolves(products[2])
  
      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }
  
      await productsController.getById({ params: {} }, res)
  
      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(products[2])
    })
  })

  describe('register', () => {
    it('should throw an error if validators.validateBodyRegisterReq throws', () => {
      Sinon.stub(validators, 'validateBodyRegisterReq').rejects()
      
      return expect(productsController.register({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if validators.validateBodyRegisterMin throws', () => {
      Sinon.stub(validators, 'validateBodyRegisterReq').resolves()
      Sinon.stub(validators, 'validateBodyRegisterMin').rejects()
  
      return expect(productsController.register({}))
        .to.eventually.be.rejected
    })

    it('should throw an error if productsService.register throws', () => {
      Sinon.stub(validators, 'validateBodyRegisterReq').resolves()
      Sinon.stub(validators, 'validateBodyRegisterMin').resolves()
      Sinon.stub(productsService, 'register').rejects()
  
      return expect(productsController.register({}))
        .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(productsService, 'register').resolves(newProduct)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await productsController.register({ body: { name: newProduct.name } }, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(201)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(newProduct)
    })
  })
})