import CommentRepository from '../repositories/comment.repository';

class CommentController {
    getComment = async (req, res) => {
        const {post_id} = req.params;
        const result = await CommentRepository.getComment(post_id);
        res.status(200).send(result);
    };

    addComment = async (req, res) => {
        const {post_id} = req.params;
        const result = await CommentRepository.addComment(req.headers, req.body, post_id);
        res.status(200).send(result);
    };

    removeComment = async (req, res) => {
        const {comment_id} = req.params;
        const result = await CommentRepository.removeComment(comment_id, req.headers);
        res.status(200).send(result);
    }
}

module.exports = new CommentController();