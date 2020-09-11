const helper = require('../_helper/helper')
const eh = require('../../utils/errorsHandler/errorsHandler')

async function cards(req,res){
    const { bank } = req.params

    try {
        const response = await helper.getProducts(bank)
        console.log("response 0 " )
        const allProducts = response.data.data.products
        console.log("allProducts 0 " )
        const cardProducts = helper.filterForCards(allProducts)
        console.log("cardProducts 0 " )
        res.send(cardProducts)
    } catch (error) {
        const response = eh.errorsHandler(error) 
        res.status(response.statusCode).send(response.body)
    }
}

module.exports = cards