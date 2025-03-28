"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const folders_type_1 = require("./folders.type");
const error_1 = require("../utils/error");
const firebase_service_1 = require("../firebase/firebase.service");
const simulator_service_1 = require("../simulator/simulator.service");
const apipixel_1 = require("./apipixel");
const pdf_service_1 = require("../pdf/pdf.service");
let FoldersService = class FoldersService {
    constructor(firebaseService, simulatorService, pdfService) {
        this.firebaseService = firebaseService;
        this.simulatorService = simulatorService;
        this.pdfService = pdfService;
    }
    async create(auth, data) {
        try {
            const simulationData = {
                id: (0, crypto_1.randomUUID)(),
                userId: auth.id,
                simulation: data.products || [],
                createdAt: new Date().toISOString(),
            };
            await this.firebaseService.createDocument('simulations', simulationData);
            const newFolder = {
                ...data,
                id: (0, crypto_1.randomUUID)(),
                userId: auth.id,
                date: new Date(),
                name: `Projet ${new Date().toLocaleDateString()}`,
                status: {
                    id: folders_type_1.FolderType.Pending,
                    color: this.getStatusColor(folders_type_1.FolderType.Pending),
                    label: this.getStatusLabel(folders_type_1.FolderType.Pending)
                },
                documents: [],
                products: [],
                pdfLink: '',
                simulationId: simulationData.id
            };
            await this.firebaseService.createDocument('folders', newFolder);
            const simulation = await this.simulatorService.getSimulation(auth, simulationData.id);
            newFolder.pdfLink = await this.pdfService.generatePdf(newFolder.id, simulation, auth.id);
            await this.firebaseService.updateDocument('folders', newFolder.id, {
                pdfLink: newFolder.pdfLink
            });
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error creating folder:', error);
            (0, error_1.throwError)('Error creating folder', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(auth) {
        try {
            const folders = await this.firebaseService.query('folders', 'userId', '==', auth.id);
            return folders || [];
        }
        catch (error) {
            console.error('Error fetching folders:', error);
            (0, error_1.throwError)('Error fetching folders', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return [];
        }
    }
    async getFolder(auth, id) {
        const folder = await this.firebaseService.getDocument('folders', id);
        if (!folder || folder.userId !== auth.id) {
            (0, error_1.throwError)('Folder not found or unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return folder;
    }
    async addDocument(auth, id, { files }) {
        try {
            const folder = await this.getFolder(auth, id);
            const updatedDocuments = [...(folder.documents || []), ...files];
            await this.firebaseService.updateDocument('folders', id, {
                documents: updatedDocuments
            });
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error adding document:', error);
            (0, error_1.throwError)('Error adding document', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async completeFolder(auth, id) {
        try {
            const folder = await this.getFolder(auth, id);
            await this.updateStatus(auth, id, folders_type_1.FolderType.Completed);
            const simulation = await this.simulatorService.getSimulation(auth, folder.simulationId);
            await (0, apipixel_1.pixelInjectLead)(auth, simulation.json, folder);
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error completing folder:', error);
            (0, error_1.throwError)('Error completing folder', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateStatus(auth, id, status) {
        try {
            await this.firebaseService.updateDocument('folders', id, {
                status: {
                    id: status,
                    color: this.getStatusColor(status),
                    label: this.getStatusLabel(status)
                }
            });
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error updating status:', error);
            (0, error_1.throwError)('Error updating status', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateNumMPR(auth, id, numMPR) {
        try {
            await this.firebaseService.updateDocument('folders', id, { numMPR });
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error updating MPR:', error);
            (0, error_1.throwError)('Error updating MPR', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePdfLink(auth, id, pdfLink) {
        try {
            await this.firebaseService.updateDocument('folders', id, { pdfLink });
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error updating PDF link:', error);
            (0, error_1.throwError)('Error updating PDF link', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getStatusColor(status) {
        const colors = {
            [folders_type_1.FolderType.Pending]: 'orange',
            [folders_type_1.FolderType.Done]: 'green',
            [folders_type_1.FolderType.Completed]: 'blue',
            [folders_type_1.FolderType.Canceled]: 'red',
        };
        return colors[status] || 'gray';
    }
    getStatusLabel(status) {
        const labels = {
            [folders_type_1.FolderType.Pending]: 'En attente',
            [folders_type_1.FolderType.Done]: 'Terminé',
            [folders_type_1.FolderType.Completed]: 'Complété',
            [folders_type_1.FolderType.Canceled]: 'Annulé',
        };
        return labels[status] || 'Inconnu';
    }
    async remove(auth, id) {
        try {
            await this.getFolder(auth, id);
            await this.firebaseService.deleteDocument('folders', id);
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error removing folder:', error);
            (0, error_1.throwError)('Error removing folder', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generatePdf(auth, id) {
        try {
            console.log('[PDF] Starting generation for folder:', id, 'user:', auth.id);
            const folder = await this.getFolder(auth, id);
            if (!folder) {
                throw new common_1.HttpException('Folder not found', common_1.HttpStatus.NOT_FOUND);
            }
            const simulation = await this.simulatorService.getSimulation(auth, folder.simulationId);
            const pdfLink = await this.pdfService.generatePdf(folder.id, simulation, auth.id);
            await this.updatePdfLink(auth, id, pdfLink);
            return pdfLink;
        }
        catch (error) {
            console.error('[PDF] Generation failed:', {
                folderId: id,
                userId: auth.id,
                error: error.message,
                stack: error.stack
            });
            throw new common_1.HttpException('PDF generation failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generatePdfContent(folder) {
        if (!folder.products || !Array.isArray(folder.products)) {
            throw new common_1.HttpException('Le dossier ne contient pas de données valides', common_1.HttpStatus.BAD_REQUEST);
        }
        const getProductValue = (id) => {
            const product = folder.products.find((p) => p.id === id);
            return product?.value?.[0] || 'Non spécifié';
        };
        const parseAddress = () => {
            try {
                const addressData = getProductValue('adresse');
                const address = typeof addressData === 'string' ? JSON.parse(addressData) : addressData;
                return `${address.address}, ${address.zipCode} ${address.city}`;
            }
            catch {
                return 'Adresse non valide';
            }
        };
        const mapWorks = () => {
            const worksMap = {
                '1': 'Panneaux solaires',
                '2': 'Chauffage',
                '3': 'Isolation thermique'
            };
            const workId = getProductValue('travaux');
            return worksMap[workId] || `Travaux (${workId})`;
        };
        return {
            title: folder.name || 'Dossier sans nom',
            date: folder.createdAt ? new Date(folder.createdAt).toLocaleDateString() : 'Date inconnue',
            address: parseAddress(),
            surface: this.parseSurface(folder.products),
            works: mapWorks(),
            heating: `${getProductValue('chauffage-principal')} (${getProductValue('chauffage-principal.elec.equipement')})`,
            status: folder.status?.label || 'Statut inconnu',
            phone: getProductValue('telephone')
        };
    }
    parseSurface(products) {
        const raw = products.find((p) => p.id === 'surface')?.value?.[0];
        const numericValue = parseInt(raw);
        return !isNaN(numericValue) ? `${numericValue} m²` : 'Surface non spécifiée';
    }
    async deleteOldPdfs(folderId, keepLastN = 3) {
        const files = await this.firebaseService.storage
            .bucket()
            .getFiles({ prefix: `folders/${folderId}/` });
        const sortedFiles = files[0].sort((a, b) => new Date(b.metadata.timeCreated).getTime() - new Date(a.metadata.timeCreated).getTime());
        for (const file of sortedFiles.slice(keepLastN)) {
            await file.delete();
        }
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        simulator_service_1.SimulatorService,
        pdf_service_1.PdfService])
], FoldersService);
//# sourceMappingURL=folders.service.js.map