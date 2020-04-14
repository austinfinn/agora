let router = require('express').Router()

// products
router.get('/v1/products/mortgages', require("./products/mortgages/mortgages"))

module.exports = router