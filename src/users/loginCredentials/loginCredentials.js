const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')

async function loginCredentials(req,res){
    const redisClient = req.app.locals.redis

    try {
        const sqlQuery = sql.getUserEmailsQuery()
        const dbUsers = await mySql.executeQuery(sqlQuery)

        const loginCredentials = await helper.getCredentials(dbUsers)

        // save details to Redis
        redisClient.setex(req.path, 15, JSON.stringify(loginCredentials))

        res.send(loginCredentials)
    } catch (error) {
        console.log(error)
    }
}
module.exports = loginCredentials