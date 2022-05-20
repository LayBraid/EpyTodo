const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error: 'No token provided'});
    }
    const parts = authHeader.split(' ')[0];
    jwt.verify(parts, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: 'Invalid token'});
        }
        req.id = decoded["id"]
        next();
    });
};