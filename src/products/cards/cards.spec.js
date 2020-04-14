const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(sinonChai);
const expect = chai.expect

const helper = require('../_helper/helper')
const cards = require('./cards')

describe('Route: /v1/products/cards', () => {
    it('should return a list of Card products from all 4 banks', async () => {
        const allProducts = [
            { 
                brand: 'ANZ',
                name: 'Fake ANZ Savings product',
                productCategory: 'TRANS_AND_SAVINGS_ACCOUNTS',
                productId: '00000000-abcd-0000-efgh-000000000001' 
            },{ 
                brand: 'Westpac',
                name: 'Westpac Fake Credit Card product',
                productCategory: 'CRED_AND_CHRG_CARDS',
                productId: '00000000-abcd-0000-efgh-000000000002' 
            },{
                brand: "NAB",
                name: 'Fake NAB person loan product',
                productCategory: 'PERS_LOANS',
                productId: '00000000-abcd-0000-efgh-000000000003' 
            },{
                brand: "CBA",
                name: 'FAKE Comm bank 2 year term deposit',
                productCategory: 'TERM_DEPOSITS',
                productId: '00000000-abcd-0000-efgh-000000000004' 
            }]
        
        const req = mockReq()
        const res = mockRes()

        const stubHelper = sinon.stub(helper,'getAllProducts').returns(allProducts)
        const spyHelper = sinon.spy(helper,'findCardProducts')

        await cards(req, res)

        expect(res.send).to.be.calledWithExactly({
            recordsReturned: 1,
            data: [{ 
                bank: "Westpac", 
                name: "Westpac Fake Credit Card product" 
            }],
        })

        sinon.assert.calledOnce(stubHelper)
        sinon.assert.calledOnce(spyHelper)
        sinon.assert.calledWith(spyHelper, allProducts)
        sinon.restore()
    })
})