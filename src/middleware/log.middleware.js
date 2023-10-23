const {getCurrentTime} = require("../utils/time");
log = (req, res, next) => {
    console.log('REQUEST - time:', getCurrentTime());
    console.log('REQUEST - path:', req.path);
    console.log('REQUEST - body:', req.body);
    console.log('REQUEST - header:', req.headers);
    console.log('REQUEST - params:', req.params);

    return next();
};

module.exports = {log};
