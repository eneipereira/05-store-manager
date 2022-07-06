const { expect, use  } = require("chai")
const chaiAsPromised = require("chai-as-promised")
const Sinon = require("sinon")
const salesModel = require("../../../models/salesModel")
const salesService = require("../../../services/salesService")
const { newSale } = require("../dbMock")

use(chaiAsPromised)

describe('services/salesService', () => {
  beforeEach(Sinon.restore)

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