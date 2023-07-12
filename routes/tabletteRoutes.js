const express = require('express')
const { getTablette_Form, addTablette_post } = require('../controllers/tablette/addTabletteController')
const { deleteTablette } = require('../controllers/tablette/deleteTabletteController')
const getTabletteController = require('../controllers/tablette/getTabletteController')
const { updateTablette_get, updateTablette_post } = require('../controllers/tablette/updateTabletteController')
const { require_admin_auth } = require("../middleware/authMiddleware");

// Create router
const router = express.Router();

// display all tablettes
router.get('/tablette', getTabletteController.tablettes_Page);

// get tablette details on click
router.get('/tablette/:id', getTabletteController.tablette_Details);

// find a tablette get and  post request, any user
router.get('/find-tablette', getTabletteController.findTablette_Get);
router.post('/find-tablette', getTabletteController.findTablette_Post);

// find a tablette get and  post request, only admin
router.get('/get-tablette', require_admin_auth, getTabletteController.findTabletteGet_admin);
router.post('/manege-tablettes', require_admin_auth, getTabletteController.findTablettePost_admin);

// delete a tablette
router.get('/delete-tablette/:id', require_admin_auth, deleteTablette);

// add tablette get and post request
router.get('/add-tablette', require_admin_auth, getTablette_Form);
router.post('/add-tablette', require_admin_auth, addTablette_post);


// update a tablette
router.get('/update-tablette/:id', require_admin_auth, updateTablette_get)
router.post('/update-tablette/:id', require_admin_auth, updateTablette_post);

module.exports = router;


