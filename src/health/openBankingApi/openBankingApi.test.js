const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);
const expect = chai.expect

const openBankingApi = require('./openBankingApi')
const utils = require('../../utils/utils')
const nr = require('../../utils/networkRequests/networkRequests')

describe('Route: /v1/health/openBankingApi', () => {
    it(`should return a status of UP when the underlying endpoint returns a 200 status code`, async () => {
        const request = {
            params: {
                bank:"anz"
            }
        }
        const req = mockReq(request)
        const res = mockRes()

        const response = { status: 200 }
        const spyGetProductsUrl = sinon.spy(utils,'getProductsUrl')
        const stubNetworkRequest = sinon.stub(nr,'getRequest').returns(response)

        await openBankingApi(req, res)

        expect(res.send).to.be.calledWithExactly({ 
            message: "UP" 
        })

        sinon.assert.calledOnce(spyGetProductsUrl)
        sinon.assert.calledWith(spyGetProductsUrl, request.params.bank)
        sinon.assert.calledOnce(stubNetworkRequest)
        sinon.restore()
    })

    it(`should return a status of DOWN when the underlying endpoint returns a 4XX or 5XX status code`, async () => {
        const request = {
            params: {
                bank:"cba"
            }
        }
        const req = mockReq(request)
        const res = mockRes()

        const err = { response: { status: 400 } }
        const spyGetProductsUrl = sinon.spy(utils,'getProductsUrl')
        const stubNetworkRequest = sinon.stub(nr,'getRequest').throws(err)

        await openBankingApi(req, res)

        expect(res.send).to.be.calledWithExactly({ 
            message: "DOWN" 
        })

        sinon.assert.calledOnce(spyGetProductsUrl)
        sinon.assert.calledWith(spyGetProductsUrl, request.params.bank)
        sinon.assert.calledOnce(stubNetworkRequest)
        sinon.restore()
    })
})