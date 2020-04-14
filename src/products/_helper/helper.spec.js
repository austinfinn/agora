const expect  = require('chai').expect;
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const nr = require('../../utils/networkRequests/networkRequsts')
const { getAllProducts } = require('./helper')
const config = require('../../config')
const { anz, cba, nab, westpac } = config.products.hostNames

const anzSavings = {
    brand: "ANZ",
    name: 'Fake Savings product',
    productCategory: 'TRANS_AND_SAVINGS_ACCOUNTS',
    productId: '00000000-abcd-0000-efgh-000000000001' 
}
const cbaTermDeposit = {
    brand: "CBA",
    name: 'FAKE 2 year term deposit',
    productCategory: 'TERM_DEPOSITS',
    productId: '00000000-abcd-0000-efgh-000000000002' 
}
const nabMortgage = {
    brand: "NAB",
    name: 'Fake mortgage product',
    productCategory: 'RESIDENTIAL_MORTGAGES',
    productId: '00000000-abcd-0000-efgh-000000000003' 
}
const westpacCard = {
    brand: "Westpac",
    name: 'Fake Card product',
    productCategory: 'CRED_AND_CHRG_CARDS',
    productId: '00000000-abcd-0000-efgh-000000000004' 
}

describe('getAllProducts()', () => {
    it(`should return a single list of products from all 4 banks`, async () => {
        const allResponses = [
            {
                status:200,
                data: {
                    data: { products:[ anzSavings ] }
                }
            },
            {
                status:200,
                data: {
                    data: { products:[ cbaTermDeposit ] }
                }
            },
            {
                status:200,
                data: {
                    data: { products:[ nabMortgage] }
                }
            },
            {
                status:200,
                data: {
                    data: { products:[ westpacCard ] }
                }
            }
        ]
        const stubPromiseAll = sinon.stub(Promise,'all').resolves(allResponses)
        const stubRequest = sinon.stub(nr,'getRequest')
        // this returns Promises for each of the 4 network requests
        stubRequest.onCall(0).resolves()
        stubRequest.onCall(1).resolves()
        stubRequest.onCall(2).resolves()
        stubRequest.onCall(3).resolves()
        
        const result = await getAllProducts()

        expect(result).to.deep.equal([
            anzSavings,
            cbaTermDeposit,
            nabMortgage,
            westpacCard
            ])

        sinon.assert.callCount(stubRequest, 4)
        // check the correct URL values are passed to the 'getRequest' function
        sinon.assert.calledWith(stubRequest.firstCall, `${anz}/cds-au/v1/banking/products`)
        sinon.assert.calledWith(stubRequest.secondCall, `${cba}/cds-au/v1/banking/products`)
        sinon.assert.calledWith(stubRequest.thirdCall, `${nab}/cds-au/v1/banking/products`)
        sinon.assert.calledWith(stubRequest.lastCall, `${westpac}/cds-au/v1/banking/products`)
        sinon.assert.calledOnce(stubPromiseAll)

        // clean up your tests once finished
        sinon.restore();
    })
})