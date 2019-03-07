var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, config.constants.SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'UNAUTHORIZED_ACCESS'
        });
    }
};