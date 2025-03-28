import { Test } from '@nestjs/testing';
import { PdfService } from './pdf.service';
import { FirebaseService } from '../firebase/firebase.service';

describe('PdfService', () => {
  let pdfService: PdfService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PdfService,
        {
          provide: FirebaseService,
          useValue: {
            uploadFile: jest.fn().mockResolvedValue(undefined),
            getFileUrl: jest.fn().mockResolvedValue('http://mock-url.com/pdf')
          }
        }
      ]
    }).compile();

    pdfService = module.get<PdfService>(PdfService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it('should generate PDF with correct template structure', async () => {
    const mockData = {
      adresse: "12 Rue de Test",
      anneeConstruction: "2015",
      prenom: "Test",
      nom: "User",
      telephone: "0123456789",
      projets: [{ type: "chauffage", nom: "PAC Air-Eau" }],
      aides: [{ type: "mpr", montantMPR: 1000, montantCEE: 500 }],
      totalMPR: 1000,
      totalCEE: 500,
      totalTTC: 1500
    };

    const mockUserId = 'test-user-id';
    const result = await pdfService.generatePdf('test-id', mockData, mockUserId);
    
    expect(result).toBe('http://mock-url.com/pdf');
    expect(firebaseService.uploadFile).toHaveBeenCalledWith(
      'folders/test-id/synthese.pdf',
      expect.any(Buffer),
      'application/pdf',
      mockUserId
    );

    const html = await pdfService.generateTestHtml(mockData);
    expect(html).toContain('<div class="band"><span>Informations Logement & Résident</span></div>');
    expect(html).toContain('12 Rue de Test');
    expect(html).toContain('PAC Air-Eau');
  });
});