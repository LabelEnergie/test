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
exports.Auth = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
const firebase_service_1 = require("./firebase/firebase.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, firebaseService) {
        this.reflector = reflector;
        this.firebaseService = firebaseService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(constants_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('Route access check:', {
            isPublic,
            path: context.switchToHttp().getRequest().url,
            method: context.switchToHttp().getRequest().method
        });
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('Token extraction:', {
            hasToken: !!token,
            tokenLength: token?.length,
            timestamp: new Date().toISOString()
        });
        if (!token) {
            console.error('Authentication failed: No token provided');
            throw new common_1.UnauthorizedException();
        }
        try {
            console.log('Attempting token verification...');
            const decodedToken = await this.firebaseService.auth.verifyIdToken(token);
            console.log('Token verification details:', {
                receivedUid: decodedToken.uid,
                email: decodedToken.email,
                authTime: decodedToken.auth_time,
                requestId: Math.random().toString(36).substring(7),
                timestamp: new Date().toISOString()
            });
            request['auth'] = {
                id: decodedToken.uid,
                email: decodedToken.email,
                emailVerified: decodedToken.email_verified,
                token: token
            };
            console.log('Auth data set:', {
                hasAuth: !!request['auth'],
                userId: request['auth'].id,
                requestPath: request.url,
                method: request.method,
                timestamp: new Date().toISOString()
            });
            if (request.method === 'POST') {
                console.log('Request payload:', {
                    path: request.url,
                    timestamp: new Date().toISOString(),
                    bodyLength: JSON.stringify(request.body).length
                });
            }
            return true;
        }
        catch (error) {
            console.error('Authentication error:', {
                error: {
                    name: error.name,
                    message: error.message,
                    code: error.code,
                    stack: error.stack
                },
                requestPath: request.url,
                timestamp: new Date().toISOString()
            });
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    extractTokenFromHeader(request) {
        const authorization = request.headers?.['authorization'];
        if (!authorization)
            return null;
        const [_, token] = authorization.split(' ', 2);
        return token;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        firebase_service_1.FirebaseService])
], AuthGuard);
exports.Auth = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.auth;
});
//# sourceMappingURL=guard.js.map