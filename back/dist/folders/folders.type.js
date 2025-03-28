"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderDocumentType = exports.FolderType = void 0;
var FolderType;
(function (FolderType) {
    FolderType[FolderType["Pending"] = 1] = "Pending";
    FolderType[FolderType["Done"] = 2] = "Done";
    FolderType[FolderType["Completed"] = 3] = "Completed";
    FolderType[FolderType["Canceled"] = 99] = "Canceled";
})(FolderType || (exports.FolderType = FolderType = {}));
var FolderDocumentType;
(function (FolderDocumentType) {
    FolderDocumentType[FolderDocumentType["Identity"] = 1] = "Identity";
    FolderDocumentType[FolderDocumentType["Taxes"] = 2] = "Taxes";
    FolderDocumentType[FolderDocumentType["PropertyTax"] = 3] = "PropertyTax";
    FolderDocumentType[FolderDocumentType["Home"] = 4] = "Home";
    FolderDocumentType[FolderDocumentType["Other"] = 5] = "Other";
})(FolderDocumentType || (exports.FolderDocumentType = FolderDocumentType = {}));
//# sourceMappingURL=folders.type.js.map