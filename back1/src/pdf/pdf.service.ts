import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  constructor() {
    handlebars.registerHelper('ifNotLast', function(index, array, options) {
      return (index < array.length - 1) ? options.fn(this) : options.inverse(this);
    });
  }

  async generatePdf(
    fileName: string,
    data: any,
    templateName: string
  ): Promise<string> {
    try {
      // Check template existence
      const templatePath = path.resolve(process.cwd(), `public/hbs/${templateName}.hbs`);
      if (!fs.existsSync(templatePath)) {
        throw new HttpException(`Template ${templateName}.hbs not found`, HttpStatus.NOT_FOUND);
      }

      // Read and compile template
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateSource);
      const html = template(data);

      // Generate PDF
      const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      
      try {
        await page.setContent(html, { 
          waitUntil: ['networkidle0', 'load', 'domcontentloaded']
        });
        
        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
        });

        // Ensure directories exist
        const publicDir = path.resolve(process.cwd(), 'public');
        const pdfsDir = path.resolve(publicDir, 'pdfs');
        
        fs.mkdirSync(pdfsDir, { recursive: true });

        // Save PDF
        const pdfPath = `pdfs/${fileName}.pdf`;
        const fullPdfPath = path.resolve(publicDir, pdfPath);
        fs.writeFileSync(fullPdfPath, pdfBuffer);
        
        return `/api/${pdfPath}`;
      } finally {
        await browser.close();
      }
    } catch (error) {
      console.error('[PDF Service] Error generating PDF:', error);
      throw new HttpException(
        `Failed to generate PDF: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}