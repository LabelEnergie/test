"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        bodyParser: false
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3002;
    const environment = configService.get('NODE_ENV') || 'development';
    app.use('/api/webhooks/gocardless', express.raw({
        type: 'application/json',
        verify: (req, _res, buf) => {
            req.rawBody = buf;
        }
    }));
    app.use(express.json());
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(port);
    common_1.Logger.log(`Application is running on: http://localhost:${port}/api`, 'Bootstrap');
    common_1.Logger.log(`Environment: ${environment}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map