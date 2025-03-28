// src/pdf/pdf.service.ts
import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import * as puppeteer from 'puppeteer';
import { FirebaseService } from '../firebase/firebase.service';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { Storage } from '@google-cloud/storage';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  private storage: Storage;

  constructor(private readonly firebaseService: FirebaseService) {
    this.storage = new Storage({
      projectId: process.env.FIREBASE_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
    this.registerHandlebarsHelpers();
  }

  private registerHandlebarsHelpers() {
    handlebars.registerHelper('ifNotLast', function(index: number, array: any[], options: any) {
      return index < array.length - 1 ? options.fn(this) : options.inverse(this);
    });
  }

  private getTemplateContent(): string {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{{title}}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 10px;
          --king: #00165A;
          --dividercolor: #bdbdbd;
          --dividerSize: 2px;
        }
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .band {
          background: var(--king);
          padding: 5px;
          color: white;
          font-weight: 600;
          font-size: 18px;
          text-align: center;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          flex: 1;
          margin-top: 40px;
        }
        .bandItemContainer {
          background-color: rgb(235, 235, 235);
          color: var(--king);
        }
        .bandItem {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 10px;
          margin-left: 20px;
        }
        .bandItem span {
          font-weight: 600;
          font-size: 18px;
          margin-left: 20px;
        }
        .dividerV {
          background-color: var(--dividercolor);
          width: var(--dividerSize);
        }
        .dividerH {
          background-color: var(--dividercolor);
          height: var(--dividerSize);
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        td {
          border: 2px solid var(--dividercolor);
          font-weight: 600;
          text-align: center;
          height: 40px;
        }
        td img {
          margin-top: 5px;
        }
        .totalLine {
          display: flex;
        }
        .totalLine div {
          display: flex;
          height: 0px;
          border-width: 1px;
          border-color: black;
          border-style: dashed;
          flex: 1;
          margin-left: 5px;
          margin-right: -15px;
          margin-top: 9px;
        }
        .totalLine span {
          font-size: 15px;
        }
      </style>
    </head>
    <body>
      <div class="center">
        <img src="{{logo}}" width="200px"/>
      </div>
      <div class="band" style="margin-top:40px;font-size:25px;padding: 7px;border-radius:6px;">
        <span>Simulation Projet</span>
      </div>
      <div class="band"><span>Informations Logement & Résident</span></div>
      <div class="bandItemContainer" style="display:flex">
        <div style="width:50%;">
          {{#each leftPerks}}
            <div class="bandItem">
              <div class="center" style="width:50px">
                <img src="{{this.image}}" height="32px"/>
              </div>
              <span>{{this.title}}</span>
            </div> 
          {{/each}}
        </div>
        <div class="dividerV"></div>
        <div style="width:50%;">
          {{#each rightPerks}}
            <div class="bandItem">
              <div class="center" style="width:50px">
                <img src="{{this.image}}" height="32px"/>
              </div>
              <span>{{this.title}}</span>
            </div> 
          {{/each}}
        </div>
      </div>
      <div style="display:flex">
        <div style="flex:1">
          <div class="band"><span>Projet</span></div>
          <div class="bandItemContainer">
            {{#each projects}}
              <div class="bandItem">
                <img src="{{this.image}}" height="40px"/>
                <span>{{this.title}}</span>
              </div>  
              {{#ifNotLast @index ../projects}}
                <div class="dividerH"></div>
              {{/ifNotLast}}
            {{/each}}
          </div>
        </div>
        <div style="width: 40px;"></div>
        <div style="flex:1">
          <div class="band"><span>Aides & Subventions</span></div>
          <div class="bandItemContainer">
            <table>
              <thead>
                <tr>
                  <td>Produit</td>
                  <td><img src="{{MPRLogo}}" height="32px"/></td>
                  <td><img src="{{CEELogo}}" height="32px"/></td>
                </tr>
              </thead>
              <tbody>
                {{#each helps}}
                <tr>
                  <td>
                    <img src="{{this.image}}" height="32px"/>
                  </td>
                  <td>
                    {{this.mpr}}
                  </td>
                  <td>
                    {{this.cee}}
                  </td>
                </tr>
                {{/each}}
                <tr>
                  <td>
                    Total
                  </td>
                  <td>
                    {{totalMPR}}
                  </td>
                  <td>
                    {{totalCEE}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="band"><span>Total</span></div>
      <div class="bandItemContainer">
        {{#each totalLines}}
          <div class="bandItem totalLine">
            <span>{{this.title}}</span>
            <div></div>
            <span>{{this.price}}</span>
          </div>
        {{/each}}
      </div>
      <div style="margin-top: 20px;font-size: 14px;">
        * Les résultats des simulations proposées par Label Energie qui peuvent être réalisées sur ce site sont indicatifs [...]
      </div>
    </body>
    </html>
    `;
  }

  async generatePdf(folderId: string, simulationData: any, userId: string): Promise<string> {
    try {
      console.log('[PDF Generation] Starting with data:', {
        folderId,
        userId,
        simulationDataExists: !!simulationData,
        timestamp: new Date().toISOString()
      });
  
      // Validate simulation data
      if (!simulationData || !simulationData.simulation) {
        throw new Error('Invalid simulation data');
      }
  
      const templateData = this.prepareTemplateData(folderId, simulationData);
      const html = this.generateHtml(templateData);
      const pdfBuffer = await this.createPdfBuffer(html);
  
      const filePath = `folders/${folderId}/synthese.pdf`;
      const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  
      if (!bucketName) {
        throw new Error('Storage bucket not configured');
      }
  
      const file = this.storage.bucket(bucketName).file(filePath);
  
      await file.save(pdfBuffer, {
        metadata: { 
          contentType: 'application/pdf',
          metadata: {
            userId: userId
          }
        },
      });
  
      // Get signed URL with error handling
      try {
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-01-2500',
        });
        return url;
      } catch (urlError) {
        console.error('[PDF] URL generation failed:', urlError);
        throw new Error('Failed to generate PDF URL');
      }
  
    } catch (error) {
      console.error('[PDF Generation] Failed:', {
        error: error.message,
        stack: error.stack,
        folderId,
        userId
      });
      throw error;
    }
  }

  private prepareTemplateData(folderId: string, simulationData: any) {
    return {
      title: `Synthèse ${folderId}`,
      logo: 'https://votre-domaine.com/logo.png',
      MPRLogo: 'https://votre-domaine.com/icons/mpr.png',
      CEELogo: 'https://votre-domaine.com/icons/cee.png',
      leftPerks: [
        { 
          image: 'https://votre-domaine.com/icons/home.svg',
          title: simulationData.adresse || 'Non renseigné'
        },
        {
          image: 'https://votre-domaine.com/icons/calendar.svg',
          title: simulationData.anneeConstruction || 'Non renseigné'
        }
      ],
      rightPerks: [
        {
          image: 'https://votre-domaine.com/icons/user.svg',
          title: `${simulationData.prenom} ${simulationData.nom}`
        },
        {
          image: 'https://votre-domaine.com/icons/phone.svg',
          title: simulationData.telephone || 'Non renseigné'
        }
      ],
      projects: simulationData.projets.map(projet => ({
        image: `https://votre-domaine.com/icons/${projet.type}.svg`,
        title: projet.nom
      })),
      helps: simulationData.aides.map(aide => ({
        image: `https://votre-domaine.com/icons/${aide.type}.svg`,
        mpr: `${aide.montantMPR} €`,
        cee: `${aide.montantCEE} €`
      })),
      totalMPR: `${simulationData.totalMPR} €`,
      totalCEE: `${simulationData.totalCEE} €`,
      totalLines: [
        { title: 'Total TTC', price: `${simulationData.totalTTC} €` }
      ]
    };
  }

  private generateHtml(templateData: any): string {
    const template = compile(this.getTemplateContent());
    return template(templateData);
  }

  private async createPdfBuffer(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      return await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
      });
    } finally {
      await browser.close();
    }
  }

  async generateTestHtml(data: any): Promise<string> {
    return this.generateHtml(data);
  }
}

@Injectable()
export class SimplePdfService {
  private storage: Storage;

  constructor(private readonly firebaseService: FirebaseService) {
    this.registerHandlebarsHelpers();
  }

  private registerHandlebarsHelpers() {
    handlebars.registerHelper('ifNotLast', function(index: number, array: any[], options: any) {
      return index < array.length - 1 ? options.fn(this) : options.inverse(this);
    });
  }

  async generateSimplePdf(folderId: string, content: any, userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: any[] = [];

      // Header
      doc.fontSize(18).text(content.title, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(10).text(`Généré le ${new Date().toLocaleDateString()}`, { align: 'center' });
      doc.moveDown(1);

      // Project Information Section
      doc.fontSize(14).text('Informations du projet', { underline: true });
      doc.fontSize(12).text(`• Adresse: ${content.address}`);
      doc.text(`• Surface: ${content.surface}`);
      doc.text(`• Type de chauffage: ${content.heating}`);
      doc.moveDown(1);

      // Works Section
      doc.fontSize(14).text('Travaux prévus', { underline: true });
      doc.fontSize(12).text(`• ${content.works}`);
      doc.moveDown(1);

      // Contact Section
      doc.fontSize(14).text('Contact', { underline: true });
      doc.fontSize(12).text(`• Téléphone: ${content.phone}`);
      doc.text(`• Statut: ${content.status}`);

      // Finalize PDF
      doc.end();

      // Buffer Management
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => {
        try {
          const pdfBuffer = Buffer.concat(buffers);
          const filePath = `folders/${folderId}/synthesis.pdf`;
          const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
          const file = this.storage.bucket(bucketName).file(filePath);

          await file.save(pdfBuffer, {
            metadata: { 
              contentType: 'application/pdf',
              metadata: {
                userId: userId
              }
            },
          });

          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
          });

          resolve(url);
        } catch (error) {
          console.error('PDF generation failed:', {
            error: error.message,
            folderId,
            userId
          });
          reject(new Error(`PDF generation failed: ${error.message}`));
        }
      });

      doc.on('error', reject);
    });
  }
}
