const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')

async function loginCredentials(req,res){
    try {
        const sqlQuery = sql.getUserEmailsQuery()
        const dbUsers = await mySql.executeQuery(sqlQuery)

        const loginCredentials = await helper.getCredentials(dbUsers)

        res.send(loginCredentials)
    } catch (error) {
        console.log(error)
    }
}
module.exports = loginCredentials