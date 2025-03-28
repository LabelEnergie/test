import { TAuth } from 'src/auth/auth.types';
import * as Handlebars from 'hbs';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as puppeteer from 'puppeteer';
import { ENV } from 'src/constants';
import { FirebaseService } from '../firebase/firebase.service';

export async function generatePdf(
  auth: TAuth,
  {
    data,
    hbsFileName,
    pdfName,
  }: { hbsFileName: string; data: any; pdfName: string },
) {
  try {
    const templateFile = readFileSync(
      join(process.cwd(), 'public', 'hbs', `${hbsFileName}.hbs`),
      'utf-8',
    );

    const html = Handlebars.compile(templateFile)(data);
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: ENV().CHROMIUM_PATH,
    });
    
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    // Upload to Firebase Storage
    const firebaseService = new FirebaseService();
    const bucket = firebaseService.storage.bucket();
    const file = bucket.file(`users/${auth.id}/${pdfName}`);
    await file.save(pdfBuffer, {
      contentType: 'application/pdf',
    });

    return pdfName;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
