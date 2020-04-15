const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);
const expect = chai.expect

const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')
const loginCredentials = require('./loginCredentials')

describe('Route: /v1/users/loginCredentials', () => {
    it('should return a list of login credentials', async () => {
        const dbUsers = [ 
            { user_id: 1, email: 'john@fake.com' },
            { user_id: 2, email: 'claire@fake.com' }
        ]
        const credentials = [
            {
                email: "john@fake.com",
                password: "fakePass1"
            },{
                email: "claire@fake.com",
                password: "p@fakePass2"
            }
        ]

        const spySqlQuery = sinon.spy(sql,'getUserEmailsQuery')
        const stubMySql = sinon.stub(mySql,'executeQuery').returns(dbUsers)
        const stubGetCredentials = sinon.stub(helper,'getCredentials').returns(credentials)

        const req = mockReq()
        const res = mockRes()

        await loginCredentials(req, res)

        expect(res.send).to.be.calledWithExactly(credentials)

        sinon.assert.calledOnce(spySqlQuery)
        sinon.assert.calledOnce(stubMySql)
        sinon.assert.calledOnce(stubGetCredentials)
        sinon.assert.calledWith(stubGetCredentials, dbUsers)
        sinon.restore()
    })
})