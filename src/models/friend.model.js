const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');

class FriendModel {
    sendFriendRequest = async (senderId, receiverId) => {
        const checkQuery = `SELECT * FROM ${tables.FriendRequests} WHERE sender_id = ? AND receiver_id = ?`;
        const checkResult = await DBService.query(checkQuery, [senderId, receiverId]);

        if (checkResult.length > 0) {
            throw new Error('친구 요청이 이미 존재함');
        }
        const insertQuery = `INSERT INTO ${tables.FriendRequests} (sender_id, receiver_id, status) VALUES (?, ?, 'pending')`;
        return await DBService.query(insertQuery, [senderId, receiverId]);
    }

    acceptFriendRequest = async (requestId) => {
        const updateQuery = `UPDATE ${tables.FriendRequests} SET status = "accepted" WHERE id = ?`;
        await DBService.query(updateQuery, [requestId]);

        const selectQuery = `SELECT sender_id, receiver_id FROM ${tables.FriendRequests} WHERE id = ?`;
        const result = await DBService.query(selectQuery, [requestId]);

        const senderId = result[0].sender_id;
        const receiverId = result[0].receiver_id;

        const insertQuery = `INSERT INTO ${tables.FriendShips} (user1_id, user2_id) VALUES (?, ?)`;
        await DBService.query(insertQuery, [senderId, receiverId]);
    }

    deleteFriendRequest = async (requestId) => {
        const updateQuery = `UPDATE ${tables.FriendRequests} SET status = "rejected" WHERE id = ?`;
        await DBService.query(updateQuery, [requestId]);
    }

    deleteFriend = async (user1Id, user2Id) => {
        const deleteQuery = `DELETE FROM ${tables.FriendShips} WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)`;
        await DBService.query(deleteQuery, [user1Id, user2Id, user2Id, user1Id]);
    }

    getReceivedFriendRequests = async (userId) => {
        const query = `SELECT * FROM ${tables.FriendRequests} WHERE receiver_id = ?`;
        return await DBService.query(query, [userId]);
    }

    getSentFriendRequests = async (userId) => {
        const query = `SELECT * FROM ${tables.FriendRequests} WHERE sender_id = ?`;
        return await DBService.query(query, [userId]);
    }

    getFriends = async (userId) => {
        const query = `SELECT u.id, u.nickname u.bj_id u.intro u.goal FROM ${tables.User} u JOIN ${tables.FriendShips} f ON (u.id = f.user1_id AND f.user2_id = ?) OR (u.id = f.user2_id AND f.user1_id = ?)`;
        return await DBService.query(query, [userId, userId]);
    }
}

module.exports = new FriendModel();
