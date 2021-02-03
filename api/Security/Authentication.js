module.exports = app => {
    const jwt = require('jsonwebtoken');
    const auth = {};

    const notAuthToken = (req) => {
        return req.originalUrl === '/api/auth/login' || req.originalUrl === '/api/auth/register';
    }

    auth.tokenCheck = (req, res, next) => {
        if (notAuthToken(req)) {
            return next;
        }

        let token = req.headers.authorization.split('Bearer ')[1];

        if (!token) {
            res.status(403).send({ auth: false, message: 'O token não foi fornecido!'});
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(500).send({ auth: false, message: 'Token fornecido é inválido!' })
                }

                req.userId = decoded.id;
                next();
            });
        }
    }

    return auth.tokenCheck;
}