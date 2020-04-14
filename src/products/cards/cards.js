const helper = require('../_helper/helper')

async function cards(req,res){
    try {
        const allProducts = await helper.getAllProducts()
        const cardProducts = helper.findCardProducts(allProducts)

        res.send(cardProducts)
    } catch (error) {
        console.log(error)
    }
}

module.exports = cards