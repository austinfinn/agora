const swaggerDocument = require('./swagger.json')
const appPackage = require('../../../package.json')

function customizePage(req, res, next) {
    swaggerDocument.info.version = appPackage.version

    req.swaggerDoc = swaggerDocument;
    next();
}

module.exports = customizePage