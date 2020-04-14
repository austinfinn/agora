const mySql = require('../../../data/mysql/mysql')

async function loginDetails(req,res){
    try {
        const sqlQuery = `SELECT user_id, email, date_of_birth FROM users`
        const dbResult = await mySql.executeQuery(sqlQuery)

        res.send({
            message: dbResult
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = loginDetails