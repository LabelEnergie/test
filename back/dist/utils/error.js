"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = throwError;
const common_1 = require("@nestjs/common");
function throwError(message, code) {
    throw new common_1.HttpException(message, code);
}
//# sourceMappingURL=error.js.map