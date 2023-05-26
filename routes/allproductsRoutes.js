const express = require('express');
const allproductsController = require('../controllers/allproducts/allproductsController')

// Create router
const router = express.Router();

//sent all products data
router.get('/products', allproductsController.products);

module.exports = router;