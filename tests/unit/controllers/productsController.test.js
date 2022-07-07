const { expect } = require("chai")
const Sinon = require("sinon")
const productsService = require("../../../services/productsService")
const productsController = require("../../../controllers/productsController")
const { products, newProduct, updProduct } = require("../dbMock")
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
    it('should throw an error if validators.validateProdBodyReq throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').rejects()
      
      return expect(productsController.register({}))
      .to.eventually.be.rejected
    })
    
    it('should throw an error if validators.validateProdBodyMin throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').resolves()
      Sinon.stub(validators, 'validateProdBodyMin').rejects()
      
      return expect(productsController.register({}))
      .to.eventually.be.rejected
    })
    
    it('should throw an error if productsService.register throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').resolves()
      Sinon.stub(validators, 'validateProdBodyMin').resolves()
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
  
  describe('update', () => {
    it('should throw an error if validators.validateProdBodyReq throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').rejects()
      
      return expect(productsController.update({}))
      .to.eventually.be.rejected
    })
    
    it('should throw an error if validators.validateProdBodyMin throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').resolves()
      Sinon.stub(validators, 'validateProdBodyMin').rejects()
      
      return expect(productsController.update({}))
      .to.eventually.be.rejected
    })
    
    it('should throw an error if productsService.update throws', () => {
      Sinon.stub(validators, 'validateProdBodyReq').resolves()
      Sinon.stub(validators, 'validateProdBodyMin').resolves()
      Sinon.stub(productsService, 'update').rejects()
      
      return expect(productsController.update({}))
      .to.eventually.be.rejected
    })
    
    it('should calls res.json if success', async () => {
      Sinon.stub(productsService, 'update').resolves(updProduct)
      
      const req = {
        body: { name: updProduct.name },
        params: { id: updProduct.id }
      }
      
      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }
      
      await productsController.update(req, res)
      
      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(updProduct)
    })
  })
  
  describe('delete', () => { 
    it('should throw an error if productsService.delete throws', () => {
      Sinon.stub(productsService, 'delete').rejects()
      
      return expect(productsController.delete({}, {}))
      .to.eventually.be.rejected
    })

    it('should calls res.json if success', async () => {
      Sinon.stub(productsService, 'delete').resolves()
  
      const res = {
        sendStatus: Sinon.stub().callsFake(() => res),
      }
  
      await productsController.delete({ params: {} }, res)
  
      expect(res.sendStatus.getCall(0).args[0]).to.be.eq(204)
    })
  })

  describe('search', () => {
    it('should return an object array with the matched product', async () => {
      Sinon.stub(productsService, 'search').resolves(newProduct)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await productsController.search({query: {}}, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(newProduct)
    })

    it('should return an empty array if it doesn\'t match any product', async () => {
      Sinon.stub(productsService, 'search').resolves([])

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await productsController.search({ query: {} }, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq([])
    })

    it('should return an objects array if no term is passed', async () => {
      Sinon.stub(productsService, 'search').resolves(products)

      const res = {
        status: Sinon.stub().callsFake(() => res),
        json: Sinon.stub().returns()
      }

      await productsController.search({ query: {} }, res)

      expect(res.status.getCall(0).args[0]).to.be.eq(200)
      expect(res.json.getCall(0).args[0]).to.be.deep.eq(products)
    })

    it('should throw an error if productsService.search throws', () => {
      Sinon.stub(productsService, 'search').rejects()

      return expect(productsController.search())
        .to.eventually.be.rejected
    })
  })
})