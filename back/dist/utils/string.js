"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlural = toPlural;
function toPlural(name, quantity) {
    if (!quantity)
        return name;
    let value = Array.isArray(quantity) ? quantity.length : quantity;
    return value > 1 ? name + 's' : name;
}
//# sourceMappingURL=string.js.map