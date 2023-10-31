import CommentModel from '../models/comment.model'
import {getPayloadFromHeader} from "../utils/jwt.util";
import UserModel from '../models/user.model'
import {ApiExceptions} from "../utils/exceptions/api.exceptions";

class CommentRepository {
    getComment = async (postId) => {
        const comments = await CommentModel.findByPostId(postId);
        return comments;
    }

    addComment = async (header, body) => {
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);

        const {user_id} = user;
        const {comment, post_id} = body;

        await CommentModel.insert(comment, post_id, user_id);

        return 'add success';
    }

    removeComment = async (commentId, header) => {
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);

        const {user_id} = user;

        if (user_id != commentId.user_id) {
            throw new ApiExceptions('is not yours');
        }

        await CommentModel.delete(commentId);

        return 'remove success';
    }
}