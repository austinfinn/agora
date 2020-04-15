const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const { getUserEmailsQuery } = require('../_helper/sqlQuery')

async function loginDetails(req,res){
    try {
        const sqlQuery = getUserEmailsQuery()
        const userDetails = await mySql.executeQuery(sqlQuery)

        const loginCredentials = await helper.getLoginCredentials(userDetails)

        res.send(loginCredentials)
    } catch (error) {
        console.log(error)
    }
}
module.exports = loginDetails