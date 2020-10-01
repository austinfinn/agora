const expect  = require('chai').expect;
const { errorsHandler } = require('./errorsHandler')

describe('errorsHandler() - network request errors', function(){
    it('should return a generic network request error', function(done){
        const err = {
            response:{
                status: 500,
                config:{
                    url: 'https://fake.bank.domain/cds-au/v0/banking/products',
                    method: 'get',
                    headers: { Accept: 'application/json, text/plain, */*' }
                },
                data:{ message:"This is just a made up error message!"}
            }
        }
        const result = errorsHandler(err)

        expect(result).to.deep.equal({
            statusCode: err.response.status,
            body: {
                message : "An unhandled error occured. Feel free to create a PR to fix it!",
                summary: {
                    url: err.response.config.url,
                    statusCode: err.response.status,
                    resposeBody: err.response.data
                },
                details: err.response.config
            }
        })
        done()
    })

    it('should return a meaningful error when downstream requests return 403 status codes', function(done){
        const err = {
            response:{
                status: 403,
                config:{
                    url: 'https://fake.bank.domain/cds-au/v0/banking/products',
                    method: 'get',
                    headers: { Accept: 'application/json, text/plain, */*' }
                },
                data:{ message:"This is just a made up error message!"}
            }
        }
        const result = errorsHandler(err)

        expect(result).to.deep.equal({
            statusCode: err.response.status,
            body: {
                message : "Check you have the correct level of priviledges to make this Request",
                summary: {
                    url: err.response.config.url,
                    statusCode: err.response.status,
                    resposeBody: err.response.data
                },
                details: err.response.config
            }
        })
        done()
    })
})

describe('errorsHandler() - database errors', function(){
    it('should return a generic db error', function(done){
        const err = {
            code: 'FAKE_ERROR_CODE',
            sqlMessage: 'fake db message'
        }

        const result = errorsHandler(err)
        expect(result).to.deep.equal({
            statusCode: 500,
            body:{
                message:"An unhandled error occured. Feel free to create a PR to fix it!"
            }
        })
        done()
    })

    it('should return a meaningful error message when incorrect db credentials are used', function(done){
        const err = {
            code: 'ER_ACCESS_DENIED_ERROR',
            sqlMessage: 'Access denied for user'
        }

        const result = errorsHandler(err)
        expect(result).to.deep.equal({
            statusCode: 500,
            body:{
                message:"Looks like the database credentials are incorrect."
            }
        })
        done()
    })
})

describe('errorsHandler() - Handle non-database or non-network errors', function(){
    it('should return a generic error', function(done){
        const err = {
            fakeMessage: 'this is a fake error to test the else clause'
        }

        const result = errorsHandler(err)
        expect(result).to.deep.equal({
            statusCode: 500,
            body:{
                message:"A non-database and non-network related error occured. Feel free to create a PR to fix it!"
            }
        })
        done()
    })
})