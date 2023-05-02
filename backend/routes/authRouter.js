const express = require('express')
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const { login, currentUser, register } = require('../controllers/authController')


router.route('/login').post(login)

router.route('/currentUser').get(isAuthenticatedUser, currentUser)

router.route('/admin/register').post(register);


module.exports = router;
