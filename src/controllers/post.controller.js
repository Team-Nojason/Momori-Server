const PostRepository = require('../repositories/post.repository');

class PostController {
    addPost = async (req, res) => {
        const result = await PostRepository.addPost(req.body, req.headers);
        console.log(result)
        res.status(200).send(result);
    }
}

module.exports = new PostController();