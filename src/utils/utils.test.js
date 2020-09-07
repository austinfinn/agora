const expect  = require('chai').expect;

const config = require('../config')
const { hostNames } = config.products
const utils = require('./utils')

describe('getProductsUrl()', () => {
    it(`should return the full URL to get ANZ's list of products`, (done) => {
        const bank = "anz"
        const result = utils.getProductsUrl(bank)

        expect(result).to.equal(`${hostNames.anz}/cds-au/v1/banking/products`)
        done()
    })

    it(`should return the full URL to get CBA's list of products`, (done) => {
        const bank = "cba"
        const result = utils.getProductsUrl(bank)

        expect(result).to.equal(`${hostNames.cba}/cds-au/v1/banking/products`)
        done()
    })

    it(`should return the full URL to get NAB's list of products`, (done) => {
        const bank = "nab"
        const result = utils.getProductsUrl(bank)

        expect(result).to.equal(`${hostNames.nab}/cds-au/v1/banking/products`)
        done()
    })

    it(`should return the full URL to get CBA's list of products`, (done) => {
        const bank = "westpac"
        const result = utils.getProductsUrl(bank)

        expect(result).to.equal(`${hostNames.westpac}/cds-au/v1/banking/products`)
        done()
    })

    it(`should throw an error if passed an invalid bank name`, (done) => {
        const bank = "abc"

        expect(function () { utils.getProductsUrl(bank) }).to.throw("INVALID_BANK_NAME") 
        done()
    })
})

describe('getMinimumSupportedVersion()', () => {
    it(`should return the minimum supported version for the 'x-v' header for ANZ`, () => {
        const url = 'https://bank.anz.com'

        const result = utils.getMinimumSupportedVersion(url)

        expect(result).to.equal('2')
    })

    it(`should return the minimum supported version for the 'x-v' header for all other banks except ANZ`, () => {
        const url = 'https://bank.westpac.com'

        const result = utils.getMinimumSupportedVersion(url)

        expect(result).to.equal('1')
    })
})