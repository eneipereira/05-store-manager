const { expect } = require("chai")
const Sinon = require("sinon")
const { ValidationError } = require("joi")
const productsService = require("../../../services/productsService")
const productsController = require("../../../controllers/productsController")
const { products, newProduct, emptyName, shortName } = require("../dbMock")
const validators = require("../../../validators/validators")
const SemanticError = require("../../../errors/semanticError")

describe('controllers/productsController', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    const response = {};
    const request = {};

    it('should return a response with the right status and json', async () => {
      Sinon.stub(productsService, 'getAll').resolves(products)

      response.status = Sinon.stub().returns(response)
      response.json = Sinon.stub().returns()

      await productsController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.true
      expect(response.json.calledWith(products)).to.be.true
    })
    
    it('should throw an error if productsService.getAll throws', () => {
      Sinon.stub(productsService, 'getAll').rejects()

      return expect(productsController.getAll())
        .to.eventually.be.rejected
    })
  })

  describe('getById', () => {
    const response = {};
    const request = { params: { id: 3 } };

    it('should return a response with the right status and json', async () => {
      Sinon.stub(productsService, 'getById').resolves(products[2])

      response.status = Sinon.stub().returns(response)
      response.json = Sinon.stub().returns()

      await productsController.getById(request, response)

      expect(response.status.calledWith(200)).to.be.true
      expect(response.json.calledWith(products[2])).to.be.true
    })
    
    it('should throw an error if productsService.getById throws', () => {
      Sinon.stub(productsService, 'getById').rejects()

      return expect(productsController.getById(22))
        .to.eventually.be.rejected
    })
  })

  describe('register', () => {
    describe('if a valid name is passed', () => {
      const response = {};
      const request = { body: { name: newProduct.name } };

      it('should return a response with the right status and json', async () => {
        Sinon.stub(productsService, 'register').resolves(newProduct)
  
        response.status = Sinon.stub().returns(response)
        response.json = Sinon.stub().returns()
        
        await productsController.register(request, response)

        const body = await validators.validateBodyRegisterReq(request.body)
        await validators.validateBodyRegisterMin(body)
  
        expect(response.status.calledWith(201))
          .to.be.true
        expect(response.json.calledWith(newProduct))
          .to.be.true
      })
    })
  })

  describe('if there isnt a property "name"', () => {
    const response = {};
    const request = { body: {} };

    it('should throw an error if validators.validateBodyRegisterReq throws', () => {
      Sinon.stub(productsService, 'register').resolves({})
  
      response.status = Sinon.stub().returns(response)
      response.json = Sinon.stub().returns()
  
      return expect(validators.validateBodyRegisterReq(request.body))
        .to.eventually.be.rejectedWith(ValidationError)
    })
  })

  describe('if "name" is empty', () => {
    const response = {};
    const request = { body: emptyName };

    it('should throw an error if validators.validateBodyRegisterMin throws', () => {
      Sinon.stub(productsService, 'register').resolves(emptyName)
  
      response.status = Sinon.stub().returns(response)
      response.json = Sinon.stub().returns()
  
      return expect(validators.validateBodyRegisterReq(request.body))
        .to.eventually.be.rejectedWith(ValidationError)
    })
  })

  describe('if "name" length is less than 5', () => {
    const response = {};
    const request = { body: shortName };

    it('should throw an error if validators.validateBodyRegisterMin throws', () => {
      Sinon.stub(productsService, 'register').resolves(shortName)
      Sinon.stub(validators, 'validateBodyRegisterReq').resolves(request.body)
  
      response.status = Sinon.stub().returns(response)
      response.json = Sinon.stub().returns()
      
      return expect(validators
        .validateBodyRegisterMin(request.body))
        .to.eventually.be.rejectedWith(SemanticError)
    })
  })

  it('should throw an error if productsService.register throws', () => {
    Sinon.stub(productsService, 'register').rejects()

    return expect(productsController.register())
      .to.eventually.be.rejected
  })
})