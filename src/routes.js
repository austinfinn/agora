const router = require('express').Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger/routeHandler');

router.use(bodyParser.json());

// products
router.get('/v1/products/mortgages', require("./products/mortgages/mortgages"))
router.get('/v1/products/cards', require("./products/cards/cards"))

// users
router.get('/v1/users/loginCredentials', require('./users/loginCredentials/loginCredentials'))
router.post('/v1/users/create', jsonParser, require('./users/create/create'))

// Swagger route
router.use('/v1/docs', require('./utils/swagger/routeHandler'), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router