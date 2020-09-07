const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')
const eh = require('../../utils/errorsHandler/errorsHandler')
const config = require('../../config')
const { cacheExpirationTime } = config.users.loginCredentials

async function loginCredentials(req,res){
    const redisClient = req.app.locals.redis
    const key = req.path

    try {
        const sqlQuery = sql.selectEmailAndUserId()
        console.log("sqlQuery ----> ", sqlQuery)
        const dbUsers = await mySql.executeQuery(sqlQuery)
        console.log("dbUsers ------> ", dbUsers)

        const loginCredentials = await helper.getCredentials(dbUsers)
        console.log("loginCredentials ------> ", loginCredentials)
        // save response details to Redis
        redisClient.setex(key, cacheExpirationTime, JSON.stringify(loginCredentials))

        res.send(loginCredentials)
    } catch (error) {
        const response = eh.errorsHandler(error) 
        res.status(response.statusCode).send(response.body)
    }
}
module.exports = loginCredentials