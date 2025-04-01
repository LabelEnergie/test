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
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
let PdfService = class PdfService {
    constructor() {
        handlebars.registerHelper('ifNotLast', function (index, array, options) {
            return (index < array.length - 1) ? options.fn(this) : options.inverse(this);
        });
    }
    async generatePdf(fileName, data, templateName) {
        try {
            const templatePath = path.resolve(process.cwd(), `public/hbs/${templateName}.hbs`);
            if (!fs.existsSync(templatePath)) {
                throw new common_1.HttpException(`Template ${templateName}.hbs not found`, common_1.HttpStatus.NOT_FOUND);
            }
            const templateSource = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateSource);
            const html = template(data);
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
                const publicDir = path.resolve(process.cwd(), 'public');
                const pdfsDir = path.resolve(publicDir, 'pdfs');
                fs.mkdirSync(pdfsDir, { recursive: true });
                const pdfPath = `pdfs/${fileName}.pdf`;
                const fullPdfPath = path.resolve(publicDir, pdfPath);
                fs.writeFileSync(fullPdfPath, pdfBuffer);
                return `/api/${pdfPath}`;
            }
            finally {
                await browser.close();
            }
        }
        catch (error) {
            console.error('[PDF Service] Error generating PDF:', error);
            throw new common_1.HttpException(`Failed to generate PDF: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PdfService);
//# sourceMappingURL=pdf.service.js.map