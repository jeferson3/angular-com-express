const jwt = require('jsonwebtoken');

const secret = "cafecomleite";

exports.sign = function (payload) {
    return jwt.sign(payload, secret, { expiresIn: '1d' })
}
exports.verify = function(token){
    return jwt.verify(token, secret)
}
