const User = require('../models/user.model');
const { verify } = require('../config/jwt.config');

authMiddleware = async (req, res, next) => {
    
    try {
        const [, token] = req.headers.authorization.split(' ');
        
        let payload = verify(token);

        await User.findOne({ where: { id: payload.user } }).then(data => {
            req.auth = data;
            next();

        }).catch(error => {
            return res.status(401).json({ status: 'invalid token' })
        })

    } catch (error) {
        res.status(401).json({ error: error.name, message: error.message })
    }

}

module.exports = authMiddleware;