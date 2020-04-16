const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);

const redisMock = require("redis-mock")
const redisClientMock = redisMock.createClient()

const checkCache = require('./redis')

describe('Redis: checkCache()', ()=> {
    it(`should return cached data when found in Redis`, function(){
        const accountStatus = "fakeStatus"
        const redisData = { message:"hello" }
        const request = {
            params:{
                accountStatus: accountStatus
            },
            path: `/qpc/account/${accountStatus}`,
            app: {
                locals:{
                    redis: redisClientMock
                }
            }
        }

        const req = mockReq(request)
        const res = mockRes()
        const next = sinon.spy()

        const stubRedisDelete = sinon.stub(redisClientMock,'del')
        const stubRedisGet = sinon.stub(redisClientMock,'get').yields(null, JSON.stringify(redisData))

        checkCache(req, res, next)
        
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(stubRedisGet)
        sinon.assert.notCalled(stubRedisDelete)
        sinon.assert.notCalled(next)
        sinon.restore()
    })

    it(`should flush cache when the 'flush' value is set to 'TRUE'`, function(){
        const accountStatus = "fakeStatus"
        const request = {
            params:{
                accountStatus: accountStatus
            },
            query:{ 
                flush: "true"
            },
            path: `/qpc/account/${accountStatus}`,
            app: {
                locals:{
                    redis: redisClientMock
                }
            }
        }

        const req = mockReq(request)
        const res = mockRes()
        const next = sinon.spy()

        const stubRedisDelete = sinon.stub(redisClientMock,'del')
        const stubRedisGet = sinon.stub(redisClientMock,'get').yields(null, null)

        checkCache(req, res, next)
        
        sinon.assert.notCalled(res.send)
        sinon.assert.calledOnce(stubRedisGet)
        sinon.assert.calledOnce(stubRedisDelete)
        sinon.assert.calledOnce(next)
        sinon.restore()
    })

    it(`should not flush cache when the 'flush' value is set to something other than 'TRUE'`, function(){
        const accountStatus = "fakeStatus"
        const redisData = { message:"hello" }
        const request = {
            params:{
                accountStatus: accountStatus
            },
            query:{ 
                flush: "falsy"
            },
            path: `/qpc/account/${accountStatus}`,
            app: {
                locals:{
                    redis: redisClientMock
                }
            }
        }

        const req = mockReq(request)
        const res = mockRes()
        const next = sinon.spy()

        const stubRedisDelete = sinon.stub(redisClientMock,'del')
        const stubRedisGet = sinon.stub(redisClientMock,'get').yields(null, JSON.stringify(redisData))

        checkCache(req, res, next)
        
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(stubRedisGet)
        sinon.assert.notCalled(stubRedisDelete)
        sinon.assert.notCalled(next)
        sinon.restore()
    })

    it(`should ignore all query strings except 'flush'`, function(){
        const accountStatus = "fakeStatus"
        const redisData = { message:"hello" }
        const request = {
            params:{
                accountStatus: accountStatus
            },
            query:{ 
                flusx: "true"
            },
            path: `/qpc/account/${accountStatus}`,
            app: {
                locals:{
                    redis: redisClientMock
                }
            }
        }

        const req = mockReq(request)
        const res = mockRes()
        const next = sinon.spy()

        const stubRedisDelete = sinon.stub(redisClientMock,'del')
        const stubRedisGet = sinon.stub(redisClientMock,'get').yields(null, JSON.stringify(redisData))

        checkCache(req, res, next)
        
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(stubRedisGet)
        sinon.assert.notCalled(stubRedisDelete)
        sinon.assert.notCalled(next)
        sinon.restore()
    })

    it(`should return an error if passed one from Redis`, function(){
        const accountStatus = "fakeStatus"
        const request = {
            params:{
                accountStatus: accountStatus
            },
            path: `/qpc/account/${accountStatus}`,
            app: {
                locals:{
                    redis: redisClientMock
                }
            }
        }
        
        const req = mockReq(request)
        const res = mockRes()
        const next = sinon.spy()

        const stubRedisDelete = sinon.stub(redisClientMock,'del')
        const stubRedisGet = sinon.stub(redisClientMock,'get').yields("fakeErrorMessage", null)

        checkCache(req, res, next)
        
        sinon.assert.calledOnce(res.send)
        sinon.assert.calledOnce(stubRedisGet)
        sinon.assert.notCalled(stubRedisDelete)
        sinon.assert.calledOnce(next)
        sinon.restore()
    })
})