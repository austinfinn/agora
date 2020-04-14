let router = require('express').Router()

// products
router.get('/v1/products/mortgages', require("./products/mortgages/mortgages"))
router.get('/v1/products/cards', require("./products/cards/cards"))

module.exports = router