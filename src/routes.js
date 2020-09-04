const router = require('express').Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger/customizePage');

const checkCache = require('../data/redis/redis')

router.use(bodyParser.json());
console.log(" Log: 0 ")
// products
router.get('/v1/products/cards/:bank', require("./products/cards/cards"))
console.log(" Log: 1 ")

// users
console.log(" Log: 2 ")
router.get('/v1/users/loginCredentials', checkCache, require('./users/loginCredentials/loginCredentials'))
console.log(" Log: 3 ")
router.post('/v1/users/create', jsonParser, require('./users/create/create'))

// health
console.log(" Log: 4 ")
router.get('/v1/health/openBankingApi/:bank', require('./health/openBankingApi/openBankingApi'))

// Swagger route
console.log(" Log: 5 ")
let swaggerOptions = {
    customCssUrl: `/public/swaggerCustomCss.css`
}
console.log(" Log: 6 ")
router.use('/v1/docs', require('./utils/swagger/customizePage'), swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
console.log(" Log: 7 ")

module.exports = router