const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Sinon = require('sinon');
const NotFoundError = require('../../../errors/notFoundError');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { products, newProduct, updProduct } = require('../dbMock');

use(chaiAsPromised)

describe('services/productsService', () => {
  beforeEach(Sinon.restore)

  describe('getAll', () => {
    it('should return an objects array as result', () => {
      Sinon.stub(productsModel, 'getAll').resolves(products)

      return expect(productsService.getAll())
        .to.be.eventually.deep.eq(products)
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
  
      return expect(productsService.register(newProduct.name))
        .to.eventually.be.deep.eq(newProduct)
    })
  
    it('should throw an error if productsModel.getById throws', () => {
      Sinon.stub(productsModel, 'register').rejects();
  
      return expect(productsService.register(newProduct.name))
        .to.eventually.be.rejected
    })
  })

  describe('update', () => {
    it('should return an object with the updated product as result', () => {
      Sinon.stub(productsModel, 'exists').resolves(updProduct.id)
      Sinon.stub(productsModel, 'update').resolves(updProduct)
  
      return expect(productsService.update(updProduct.id, updProduct.name))
        .to.eventually.be.deep.eq(updProduct)
    })

    it('should throw an error if productsModel.exists return false', () => {
      Sinon.stub(productsModel, 'exists').resolves(false);

      return expect(productsService.update(22))
        .to.eventually.be.rejectedWith(NotFoundError)
    })
  
    it('should throw an error if productsModel.exists throws', () => {
      Sinon.stub(productsModel, 'exists').rejects();
  
      return expect(productsService.update(1, ''))
        .to.eventually.be.rejected
    })

    it('should throw an error if productsModel.update throws', () => {
      Sinon.stub(productsModel, 'exists').resolves();
      Sinon.stub(productsModel, 'update').rejects();
  
      return expect(productsService.update(1, ''))
        .to.eventually.be.rejected
    })
  })

  describe('delete', () => {
    it('should return undefined if success', () => {
      Sinon.stub(productsModel, 'delete').resolves()

      return expect(productsService.delete(1))
        .to.eventually.be.undefined
    });

    it('should throw an error if productsModel.exists return false', () => {
      Sinon.stub(productsModel, 'exists').resolves(false)

      return expect(productsService.delete(22))
        .to.eventually.be.rejectedWith(NotFoundError)
    });

    it('should throw an error if productsModel.exists throws', () => {
      Sinon.stub(productsModel, 'exists').rejects()

      return expect(productsService.delete(1))
        .to.eventually.be.rejected
    });

    it('should throw an error if productsModel.delete throws', () => {
      Sinon.stub(productsModel, 'exists').resolves()
      Sinon.stub(productsModel, 'delete').rejects()

      return expect(productsService.delete(1))
        .to.eventually.be.rejected
    });
  })

  describe('search', () => {
    it('should return an object array with the matched product', () => {
      Sinon.stub(productsModel, 'search').resolves(newProduct)

      return expect(productsService.search(''))
        .to.eventually.be.deep.eq(newProduct)
    })

    it('should return an empty array if it doesn\'t match any product', () => {
      Sinon.stub(productsModel, 'search').resolves([])

      return expect(productsService.search(''))
        .to.eventually.be.deep.eq([])
    })

    it('should return an objects array if no term is passed', () => {
      Sinon.stub(productsModel, 'search').resolves(products)

      return expect(productsService.search(''))
        .to.eventually.be.deep.eq(products)
    })

    it('should throw an error if productsModel.search throws', () => {
      Sinon.stub(productsModel, 'search').rejects()

      return expect(productsService.search())
        .to.eventually.be.rejected
    })
  })
})