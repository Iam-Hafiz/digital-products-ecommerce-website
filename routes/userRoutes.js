const express = require('express')
const  signupController = require('../controllers/user/signupController')
const  newsLetterController = require('../controllers/user/newsletterController')
const  { login_get, login_post, logout_get} = require('../controllers/user/authController')
const  { user_dashboard_get, admin_panel_get } = require('../controllers/user/dashboardController')
const  { require_admin_auth, require_user_auth} = require("../middleware/authMiddleware")

// Create router
const router = express.Router();

router.get('/signup', signupController.signup_get);
router.post('/signup', signupController.signup_post);

router.get('/login', login_get);
router.post('/login', login_post);

router.get('/user-dashboard', require_user_auth, user_dashboard_get);
router.get('/admin-panel', require_admin_auth, admin_panel_get);

router.get('/logout', logout_get);

router.post('/newsletter', newsLetterController);

module.exports = router;