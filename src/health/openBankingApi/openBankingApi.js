const eh = require('../../utils/errorsHandler/errorsHandler')
const nr = require('../../utils/networkRequests/networkRequests')
const utils = require('../../utils/utils')

async function openBankingApi(req,res){
    const { bank } = req.params
    let status = ""

    try {
        const url = utils.getProductsUrl(bank)
        const result = await nr.getRequest(url)
        
        if(result.status == 200){
            status = 'UP'
        } else {
            status = 'DOWN'
        }

        res.send({
            message: status
        })
    } catch (error) {
        const response = eh.errorsHandler(error) 
        res.status(response.statusCode).send(response.body)
    }
}

module.exports = openBankingApi