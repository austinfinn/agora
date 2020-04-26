const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);
const expect = chai.expect

const helper = require('../_helper/helper')
const cards = require('./cards')
const eh = require('../../utils/errorsHandler/errorsHandler')

describe('Route: /v1/products/cards', () => {
    it('should return a all Card products from a specific bank', async () => {
        const response = {
            data:{ data: { products: [
                { 
                    brand: 'CBA',
                    name: 'Fake CBA Savings product',
                    productCategory: 'TRANS_AND_SAVINGS_ACCOUNTS',
                    productId: '00000000-abcd-0000-efgh-000000000001' 
                },{ 
                    brand: 'CBA',
                    name: 'CBA Fake Credit Card product',
                    productCategory: 'CRED_AND_CHRG_CARDS',
                    productId: '00000000-abcd-0000-efgh-000000000002' 
                },{
                    brand: "CBA",
                    name: 'Fake CBA person loan product',
                    productCategory: 'PERS_LOANS',
                    productId: '00000000-abcd-0000-efgh-000000000003' 
                },{
                    brand: "CBA",
                    name: 'FAKE Comm bank 2 year term deposit',
                    productCategory: 'TERM_DEPOSITS',
                    productId: '00000000-abcd-0000-efgh-000000000004' 
                }]}}
        } 
        const request = {
            params:{
                bank:"cba"
            }
        }
        
        const req = mockReq(request)
        const res = mockRes()

        const stubGetProducts = sinon.stub(helper,'getProducts').returns(response)
        const spyFilterForCards = sinon.spy(helper,'filterForCards')

        await cards(req, res)

        expect(res.send).to.be.calledWithExactly({
            recordsReturned: 1,
            data: [{ 
                bank: "CBA", 
                name: "CBA Fake Credit Card product",
                productDetailsUrl:"https://api.commbank.com.au/public/cds-au/v1/banking/products/00000000-abcd-0000-efgh-000000000002"
            }],
        })

        sinon.assert.calledOnce(stubGetProducts)
        sinon.assert.calledWith(stubGetProducts, request.params.bank)
        sinon.assert.calledOnce(spyFilterForCards)
        sinon.assert.calledWith(spyFilterForCards, response.data.data.products)
        sinon.restore()
    })

    it('should display an meaningful error when a downstream/underlying network request fails', async () => {
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

        const req = mockReq()
        const res = mockRes()

        const spyErrorsHandler = sinon.spy(eh,'errorsHandler')
        sinon.stub(helper,'getAllProducts').throws(err)
        
        await cards(req, res)

        sinon.assert.calledOnce(spyErrorsHandler)
        sinon.assert.calledWith(spyErrorsHandler,err)
        sinon.restore()
    })

})