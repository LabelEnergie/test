"use client";

import { Accordion, Box, Text } from "@chakra-ui/react";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import FAQItem from "../shared/Sections/FAQSection/FAQItem";

const QUESTIONS = [
  {
    title:
      "Quelles sont les principales aides disponibles pour la rénovation énergétique ?",
    response:
      "Les principales aides incluent la TVA réduite à 5,5 %, MaPrimeRénov', le Prêt à Taux Zéro (PTZ), et les Certificats\
    d'Économies d'Énergie (CEE).",
  },
  {
    title: "Qui peut bénéficier de MaPrimeRénov' ?",
    response:
      "MaPrimeRénov’ est une aide publique accessible à tous les propriétaires et à toutes les copropriétés de logements,\
    construites depuis au moins 15 ans. Elle concerne les logements occupés à titre de résidence principale (par le\
    propriétaire lui-même ou par un locataire)",
  },
  {
    title: "Qu'est-ce que la TVA réduite à 5,5 % ?",
    response:
      "La TVA réduite à 5,5 % s'applique aux travaux de rénovation énergétique effectués dans des logements achevés\
    depuis plus de deux ans, réduisant ainsi le coût total des travaux.)",
  },
  {
    title: "Qu'est-ce que les Certificats d'Économies d'Énergie (CEE) ?",
    response:
      "Les CEE sont des aides financières accordées par les fournisseurs d'énergie pour encourager les travaux de\
    rénovation énergétique, permettant ainsi de réduire les coûts des projets.",
  },
  {
    title: "Comment puis-je savoir si je suis éligible à ces aides ?",
    response:
      "L'éligibilité varie selon les aides. Vous pouvez vérifier les conditions spécifiques sur [Link]/simulateur|notre simulateur[Link] pour un\
      diagnostic personnalisé.",
  },
  {
    title: "Quels types de travaux sont couverts par ces aides ?",
    response:
      "Les aides couvrent divers travaux, tels que le remplacement de systèmes de chauffage, l'installation de dispositifs\
      utilisant des énergies renouvelables, et bien plus encore.",
  },
  {
    title: "Comment puis-je obtenir ces aides ?",
    response:
      "Vous pouvez obtenir ces aides en créant votre dossier dans votre espace client et en mandatant Label Energie à\
      effectuer les demandes de subvention à votre place. Cela vous simplifie les démarches administratives et vous assure\
      de bénéficier des aides disponibles.",
  },
  {
    title: "Puis-je cumuler plusieurs aides pour un même projet ?",
    response:
      "Oui, il est souvent possible de cumuler plusieurs aides pour un même projet, ce qui permet de maximiser les\
      financements et de réduire encore davantage le coût de vos travaux.",
  },
  {
    title:
      "Existe-t-il un outil pour calculer le montant des aides auxquelles je suis\
    éligible ?",
    response:
      "Oui, nous mettons à votre disposition un simulateur permettant de calculer le montant des aides dont vous pouvez\
      bénéficier. Cet outil vous aidera à estimer les financements disponibles pour votre projet de rénovation énergétique.\
      Ces aides et subventions sont conçues pour rendre vos travaux de rénovation énergétique plus abordables et\
      accessibles, tout en contribuant à une meilleure efficacité énergétique et à un confort accru de votre logement.\
      Profitez-en dès maintenant !",
  },
];

interface FAQHelpsAndSubventionsSectionProps {}

export default function FAQHelpsAndSubventionsSection(
  props: FAQHelpsAndSubventionsSectionProps
) {
  const {} = props;

  return (
    <section>
      <Box bg="king" py={10}>
        <Container>
          <Heading as="h2" color="white">
            FAQ : Foire Aux Questions
          </Heading>
          <GradientDivider my={7} />
          <Text fontSize={24} textAlign="center" color="white">
            Aides et Subventions pour la Rénovation Énergétique
          </Text>
          <Accordion allowMultiple>
            {QUESTIONS.map((q, i) => (
              <FAQItem key={i} {...q} bg="white" />
            ))}
          </Accordion>
        </Container>
      </Box>
    </section>
  );
}
