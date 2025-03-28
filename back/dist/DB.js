"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseBuilder = void 0;
exports.formatListForInsert = formatListForInsert;
const pg_1 = require("pg");
const error_1 = require("./utils/error");
const constants_1 = require("./constants");
class DatabaseBuilder {
    static createClient() {
        return new pg_1.Client({
            ...(0, constants_1.ENV)().DATABASE,
        });
    }
    static async query(query, params) {
        const client = this.createClient();
        try {
            await client.connect();
            const { rows } = await client.query(query, params);
            await client.end();
            return rows;
        }
        catch (e) {
            console.error(e);
            console.log(query, params);
            await client.end();
            (0, error_1.throwError)(e.message, 500);
            return null;
        }
    }
}
exports.DatabaseBuilder = DatabaseBuilder;
function formatListForInsert(list, nbItemsToInsert) {
    if (nbItemsToInsert == 1) {
        return '($1)';
    }
    let lastIndex = 2;
    return list
        .map(() => `($1,${Array.from({ length: nbItemsToInsert - 1 })
        .map(() => `$${lastIndex++}`)
        .join(',')})`)
        .join(',');
}
//# sourceMappingURL=DB.js.map