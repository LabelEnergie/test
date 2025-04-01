"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelInjectLead = pixelInjectLead;
const axios_1 = require("axios");
const date_fns_1 = require("date-fns");
const apiPixelBase = axios_1.default.create({
    baseURL: 'https://crm.pixel-crm.com/api',
    headers: {
        'XINTNRGLEAD-TOKEN': 'a51587c7-e205-4be0-b7c4-97666894c95e',
    },
});
async function pixelInjectLead(auth, simulatorResult, folder) {
    const ageResponse = simulatorResult.find((r) => r.id == 'date').value;
    const body = {
        TypeOperationCEE: 2,
        Nom1: auth.lastName,
        Prenom1: auth.firstName,
        Adresse: auth.address.address,
        CodePostal: auth.address.zipCode,
        Ville: auth.address.city,
        TelMobile: simulatorResult.find((r) => r.id == 'telephone').value,
        AgeBatiment: ageResponse == '<2' ? 2 : ageResponse == '2<15' ? 15 : 20,
        TypeLogement: simulatorResult.find((r) => r.id == 'type-logement').value == 'maison'
            ? 1
            : 2,
        ProjectTypeId: 'E83AEF87-525E-4EF5-8DB1-9FB6556A0989',
        NumDevis: folder.name,
        DateEditionDevis: (0, date_fns_1.formatDate)(new Date(), 'yyyy-MM-dd'),
    };
    console.log(body);
    return;
    try {
        const result = await apiPixelBase.post('/IJLeads', body);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=apipixel.js.map