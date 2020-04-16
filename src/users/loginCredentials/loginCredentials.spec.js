const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);
const expect = chai.expect

const redisMock = require("redis-mock")
const redisClient = redisMock.createClient()

const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')
const loginCredentials = require('./loginCredentials')
const config = require('../../config')
const { cacheExpirationTime } = config.users.loginCredentials

describe('Route: /v1/users/loginCredentials', () => {
    it('should return a list of login credentials and save response to Redis', async () => {
        const request = {
            path:"/fake/path/for/testing",
            app: {
                locals:{
                    redis: redisClient
                }
            }
        }
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

        const spySqlQuery = sinon.spy(sql,'selectEmailAndUserId')
        const stubMySql = sinon.stub(mySql,'executeQuery').returns(dbUsers)
        const stubGetCredentials = sinon.stub(helper,'getCredentials').returns(credentials)
        const stubRedisSetex = sinon.stub(redisClient,'setex')

        const req = mockReq(request)
        const res = mockRes()

        await loginCredentials(req, res)

        expect(res.send).to.be.calledWithExactly(credentials)

        sinon.assert.calledOnce(spySqlQuery)
        sinon.assert.calledOnce(stubMySql)
        sinon.assert.calledOnce(stubGetCredentials)
        sinon.assert.calledWith(stubGetCredentials, dbUsers)
        sinon.assert.calledOnce(stubRedisSetex)
        sinon.assert.alwaysCalledWithExactly(stubRedisSetex, request.path, cacheExpirationTime, JSON.stringify(credentials))
        sinon.restore()
    })
})