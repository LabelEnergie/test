"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseStorageUrl = getFirebaseStorageUrl;
exports.getStaticFilePath = getStaticFilePath;
exports.getUserFilePath = getUserFilePath;
exports.getBlogFilePath = getBlogFilePath;
const constants_1 = require("../constants");
const firebase_service_1 = require("../firebase/firebase.service");
async function getFirebaseStorageUrl(path) {
    const firebaseService = new firebase_service_1.FirebaseService();
    const bucket = firebaseService.storage.bucket();
    const file = bucket.file(path);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 24 * 60 * 60 * 1000,
    });
    return url;
}
function getStaticFilePath(name) {
    return `${(0, constants_1.ENV)().BASE_URL}/files/${name}`;
}
async function getUserFilePath(auth, name) {
    if (!name)
        return null;
    return await getFirebaseStorageUrl(`users/${auth.id}/${name}`);
}
async function getBlogFilePath(articleCode, fileName) {
    return await getFirebaseStorageUrl(`blog/${articleCode}/${fileName}`);
}
//# sourceMappingURL=image.js.map