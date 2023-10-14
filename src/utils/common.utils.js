exports.structureResponse = (body, success, message) => {
    return {
        headers: {success, message},
        body: body
    };
};