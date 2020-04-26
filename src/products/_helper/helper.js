const nr = require('../../utils/networkRequests/networkRequests')
const config = require('../../config')
const utils = require('../../utils/utils')
const { anz, cba, nab, westpac } = config.products.hostNames
const { cards } = config.products.category

async function getProducts(bank) {
    const url = utils.getProductsUrl(bank)

    return nr.getRequest(url)
}

function findCardProducts(allProducts){
    const cardProducts = []

    allProducts.map(product => {
        if(product.productCategory.toUpperCase() == cards.toUpperCase()){
            cardProducts.push({
                bank: product.brand,
                name: product.name
            })
        }
    })

    return {
        recordsReturned: cardProducts.length,
        data: cardProducts
    }
}

module.exports = { getProducts, findCardProducts }