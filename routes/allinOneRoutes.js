const express = require('express');
const allinOneController = require('../controllers/allinOne/allinOneController')

// Create router
const router = express.Router();

//all in one page
router.get('/all-inOne', allinOneController.allinOnePage);

//all in one details
router.get('/all-inOne/details/:id', allinOneController.allinOneDetails);

module.exports = router;