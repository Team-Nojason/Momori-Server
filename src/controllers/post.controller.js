const PostRepository = require('../repositories/post.repository');
const {decodePayload} = require("../utils/jwt.util");

class PostController {
    addPost = async (req, res) => {
        const result = await PostRepository.addPost(req.body, req.header);
        res.send(result);
    }
}

module.exports = new PostController();