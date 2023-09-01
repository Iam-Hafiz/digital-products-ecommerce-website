const express = require('express')
const { getAccessories_Form, addAccessories_post } = require('../controllers/accessories/addAccessoriesController')
const { deleteAccessories } = require('../controllers/accessories/deleteAccessoriesController')
const getAccessoriesController = require('../controllers/accessories/getAccessoriesController')
const { updateAccessories_get, updateAccessories_post } = require('../controllers/accessories/updateAccessoriesController')
const { require_admin_auth } = require("../middleware/authMiddleware");

// Create router
const router = express.Router();

// display all Accessories
router.get('/Accessories', getAccessoriesController.accessories_Page);

// get Accessories details on click
router.get('/Accessories/:id', getAccessoriesController.accessories_Details);
router.get('/Accessorie/:id', getAccessoriesController.accessories_Details);

// find a Accessories get and  post request, any user
router.get('/find-Accessories', getAccessoriesController.findAccessories_Get);
router.post('/find-Accessories', getAccessoriesController.findAccessories_Post);

// find a Accessories get and  post request, only admin
router.get('/get-Accessories', require_admin_auth, getAccessoriesController.findAccessoriesGet_admin);
router.post('/manege-Accessories', require_admin_auth, getAccessoriesController.findAccessoriesPost_admin);

// delete a Accessories
router.get('/delete-Accessories/:id', require_admin_auth, deleteAccessories);

// add Accessories get and post request
router.get('/add-Accessories', require_admin_auth, getAccessories_Form);
router.post('/add-Accessories', require_admin_auth, addAccessories_post);


// update a Accessories
router.get('/update-Accessories/:id', require_admin_auth, updateAccessories_get)
router.post('/update-Accessories/:id', require_admin_auth, updateAccessories_post);

module.exports = router;


