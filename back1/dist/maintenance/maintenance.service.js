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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const maintenance_type_1 = require("./maintenance.type");
const image_1 = require("../utils/image");
const maintenance_constants_1 = require("./maintenance.constants");
const tools_service_1 = require("../tools/tools.service");
const pdf_1 = require("../utils/pdf");
const firebase_service_1 = require("../firebase/firebase.service");
const error_1 = require("../utils/error");
const path_1 = require("path");
const fs_1 = require("fs");
const jwt = require("jsonwebtoken");
const axios_1 = require("axios");
const constants_1 = require("../constants");
const docusign_esign_1 = require("docusign-esign");
const crypto_1 = require("crypto");
let MaintenanceService = class MaintenanceService {
    constructor(firebaseService, toolsService) {
        this.firebaseService = firebaseService;
        this.toolsService = toolsService;
    }
    async findAll(userId) {
        try {
            return await this.firebaseService.query('maintenance', 'userId', '==', userId);
        }
        catch (error) {
            (0, error_1.throwError)('Error fetching maintenance records', 500);
        }
    }
    async findOne(userId, id) {
        try {
            const maintenance = await this.firebaseService.getDocument('maintenance', id);
            if (!maintenance || maintenance.userId !== userId) {
                (0, error_1.throwError)('Maintenance record not found', 404);
            }
            return maintenance;
        }
        catch (error) {
            (0, error_1.throwError)('Error fetching maintenance record', 500);
        }
    }
    async create(userId, data) {
        try {
            const maintenance = {
                id: (0, crypto_1.randomUUID)(),
                userId,
                createdAt: new Date(),
                status: maintenance_type_1.MaintenanceStatus.PENDING,
                ...data
            };
            return await this.firebaseService.createDocument('maintenance', maintenance);
        }
        catch (error) {
            (0, error_1.throwError)('Error creating maintenance record', 500);
        }
    }
    async storeSignedContractLegacy(userId, id, signedContractUrl) {
        try {
            const maintenance = await this.findOne(userId, id);
            const updatedContract = {
                ...maintenance.contract,
                signedUrl: signedContractUrl
            };
            await this.firebaseService.updateDocument('maintenance', id, {
                contract: updatedContract,
                status: maintenance_type_1.MaintenanceStatus.SIGNED
            });
            return this.findOne(userId, id);
        }
        catch (error) {
            (0, error_1.throwError)('Error storing signed contract', 500);
        }
    }
    async storeSignedContract(auth, body) {
        try {
            const maintenance = await this.findOne(auth.id, body.envelopeId);
            const updatedContract = {
                ...maintenance.contract,
                envelopeId: body.envelopeId,
            };
            await this.firebaseService.updateDocument('maintenance', body.envelopeId, {
                contract: updatedContract,
                status: maintenance_type_1.MaintenanceStatus.SIGNED
            });
            return this.findOne(auth.id, body.envelopeId);
        }
        catch (error) {
            console.error('Store signed contract error:', error);
            (0, error_1.throwError)('Error storing signed contract', 500);
        }
    }
    async getForm(type, productsStr) {
        const productIds = productsStr
            ?.split(',')
            .map(Number)
            .filter((p) => !isNaN(p)) ?? [1];
        const { products, totalPrice } = await this.toolsService.getCustomContractPrice(type, productIds);
        return {
            tree: (0, maintenance_constants_1.getMaintenanceTree)(type, products),
            totalPrice,
            products,
            type: this.getTypeByString(type),
        };
    }
    async generateJWTForDocusign() {
        const { DOCUSIGN: { USER_ID, INTEGRATION_KEY }, } = (0, constants_1.ENV)();
        const privateKey = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'private-key-docusign.pem'), 'utf8');
        const jwtToken = jwt.sign({
            iss: INTEGRATION_KEY,
            sub: USER_ID,
            aud: 'account-d.docusign.com',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600,
            scope: 'signature impersonation',
        }, privateKey, { algorithm: 'RS256' });
        try {
            const response = await axios_1.default.post('https://account-d.docusign.com/oauth/token', null, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: jwtToken,
                },
            });
            return response.data.access_token;
        }
        catch (error) {
            console.error('Error fetching access token:', error.response.data);
            throw new Error('Could not fetch access token');
        }
    }
    formatRowsToProducts(rows) {
        return rows.map((r) => ({
            id: r['pro_id'],
            name: r['pro_name'],
            image: (0, image_1.getStaticFilePath)(r['pro_image']),
            soloPrice: r['pro_soloprice'],
            manyPrice: r['pro_manyprice'],
        }));
    }
    getTypeByString(type) {
        switch (type) {
            case 'custom':
                return {
                    type,
                    label: 'Sur Mesure',
                };
            case 'liberte':
                return {
                    type,
                    label: 'Liberté',
                };
            case 'securite':
                return {
                    type,
                    label: 'Sécurité',
                };
            default:
                return {
                    type: 'essentiel',
                    label: 'Essentiel',
                };
        }
    }
    async generateContract(auth, body) {
        const form = body.currentForm;
        const { products, totalPrice } = await this.toolsService.getCustomContractPrice(body.type, body.productIds);
        const fileName = await (0, pdf_1.generatePdf)(auth, {
            hbsFileName: 'maintenanceContract',
            pdfName: `${(0, crypto_1.randomUUID)()}.pdf`,
            data: {},
        });
        const docBase64 = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'public', 'users', auth.id, fileName), { encoding: 'base64' });
        return {
            docUrl: (0, image_1.getUserFilePath)(auth, fileName),
            docBase64,
        };
    }
    async sendContractForSignature(auth, contractData) {
        try {
            const accessToken = await this.generateJWTForDocusign();
            const apiClient = new docusign_esign_1.ApiClient();
            apiClient.setBasePath('https://demo.docusign.net/restapi');
            apiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
            const envelopesApi = new docusign_esign_1.EnvelopesApi(apiClient);
            const envelope = {
                emailSubject: 'Veuillez signer votre contrat de maintenance',
                documents: [{
                        documentBase64: contractData.docBase64,
                        name: 'Contrat de maintenance',
                        fileExtension: 'pdf',
                        documentId: '1'
                    }],
                recipients: {
                    signers: [{
                            email: auth.email,
                            name: `${auth.firstName} ${auth.lastName}`,
                            recipientId: '1',
                            routingOrder: '1',
                            tabs: {
                                signHereTabs: [{
                                        documentId: '1',
                                        pageNumber: '1',
                                        recipientId: '1',
                                        xPosition: '100',
                                        yPosition: '100'
                                    }]
                            }
                        }]
                },
                status: 'sent'
            };
            const envelopeResponse = await envelopesApi.createEnvelope('account-d.docusign.com', { envelopeDefinition: envelope });
            return envelopeResponse;
        }
        catch (error) {
            console.error('DocuSign error:', error);
            (0, error_1.throwError)('Error sending contract for signature', 500);
        }
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        tools_service_1.ToolsService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map