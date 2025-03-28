import {
  Box,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Container from "../Container";
import TextHighlighter from "../TextHighlighter";
import Heading from "../Heading";

const ITEMS = [
  {
    title: "Installation",
    subtitle: `Nos techniciens professionnels et certifiés garantissent une installation conforme aux normes les plus strictes. Chaque étape de l'installation est soigneusement planifiée et exécutée, de la sélection des équipements à leur mise en place finale. Avec notre expertise technique, nous assurons une installation optimisée pour améliorer votre confort et maximiser l'efficacité énergétique de votre équipement. Choisir Label Energie, c'est opter pour la fiabilité et la satisfaction garantie.`,
  },
  {
    title: "Mise en service",
    subtitle: `Nous offrons un service de mise en service de qualité pour vos systèmes de chauffage et de climatisation. Nos techniciens s'assurent que chaque appareil est correctement configuré et opérationnel. Nous effectuons une vérification complète de l'installation, des réglages précis et des tests de performance pour garantir un fonctionnement optimal. Notre expertise technique vous assurent une mise en service qui maximise l'efficacité énergétique et le confort de votre équipement. Choisir Label Energie, c'est garantir la fiabilité et la performance de votre système dès le premier jour.`,
  },
  {
    title: "SAV, Entretien & Maintenance",
    subtitle: `Nous proposons un service après-vente (SAV) et de maintenance de premier ordre. Notre assistance technique est à votre écoute pour diagnostiquer et résoudre rapidement tout problème, assurant ainsi le bon fonctionnement de votre équipement. Nous offrons un entretien régulier qui inclut des vérifications complètes, des nettoyages et des ajustements pour maintenir la performance optimale et prolonger la durée de vie de vos appareils. Avec notre expertise technique et notre engagement envers la satisfaction client, choisir Label Energie pour votre SAV et maintenance, c'est opter pour la fiabilité, la sécurité et la tranquillité d'esprit.`,
  },
];

interface HandKeySectionProps {}

export default function HandKeySection(props: HandKeySectionProps) {
  const {} = props;

  return (
    <section>
      <Container py={20}>
        <Heading as="h2">Pourquoi nous choisir ?</Heading>
        <Text textAlign="center" fontSize={30} mt={6} color="king">
          Choisir Label Energie, c'est opter pour un partenaire de confiance,
          dédié à votre confort et à votre bien-être.
        </Text>
        <Stack
          flexDir={{ base: "column", lg: "row" }}
          mt={10}
          align="center"
          spacing={10}
        >
          <Image
            src="/images/technicien_rge.png"
            w={{ md: "580px" }}
            ml={{ xl: "-90px" }}
          />
          <VStack align="stretch" spacing={{ base: 10, lg: 6 }}>
            {ITEMS.map((item, i) => (
              <Box key={i}>
                <Text as="h3" fontWeight={800} color="king">
                  {i + 1}. {item.title}
                </Text>
                <Text mt={2} fontSize={14}>
                  {item.subtitle}
                </Text>
              </Box>
            ))}
          </VStack>
        </Stack>
      </Container>
    </section>
  );
}
