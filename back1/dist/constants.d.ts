export declare const IS_PUBLIC_KEY = "isPublic";
export declare const IS_ADMIN_KEY = "isAdmin";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const Admin: () => import("@nestjs/common").CustomDecorator<string>;
export interface EnvConfig {
    MODE: string;
    FIREBASE: {
        PROJECT_ID: string;
        CLIENT_EMAIL: string;
        PRIVATE_KEY: string;
        STORAGE_BUCKET: string;
        API_KEY: string;
        AUTH_DOMAIN: string;
        APP_ID: string;
    };
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DATABASE: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    PORT: string;
    BASE_URL: string;
    COOKIE_TOKEN: string;
    CHROMIUM_PATH: string;
    EMAIL: {
        SERVICE_ID: string;
        API_KEY: string;
        TEMPLATE_ID: string;
        PRIVATE_KEY: string;
    };
    STRIPE: {
        SECRET_KEY: string;
        SECRET_KEY_TEST: string;
    };
    MERCURE_JWT: string;
    DOCUSIGN: {
        ACCOUNT_ID: string;
        USER_ID: string;
        INTEGRATION_KEY: string;
    };
}
export declare function ENV(): EnvConfig;
