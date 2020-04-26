const router = require('express').Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger/customizePage');

const checkCache = require('../data/redis/redis')

router.use(bodyParser.json());

// products
router.get('/v1/products/mortgages', require("./products/mortgages/mortgages"))
router.get('/v1/products/cards/:bank', require("./products/cards/cards"))

// users
router.get('/v1/users/loginCredentials', checkCache, require('./users/loginCredentials/loginCredentials'))
router.post('/v1/users/create', jsonParser, require('./users/create/create'))

// health
router.get('/v1/health/openBankingApi/:bank', require('./health/openBankingApi/openBankingApi'))

// Swagger route
let swaggerOptions = {
    customCssUrl: `/public/swaggerCustomCss.css`
}
router.use('/v1/docs', require('./utils/swagger/customizePage'), swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

module.exports = router