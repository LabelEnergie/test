"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_service_1 = require("./pdf.service");
const firebase_service_1 = require("../firebase/firebase.service");
async function testVisual() {
    const firebaseService = new firebase_service_1.FirebaseService();
    await firebaseService.onModuleInit();
    const pdfService = new pdf_service_1.PdfService(firebaseService);
    const testData = {
        adresse: "12 Rue des Exemples, Paris",
        anneeConstruction: "2010",
        prenom: "Jean",
        nom: "Dupont",
        telephone: "0123456789",
        projets: [
            { type: "chauffage", nom: "Pompe à chaleur" }
        ],
        aides: [
            { type: "mpr", montantMPR: 1000, montantCEE: 500 }
        ],
        totalMPR: 1000,
        totalCEE: 500,
        totalTTC: 1500
    };
    try {
        const html = await pdfService.generateTestHtml(testData);
        console.log('HTML file generated: test-visual.html');
        const testUserId = 'test-user-123';
        const pdfUrl = await pdfService.generatePdf('visual-test', testData, testUserId);
        console.log('PDF generated successfully:', pdfUrl);
    }
    catch (error) {
        console.error('Test failed:', error);
    }
}
testVisual();
//# sourceMappingURL=test-pdf-visual.js.map