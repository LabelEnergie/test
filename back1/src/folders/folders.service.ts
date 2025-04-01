import { randomUUID } from 'crypto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TAuth } from 'src/auth/auth.types';
import { FolderType, TFolder, TFolderAddDocumentsBody } from './folders.type';
import { throwError } from 'src/utils/error';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SimulatorService } from 'src/simulator/simulator.service';
import { pixelInjectLead } from './apipixel';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class FoldersService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly simulatorService: SimulatorService,
  ) {}

  async create(auth: TAuth, data: Partial<TFolder>): Promise<TFolder[]> {
    try {
      const newFolder: TFolder = {
        ...data,
        id: randomUUID(),
        userId: auth.id,
        date: new Date(),
        name: `Projet ${new Date().toLocaleDateString()}`,
        status: {
          id: FolderType.Pending,
          color: this.getStatusColor(FolderType.Pending),
          label: this.getStatusLabel(FolderType.Pending)
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
    } catch (error) {
      console.error('Error creating folder:', error);
      throwError('Error creating folder', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(auth: TAuth): Promise<TFolder[]> {
    try {
      const folders = await this.firebaseService.query<TFolder>(
        'folders', 
        'userId',
        '==',
        auth.id
      );
      return folders || [];
    } catch (error) {
      console.error('Error fetching folders:', error);
      throwError('Error fetching folders', HttpStatus.INTERNAL_SERVER_ERROR);
      return [];
    }
  }

  async addDocument(
    auth: TAuth,
    id: string,
    { files }: TFolderAddDocumentsBody,
  ) {
    try {
      const folder = await this.firebaseService.getDocument<TFolder>('folders', id);
      
      if (!folder || folder.userId !== auth.id) {
        throwError('Folder not found or unauthorized', HttpStatus.FORBIDDEN);
      }

      const updatedDocuments = [...(folder.documents || []), ...files];
      
      await this.firebaseService.updateDocument('folders', id, {
        documents: updatedDocuments
      });

      return this.findAll(auth);
    } catch (error) {
      console.error('Error adding document:', error);
      throwError('Error adding document', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async completeFolder(auth: TAuth, id: string) {
    try {
      const folder = await this.firebaseService.getDocument<TFolder>('folders', id);
      
      if (!folder || folder.userId !== auth.id) {
        throwError('Folder not found or unauthorized', HttpStatus.FORBIDDEN);
      }

      await this.updateStatus(auth, id, FolderType.Completed);

      const simulation = await this.simulatorService.getSimulation(auth, folder.simulationId);
      await pixelInjectLead(auth, simulation.json, folder);

      return this.findAll(auth);
    } catch (error) {
      console.error('Error completing folder:', error);
      throwError('Error completing folder', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateStatus(auth: TAuth, id: string, status: FolderType) {
    try {
      await this.firebaseService.updateDocument('folders', id, {
        status: {
          id: status,
          color: this.getStatusColor(status),
          label: this.getStatusLabel(status)
        }
      });
      return this.findAll(auth);
    } catch (error) {
      console.error('Error updating status:', error);
      throwError('Error updating status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNumMPR(auth: TAuth, id: string, numMPR: string) {
    try {
      await this.firebaseService.updateDocument('folders', id, { numMPR });
      return this.findAll(auth);
    } catch (error) {
      console.error('Error updating MPR:', error);
      throwError('Error updating MPR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private getStatusColor(status: FolderType): string {
    const colors = {
      [FolderType.Pending]: 'orange',
      [FolderType.Done]: 'green',
      [FolderType.Completed]: 'blue',
      [FolderType.Canceled]: 'red',
    };
    return colors[status] || 'gray';
  }

  private getStatusLabel(status: FolderType): string {
    const labels = {
      [FolderType.Pending]: 'En attente',
      [FolderType.Done]: 'Terminé',
      [FolderType.Completed]: 'Complété',
      [FolderType.Canceled]: 'Annulé',
    };
    return labels[status] || 'Inconnu';
  }

  async remove(auth: TAuth, id: string): Promise<TFolder[]> {
    try {
      const folder = await this.firebaseService.getDocument<TFolder>('folders', id);
      
      if (!folder || folder.userId !== auth.id) {
        throwError('Folder not found or unauthorized', HttpStatus.FORBIDDEN);
      }

      await this.firebaseService.deleteDocument('folders', id);
      return this.findAll(auth);
    } catch (error) {
      console.error('Error removing folder:', error);
      throwError('Error removing folder', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private extractZipCode(addressField: any): string {
    try {
      if (!addressField?.value) return '';
      const addressString = Array.isArray(addressField.value) ? addressField.value[0] : addressField.value;
      const addressData = JSON.parse(addressString);
      console.log('Parsed address data:', addressData); // Debug log
      return addressData?.zipCode || '';
    } catch (error) {
      console.error('Error extracting zip code:', error);
      return '';
    }
  }

  async generatePdf(auth: TAuth, id: string): Promise<Buffer> {
    try {
      console.log('[PDF Generation] Starting process for folder:', id);
      
      const folder = await this.firebaseService.getDocument<TFolder>('folders', id);
      if (!folder) {
        throw new Error('Folder not found');
      }
  
      const simulation = await this.simulatorService.getSimulation(auth, folder.simulationId);
      console.log('Simulation data:', simulation);
  
      // Get user name from simulation data
      const firstName = simulation.json.find(r => r.id === 'firstName')?.value || '';
      const lastName = simulation.json.find(r => r.id === 'lastName')?.value || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Non renseigné';
  
      // Get address from simulation data instead of products
      const addressData = simulation.json.find(r => r.id === 'adresse')?.value || {};
      let address = 'Non renseigné';
      if (addressData && typeof addressData === 'object') {
        const typedAddress = addressData as { address?: string; city?: string; zipCode?: string };
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
        // Autres informations du logement
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
      // Lire le template HBS
      const templatePath = path.resolve(process.cwd(), 'public/hbs/simulatorHelps.hbs');
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      
      // Compiler le template
      const template = handlebars.compile(templateSource);
      const html = template(templateData);

      // Générer le PDF avec Puppeteer
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
      });
      
      await browser.close();

      // Mettre à jour le lien du PDF dans Firebase
      const pdfUrl = `/api/folders/${id}/pdf`;
      await this.firebaseService.updateDocument('folders', id, { pdfLink: pdfUrl });

      // 3. Stocker le PDF dans Firebase Storage
      const pdfPath = `pdfs/${id}/synthese.pdf`;
      const bucket = this.firebaseService.storage.bucket();
      const file = bucket.file(pdfPath);
      
      await file.save(pdfBuffer, {
        contentType: 'application/pdf'
      });

      return pdfBuffer;
    } catch (error) {
      console.error('[PDF Generation] Error:', error);
      throwError('Error generating PDF', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
