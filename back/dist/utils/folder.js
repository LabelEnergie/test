"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFolderStatus = getDataFolderStatus;
exports.getDocumentIcon = getDocumentIcon;
const folders_type_1 = require("../folders/folders.type");
const image_1 = require("./image");
function getDataFolderStatus(type) {
    switch (type) {
        case folders_type_1.FolderType.Done:
            return { id: type, color: 'king', label: 'Terminé' };
        case folders_type_1.FolderType.Pending:
            return { id: type, color: '#f69709', label: 'En cours' };
        case folders_type_1.FolderType.Completed:
            return { id: type, color: 'secondary', label: 'Complété' };
        case folders_type_1.FolderType.Canceled:
            return { id: type, color: 'red', label: 'Annulé' };
        default:
            return { id: type, color: 'black', label: '...' };
    }
}
function getDocumentIcon(name) {
    const splitted = name.split('.');
    if (splitted.length <= 1) {
        return (0, image_1.getStaticFilePath)('pdf.png');
    }
    switch (splitted[1]) {
        case 'pdf':
            return (0, image_1.getStaticFilePath)('pdf.png');
        case 'jpg':
        case 'jpeg':
        case 'png':
            return (0, image_1.getStaticFilePath)('pdf.png');
        default:
            return (0, image_1.getStaticFilePath)('pdf.png');
    }
}
//# sourceMappingURL=folder.js.map