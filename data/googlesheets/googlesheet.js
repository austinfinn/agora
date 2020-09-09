const google = require('google-spreadsheet');

async function connect() {
    console.log("GOOGLE_SHEET_ID              : ",process.env.GOOGLE_SHEET_ID)
    console.log("GOOGLE_SERVICE_ACCOUNT_EMAIL : ",process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
    console.log("GOOGLE_PRIVATE_KEY           : ",process.env.GOOGLE_PRIVATE_KEY)
    
    const doc = new google.GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)
    console.log("The doc value is            : ", doc)

    console.log("got to here 0")
    // use service account credentials
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      });

    console.log("got to here 1")
    
    await doc.loadInfo(); // loads document properties and worksheets

    return doc
}

async function getWorksheetData(index) {
    const doc = await connect()

    return doc.sheetsByIndex[index]; // or use doc.sheetsById[id]
}


module.exports = { getWorksheetData }