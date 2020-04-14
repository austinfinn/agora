const config = require('../../config')
const { cards } = config.products.category

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

module.exports = { findCardProducts }