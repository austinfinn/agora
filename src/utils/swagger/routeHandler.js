const swaggerDocument = require('../../../swagger.json')
const appPackage = require('../../../package.json')

function customizeSwaggerPage(req, res, next) {
    swaggerDocument.info.version = appPackage.version

    req.swaggerDoc = swaggerDocument;
    next();
}

module.exports = customizeSwaggerPage