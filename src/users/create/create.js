const mySql = require('../../../data/mysql/mysql')
const helper = require('../_helper/helper')
const sql = require('../_helper/sqlQuery')
const eh = require('../../utils/errorsHandler/errorsHandler')

async function create(req,res){
    const { email, password, dateOfBirth, mothersMaidenName } = req.body

    try {
        // insert the new user into the db
        let sqlQuery = sql.insertUser(email, dateOfBirth)
        await mySql.executeQuery(sqlQuery)

        // get the 'user_id' for the newly create user
        sqlQuery = sql.selectUserIdByEmail(email)
        const dbResult = await mySql.executeQuery(sqlQuery)
        const { userId } = dbResult[0]

        // save important login details for test accounts to the Google Sheets doc
        await helper.saveUserDetailsToGoogleSheets(userId, password, mothersMaidenName)

        res.send({
            message: "Success!! Your new user has been saved to the Database and Google Sheets doc."
        })
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY'){
            res.status(400).send({
                message: "You have entered a duplicate email address!"
            })
        } else {
            const response = eh.errorsHandler(error) 
            res.status(response.statusCode).send(response.body)
        }
    }
}
module.exports = create