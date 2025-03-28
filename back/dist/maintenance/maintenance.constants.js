"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaintenanceTree = getMaintenanceTree;
function getMaintenanceTree(type, products) {
    return [
        {
            title: 'Informations du logement',
            items: [
                {
                    type: 'input',
                    placeholder: 'Code Postale',
                    id: 'code-postal',
                },
                {
                    title: 'À quel titre souscrivez-vous ?',
                    type: 'select',
                    id: 'user-type',
                    values: [
                        {
                            title: 'Particulier',
                            id: 'particulier',
                        },
                        {
                            title: 'Professionnel',
                            id: 'pro',
                        },
                    ],
                },
                {
                    title: "Quel est l'âge du logement ?",
                    type: 'select',
                    id: 'home-age',
                    values: [
                        {
                            title: 'Plus de 2 ans',
                            id: '>2',
                        },
                        {
                            title: 'Moins de 2 ans',
                            id: '<2',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Votre équipement',
            items: type == 'custom'
                ? products.flatMap((p) => [
                    {
                        title: `${p.name} :`,
                        id: `equipement-${p.id}-marque`,
                        type: 'input',
                        placeholder: `Marque`,
                        notRequired: true,
                    },
                    {
                        id: `equipement-${p.id}-modele`,
                        type: 'input',
                        placeholder: `Modèle`,
                        notRequired: true,
                    },
                    {
                        id: `equipement-${p.id}-serie`,
                        type: 'input',
                        placeholder: `Numéro de Série`,
                        notRequired: true,
                    },
                ])
                : [
                    {
                        id: `equipement-1-marque`,
                        type: 'input',
                        placeholder: `Marque`,
                        notRequired: true,
                    },
                    {
                        id: `equipement-1-modele`,
                        type: 'input',
                        placeholder: `Modèle`,
                        notRequired: true,
                    },
                    {
                        id: `equipement-1-serie`,
                        type: 'input',
                        placeholder: `Numéro de Série`,
                        notRequired: true,
                    },
                    {
                        title: 'Avez-vous des radiateurs eau chaude et/ou un plancher chauffant raccordés à la pompe à chaleur ?',
                        type: 'select',
                        id: 'equipement-1-avec-PAC-options',
                        values: [
                            {
                                title: 'Oui',
                                id: 'oui',
                            },
                            {
                                title: 'Non',
                                id: 'non',
                            },
                            {
                                title: 'Je ne sais pas',
                                id: '?',
                            },
                        ],
                    },
                    {
                        title: "Quel est l'âge de votre pompe à chaleur ?",
                        type: 'select',
                        id: 'equipement-1-age',
                        values: [
                            {
                                title: '+ 10 ans',
                                id: '>10',
                            },
                            {
                                title: '- 10 ans',
                                id: '<10',
                            },
                        ],
                    },
                    {
                        title: 'En quel état est votre pompe à chaleur ?',
                        type: 'select',
                        id: 'equipement-1-etat',
                        values: [
                            {
                                title: 'Fonctionnel',
                                id: 'fonctionnel',
                            },
                            {
                                title: 'En panne',
                                id: 'panne',
                            },
                        ],
                    },
                ],
            dependencies: {
                securite: {
                    'PAC-age': {
                        ifValue: '>10',
                        type: 'modal-change-type-to-liberte',
                    },
                },
            },
        },
        {
            title: 'Mes coordonnées personnelles',
            items: [
                {
                    type: 'input',
                    placeholder: 'Adresse mail',
                    id: 'email',
                },
                {
                    type: 'select',
                    id: 'civilite',
                    values: [
                        {
                            title: 'Mr',
                            id: 'mr',
                        },
                        {
                            title: 'Mme',
                            id: 'mme',
                        },
                    ],
                },
                {
                    type: 'input',
                    placeholder: 'Nom',
                    id: 'nom',
                },
                {
                    type: 'input',
                    placeholder: 'Prénom',
                    id: 'prenom',
                },
                {
                    type: 'input',
                    placeholder: 'Téléphone mobile',
                    id: 'tel',
                },
                {
                    type: 'select',
                    id: 'payment-type',
                    values: [
                        { title: 'Mensuel', id: 'month' },
                        { title: 'Annuel', id: 'year' },
                    ],
                    title: 'Préférence de paiement',
                },
            ],
        },
        {
            title: "Mon adresse d'installation",
            items: [
                {
                    type: 'select',
                    id: 'est-proprio',
                    title: 'Êtes-vous propriétaire ou locataire du logement ?',
                    values: [
                        {
                            title: 'Propriétaire',
                            id: 'oui',
                        },
                        {
                            title: 'Locataire',
                            id: 'non',
                        },
                    ],
                },
                {
                    type: 'select',
                    id: 'type-logement',
                    title: 'Quel est le type de logement ?',
                    values: [
                        {
                            title: 'Maison',
                            id: 'maison',
                        },
                        {
                            title: 'Appartement',
                            id: 'appartement',
                        },
                    ],
                },
                {
                    type: 'input-address',
                    title: 'Où se situe le logement ?',
                    placeholder: 'Adresse',
                    id: 'adresse',
                },
            ],
        },
        {
            title: 'Choisir une date de visite',
            subtitle: 'Le rendez-vous vous sera définitivement confirmé par e-mail sous 3 jours ouvrés. Appel du technicien le jour même pour vous préciser son heure d’arrivée.',
            items: [
                {
                    type: 'input-date',
                    id: 'date',
                },
            ],
        },
        {
            title: 'Vérification des documents',
            items: [
                {
                    type: 'input-contract',
                    id: 'visualiser-contrat',
                },
            ],
            hideButton: true,
        },
        {
            title: 'Mes coordonnées bancaires',
            items: [
                {
                    type: 'input-payment',
                    id: 'paiement',
                },
            ],
            hideButton: true,
        },
    ];
}
//# sourceMappingURL=maintenance.constants.js.map