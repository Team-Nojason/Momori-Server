const {AuthException} = require("../utils/exceptions/auth.exception");
const {getPayloadFromHeader} = require("../utils/jwt.util");
const PostModel = require('../models/post.model')

class PostRepository {
    addPost = async (body, header) => {
        const {content} = body;
        const payload = await getPayloadFromHeader(header);
        console.log('postrespoitory-addpost-payload-', payload)
        const email = payload.email;

        console.log('addpost -', email);

        await PostModel.insert(content);
    }
}

module.exports = new PostRepository();