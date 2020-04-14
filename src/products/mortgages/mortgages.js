const nr = require('../../utils/networkRequests/networkRequsts')
const mySql = require('../../../database/mysql/mysql')

async function mortgages(req,res){
    try {
        const sqlQuery = `SELECT * FROM accounts`
        const dbResult = await mySql.executeQuery(sqlQuery)
        console.log("dbResult...... ", dbResult)

        res.send({message: dbResult})
    } catch (error) {
        console.log(error)
    }
}
module.exports = mortgages