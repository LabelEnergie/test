"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempCodeErrorType = void 0;
exports.testCode = testCode;
const date_fns_1 = require("date-fns");
const auth_types_1 = require("../auth/auth.types");
const LIMITS = {
    [auth_types_1.TempCodeType.ResetPassword]: {
        time: 10,
    },
};
var TempCodeErrorType;
(function (TempCodeErrorType) {
    TempCodeErrorType[TempCodeErrorType["timedOut"] = 1] = "timedOut";
    TempCodeErrorType[TempCodeErrorType["error"] = 500] = "error";
    TempCodeErrorType[TempCodeErrorType["notFound"] = 404] = "notFound";
})(TempCodeErrorType || (exports.TempCodeErrorType = TempCodeErrorType = {}));
async function testCode(firebaseService, code, type, email) {
    try {
        const tempCodesSnapshot = await firebaseService.firestore
            .collection('tempCodes')
            .where('code', '==', code)
            .where('type', '==', type)
            .where('email', '==', email)
            .get();
        if (tempCodesSnapshot.empty) {
            return { error: TempCodeErrorType.notFound };
        }
        const tempCode = tempCodesSnapshot.docs[0].data();
        const now = new Date();
        const codeDate = tempCode.createdAt.toDate();
        const validUntil = (0, date_fns_1.addMinutes)(codeDate, LIMITS[type].time);
        if (now > validUntil) {
            return { error: TempCodeErrorType.timedOut };
        }
        return { userId: tempCode.userId };
    }
    catch (error) {
        console.error('Error testing code:', error);
        return { error: TempCodeErrorType.error };
    }
}
//# sourceMappingURL=tempCodeManager.js.map