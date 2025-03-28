import { Injectable } from '@nestjs/common';
import {
  TGenerateContractBody,
  TProduct,
  TStoreSignedContractBody,
  Maintenance,
  MaintenanceStatus,
  CreateMaintenanceDto
} from './maintenance.type';
import { getStaticFilePath, getUserFilePath } from 'src/utils/image';
import { getMaintenanceTree } from './maintenance.constants';
import { ToolsService } from 'src/tools/tools.service';
import { TAuth } from 'src/auth/auth.types';
import { generatePdf } from 'src/utils/pdf';
import { FirebaseService } from '../firebase/firebase.service';
import { throwError } from 'src/utils/error';
import { format } from 'date-fns';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { ENV } from 'src/constants';
import { formatRevenuesToNumber } from 'src/utils/number';
import {
  RecipientViewRequest,
  Document,
  SignHere,
  EnvelopesApi,
  ApiClient,
  EnvelopeDefinition,
  Signer,
} from 'docusign-esign';
import { randomUUID } from 'crypto';

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly toolsService: ToolsService
  ) {}

  async findAll(userId: string): Promise<Maintenance[]> {
    try {
      return await this.firebaseService.query<Maintenance>(
        'maintenance',
        'userId',
        '==',
        userId
      );
    } catch (error) {
      throwError('Error fetching maintenance records', 500);
    }
  }

  async findOne(userId: string, id: string): Promise<Maintenance> {
    try {
      const maintenance = await this.firebaseService.getDocument<Maintenance>('maintenance', id);
      if (!maintenance || maintenance.userId !== userId) {
        throwError('Maintenance record not found', 404);
      }
      return maintenance;
    } catch (error) {
      throwError('Error fetching maintenance record', 500);
    }
  }

  async create(userId: string, data: CreateMaintenanceDto): Promise<Maintenance> {
    try {
      const maintenance: Maintenance = {
        id: randomUUID(),
        userId,
        createdAt: new Date(),
        status: MaintenanceStatus.PENDING,
        ...data
      };
      return await this.firebaseService.createDocument<Maintenance>('maintenance', maintenance);
    } catch (error) {
      throwError('Error creating maintenance record', 500);
    }
  }

  async storeSignedContractLegacy(userId: string, id: string, signedContractUrl: string): Promise<Maintenance> {
    try {
      const maintenance = await this.findOne(userId, id);
      const updatedContract = {
        ...maintenance.contract,
        signedUrl: signedContractUrl
      };
      
      await this.firebaseService.updateDocument<Maintenance>('maintenance', id, {
        contract: updatedContract,
        status: MaintenanceStatus.SIGNED
      });
      
      return this.findOne(userId, id);
    } catch (error) {
      throwError('Error storing signed contract', 500);
    }
  }

  async storeSignedContract(auth: TAuth, body: TStoreSignedContractBody): Promise<Maintenance> {
    try {
      const maintenance = await this.findOne(auth.id, body.envelopeId);
      const updatedContract = {
        ...maintenance.contract,
        envelopeId: body.envelopeId,
        // Remove signedUrl if it's undefined
      };
      
      await this.firebaseService.updateDocument<Maintenance>('maintenance', body.envelopeId, {
        contract: updatedContract,
        status: MaintenanceStatus.SIGNED
      });
      
      return this.findOne(auth.id, body.envelopeId);
    } catch (error) {
      console.error('Store signed contract error:', error);
      throwError('Error storing signed contract', 500);
    }
  }

  async getForm(type: string, productsStr?: string) {
    const productIds = productsStr
      ?.split(',')
      .map(Number)
      .filter((p) => !isNaN(p)) ?? [1];

    const { products, totalPrice } = await this.toolsService.getCustomContractPrice(type, productIds);

    return {
      tree: getMaintenanceTree(type, products),
      totalPrice,
      products,
      type: this.getTypeByString(type),
    };
  }

  async generateJWTForDocusign(): Promise<string> {
    const {
      DOCUSIGN: { USER_ID, INTEGRATION_KEY },
    } = ENV();

    const privateKey = readFileSync(
      join(process.cwd(), 'private-key-docusign.pem'),
      'utf8',
    );

    const jwtToken = jwt.sign(
      {
        iss: INTEGRATION_KEY,
        sub: USER_ID,
        aud: 'account-d.docusign.com',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour exp
        scope: 'signature impersonation',
      },
      privateKey,
      { algorithm: 'RS256' },
    );

    try {
      const response = await axios.post(
        'https://account-d.docusign.com/oauth/token',
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwtToken,
          },
        },
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error.response.data);
      throw new Error('Could not fetch access token');
    }
  }

  formatRowsToProducts(rows: any[]): TProduct[] {
    return rows.map((r) => ({
      id: r['pro_id'],
      name: r['pro_name'],
      image: getStaticFilePath(r['pro_image']),
      soloPrice: r['pro_soloprice'],
      manyPrice: r['pro_manyprice'],
    }));
  }

  private getTypeByString(type?: string) {
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

  async generateContract(auth: TAuth, body: TGenerateContractBody) {
    const form = body.currentForm;
    const { products, totalPrice } = await this.toolsService.getCustomContractPrice(
      body.type,
      body.productIds
    );

    const fileName = await generatePdf(auth, {
      hbsFileName: 'maintenanceContract',
      pdfName: `${randomUUID()}.pdf`,
      data: {
        // ... rest of the contract generation data
      },
    });

    const docBase64 = readFileSync(
      join(process.cwd(), 'public', 'users', auth.id, fileName),
      { encoding: 'base64' }
    );

    return {
      docUrl: getUserFilePath(auth, fileName),
      docBase64,
    };
  }

  async sendContractForSignature(auth: TAuth, contractData: any) {
    try {
      const accessToken = await this.generateJWTForDocusign();
  
      const apiClient = new ApiClient();
      apiClient.setBasePath('https://demo.docusign.net/restapi');
      apiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
  
      const envelopesApi = new EnvelopesApi(apiClient);
      
      // Create envelope definition
      const envelope: EnvelopeDefinition = {
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
            name: `${auth.firstName} ${auth.lastName}`, // Using firstName and lastName instead of name
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
  
      const envelopeResponse = await envelopesApi.createEnvelope(
        'account-d.docusign.com',
        { envelopeDefinition: envelope }
      );
  
      return envelopeResponse;
    } catch (error) {
      console.error('DocuSign error:', error);
      throwError('Error sending contract for signature', 500);
    }
  }
}
