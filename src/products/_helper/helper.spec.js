const expect  = require('chai').expect;
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const nr = require('../../utils/networkRequests/networkRequsts')
const helper = require('./helper')
const config = require('../../config')
const { anz, cba, nab, westpac } = config.products.hostNames

describe('getAllProducts()', () => {
    it(`should return a single list of products from all 4 banks`, async () => {
        const allResponses = [
            {
                status:200,
                data: {
                    data: {
                        products:[{
                            brand: "ANZ",
                            name: 'Fake ANZ Savings product',
                            productCategory: 'TRANS_AND_SAVINGS_ACCOUNTS',
                            productId: '00000000-abcd-0000-efgh-000000000001' 
                        }]
                    }
                }
            },
            {
                status:200,
                data: {
                    data: {
                        products:[{
                            brand: "Westpac",
                            name: 'Westpac Fake Mortgage product',
                            productCategory: 'RESIDENTIAL_MORTGAGES',
                            productId: '00000000-abcd-0000-efgh-000000000002' 
                        }]
                    }
                }
            },
            {
                status:200,
                data: {
                    data: {
                        products:[{
                            brand: "NAB",
                            name: 'Fake NAB person loan product',
                            productCategory: 'PERS_LOANS',
                            productId: '00000000-abcd-0000-efgh-000000000003' 
                        }]
                    }
                }
            },
            {
                status:200,
                data: {
                    data: {
                        products:[{
                            brand: "CBA",
                            name: 'FAKE Comm bank 2 year term deposit',
                            productCategory: 'TERM_DEPOSITS',
                            productId: '00000000-abcd-0000-efgh-000000000004' 
                        }]
                    }
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
        
        const result = await helper.getAllProducts()

        expect(result).to.deep.equal([
        { 
            brand: 'ANZ',
            name: 'Fake ANZ Savings product',
            productCategory: 'TRANS_AND_SAVINGS_ACCOUNTS',
            productId: '00000000-abcd-0000-efgh-000000000001' 
        },{ 
            brand: 'Westpac',
            name: 'Westpac Fake Mortgage product',
            productCategory: 'RESIDENTIAL_MORTGAGES',
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
        }])

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