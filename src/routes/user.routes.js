const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.post('/login', awaitHandlerFactory(UserController.loginUser));
router.post('/refresh', awaitHandlerFactory(UserController.refresh));
router.post('/a', awaitHandlerFactory(UserController.a));


module.exports = router;