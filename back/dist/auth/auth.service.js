"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
exports.formatRowToUser = formatRowToUser;
const common_1 = require("@nestjs/common");
const crypto_1 = require("../utils/crypto");
const error_1 = require("../utils/error");
const firebase_service_1 = require("../firebase/firebase.service");
const sendEmail_1 = require("../utils/sendEmail");
let AuthService = class AuthService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async verifyAuthTokenData({ id, email, password, }) {
        try {
            const userDoc = await this.firebaseService.firestore
                .collection('users')
                .doc(id)
                .get();
            if (!userDoc.exists) {
                return null;
            }
            const userData = userDoc.data();
            return {
                id: userDoc.id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                photo: userData.photo || null,
                address: userData.address,
                isAdmin: userData.isAdmin || false,
            };
        }
        catch (error) {
            return null;
        }
    }
    async updateMe(auth, { address, email, firstName, lastName, photo, }) {
        try {
            await this.firebaseService.firestore
                .collection('users')
                .doc(auth.id)
                .update({
                email,
                firstName,
                lastName,
                address,
                photo,
                updatedAt: new Date(),
            });
            return this.verifyAuthTokenData({ id: auth.id, email, password: '' });
        }
        catch (error) {
            (0, error_1.throwError)('Impossible de modifier les informations', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login({ email, password }) {
        try {
            const userRecord = await this.firebaseService.auth
                .getUserByEmail(email.toLowerCase());
            const customToken = await this.firebaseService.auth
                .createCustomToken(userRecord.uid);
            const userDoc = await this.firebaseService.firestore
                .collection('users')
                .doc(userRecord.uid)
                .get();
            if (!userDoc.exists) {
                (0, error_1.throwError)('Email ou mot de passe incorrect', common_1.HttpStatus.BAD_REQUEST);
                return null;
            }
            return await (0, crypto_1.createToken)({
                id: userRecord.uid,
                email: userRecord.email,
                password: customToken
            });
        }
        catch (error) {
            console.error('Login error:', error);
            (0, error_1.throwError)('Email ou mot de passe incorrect', common_1.HttpStatus.BAD_REQUEST);
            return null;
        }
    }
    async signup({ email, password, address, firstName, lastName, }) {
        try {
            const userRecord = await this.firebaseService.auth.createUser({
                email: email.trim().toLowerCase(),
                password,
                displayName: `${firstName} ${lastName}`,
            });
            await this.firebaseService.firestore
                .collection('users')
                .doc(userRecord.uid)
                .set({
                email: email.trim().toLowerCase(),
                firstName,
                lastName,
                address,
                createdAt: new Date(),
            });
            return this.login({ email, password });
        }
        catch (error) {
            if (error.code === 'auth/email-already-exists') {
                (0, error_1.throwError)('Cet email est déjà pris', common_1.HttpStatus.CONFLICT);
            }
            throw error;
        }
    }
    async receivedPasswordForgottenCode(body) {
        try {
            const userRecord = await this.firebaseService.auth.getUserByEmail(body.email);
            if (!userRecord)
                return;
            const resetLink = await this.firebaseService.auth.generatePasswordResetLink(body.email);
            await (0, sendEmail_1.sendResetPasswordEmail)(body.email, resetLink);
        }
        catch (error) {
            console.error('Password reset error:', error);
        }
    }
    async changeForgottenPassword({ code, email, password, }) {
        try {
            await this.firebaseService.auth.updateUser(email, {
                password: password,
            });
        }
        catch (error) {
            (0, error_1.throwError)('La requête est invalide.', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async deleteAccount(auth, id) {
        try {
            await this.firebaseService.auth.deleteUser(id);
            await this.firebaseService.firestore
                .collection('users')
                .doc(id)
                .delete();
            return true;
        }
        catch (error) {
            (0, error_1.throwError)('Impossible de supprimer le compte', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], AuthService);
function formatRowToUser(auth, userData) {
    return {
        id: auth.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        photo: userData.photo || null,
        address: userData.address,
        isAdmin: userData.isAdmin || false,
    };
}
//# sourceMappingURL=auth.service.js.map