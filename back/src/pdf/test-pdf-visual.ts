import { PdfService } from './pdf.service';
import { FirebaseService } from '../firebase/firebase.service';

async function testVisual() {
  // Initialize Firebase first
  const firebaseService = new FirebaseService();
  await firebaseService.onModuleInit(); // Make sure Firebase is initialized

  const pdfService = new PdfService(firebaseService);

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
    // Generate and save HTML for visual inspection
    const html = await pdfService.generateTestHtml(testData);
    console.log('HTML file generated: test-visual.html');

    // Generate PDF with test user ID
    const testUserId = 'test-user-123';
    const pdfUrl = await pdfService.generatePdf('visual-test', testData, testUserId);
    console.log('PDF generated successfully:', pdfUrl);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testVisual();