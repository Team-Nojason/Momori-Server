const PostRepository = require('../repositories/post.repository');

class PostController {
    addPost = async (req, res) => {
        const result = await PostRepository.addPost(req.body, req.headers);
        console.log(result);
        res.status(200).send(result);
    }

    getPost = async (req, res) => {
        const result = await PostRepository.getPost(req.params.post_id);
        console.log(result);
        res.status(200).send(result);
    }

    getPostByUser = async (req, res) => {
        const result = await PostRepository.getPostByUser(req.headers);
        console.log(result);
        res.status(200).send(result);
    }

    delete = async (req, res) => {
        const {latitude, longitude} = req.query;
        console.log(latitude, longitude);
        const result = await PostRepository.deleteById(req.params.post_id, req.headers);
        console.log(result);
        res.status(200).send(result);
    }

    editPost = async (req, res) => {
        const result = await PostRepository.editPost(req.body, req.headers);
        console.log(result);
        res.status(200).send(result);
    }
}

module.exports = new PostController();