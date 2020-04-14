const nr = require('../../utils/networkRequests/networkRequests')
const config = require('../../config')
const { anz, cba, nab, westpac } = config.products.hostNames
const { cards } = config.products.category

async function getAllProducts() {
    let listOfPromises = []
    listOfPromises.push(nr.getRequest(`${anz}/cds-au/v1/banking/products`))
    listOfPromises.push(nr.getRequest(`${cba}/cds-au/v1/banking/products`))
    listOfPromises.push(nr.getRequest(`${nab}/cds-au/v1/banking/products`))
    listOfPromises.push(nr.getRequest(`${westpac}/cds-au/v1/banking/products`))

    const allResponses = await Promise.all(listOfPromises)

    return createListOfAllProducts(allResponses)
}

function createListOfAllProducts(allResponses) {
    const listofAllProducts = []

    allResponses.map(response => {
        // iterate through the 'products' array from all 4 Responses
        response.data.products.map(product => {
            // add each individual product to the list
            listofAllProducts.push(product)
        })
    })
    return listofAllProducts
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

module.exports = { getAllProducts, findCardProducts }