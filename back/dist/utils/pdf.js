"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = generatePdf;
const Handlebars = require("hbs");
const fs_1 = require("fs");
const path_1 = require("path");
const puppeteer = require("puppeteer");
const constants_1 = require("../constants");
const firebase_service_1 = require("../firebase/firebase.service");
async function generatePdf(auth, { data, hbsFileName, pdfName, }) {
    try {
        const templateFile = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'public', 'hbs', `${hbsFileName}.hbs`), 'utf-8');
        const html = Handlebars.compile(templateFile)(data);
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: (0, constants_1.ENV)().CHROMIUM_PATH,
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();
        const firebaseService = new firebase_service_1.FirebaseService();
        const bucket = firebaseService.storage.bucket();
        const file = bucket.file(`users/${auth.id}/${pdfName}`);
        await file.save(pdfBuffer, {
            contentType: 'application/pdf',
        });
        return pdfName;
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}
//# sourceMappingURL=pdf.js.map