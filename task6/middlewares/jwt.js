import jwt from 'jsonwebtoken';
import config from '../config';

const whiteList = ['/user/login'];

const jwtMiddleware = (req, res, next) => {
    const path = req.originalUrl;
    if (whiteList.includes(path)) {
        next();
        return;
    }
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).send();
        return;
    }
    try {
        const token = authorization.substr(7);
        jwt.verify(token, config.jwtSecret);
    } catch (err) {
        res.status(403).send();
        return;
    }

    next();
};

export default jwtMiddleware;
