"use client";

import { Accordion } from "@chakra-ui/react";
import Container from "../../Container";
import Heading from "../../Heading";
import FAQItem from "./FAQItem";

const QUESTIONS = [
  {
    title: "Comment entretenir mon système de chauffage ?",
    response: `L'entretien de votre système de chauffage varie en fonction du type d'équipement et du combustible utilisés. Que vous possédiez une pompe à chaleur air-eau, un climatiseur réversible ou non, une chaudière à gaz, fioul, ou bois, les opérations nécessaires à son entretien peuvent être plus ou moins complexes et nécessitent l'intervention d'un professionnel qualifié.
Ce spécialiste, garant de la qualité et de la conformité des prestations avec la législation, effectue un contrôle complet de votre équipement lors des visites d'entretien. Il vérifie les émissions polluantes et ajuste les réglages en fonction de vos besoins et usages`,
  },
  {
    title:
      "Est-ce que l’entretien de mon équipement de chauffage est obligatoire ?",
    response:
      "L'entretien de votre système de chauffage d'une puissance de 4 kW ou plus est une obligation légale. Que votre équipement utilise du gaz, du bois, du fioul ou de l'électricité, il est nécessaire de programmer une visite d'entretien annuelle ou biennale selon le type d'appareil, comme pour certaines pompes à chaleur. Vous devez recevoir une attestation d'entretien de la part du technicien. Ce document indique les caractéristiques de votre installation, la liste des contrôles obligatoires effectués lors de la visite, ainsi que les mesures de rendement et d'émissions de polluants pour les chaudières à combustion. Le professionnel vous fournira également des conseils pour optimiser l'efficacité de votre chauffage, améliorer votre confort thermique et éventuellement réaliser des économies d'énergie.",
  },
  {
    title: "Quels sont les avantages de souscrire à un contrat d’entretien ?",
    response:
      "Souscrire à un contrat d'entretien pour votre système de chauffage offre de nombreux avantages. En confiant l'entretien et la maintenance de votre installation à un professionnel qualifié, vous bénéficiez d'un suivi régulier et d'interventions personnalisées grâce à l'historique des rapports de chaque visite. Ce contrat inclut une visite annuelle d'entretien, conforme aux exigences légales (points de contrôle, mesures de performance, attestation d'entretien), ainsi que la prise en charge de toutes les interventions en cas de panne ou de dysfonctionnement de votre système de chauffage ou de production d'eau chaude sanitaire. Un entretien régulier permet de détecter précocement les problèmes potentiels et de remplacer les pièces défectueuses si nécessaire.",
  },
  {
    title:
      "Entretenir son équipement de chauffage : Une responsibilité du locataire ou propriétaire ?",
    response:
      "L'entretien d'un système de chauffage incombe à l'occupant du logement, qu'il soit propriétaire ou locataire. En tant que locataire, vous devez également faire entretenir votre système de chauffage chaque année ou tous les deux ans, selon votre équipement, par un professionnel. Si vous ne réalisez pas cet entretien régulièrement et ne possédez pas l'attestation d'entretien correspondante, votre propriétaire peut déduire le coût de la prestation d'un professionnel agréé de votre dépôt de garantie. De plus, votre assureur peut refuser de vous indemniser en cas de sinistre causé par un chauffage mal entretenu. Vous êtes libre de choisir le professionnel, sauf si le contrat de location spécifie une entreprise spécialisée pour l'entretien du chauffage.",
  },
];

export default function FAQSection() {
  return (
    <section>
      <Container mb={20}>
        <Heading as="h2" my={20}>
          FAQ : Les Questions Les Plus Fréquentes
        </Heading>
        <Accordion allowMultiple>
          {QUESTIONS.map((q, i) => (
            <FAQItem {...q} key={i} />
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
