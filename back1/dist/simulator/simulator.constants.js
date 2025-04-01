"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIMULATOR_TREE = exports.MAPRIMERENOV_LIMIT = exports.MAPRIMERENOV_TABLE = exports.CEE_TABLE = exports.HELPS_COLORS = exports.TABLE_REVENUES = void 0;
const simulator_1 = require("../utils/simulator");
const simulator_type_1 = require("./simulator.type");
exports.TABLE_REVENUES = {
    1: [15000, 25000, 35000],
    2: [20000, 30000, 40000],
    3: [25000, 35000, 45000],
    4: [30000, 40000, 50000],
    5: [35000, 45000, 55000],
    more: [5000, 5000, 5000]
};
const TABLE_REVENUES_IDF = {
    1: [23541, 28657, 40018],
    2: [34551, 42058, 58827],
    3: [41493, 50513, 70382],
    4: [48447, 58981, 82839],
    5: [55427, 67473, 94844],
    more: [6970, 8486, 12006],
};
exports.HELPS_COLORS = {
    '1': 'Bleu',
    '2': 'Jaune',
    '3': 'Violet',
    '4': 'Rouge',
};
exports.CEE_TABLE = [
    {
        types: [simulator_type_1.ResourceType.VERY_MODEST, simulator_type_1.ResourceType.MODEST],
        helps: [
            {
                proId: 1,
                value: 4000,
            },
            {
                proId: 7,
                value: 4000,
            },
        ],
    },
    {
        types: [simulator_type_1.ResourceType.INTERMEDIATE, simulator_type_1.ResourceType.SUPERIOR],
        helps: [
            {
                proId: 1,
                value: 2500,
            },
            {
                proId: 7,
                value: 2500,
            },
        ],
    },
];
exports.MAPRIMERENOV_TABLE = {
    [simulator_type_1.ResourceType.VERY_MODEST]: [
        { proId: 1, value: 5000 },
        { proId: 3, value: 1200 },
        { proId: 4, value: 4000 },
        { proId: 5, value: 10000 },
        { proId: 6, value: 1800 },
        { proId: 7, value: 7000 },
    ],
    [simulator_type_1.ResourceType.MODEST]: [
        { proId: 1, value: 4000 },
        { proId: 3, value: 800 },
        { proId: 4, value: 3000 },
        { proId: 5, value: 8000 },
        { proId: 6, value: 1500 },
        { proId: 7, value: 5500 },
    ],
    [simulator_type_1.ResourceType.INTERMEDIATE]: [
        { proId: 1, value: 3000 },
        { proId: 3, value: 400 },
        { proId: 4, value: 2000 },
        { proId: 5, value: 4000 },
        { proId: 6, value: 1000 },
        { proId: 7, value: 3000 },
    ],
};
exports.MAPRIMERENOV_LIMIT = 20000;
exports.SIMULATOR_TREE = [
    {
        id: 'type-logement',
        bigTitle: 'Calculez vos aides et obtenez votre devis travaux',
        title: 'Votre projet concerne :',
        tag: 'EN 2 MINUTES !',
        values: [
            {
                title: 'Une maison',
                icon: 'maison.png',
                id: 'maison',
            },
            {
                title: 'Un appartement',
                icon: 'appartement.png',
                id: 'appartement',
            },
        ],
        type: 'select',
    },
    {
        id: 'date',
        title: 'La construction de ce logement date de :',
        subtitle: 'Cela permet de nous assurer de votre éligibilité aux différentes aides.',
        values: [
            {
                title: 'Moins de 2 ans',
                icon: 'calendrier.png',
                id: '<2',
            },
            {
                title: 'Entre 2 ans et 15 ans',
                icon: 'calendrier.png',
                id: '2<15',
            },
            {
                title: 'Plus de 15 ans',
                icon: 'calendrier.png',
                id: '>15',
            },
        ],
        type: 'select',
    },
    {
        id: 'surface',
        title: 'Quelle est la surface habitable approximative de votre logement ?',
        subtitle: 'Cela permet de nous assurer de votre éligibilité aux différentes aides.',
        type: 'input-number',
        label: 'Surface en m²',
    },
    {
        id: 'chauffage-principal',
        title: 'Aujourd’hui, quel est votre mode de chauffage principal pour ce logement ?',
        subtitle: 'Si vous avez plusieurs énergies de chauffage, indiquez-nous la principale',
        values: [
            {
                title: 'Chauffage au fioul',
                icon: 'fioul.png',
                id: 'fioul',
            },
            {
                title: 'Chauffage électrique',
                icon: 'elec.png',
                id: 'elec',
            },
            {
                title: 'Chauffage au gaz',
                icon: 'gaz.png',
                id: 'gaz',
            },
            {
                title: 'Chauffage au bois',
                icon: 'bois.png',
                id: 'bois',
            },
            {
                title: 'Pompe à chaleur',
                icon: 'PAC.png',
                id: 'pompe',
            },
            {
                title: 'Chauffage au charbon',
                icon: 'charbon.png',
                id: 'charbon',
            },
        ],
        type: 'select',
        dependencies: {
            fioul: [
                {
                    id: 'equipement',
                    title: "Quel est l'équipement au fioul installé ?",
                    subtitle: 'Pas toujours évident de connaître la différence ! Choisissez "Je ne sais pas" et vous pourrez identifier votre système actuel avec l’aide d\'un conseiller Label Energie.',
                    values: [
                        {
                            title: 'Chaudière à condensation',
                            icon: 'chaudiere.png',
                            id: 'chaudiere-condensation',
                        },
                        {
                            title: 'Chaudière classique',
                            icon: 'chaudiere_classique.png',
                            id: 'chaudiere-classique',
                        },
                        {
                            title: 'Poêle',
                            icon: 'poele.png',
                            id: 'poele',
                        },
                        {
                            title: 'Je ne sais pas',
                            icon: 'je_ne_sais_pas.png',
                            id: '?',
                        },
                    ],
                    type: 'select',
                },
            ],
            elec: [
                {
                    id: 'equipement',
                    title: 'Quel est le système de chauffage électrique installé ?',
                    values: [
                        {
                            title: 'Chaudière électrique',
                            id: 'chaudiere-elec',
                        },
                        {
                            title: 'Plafonds ou planchers chauffants',
                            id: 'plafond-plancher-chauffant',
                        },
                        {
                            title: 'Radiateurs électriques',
                            id: 'radiateurs-elec',
                        },
                    ],
                    type: 'select',
                },
            ],
            gaz: [
                {
                    id: 'equipement',
                    title: 'Quel est le système de chauffage au gaz installé ?',
                    subtitle: 'Pas toujours évident de connaître la différence ! Choisissez "Je ne sais pas" et vous pourrez identifier votre système actuel avec l’aide d\'un conseiller Label Energie.',
                    values: [
                        {
                            title: 'Chaudière à condensation',
                            icon: 'chaudiere.png',
                            id: 'chaudiere-condensation',
                        },
                        {
                            title: 'Chaudière classique',
                            icon: 'chaudiere_classique.png',
                            id: 'chaudiere-classique',
                        },
                        {
                            title: 'Poêle',
                            icon: 'poele.png',
                            id: 'poele',
                        },
                        {
                            title: 'Je ne sais pas',
                            icon: 'je_ne_sais_pas.png',
                            id: '?',
                        },
                    ],
                    type: 'select',
                },
            ],
        },
    },
    {
        id: 'travaux',
        title: 'Quels travaux envisagez-vous de réaliser ?',
        subtitle: 'Rassurez-vous, ce choix n’est pas définitif. Vous pourrez en discuter avec un conseiller Label Energie.',
        valuesSection: [
            {
                title: 'Chauffage',
                values: [
                    {
                        title: 'Pompe à Chaleur Air/Eau',
                        icon: 'PAC.png',
                        id: '1',
                    },
                    {
                        title: 'Pompe à Chaleur Air/Air',
                        icon: 'climatisation.png',
                        id: '2',
                    },
                    {
                        title: 'Poêle à granule',
                        icon: 'poele.png',
                        id: '6',
                    },
                    {
                        title: 'Chaudière à granule',
                        icon: 'chaudiere.png',
                        id: '7',
                    },
                ],
            },
            {
                title: 'Eau chaude sanitaire',
                values: [
                    {
                        title: 'Chauffe-eau Thermodynamique',
                        icon: 'chaudiere.png',
                        id: '3',
                    },
                ],
            },
            {
                title: 'Solaire',
                values: [
                    {
                        title: 'Système Solaire Combiné',
                        icon: 'panneaux_solaires.png',
                        id: '5',
                    },
                    {
                        title: 'Panneaux Photovoltaïques Hybrides',
                        icon: 'panneaux_solaires.png',
                        id: '10',
                    },
                    {
                        title: 'Panneaux Solaires Photovoltaïques',
                        icon: 'panneaux_solaires.png',
                        id: '9',
                    },
                    {
                        title: 'Chauffe-eau Solaire',
                        icon: 'chauffe_eau_solaire.png',
                        id: '4',
                    },
                ],
            },
        ],
        type: 'select-multi',
        max: 5,
    },
    {
        id: 'adresse',
        title: 'Où se situe le logement concerné par votre projet ?',
        subtitle: 'Pour estimer vos aides, nous avons besoin de connaître votre localisation.',
        type: 'input-address',
        label: 'Adresse',
    },
    {
        id: 'type-occupant',
        title: 'Dans ce logement, vous êtes :',
        values: [
            {
                title: 'Propriétaire occupant',
                icon: 'proprietaire.png',
                id: 'proprio',
            },
            {
                title: "Propriétaire d'une résidence secondaire",
                icon: 'proprietaire.png',
                id: 'proprio-second',
            },
            {
                title: 'Propriétaire bailleur',
                icon: 'proprietaire.png',
                id: 'proprio-bailleur',
            },
            {
                title: 'Locataire',
                icon: 'proprietaire.png',
                id: 'locataire',
            },
        ],
        type: 'select',
        dependencies: {
            'proprio-second': [
                {
                    id: 'code-postal',
                    title: 'Quel est le code postal de votre résidence principale ?',
                    subtitle: 'Le montant des aides dépend aussi du lieu de votre résidence principale.',
                    type: 'input-text',
                    label: 'Code postal',
                },
            ],
        },
    },
    {
        id: 'foyer-personnes',
        title: 'Combien de personnes composent votre foyer, y compris vous-même ?',
        subtitle: 'Cette information nous permet de vous donner une estimation plus précise de vos aides !',
        type: 'input-moreless',
        dependencies: (0, simulator_1.loadRevenuesTreeDependencies)(exports.TABLE_REVENUES),
        idfDependencies: (0, simulator_1.loadRevenuesTreeDependencies)(TABLE_REVENUES_IDF),
    },
    {
        id: 'prime-utilisee',
        title: 'Avez-vous profité de MaPrimeRénov ces 5 dernièmes années ?',
        type: 'select',
        values: [
            {
                title: 'Oui',
                id: 'oui',
            },
            {
                title: 'Non',
                id: 'non',
            },
        ],
        dependencies: {
            oui: [
                {
                    id: 'combien',
                    title: 'À combien sélevait le montant de votre aide MaPrimeRénov',
                    label: 'Montant (€)',
                    type: 'input-number',
                },
            ],
        },
    },
    {
        id: 'telephone',
        title: 'Quel est votre numéro de téléphone ?',
        label: 'Téléphone',
        type: 'input-text',
        mask: 'XX-XX-XX-XX-XX',
        subtitle: 'Nous ne réalisons aucun démarchage téléphonique et vous rappelons que, conformément à l’article L.223-2 du Code de la consommation, vous avez le droit de vous inscrire gratuitement sur une liste d’opposition au démarchage téléphonique.',
    },
    {
        id: 'creer-compte',
        type: 'signup',
    },
];
//# sourceMappingURL=simulator.constants.js.map