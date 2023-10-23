const express = require('express');
const authRouter = express.Router();
const postRouter = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {auth} = require("../middleware/auth.middleware");
const AuthController = require("../controllers/auth.controller")
const PostController = require("../controllers/post.controller");

// auth
authRouter.post('/login', awaitHandlerFactory(AuthController.login));
authRouter.post('/check', auth, awaitHandlerFactory(AuthController.check));
authRouter.post('/refresh', awaitHandlerFactory(AuthController.refresh));
authRouter.post('/join', awaitHandlerFactory(AuthController.join));

// post
postRouter.post('/', auth, awaitHandlerFactory(PostController.addPost));


module.exports = {authRouter, postRouter};