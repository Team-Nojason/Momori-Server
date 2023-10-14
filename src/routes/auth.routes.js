const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.post('/in', awaitHandlerFactory(authController.signIn));
router.post('/up', awaitHandlerFactory(authController.signUp));
router.post('/check-duplicate-bjId/:bjId', awaitHandlerFactory(authController.checkDuplicateBjId));
router.post('/check-duplicate-nickName/:nickName', awaitHandlerFactory(authController.checkDuplicateNickName));
router.post('/access-token', awaitHandlerFactory(authController.getAccessToken));

module.exports = router;