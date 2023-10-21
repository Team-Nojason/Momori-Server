const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const {auth} = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.post('/post', auth, awaitHandlerFactory(PostController.addPost));

module.exports = router;