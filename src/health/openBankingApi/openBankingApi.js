const eh = require('../../utils/errorsHandler/errorsHandler')
const nr = require('../../utils/networkRequests/networkRequests')
const utils = require('../../utils/utils')

async function openBankingApi(req,res){
    const { bank } = req.params

    try {
        const url = utils.getProductsUrl(bank)

        // if this doesn't throw an error i.e. response has a status code of 200, assume endpoint is UP
        await nr.getRequest(url)
    
        res.send({
            message: "UP"
        })
    } catch (error) {
        // if an error is thrown and it contains a Repsonse status code then assume the endpoint is DOWN
        if(error.response.status){
            res.status(200).send({
                message: "DOWN"
            })
        } else {
            const response = eh.errorsHandler(error) 
            res.status(response.statusCode).send(response.body)
        }
    }
}

module.exports = openBankingApi