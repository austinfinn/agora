const config = require('../config')
const { anz, cba, nab, westpac } = config.products.hostNames

function getProductsUrl(bank) {
    const upperCaseBank = bank.toUpperCase()
    const path = "/cds-au/v1/banking/products"
    let url = ""

    switch(upperCaseBank) {
    case 'ANZ':
        url = `${anz}${path}`
        break;
    case 'CBA':
        url = `${cba}${path}`
        break;
    case 'NAB':
        url = `${nab}${path}`
        break;
    case 'WESTPAC':
        url = `${westpac}${path}`
        break;
    default:
        throw "INVALID_BANK_NAME" 
    }
    return url
}

function getMinimumSupportedVersion(url){
    if(url.includes('anz')){
        return '2'
    } else {
        return '1'
    }
}

module.exports = { getProductsUrl, getMinimumSupportedVersion }