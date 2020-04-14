const expect  = require('chai').expect;
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const axios = require('axios')

const nr = require('./networkRequests')

describe('getRequest()', () => {
    it(`should check the details of Request`, async () => {
        const inputUrl='https://api.fake.com/path/for/testing'
        const stubAxiosGetRequest = sinon.stub(axios.default,'get')

        await nr.getRequest(inputUrl)

        const outputUrl = stubAxiosGetRequest.firstCall.args[0]
        const options = stubAxiosGetRequest.firstCall.args[1]

        expect(outputUrl).to.equal(inputUrl)
        expect(options.headers['x-v']).to.equal("1")

        sinon.assert.calledOnce(stubAxiosGetRequest)
    })
})