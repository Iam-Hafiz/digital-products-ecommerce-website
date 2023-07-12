const express = require('express')
const { getSmartphone_Form, addSmartphone_post } = require('../controllers/smartphone/addSmartphoneController')
const { deleteSmartphone } = require('../controllers/smartphone/deleteSmartphoneController')
const getSmartphoneController = require('../controllers/smartphone/getSmartphoneController')
const { updateSmartphone_get, updateSmartphone_post } = require('../controllers/smartphone/updateSmartphoneController')
const { require_admin_auth } = require("../middleware/authMiddleware");

// Create router
const router = express.Router();

// display all smartphones
router.get('/smartphone', getSmartphoneController.smartphone_Page);

// get smartphone details on click
router.get('/smartphone/:id', getSmartphoneController.smartphone_Details);

// find a smartphone get and  post request, any user
router.get('/find-smartphone', getSmartphoneController.findSmartphone_Get);
router.post('/find-smartphone', getSmartphoneController.findSmartphone_Post);

// find a smartphone get and  post request, only admin
router.get('/get-smartphone', require_admin_auth, getSmartphoneController.findSmartphoneGet_admin);
router.post('/manege-smartphones', require_admin_auth, getSmartphoneController.findSmartphonePost_admin);

// delete a smartphone
router.get('/delete-smartphone/:id', require_admin_auth, deleteSmartphone);

// add smartphone get and post request
router.get('/add-smartphone', require_admin_auth, getSmartphone_Form);
router.post('/add-smartphone', require_admin_auth, addSmartphone_post);


// update a smartphone
router.get('/update-smartphone/:id', require_admin_auth, updateSmartphone_get)
router.post('/update-smartphone/:id', require_admin_auth, updateSmartphone_post);

module.exports = router;


