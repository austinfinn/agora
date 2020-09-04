const swaggerDocument = require('./swagger.json')
const appPackage = require('../../../package.json')
require('dotenv').config()

function customizePage(req, res, next) {
    swaggerDocument.info.version = appPackage.version
    swaggerDocument.host = `localhost:${process.env.PORT}`

    console.log(" swaggerDocument.host: ", swaggerDocument.host)

    req.swaggerDoc = swaggerDocument;
    next();
}

module.exports = customizePage