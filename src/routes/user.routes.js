const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {auth} = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/user-id', auth, awaitHandlerFactory(userController.getUserById));
router.get('/user-bjId', auth, awaitHandlerFactory(userController.getUserByBjId));
router.get('/user-nickName', auth, awaitHandlerFactory(userController.getUserByNickName));
router.get('/users', auth, awaitHandlerFactory(userController.getUsers));
// router.post('/user', Jwt.authenticateToken, userController.saveUser);
// router.delete('/user-id', Jwt.authenticateToken, userController.deleteById);
// router.delete('/user-bjId', Jwt.authenticateToken, userController.deleteByBjId);
// router.delete('/user-nickName', Jwt.authenticateToken, userController.deleteByNickName);

module.exports = router;