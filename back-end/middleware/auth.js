const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.get('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const admin = (req, res, next) => {
    if (!req.user.isAdmin) {
        console.log("User not adming?");
        return res.status(403).send({ error: 'Access denied.' });
    }
    next();
};

module.exports = { auth, admin };
