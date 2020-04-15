const googlesheets = require('../../../data/googlesheets/googlesheet')

async function getCredentials(dbUsers) {
    const credentials = []
    const sheetsUsers = await getPasswordsFromGooglesheets()
 
    dbUsers.map(dbUser => {
        sheetsUsers.map(sheetUser => {
            // if both lists have the same user_id, then we have a match!
            if(dbUser.user_id == sheetUser.userId){
                // add each user's login credentails to an array
                credentials.push({
                    email: dbUser.email,
                    password: sheetUser.password
                })
            }
        })
    })
    return credentials
}

async function getPasswordsFromGooglesheets(){
    const sheet = await googlesheets.getWorksheetData(0)
    const rows = await sheet.getRows();
    const records = []

    rows.map(row => {
        // add each user/password to an array
        records.push({
            userId: row.userId,
            password: row.password
        })
    })
    return records
}

async function saveUserDetailsToGoogleSheets(userId, password, mothersMaidenName) {
    const sheet = await googlesheets.getWorksheetData(0)

    sheet.addRow({
        userId: userId,
        password: password,
        mothersMaidenName: mothersMaidenName
    })
}

module.exports = { getCredentials, saveUserDetailsToGoogleSheets }