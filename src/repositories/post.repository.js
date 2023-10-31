const {AuthException} = require("../utils/exceptions/auth.exception");
const {getPayloadFromHeader} = require("../utils/jwt.util");
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const {getCurrentTime} = require("../utils/time");
const {ApiExceptions} = require("../utils/exceptions/api.exceptions");
const {DISTANCE} = require("../utils/constant.util");
const distance = require("../utils/location.util");

class PostRepository {
    addPost = async (body, header) => {
        const {content, latitude, longitude, is_public} = body;
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);
        const {user_id} = user;
        const createdPost = await PostModel.insert(content, latitude, longitude, is_public, user_id);
        console.log('postRepository - ', createdPost);
        return createdPost;
    }

    getPost = async (post_id) => {
        return await PostModel.findById(post_id);
    }

    getPostByUser = async (user_id, header) => {
        if (!user_id) {
            const {email, platform_type} = await getPayloadFromHeader(header);
            const user = await UserModel.findByEmailAndPlatformType(email, platform_type);
            return await PostModel.findByUserId(user.user_id);
        }
        return await PostModel.findByUserId(user_id);
    }

    getPostByLocation = async (header, latitude, longitude) => {
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);
        const allPost = await PostModel.findAll();
        const filteredPosts = allPost
            .filter((post) => {
                (post.user_id == user.user_id || post.is_public) && distance(post.latitude, post.longitude, latitude, longitude) <= DISTANCE;
            });

        return filteredPosts;
    }

    deleteById = async (post_id, header) => {
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);
        const post = await PostModel.findById(post_id);
        if (user.user_id !== post.user_id) {
            throw new ApiExceptions('this post is not yours', 400);
        }
        await PostModel.deleteById(post_id);
        return 'delete success';
    }

    editPost = async (body, header) => {
        const {post_id, content, latitude, longitude, is_public, user_id} = body;
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);
        if (user.user_id !== user_id) {
            throw new ApiExceptions('this post is not yours', 400);
        }
        return await PostModel.update(post_id, content, latitude, longitude, is_public, user_id);
    }
}

module.exports = new PostRepository();