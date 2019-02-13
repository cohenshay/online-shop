const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

function jwtAuthenticator(req, res, next) {
    // route middleware to verify a token 

    if (req.method == "OPTIONS") {
        next();
        return null;
    }
    var token = req.headers.authorization;
    // decode token
    if (token) {
        // verifies secret and checks exp
        try {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } catch (error) {
            console.log(error)
        }


    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}


module.exports = jwtAuthenticator;