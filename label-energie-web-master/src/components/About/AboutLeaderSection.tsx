import { Box, Flex, Image, Text, Wrap } from "@chakra-ui/react";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import TextHighlighter from "../shared/TextHighlighter";

const PERKS = [
  {
    value: "94 %",
    title: "de clients satisfaits",
    icon: "satisfaction.png",
  },
  {
    value: "82",
    title: "Techniciens RGE",
    icon: "technicien_rge.png",
  },
  {
    value: "2 184",
    title: "Installations en 2023",
    icon: "etoiles.png",
  },
];

interface AboutLeaderSectionProps {}

export default function AboutLeaderSection(props: AboutLeaderSectionProps) {
  const {} = props;

  return (
    <section>
      <Container mt={40} id="equipe" scrollMarginTop="100px">
        <Heading as="h2" maxW="700px" textAlign="left">
          Un des leader de la rénovation énergétique en France
        </Heading>
        <GradientDivider ml={0} mt={3} />
        <Flex
          mt={20}
          justifyContent={{ lg: "space-between" }}
          alignItems="center"
          flexDir={{ base: "column", lg: "row" }}
        >
          <TextHighlighter maxW={{ lg: "400px" }} mr={{ lg: 2 }}>
            {`Label Energie, c’est l’histoire d’un souhait. Celui de trouver des solutions de rénovation énergétique à vous, les Français. Quel que soit votre niveau de revenu, l’endroit où vous habitez, vos envies et vos besoins !

La rénovation énergétique, c’est un milieu complexe, très réglementé. Nous souhaitons être une boussole pour nos clients, et le moteur des évolutions du secteur.

Ainsi, nous rendons vos travaux, et toutes les démarches pour y accéder, plus simples, plus sûrs et moins onéreux. Comment ? En vous accompagnant tout au long de votre projet, à travers une analyse approfondie de vos besoins, la sélection d’artisans fiables, et la gestion de votre demande d’aides financières.`}
          </TextHighlighter>
          <Image
            src="/images/qui_sommes_nous/leader_renovation.png"
            w={{ base: "600px", lg: "500px", xl: "600px" }}
            mt={{ base: 10, lg: "0" }}
          />
        </Flex>
      </Container>
      <Box bg="king" mt={{ base: 20, lg: 40 }}>
        <Container py={10}>
          <Heading as="h2" color="white">
            Label Energie en quelques chiffres
          </Heading>
          <Flex
            justifyContent="space-between"
            mt={{ base: 10, md: 20 }}
            flexDir={{ base: "column", md: "row" }}
          >
            {PERKS.map((perk, i) => (
              <Box key={i} textAlign="center" color="white">
                <Image
                  src={`/icons/${perk.icon}`}
                  h={"50px"}
                  mx="auto"
                  mt={{ base: 5, md: "unset" }}
                />
                <Text mt={2} fontSize={{ base: 25, md: 30 }} fontWeight={800}>
                  {perk.value}
                </Text>
                <Text fontSize={{ base: 18, md: 20 }}>{perk.title}</Text>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </section>
  );
}
