const express = require('express')
const { getProducts}  = require('../controllers/getProducts/getProductsController')

// Create router
const router = express.Router();

router.get('/products', getProducts);

module.exports = router;
