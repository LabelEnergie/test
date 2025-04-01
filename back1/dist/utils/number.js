"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
exports.formatRevenues = formatRevenues;
exports.roundNumber = roundNumber;
exports.formatRevenuesToNumber = formatRevenuesToNumber;
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function formatRevenues(value) {
    let numStr = value.toString();
    let sign = '';
    if (numStr.startsWith('-')) {
        sign = '-';
        numStr = numStr.slice(1);
    }
    let numStrWithSpaces = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return sign + numStrWithSpaces + ' €';
}
function roundNumber(value, decimals) {
    const pow10 = 10 ** decimals;
    return Math.round(value * pow10) / pow10;
}
function formatRevenuesToNumber(value) {
    const splitted = value.toString().split('.');
    let result = value.toString().replace('.', ',');
    if (splitted.length > 1) {
        const decimal = parseInt(splitted[1]);
        if (decimal < 10) {
            result += '0';
        }
    }
    return result;
}
//# sourceMappingURL=number.js.map