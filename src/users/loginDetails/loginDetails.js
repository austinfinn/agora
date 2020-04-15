const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')

async function loginDetails(req,res){
    try {
        const sqlQuery = sql.getUserEmailsQuery()
        const dbUsers = await mySql.executeQuery(sqlQuery)

        const loginCredentials = await helper.getLoginCredentials(dbUsers)

        res.send(loginCredentials)
    } catch (error) {
        console.log(error)
    }
}
module.exports = loginDetails