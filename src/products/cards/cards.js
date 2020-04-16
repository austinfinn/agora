const helper = require('../_helper/helper')
const { errorsHandler } = require('../../utils/errorsHandler/errorsHanlder')

async function cards(req,res){
    try {
        const allProducts = await helper.getAllProducts()
        const cardProducts = helper.findCardProducts(allProducts)

        res.send(cardProducts)
    } catch (error) {
        const response = errorsHandler(error) 
        res.status(response.statusCode).send(response.body)
    }
}

module.exports = cards