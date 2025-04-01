"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Public = exports.IS_ADMIN_KEY = exports.IS_PUBLIC_KEY = void 0;
exports.ENV = ENV;
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
(0, dotenv_1.config)();
exports.IS_PUBLIC_KEY = 'isPublic';
exports.IS_ADMIN_KEY = 'isAdmin';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
const Admin = () => (0, common_1.SetMetadata)(exports.IS_ADMIN_KEY, true);
exports.Admin = Admin;
function ENV() {
    return {
        MODE: process.env.NODE_ENV || 'development',
        FIREBASE: {
            PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
            PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || '',
            STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            API_KEY: process.env.FIREBASE_API_KEY,
            AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            APP_ID: process.env.FIREBASE_APP_ID,
        },
        JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '604800',
        DATABASE: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'label',
        },
        PORT: process.env.PORT || '3000',
        BASE_URL: process.env.BASE_PATH || 'http://localhost:3000',
        COOKIE_TOKEN: process.env.COOKIE_TOKEN || 'default_cookie_token',
        CHROMIUM_PATH: process.env.CHROMIUM_PATH || '',
        EMAIL: {
            SERVICE_ID: process.env.EMAIL_SERVICE_ID || '',
            API_KEY: process.env.EMAIL_API_KEY || '',
            TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID || '',
            PRIVATE_KEY: process.env.EMAIL_PRIVATE_KEY || '',
        },
        STRIPE: {
            SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
            SECRET_KEY_TEST: process.env.STRIPE_SECRET_KEY_TEST || '',
        },
        MERCURE_JWT: process.env.MERCURE_JWT || '',
        DOCUSIGN: {
            ACCOUNT_ID: process.env.DOCUSIGN_ACCOUNT_ID || '',
            USER_ID: process.env.DOCUSIGN_USER_ID || '',
            INTEGRATION_KEY: process.env.DOCUSIGN_INTEGRATION_KEY || '',
        },
    };
}
//# sourceMappingURL=constants.js.map