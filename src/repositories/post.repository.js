const {AuthException} = require("../utils/exceptions/auth.exception");
const {getPayloadFromHeader} = require("../utils/jwt.util");
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const {getCurrentTime} = require("../utils/time");

class PostRepository {
    addPost = async (body, header) => {
        const {content, latitude, longitude, is_public} = body;
        const payload = await getPayloadFromHeader(header);
        const email = payload.email;

        const user = await UserModel.findByEmail(email);
        const createdPost = await PostModel.insert(content, latitude, longitude, is_public, user.user_id);
        console.log('postRepository - ', createdPost);
        return createdPost;
    }

    getPost = async (post_id) => {
        return await PostModel.findById(post_id);
    }

    getPostByUser = async (header) => {
        const payload = await getPayloadFromHeader(header);
        const {email} = payload.email;
        const user = await UserModel.findByEmail(email);
        const {user_id} = user;
        return await PostModel.findByUserId(user_id);
    }

    deleteById = async (post_id) => {
        await PostModel.deleteById(post_id);
        return 'delete success';
    }
}

module.exports = new PostRepository();