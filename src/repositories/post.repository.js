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
        const createdPost = await PostModel.insert(content, getCurrentTime(), latitude, longitude, is_public, user.user_id);
        console.log('postRepository - ', createdPost);
        return createdPost;
    }
}

module.exports = new PostRepository();