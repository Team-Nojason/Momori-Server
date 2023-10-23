const express = require('express');
const userRouter = express.Router();
const postRouter = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {auth} = require("../middleware/auth.middleware");
const AuthController = require("../controllers/auth.controller")
const PostController = require("../controllers/post.controller");

// auth
userRouter.post('/login', awaitHandlerFactory(AuthController.login));
userRouter.post('/check', auth, awaitHandlerFactory(AuthController.check));
userRouter.post('/refresh', awaitHandlerFactory(AuthController.refresh));
userRouter.post('/join', awaitHandlerFactory(AuthController.join));

// post
postRouter.post('/', auth, awaitHandlerFactory(PostController.addPost));


module.exports = {userRouter, postRouter};