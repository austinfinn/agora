const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./agora-1586910581121-5e0b7a5f1034.json')

async function connect() {
    const doc = new GoogleSpreadsheet('1p7QVbO-6HqKntbTCjH43o3DQx7EBiXKE1zDSpm5DbZ8');
    
    // use service account credentials
    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo(); // loads document properties and worksheets

    return doc
}

async function getWorksheetData(index) {
    const doc = await connect()

    return doc.sheetsByIndex[index]; // or use doc.sheetsById[id]
}


module.exports = { getWorksheetData }