const expect  = require('chai').expect;
const { errorsHandler } = require('./errorsHanlder')

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

    it('should return a generic network request error', function(done){
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