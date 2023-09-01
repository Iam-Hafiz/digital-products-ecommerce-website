const express = require('express');
const monitorController = require('../controllers/monitor/monitorController')

// Create router
const router = express.Router();

//monitor page
router.get('/monitor', monitorController.monitorPage);

//monitor details
router.get('/monitor/:id', monitorController.monitorDetails);

module.exports = router;