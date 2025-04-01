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
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
const firebase_service_1 = require("./firebase/firebase.service");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(reflector, firebaseService) {
        this.reflector = reflector;
        this.firebaseService = firebaseService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride(constants_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.debug({
            message: 'Route access check',
            path: request.url,
            method: request.method,
            isPublic
        });
        if (isPublic) {
            return true;
        }
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.warn('No authentication token provided');
            throw new common_1.UnauthorizedException('Authentication token missing');
        }
        try {
            const decodedToken = await this.verifyFirebaseToken(token);
            this.setRequestAuth(request, decodedToken, token);
            this.logger.log({
                message: 'Successful authentication',
                userId: decodedToken.uid,
                email: decodedToken.email,
                path: request.url
            });
            return true;
        }
        catch (error) {
            this.logger.error({
                message: 'Authentication failed',
                error: error.message,
                stack: error.stack,
                path: request.url
            });
            throw new common_1.UnauthorizedException(this.getFriendlyError(error));
        }
    }
    async verifyFirebaseToken(token) {
        try {
            return await this.firebaseService.auth.verifyIdToken(token, true);
        }
        catch (error) {
            if (error.code === 'auth/id-token-expired') {
                throw new Error('Token expired - please refresh your authentication');
            }
            else if (error.code === 'auth/argument-error') {
                throw new Error('Invalid token format - ensure you are using a valid Firebase ID token');
            }
            throw error;
        }
    }
    setRequestAuth(request, decodedToken, rawToken) {
        request.auth = {
            id: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified,
            isAdmin: decodedToken.admin || false,
            token: rawToken,
            authTime: new Date(decodedToken.auth_time * 1000)
        };
    }
    extractTokenFromHeader(request) {
        const authHeader = request.headers?.authorization;
        if (!authHeader)
            return null;
        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : null;
    }
    getFriendlyError(error) {
        if (error.message.includes('Firebase ID token has no "kid" claim')) {
            return 'Invalid authentication token format - please login again';
        }
        if (error.message.includes('Token expired')) {
            return 'Your session has expired - please login again';
        }
        return 'Authentication failed - please check your credentials';
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        firebase_service_1.FirebaseService])
], AuthGuard);
exports.Auth = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
});
//# sourceMappingURL=guard.js.map