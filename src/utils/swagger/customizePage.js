const swaggerDocument = require('./swagger.json')
const appPackage = require('../../../package.json')
require('dotenv').config()

function customizePage(req, res, next) {
    swaggerDocument.info.version = appPackage.version

    if (global.localDevelopment){
        // remove the protocol and just use the hostname
        swaggerDocument.host = global.localhost.split('//')[1]
        swaggerDocument.schemes = ["http","https"]
    } 
    else {
        // remove the protocol and just use the hostname
        swaggerDocument.host = process.env.HEROKU_HOST.split('//')[1]
        swaggerDocument.schemes = ["https","http"]
    }

    req.swaggerDoc = swaggerDocument;
    next();
}

module.exports = customizePage