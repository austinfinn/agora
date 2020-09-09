const google = require('google-spreadsheet');

async function connect() {
    const doc = new google.GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)

    // use service account credentials
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      });

    await doc.loadInfo(); // loads document properties and worksheets

    return doc
}

async function getWorksheetData(index) {
    const doc = await connect()

    return doc.sheetsByIndex[index]; // or use doc.sheetsById[id]
}


module.exports = { getWorksheetData }