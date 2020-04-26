const expect  = require('chai').expect;
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const nr = require('../../utils/networkRequests/networkRequests')
const { getProducts, filterForCards } = require('./helper')
const utils = require('../../utils/utils')

const allWestpacProducts = [
    {
        brand: "Westpac",
        name: 'Fake Card product',
        productCategory: 'CRED_AND_CHRG_CARDS',
        productId: '00000000-abcd-0000-efgh-000000000004' 
    },{
        brand: "Westpac",
        name: 'Fake mortgage product',
        productCategory: 'RESIDENTIAL_MORTGAGES',
        productId: '00000000-abcd-0000-efgh-000000000003' 
    },{
        brand: "Westpac",
        name: 'FAKE 2 year term deposit',
        productCategory: 'TERM_DEPOSITS',
        productId: '00000000-abcd-0000-efgh-000000000002' 
    },{
        brand: "Westpac",
        name: 'Fake Savings product',
        productCategory: 'TRANS_AND_SAVINGS_ACCOUNTS',
        productId: '00000000-abcd-0000-efgh-000000000001' 
    }
]

describe('getProducts()', () => {
    it(`should return a response from a bank's Products endpoint`, async () => {
        const bank = "Westpac"
       
        const stubRequest = sinon.stub(nr,'getRequest')
        const spyGetProductsUrl = sinon.spy(utils,'getProductsUrl')
        
        await getProducts(bank)

        sinon.assert.calledOnce(spyGetProductsUrl)
        sinon.assert.calledWith(spyGetProductsUrl, bank)
        sinon.assert.callCount(stubRequest, 1)

        // clean up your tests once finished
        sinon.restore();
    })
})

describe('filterForCards()', () => {
    it(`should filter out all products except for Card products for a specific bank`, () => {
        const result = filterForCards(allWestpacProducts)  

        expect(result).to.deep.equal({
            recordsReturned: 1,
            data: [{
                "bank": "Westpac",
                "name": "Fake Card product",
                "productDetailsUrl":"https://digital-api.westpac.com.au/cds-au/v1/banking/products/00000000-abcd-0000-efgh-000000000004"
            }]
        })
    })
})