const express = require('express')
const  { Save_order} = require('../controllers/user/orderController')
const  { require_user_auth } = require("../middleware/authMiddleware")

// Create router
const router = express.Router();
router.post('/order', require_user_auth, Save_order);

module.exports = router;

