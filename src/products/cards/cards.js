const productsHelper = require('../_helper/helper')
const helper = require('./helper')

async function cards(req,res){
    try {
        const allProducts = await productsHelper.getAllProducts()
        const cardProducts = helper.findCardProducts(allProducts)

        res.send(cardProducts)
    } catch (error) {
        console.log(error)
    }
}

module.exports = cards