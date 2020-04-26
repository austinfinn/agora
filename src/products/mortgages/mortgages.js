const helper = require('../_helper/helper')
const eh = require('../../utils/errorsHandler/errorsHandler')

async function mortgages(req,res){
    const { bank } = req.params

    try {
        const response = await helper.getProducts(bank)
        const allProducts = response.data.data.products

        const mortgageProducts = helper.filterForMortgages(allProducts)

        res.send(mortgageProducts)
    } catch (error) {
        const response = eh.errorsHandler(error) 
        res.status(response.statusCode).send(response.body)
    }
}
module.exports = mortgages