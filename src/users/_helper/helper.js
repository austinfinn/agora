const googlesheets = require('../../../data/googlesheets/googlesheet')

async function getLoginCredentials(dbUsers) {
    const loginCredentials = []
    const sheetsUsers = await getPasswordsFromGooglesheets()
 
    dbUsers.map(dbUser => {
        sheetsUsers.map(sheetUser => {
            // if both lists have the same user_id, then we have a match!
            if(dbUser.user_id == sheetUser.user_id){
                // add each users login credentails to an array
                loginCredentials.push({
                    email: dbUser.email,
                    password: sheetUser.password
                })
            }
        })
    })
    return loginCredentials
}

async function getPasswordsFromGooglesheets(){
    const sheet = await googlesheets.getWorksheetData(0)
    const rows = await sheet.getRows();
    const records = []

    rows.map(row => {
        // add each user/password to an array
        records.push({
            user_id: row.user_id,
            password: row.password
        })
    })
    return records
}

module.exports = { getLoginCredentials }