const nr = require('../../utils/networkRequests/networkRequests')
const config = require('../../config')
const utils = require('../../utils/utils')
const { anz, cba, nab, westpac } = config.products.hostNames
const { cards, mortgages } = config.products.category

async function getProducts(bank) {
    const url = utils.getProductsUrl(bank)

    return nr.getRequest(url)
}

function filterForCards(allProducts){
    const products = []

    allProducts.map(product => {
        if(product.productCategory.toUpperCase() == cards.toUpperCase()){
            let productsUrl = utils.getProductsUrl(product.brand)

            products.push({
                bank: product.brand,
                name: product.name,
                productDetailsUrl: productsUrl + "/" + product.productId
            })
        }
    })

    return {
        recordsReturned: products.length,
        data: products
    }
}

function filterForMortgages(allProducts){
    const products = []

    allProducts.map(product => {
        if(product.productCategory.toUpperCase() == mortgages.toUpperCase()){
            products.push(formatResponse(product))
        }
    })

    return {
        recordsReturned: products.length,
        data: products
    }
}

function formatResponse(product) {
    let productsUrl = utils.getProductsUrl(product.brand)

    return {
        bank: product.brand,
        name: product.name,
        productDetailsUrl: productsUrl + "/" + product.productId
    }
}

module.exports = { 
    getProducts, 
    filterForCards,
    filterForMortgages
}