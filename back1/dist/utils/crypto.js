"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const crypto_1 = require("crypto");
const jwt = require("jsonwebtoken");
const constants_1 = require("../constants");
function hash(password) {
    return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
}
async function createToken(auth) {
    return new Promise((resolve, reject) => {
        jwt.sign(auth, (0, constants_1.ENV)().JWT_SECRET || 'default_secret', {
            expiresIn: parseInt((0, constants_1.ENV)().JWT_EXPIRES_IN) || 604800
        }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
}
async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, (0, constants_1.ENV)().JWT_SECRET, (err, decoded) => {
            if (err)
                reject(err);
            resolve(decoded);
        });
    });
}
//# sourceMappingURL=crypto.js.map