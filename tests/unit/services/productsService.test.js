const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Sinon = require('sinon');
const NotFoundError = require('../../../errors/notFoundError');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { products, newProduct } = require('../dbMock');

use(chaiAsPromised)

describe('services/productsService', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should return an objects array as result', () => {
      Sinon.stub(productsModel, 'getAll').resolves(products)

      return expect(productsService.getAll())
        .to.be.eventually.deep.eq(products)
    })

    it('should return an objects array ordered by id', async () => {
      Sinon.stub(productsModel, 'getAll').resolves(products)

      const result = await productsService.getAll()
      
      expect(result[1]).to.haveOwnProperty('id', 2)
      expect(result[2]).to.haveOwnProperty('id', 3)
    })

    it('should throw an error if productModel.getAll throws', () => {
      Sinon.stub(productsModel, 'getAll').rejects();

      return expect(productsService.getAll())
        .to.eventually.be.rejected
    })
  })

  describe('getById', () => {
    const product = products[1];
    it('should return an object with the right product as result', async () => {
      Sinon.stub(productsModel, 'getById').resolves(product)

      expect(await productsService.getById(product.id))
        .to.be.deep.eq(product)
    })

    it('should throw an error if productsModel.getById throws', () => {
      Sinon.stub(productsModel, 'getById').rejects();

      return expect(productsService.getById(22))
        .to.eventually.be.rejected
    })
    
    it('should throw an error if productsModel.getById return empty', () => {
      Sinon.stub(productsModel, 'getById').resolves();

      return expect(productsService.getById(22))
        .to.eventually.be.rejectedWith(NotFoundError)
    })
  })
  
  describe('register', () => {
    it('should return an object with the right product as result', () => {
      Sinon.stub(productsModel, 'register').resolves(newProduct)
  
      return expect(productsService.register(newProduct.name)).to.eventually.be.deep.eq(newProduct)
    })
  
    it('should throw an error if productsModel.getById throws', () => {
      Sinon.stub(productsModel, 'register').rejects();
  
      return expect(productsService.register(newProduct.name))
        .to.eventually.be.rejected
    })
  })
})