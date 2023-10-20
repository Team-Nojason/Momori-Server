const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {auth} = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.post('/', auth, awaitHandlerFactory(UserController.registerUser));
router.post('/login', auth, awaitHandlerFactory(UserController.loginUser));

module.exports = router;