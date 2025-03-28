import axios from 'axios';
import { TAuth } from 'src/auth/auth.types';
import { TSimulatorResult } from 'src/simulator/simulator.type';
import { TFolder } from './folders.type';
import { formatDate } from 'date-fns';

const apiPixelBase = axios.create({
  baseURL: 'https://crm.pixel-crm.com/api',
  headers: {
    'XINTNRGLEAD-TOKEN': 'a51587c7-e205-4be0-b7c4-97666894c95e',
  },
});

export async function pixelInjectLead(
  auth: TAuth,
  simulatorResult: TSimulatorResult[],
  folder: TFolder,
) {
  const ageResponse = simulatorResult.find((r) => r.id == 'date').value;

  const body = {
    TypeOperationCEE: 2,
    // Civilite1: 'M.',
    Nom1: auth.lastName,
    Prenom1: auth.firstName,
    // Civilite2: 'M.',
    // Nom2: 'TEST Dupond000',
    // Prenom2: 'Jean0',
    Adresse: auth.address.address,
    CodePostal: auth.address.zipCode,
    Ville: auth.address.city,
    // TelFixe: '0600600000',
    TelMobile: simulatorResult.find((r) => r.id == 'telephone').value,
    AgeBatiment: ageResponse == '<2' ? 2 : ageResponse == '2<15' ? 15 : 20,
    // TypeHabitation: 1,
    TypeLogement:
      simulatorResult.find((r) => r.id == 'type-logement').value == 'maison'
        ? 1
        : 2,
    // TypeChauffage: 2,
    // DealId: 'test DealId',
    ProjectTypeId: 'E83AEF87-525E-4EF5-8DB1-9FB6556A0989',
    NumDevis: folder.name,
    DateEditionDevis: formatDate(new Date(), 'yyyy-MM-dd'),
    // DateSignatureDevis: '2024-03-28',
    // PixelDealId: 'Guid',
    // DateReceptionFinChantier: '2024-03-28',
    // DateFinTravaux: '2024-03-28',
    // DateDemarrageTravaux: '2024-03-28',
  };

  console.log(body);
  return;

  try {
    const result = await apiPixelBase.post('/IJLeads', body);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
