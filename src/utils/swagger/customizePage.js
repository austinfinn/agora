const swaggerDocument = require('./swagger.json')
const appPackage = require('../../../package.json')
require('dotenv').config()

function customizePage(req, res, next) {
    swaggerDocument.info.version = appPackage.version
    swaggerDocument.host = `localhost:${process.env.PORT}`

    req.swaggerDoc = swaggerDocument;
    next();
}

module.exports = customizePage