const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error: 'No token provided'});
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({error: 'Token error'});
    }
    const [scheme, token] = parts;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: 'Token invalid'});
        }
        if (decoded["id"] !== req.user) {
            return res.status(401).json({error: 'Token invalid'});
        }
        next();
    });
};