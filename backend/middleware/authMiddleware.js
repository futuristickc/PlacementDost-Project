const jwt = require('jsonwebtoken');


const authMiddleware = (requiredRole) => (req, res, next)  => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if(requiredRole && req.user.role !== requiredRole) {
            return res.status(401).json({ error: 'Access denied' });
        }
        next();
    } catch (error) {
        console.log('Token verification error:', error.message);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;