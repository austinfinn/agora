const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')

async function create(req,res){
    const { email, password, dateOfBirth, mothersMaidenName } = req.body

    try {
        res.send([
            email,
            password,
            dateOfBirth,
            mothersMaidenName
        ])
    } catch (error) {
        console.log(error)
    }
}
module.exports = create