const {AuthException} = require("../utils/exceptions/auth.exception");
const {getTokenFromHeader} = require("../utils/jwt.util");
const PostModel = require('../models/post.model')

class PostRepository {
    addPost = async (body, header) => {
        const {content} = body;
        const payload = await getTokenFromHeader(header);
        const email = payload.email;

        console.log('addpost- ', email)

        await PostModel.insert(content);
        return 'success - ' + email;
    }
}

module.exports = new PostRepository();