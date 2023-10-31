import {getPayloadFromHeader} from "../utils/jwt.util";
import UserModel from '../models/user.model';
import GreatModel from '../models/great.model';
import {ApiExceptions} from "../utils/exceptions/api.exceptions";

class GreatRepository {
    addGreat = async (header, post_id) => {
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);

        const {user_id} = user;

        if (await GreatModel.existUserByPostId(user_id, post_id)) {
            throw new ApiExceptions('exist great');
        }
        await GreatModel.insert(user_id, post_id);
    };

    getGreatByPost = async (post_id) => {
        const posts = await GreatModel.findByPostId(post_id);
        const len = posts.length;
        return {
            post_id: post_id,
            count: len,
        }
    }

    removeGreat = async (header, post_id) => {
        const payload = await getPayloadFromHeader(header);
        const {email, platform_type} = payload;
        const user = await UserModel.findByEmailAndPlatformType(email, platform_type);

        const {user_id} = user;

        await GreatModel.delete(user_id, post_id);
        const len = (await GreatModel.findByPostId(post_id)).length;
        return {
            post_id: post_id,
            count: len,
        }
    }
}