exports.baseResponse = (data, code, message) => {
    return {
        code: code,
        message: message,
        data: data
    };
};