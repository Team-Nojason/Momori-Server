const express = require('express');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {auth} = require("../middleware/auth.middleware");

// auth
const authRouter = express.Router();
const AuthController = require("../controllers/auth.controller")
authRouter.post('/login', awaitHandlerFactory(AuthController.login));
authRouter.post('/check', auth, awaitHandlerFactory(AuthController.check));
authRouter.post('/refresh', awaitHandlerFactory(AuthController.refresh));
authRouter.post('/join', awaitHandlerFactory(AuthController.join));

// post
const postRouter = express.Router();
const PostController = require("../controllers/post.controller");
postRouter.post('/', auth, awaitHandlerFactory(PostController.addPost));
postRouter.get('/user/:user_id', auth, awaitHandlerFactory(PostController.getPostByUser));
postRouter.get('/:post_id', auth, awaitHandlerFactory(PostController.getPost));
postRouter.get('/location', auth, awaitHandlerFactory(PostController.getPostByLocation));
postRouter.delete('/:post_id', auth, awaitHandlerFactory(PostController.delete));
postRouter.put('/', auth, awaitHandlerFactory(PostController.editPost));

// comment
const commentRouter = express.Router();
const CommentController = require('../controllers/comment.controller');
commentRouter.get('/post/:post_id', auth, awaitHandlerFactory(CommentController.getComment));
commentRouter.post('/post/:post_id', auth, awaitHandlerFactory(CommentController.addComment));
commentRouter.delete('/:comment_id', auth, awaitHandlerFactory(CommentController.removeComment));

// great
const greatRouter = express.Router();
const GreatController = require('../controllers/great.controller');
greatRouter.get('t/:post_id', auth, awaitHandlerFactory(GreatController.getComment));
greatRouter.post('/:post_id', auth, awaitHandlerFactory(GreatController.addComment));
greatRouter.delete('/:post_id', auth, awaitHandlerFactory(GreatController.removeComment));


module.exports = {authRouter, postRouter, commentRouter, greatRouter};