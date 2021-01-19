const expect  = require('chai').expect;
const sinon = require('sinon')
const { mockReq, mockRes,  } = require('sinon-express-mock');

const customizePage = require('./customizePage')
const appPackage = require('../../../package.json')

describe('customizePage()', () => {
    it(`should check Swagger page is configured correctly when running locally`, async () => {
        global.localDevelopment = true
        global.localhost = 'http://localhost:1234'

        const req = mockReq()
        const res = mockRes()
        const next = sinon.spy()

        customizePage(req, res, next)

        expect(req.swaggerDoc.info.version).to.eql(appPackage.version)
        expect(req.swaggerDoc.host).to.eql('localhost:1234')
        expect(req.swaggerDoc.schemes).is.an('array')
        expect(req.swaggerDoc.schemes).eql(["http","https"])
        sinon.restore()
    })

    it(`should check Swagger page is configured correctly when running in a hosted env`, async () => {
        global.localDevelopment = undefined

        const req = mockReq()
        const res = mockRes()
        const next = sinon.spy()

        customizePage(req, res, next)

        expect(req.swaggerDoc.info.version).to.eql(appPackage.version)
        expect(req.swaggerDoc.host).to.eql('agora-data-aggregation.herokuapp.com/')
        expect(req.swaggerDoc.schemes).is.an('array')
        expect(req.swaggerDoc.schemes).eql(["https","http"])
        sinon.restore()
    })
})