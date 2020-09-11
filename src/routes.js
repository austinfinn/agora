const router = require('express').Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger/customizePage');

const checkCache = require('../data/redis/redis')

router.use(bodyParser.json());

console.log(" Got to 0 ")
// products
router.get('/v1/products/cards/:bank', require("./products/cards/cards"))
console.log(" Got to 1 ")
// users
router.get('/v1/users/loginCredentials', checkCache, require('./users/loginCredentials/loginCredentials'))
router.post('/v1/users/create', jsonParser, require('./users/create/create'))
console.log(" Got to 2 ")
// health
router.get('/v1/health/openBankingApi/:bank', require('./health/openBankingApi/openBankingApi'))
console.log(" Got to 3 ")
// Swagger route
let swaggerOptions = {
    customCssUrl: `/public/swaggerCustomCss.css`
}
console.log(" Got to 4 ")
router.use('/v1/docs', require('./utils/swagger/customizePage'), swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
console.log(" Got to 5 ")
module.exports = router