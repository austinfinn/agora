const swaggerDocument = require('./swagger.json')
const appPackage = require('../../../package.json')
require('dotenv').config()

function customizePage(req, res, next) {
    console.log("Got to the customizePage() ")
    console.log(" GOOGLE_SERVICE_ACCOUNT_EMAIL : ", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
    console.log(" GOOGLE_PRIVATE_KEY           : ", process.env.GOOGLE_PRIVATE_KEY)
    console.log(" GOOGLE_SHEET_ID              : ", process.env.GOOGLE_SHEET_ID)
    console.log("")
    swaggerDocument.info.version = appPackage.version

    if (global.localDevelopment){
        console.log("Running locally")
        // remove the protocol and just use the hostname
        swaggerDocument.host = global.localhost.split('//')[1]
    } 
    else {
        console.log("Running on a host")
        // remove the protocol and just use the hostname
        swaggerDocument.host = process.env.HEROKU_HOST.split('//')[1]
    }

    req.swaggerDoc = swaggerDocument;
    next();
}

module.exports = customizePage