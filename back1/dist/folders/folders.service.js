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
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer");
let FoldersService = class FoldersService {
    constructor(firebaseService, simulatorService) {
        this.firebaseService = firebaseService;
        this.simulatorService = simulatorService;
    }
    async create(auth, data) {
        try {
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
                simulationId: data.simulationId || ''
            };
            await this.firebaseService.createDocument('folders', {
                ...newFolder,
                id: newFolder.id
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
    async addDocument(auth, id, { files }) {
        try {
            const folder = await this.firebaseService.getDocument('folders', id);
            if (!folder || folder.userId !== auth.id) {
                (0, error_1.throwError)('Folder not found or unauthorized', common_1.HttpStatus.FORBIDDEN);
            }
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
            const folder = await this.firebaseService.getDocument('folders', id);
            if (!folder || folder.userId !== auth.id) {
                (0, error_1.throwError)('Folder not found or unauthorized', common_1.HttpStatus.FORBIDDEN);
            }
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
            const folder = await this.firebaseService.getDocument('folders', id);
            if (!folder || folder.userId !== auth.id) {
                (0, error_1.throwError)('Folder not found or unauthorized', common_1.HttpStatus.FORBIDDEN);
            }
            await this.firebaseService.deleteDocument('folders', id);
            return this.findAll(auth);
        }
        catch (error) {
            console.error('Error removing folder:', error);
            (0, error_1.throwError)('Error removing folder', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    extractZipCode(addressField) {
        try {
            if (!addressField?.value)
                return '';
            const addressString = Array.isArray(addressField.value) ? addressField.value[0] : addressField.value;
            const addressData = JSON.parse(addressString);
            console.log('Parsed address data:', addressData);
            return addressData?.zipCode || '';
        }
        catch (error) {
            console.error('Error extracting zip code:', error);
            return '';
        }
    }
    async generatePdf(auth, id) {
        try {
            console.log('[PDF Generation] Starting process for folder:', id);
            const folder = await this.firebaseService.getDocument('folders', id);
            if (!folder) {
                throw new Error('Folder not found');
            }
            const simulation = await this.simulatorService.getSimulation(auth, folder.simulationId);
            console.log('Simulation data:', simulation);
            const firstName = simulation.json.find(r => r.id === 'firstName')?.value || '';
            const lastName = simulation.json.find(r => r.id === 'lastName')?.value || '';
            const fullName = `${firstName} ${lastName}`.trim() || 'Non renseigné';
            const addressData = simulation.json.find(r => r.id === 'adresse')?.value || {};
            let address = 'Non renseigné';
            if (addressData && typeof addressData === 'object') {
                const typedAddress = addressData;
                address = `${typedAddress.address || ''}, ${typedAddress.city || ''} ${typedAddress.zipCode || ''}`.trim();
            }
            const templateData = {
                title: `Synthèse - ${folder.name}`,
                logo: 'http://localhost:3000/statics/logo.png',
                documents: folder.documents?.map(doc => ({
                    name: doc.name || 'Document sans nom',
                    type: doc.type || 'Type inconnu',
                    url: doc.url || '#'
                })) || [],
                leftPerks: [
                    { title: `Type de logement: ${simulation.json.find(r => r.id === 'type-logement')?.value?.[0] || 'Non renseigné'}`, image: '/statics/home.svg' },
                    { title: `Surface: ${Number(simulation.json.find(r => r.id === 'surface')?.value).toLocaleString('fr-FR') || 'Non renseigné'} m²`, image: '/statics/home.svg' },
                    { title: `Code postal: ${this.extractZipCode(simulation.json.find(r => r.id === 'adresse')) || 'Non renseigné'}`, image: '/statics/home.svg' },
                    { title: `Chauffage principal: ${simulation.json.find(r => r.id === 'chauffage-principal')?.value?.[0] || 'Non renseigné'}`, image: '/statics/home.svg' }
                ],
                rightPerks: [
                    { title: `Téléphone: ${simulation.json.find(r => r.id === 'telephone')?.value || 'Non renseigné'}`, image: 'http://localhost:3000/statics/icons/phone.svg' },
                    { title: `Nombre de personnes: ${simulation.json.find(r => r.id === 'foyer-personnes')?.value?.[0] || 'Non renseigné'}`, image: 'http://localhost:3000/statics/icons/user.svg' },
                    { title: `Statut: ${simulation.json.find(r => r.id === 'type-occupant')?.value?.[0] || 'Non renseigné'}`, image: 'http://localhost:3000/statics/icons/home.svg' }
                ],
                MPRLogo: 'http://localhost:3000/statics/icons/mpr.svg',
                CEELogo: 'http://localhost:3000/statics/icons/cee.svg',
                totalMPR: simulation.json.find(r => r.id === 'totalMPR')?.value || '0 €',
                totalCEE: simulation.json.find(r => r.id === 'totalCEE')?.value || '0 €',
                totalLines: [
                    { title: 'Coût installation', price: simulation.json.find(r => r.id === 'totalCost')?.value || '0 €' },
                    { title: 'Aides MaPrimeRenov', price: simulation.json.find(r => r.id === 'totalMPR')?.value || '0 €' },
                    { title: 'Aides CEE', price: simulation.json.find(r => r.id === 'totalCEE')?.value || '0 €' },
                    { title: 'Reste à Charge', price: simulation.json.find(r => r.id === 'remainingCost')?.value || '0 €' }
                ],
                housing: {
                    type: simulation.json.find(r => r.id === 'housingType')?.value || 'Non renseigné',
                    surface: simulation.json.find(r => r.id === 'surface')?.value || 'Non renseigné',
                    postalCode: simulation.json.find(r => r.id === 'postalCode')?.value || 'Non renseigné',
                    heatingType: simulation.json.find(r => r.id === 'heatingType')?.value || 'Non renseigné',
                    occupants: simulation.json.find(r => r.id === 'occupants')?.value || 'Non renseigné',
                    income: simulation.json.find(r => r.id === 'income')?.value || 'Non renseigné',
                    status: simulation.json.find(r => r.id === 'status')?.value || 'Non renseigné'
                }
            };
            const templatePath = path.resolve(process.cwd(), 'public/hbs/simulatorHelps.hbs');
            const templateSource = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateSource);
            const html = template(templateData);
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
            });
            await browser.close();
            const pdfUrl = `/api/folders/${id}/pdf`;
            await this.firebaseService.updateDocument('folders', id, { pdfLink: pdfUrl });
            const pdfPath = `pdfs/${id}/synthese.pdf`;
            const bucket = this.firebaseService.storage.bucket();
            const file = bucket.file(pdfPath);
            await file.save(pdfBuffer, {
                contentType: 'application/pdf'
            });
            return pdfBuffer;
        }
        catch (error) {
            console.error('[PDF Generation] Error:', error);
            (0, error_1.throwError)('Error generating PDF', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        simulator_service_1.SimulatorService])
], FoldersService);
//# sourceMappingURL=folders.service.js.map