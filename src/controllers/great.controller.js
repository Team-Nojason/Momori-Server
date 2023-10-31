import GreatRepository from '../repositories/great.repository'

class GreatController {
    getComment = async (req, res) => {
        const {post_id} = req.params;
        const result = await GreatRepository.getGreatByPost(post_id);
        res.status(200).send(result);
    }

    addComment = async (req, res) => {
        const {post_id} = req.params;
        const result = await GreatRepository.addGreat(req.headers, post_id);
        res.status(200).send(result);
    }

    removeComment = async (req, res) => {
        const {post_id} = req.params;
        const result = await GreatRepository.removeGreat(req.headers, post_id);
        res.status(200).send(result);
    }
}

module.exports = new GreatController();