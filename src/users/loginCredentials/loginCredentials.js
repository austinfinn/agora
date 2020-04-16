const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')
const config = require('../../config')
const { cachingTime } = config.users.loginCredentials

async function loginCredentials(req,res){
    const redisClient = req.app.locals.redis
    const key = req.path

    try {
        const sqlQuery = sql.getUserEmailsQuery()
        const dbUsers = await mySql.executeQuery(sqlQuery)

        const loginCredentials = await helper.getCredentials(dbUsers)

        // save response details to Redis
        redisClient.setex(key, cachingTime, JSON.stringify(loginCredentials))

        res.send(loginCredentials)
    } catch (error) {
        console.log(error)
    }
}
module.exports = loginCredentials