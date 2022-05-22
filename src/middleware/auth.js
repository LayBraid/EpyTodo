const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    const parts = authHeader.split(' ')[0];
    jwt.verify(parts, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({msg: 'Token is not valid'});
        }
        req.id = decoded["id"]
        next();
    });
};