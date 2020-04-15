const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')

async function create(req,res){
    const { email, password, dateOfBirth, mothersMaidenName } = req.body

    try {
        let sqlQuery = sql.insertUser(email, dateOfBirth)
        const insertResult = await mySql.executeQuery(sqlQuery)

        res.send([
            email,
            password,
            dateOfBirth,
            mothersMaidenName
        ])
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY'){
            res.status(400).send({
                message: "You have entered a duplicate email address!"
            })
        }
    }
}
module.exports = create