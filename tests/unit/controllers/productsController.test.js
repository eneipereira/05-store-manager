const { expect } = require("chai")
const Sinon = require("sinon")
const productsService = require("../../../services/productsService")
const productsController = require("../../../controllers/productsController")
const products = require("../dbMock")

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
    
    it('should throw an error if productsService.getAll throws', () => {
      Sinon.stub(productsService, 'getAll').rejects()

      return expect(productsController.getAll())
        .to.eventually.be.rejected
    })
  })
})