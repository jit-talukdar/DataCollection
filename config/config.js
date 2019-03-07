var jwt = require('jsonwebtoken');
var JWT_SECRET_KEY = "E9HPnHSKH3";

exports.createToken = (userid) => {
    var token = jwt.sign({"userID": userid}, JWT_SECRET_KEY);
    return token;
};

exports.constants = {
    SECRET_KEY: function() {
        return JWT_SECRET_KEY;
    }
};