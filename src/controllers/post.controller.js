const PostRepository = require('../repositories/post.repository');

class PostController {
    addPost = async (req, res) => {
        await PostRepository.addPost(req.body, req.headers);
        res.status(200).send('result');
    }
}

module.exports = new PostController();