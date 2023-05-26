const express = require('express')
const addLaptopController = require('../controllers/laptop/addLaptopController')
const deleteLaptopController = require('../controllers/laptop/deleteLaptopController')
const getLaptopController = require('../controllers/laptop/getLaptopController')
const updateLaptopController = require('../controllers/laptop/updateLaptopController')
const { require_admin_auth } = require("../middleware/authMiddleware");

// Create router
const router = express.Router();

// display all laptops
router.get('/laptop', getLaptopController.laptopsPage);

// get laptop details on click
router.get('/laptop/:id', getLaptopController.laptopDetails);

// find a laptop get and  post request, any user
router.get('/find-laptop', getLaptopController.findLaptopGet);
router.post('/find-laptop', getLaptopController.findLaptopPost);

// find a laptop get and  post request, only admin
router.get('/get-laptop', require_admin_auth, getLaptopController.findLaptopGet_admin);
router.post('/manege-laptops', require_admin_auth, getLaptopController.findLaptopPost_admin);

// delete a laptop
router.get('/delete-laptop/:id', require_admin_auth, deleteLaptopController.deleteLaptop);

// add laptop get and post request
router.get('/add-laptop', require_admin_auth, addLaptopController.getLaptopForm);
router.post('/add-laptop', require_admin_auth, addLaptopController.addLaptop_post);


// update a laptop
router.get('/update-laptop/:id', require_admin_auth, updateLaptopController.updateLaptop_get)
router.post('/update-laptop/:id', require_admin_auth, updateLaptopController.updateLaptop_post);

module.exports = router;


