import { FORM_MAINTENANCE_HREF } from "./headerItems";

export const OFFERS = [
  {
    title: "ESSENTIEL",
    price: "11,90",
    priceValue: 11.9,
    subtitle: "L'essentiel de la maintenance.",
    id: "essentiel",
    perks: [
      "Visite d'entretien tous les 2 ans*.",
      "Programmation automatique de la visite d'entretien.",
      "Attestation d'entretien téléchargeable sur votre espace client.",
      "Dépannages payants (main d'oeuvre et déplacement), dans les 72h (3)(5).",
      "Pièces détachées payantes avec -20% sur celles changées lors du 1er dépannage (6).",
    ],
    href: `${FORM_MAINTENANCE_HREF}?type=essentiel`,
  },
  {
    title: "LIBERTÉ",
    price: "19,90",
    priceValue: 19.9,

    subtitle:
      "Les avantages de l'offre Essentiel, avec une visite annuelle pour plus de confort.",
    id: "liberte",
    perks: [
      "Entretien annuel.",
      "Programmation automatique de la visite d'entretien.",
      "Attestation d'entretien téléchargeable sur votre espace client.",
      "Dépannages payants (main d'oeuvre et déplacement), dans les 72h (3)(5).",
      "Pièces détachées payantes avec -20% sur celles changées lors du 1er dépannage (6).",
    ],
    href: `${FORM_MAINTENANCE_HREF}?type=liberte`,
  },
  {
    title: "SÉCURITÉ",
    price: "24,90",
    priceValue: 24.9,

    subtitle: "Des dépannages gratuits et illimités, pour plus de sérénité.",
    id: "securite",
    perks: [
      "Entretien annuel.",
      "Programmation automatique de la visite d'entretien.",
      "Attestation d'entretien téléchargeable sur votre espace client.",
      "Dépannages inclus et illimités dans les 72h (3), incluant main d'oeuvre et déplacement.",
      "Pièces détachées payantes avec -20% sur celles changées lors du 1er dépannage (6).",
    ],
    isSelected: true,
    href: `${FORM_MAINTENANCE_HREF}?type=securite`,
  },
];
