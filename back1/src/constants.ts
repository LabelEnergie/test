import { config } from 'dotenv';
import { SetMetadata } from '@nestjs/common';

config();

// Constants for decorators
export const IS_PUBLIC_KEY = 'isPublic';
export const IS_ADMIN_KEY = 'isAdmin';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);

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
  JWT_SECRET: string;  // Add direct JWT properties
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

export function ENV(): EnvConfig {
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
