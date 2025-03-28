import { randomUUID } from 'crypto';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { TAuth } from 'src/auth/auth.types';
import { FolderType, TFolder, TFolderAddDocumentsBody } from './folders.type';
import { throwError } from 'src/utils/error';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SimulatorService } from 'src/simulator/simulator.service';
import { pixelInjectLead } from './apipixel';
import { PdfService } from '../pdf/pdf.service';

@Injectable()
export class FoldersService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly simulatorService: SimulatorService,
    private readonly pdfService: PdfService,
  ) {}

  async create(auth: TAuth, data: Partial<TFolder>): Promise<TFolder[]> {
    try {
      // Créer d'abord la simulation
      const simulationData = {
        id: randomUUID(),
        userId: auth.id,
        simulation: data.products || [], // Les données de simulation sont dans products
        createdAt: new Date().toISOString(),
      };

      // Sauvegarder la simulation
      await this.firebaseService.createDocument('simulations', simulationData);

      // Créer ensuite le dossier avec référence à la simulation
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
        products: [], // On ne stocke plus les products ici
        pdfLink: '',
        simulationId: simulationData.id // Référence vers la simulation
      };

      // Créer le dossier
      await this.firebaseService.createDocument('folders', newFolder);

      // Générer le PDF
      const simulation = await this.simulatorService.getSimulation(auth, simulationData.id);
      newFolder.pdfLink = await this.pdfService.generatePdf(
        newFolder.id,
        simulation,
        auth.id
      );
      
      await this.firebaseService.updateDocument('folders', newFolder.id, {
        pdfLink: newFolder.pdfLink
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

  async getFolder(auth: TAuth, id: string): Promise<TFolder> {
    const folder = await this.firebaseService.getDocument<TFolder>('folders', id);
    if (!folder || folder.userId !== auth.id) {
      throwError('Folder not found or unauthorized', HttpStatus.FORBIDDEN);
    }
    return folder;
  }

  async addDocument(
    auth: TAuth,
    id: string,
    { files }: TFolderAddDocumentsBody,
  ) {
    try {
      const folder = await this.getFolder(auth, id);
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
      const folder = await this.getFolder(auth, id);
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

  async updatePdfLink(auth: TAuth, id: string, pdfLink: string) {
    try {
      await this.firebaseService.updateDocument('folders', id, { pdfLink });
      return this.findAll(auth);
    } catch (error) {
      console.error('Error updating PDF link:', error);
      throwError('Error updating PDF link', HttpStatus.INTERNAL_SERVER_ERROR);
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
      await this.getFolder(auth, id);
      await this.firebaseService.deleteDocument('folders', id);
      return this.findAll(auth);
    } catch (error) {
      console.error('Error removing folder:', error);
      throwError('Error removing folder', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generatePdf(auth: TAuth, id: string): Promise<string> {
    try {
      console.log('[PDF] Starting generation for folder:', id, 'user:', auth.id);
      
      const folder = await this.getFolder(auth, id);
      if (!folder) {
        throw new HttpException('Folder not found', HttpStatus.NOT_FOUND);
      }

      const simulation = await this.simulatorService.getSimulation(auth, folder.simulationId);
      const pdfLink = await this.pdfService.generatePdf(folder.id, simulation, auth.id);
      
      await this.updatePdfLink(auth, id, pdfLink);
      
      return pdfLink;
    } catch (error) {
      console.error('[PDF] Generation failed:', {
        folderId: id,
        userId: auth.id,
        error: error.message,
        stack: error.stack
      });
      throw new HttpException('PDF generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async generatePdfContent(folder: any) {
    if (!folder.products || !Array.isArray(folder.products)) {
      throw new HttpException(
        'Le dossier ne contient pas de données valides',
        HttpStatus.BAD_REQUEST
      );
    }

    const getProductValue = (id: string) => {
      const product = folder.products.find((p: any) => p.id === id);
      return product?.value?.[0] || 'Non spécifié';
    };

    const parseAddress = () => {
      try {
        const addressData = getProductValue('adresse');
        const address = typeof addressData === 'string' ? JSON.parse(addressData) : addressData;
        return `${address.address}, ${address.zipCode} ${address.city}`;
      } catch {
        return 'Adresse non valide';
      }
    };

    const mapWorks = () => {
      const worksMap: Record<string, string> = {
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

  private parseSurface(products: any[]): string {
    const raw = products.find((p: any) => p.id === 'surface')?.value?.[0];
    const numericValue = parseInt(raw);
    return !isNaN(numericValue) ? `${numericValue} m²` : 'Surface non spécifiée';
  }
  async deleteOldPdfs(folderId: string, keepLastN = 3) {
    const files = await this.firebaseService.storage
      .bucket()
      .getFiles({ prefix: `folders/${folderId}/` });
    const sortedFiles = files[0].sort((a, b) => 
      new Date(b.metadata.timeCreated).getTime() - new Date(a.metadata.timeCreated).getTime()
    );
    
    for (const file of sortedFiles.slice(keepLastN)) {
      await file.delete();
    }
  }
}