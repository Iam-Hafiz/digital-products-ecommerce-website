const express = require('express')
const contactController = require('../controllers/user/contactController')
const mainController = require('../controllers/main/mainController')

// Create router
const router = express.Router();

// home page is in laptop routes
router.get('/', mainController.home);

router.get('/delivery', mainController.delivery);

router.get('/return-product', mainController.return_product);

router.get('/about', mainController.about);

router.get('/login', mainController.login_page);

router.get('/createUser', mainController.createUser);

router.get('/cart', mainController.cart);

router.get('/contact', mainController.contact_page);

router.post('/contact', contactController);

router.get('/privacy-terms', mainController.privacy_terms);

module.exports = router;

