import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../shared/Container";
import { Fragment } from "react";
import GradientDivider from "../shared/GradientDivider";
import { SHADOW } from "@/style/constants";
import TextHighlighter from "../shared/TextHighlighter";

interface AboutClimatSectionProps {}

const YEARS = [
  {
    year: 2024,
    title: "Nous évaluons\n**notre impact climat !",
    subtitle:
      "C’est le début d’un **long chemin d’engagement climatique**. Avoir son ADN d’entreprise inscrit dans la transition énergétique c’est bien – très bien même. **Comprendre son impact et agir dessus, c’est encore mieux !**",
    isComponent: true,
  },
  {
    year: 2023,
    title: "Élargissement de\n**l'accompagnement Label Energie**",
    subtitle:
      "**Nous étendons notre gamme d'accompagnement** avec le lancement des offres solaire en autoconsommation, pompe à chaleur, chaudière...",
    image: "chaudiere_a_granule.png",
  },
  {
    year: 2022,
    title: "Une priorité :\n**l'accompagnement des ménages",
    subtitle:
      "Renforcement et amélioration des dispositifs pour nous **recentrer pleinement sur vous !**",
    image: "equipe.png",
  },
  {
    year: 2022,
    title: "Accélération de la lutte\n**contre la précarité énergétique**",
    subtitle:
      "Pour **réaffirmer nos engagements sociétaux** au niveau institutionnel, nous contribuons à l’intégration d’une obligation de **lutte contre la précarité énergétique** dans le cadre de la Loi relative à la transition énergétique pour la croissance verte.",
    image: "contre_la_precarite.jpg",
  },
  {
    year: 2021,
    title: "Nous lançons notre offre de\n**déduction des aides sur devis**",
    subtitle:
      "Avec un objectif clair : **financer les travaux de rénovation énergétique des ménages les plus modestes**. Encadré par un accord avec le gouvernement et mandataire, nous permettons ainsi à des milliers de Français **d’accéder à des travaux de qualité, à un prix (très) abordable.**",
    image: "pompe_a_chaleur.png",
  },
  {
    year: 2020,
    title: "Création\n**de Label Energie**",
    subtitle:
      "Entreprise leader dans l'installation et la maintenance de système de chauffage en France",
    image: "entrepot.jpg",
  },
];

export default function AboutClimatSection(props: AboutClimatSectionProps) {
  const {} = props;

  return (
    <section>
      <Box position="relative">
        <Image src="/images/ligne.svg" position="absolute" w="full" />
        <Container
          py={"200px"}
          pb={{ base: "500px", md: "600px", lg: "200px" }}
        >
          {YEARS.map(({ subtitle, title, year, image, isComponent }, i) => (
            <Box key={i} mx={{ lg: "auto" }} position="relative">
              <Flex
                position={"absolute"}
                top={{ base: -10, lg: "-170px" }}
                flexDir={{
                  base: "column-reverse",
                  lg: i % 2 == 0 ? "row" : "row-reverse",
                }}
                left={0}
                right={0}
                alignItems={{ lg: "center" }}
                justifyContent="space-between"
              >
                {isComponent ? (
                  <Economies />
                ) : (
                  <Image
                    src={`/images/qui_sommes_nous/${image}`}
                    boxSize={{ base: "220px", sm: "300px", md: "400px" }}
                    rounded="full"
                    boxShadow={SHADOW}
                    ml={{ base: "auto", lg: "unset" }}
                    mr={{ base: "90px", md: "140px", lg: "unset" }}
                  />
                )}
                <Box
                  maxW={{ base: "full", lg: "400px" }}
                  pr={{ base: "100px", md: "140px", lg: 0 }}
                  color="king"
                  textAlign={{
                    base: "right",
                    lg: i % 2 == 0 ? "left" : "right",
                  }}
                  mb={{ base: 10, lg: 0 }}
                >
                  <TextHighlighter fontSize={{ base: 30, md: 35 }} as="h2">
                    {title}
                  </TextHighlighter>
                  <TextHighlighter mt={10} fontSize={{ base: 18, md: 20 }}>
                    {subtitle}
                  </TextHighlighter>
                </Box>
              </Flex>
              <Box
                w={{ base: "fit-content", lg: "unset" }}
                ml={{ base: "auto", lg: "unset" }}
                pr={{ base: 0, md: 10, lg: 0 }}
              >
                <Text
                  textAlign="center"
                  fontWeight={800}
                  fontSize={{ base: 30, lg: 40 }}
                  my={{ base: 5, lg: 10 }}
                >
                  {year}
                </Text>
                {i < YEARS.length - 1 && (
                  <GradientDivider
                    w={{ base: "7px", lg: "10px" }}
                    h={{ base: "850px", sm: "800px", lg: "500px" }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Container>
      </Box>
    </section>
  );
}

const ITEMS = [
  {
    title: "CHAUFFAGE",
    quantity: "264 258",
    color: "redLight",
  },
  {
    title: "SOLAIRE",
    quantity: "94 268",
    color: "sunLight",
  },
];

function Economies() {
  return (
    <Box
      w={{ base: "full", lg: "unset" }}
      pr={{ base: "100px", md: "140px", lg: "0" }}
      textAlign={{ base: "center", lg: "unset" }}
    >
      <Text
        fontSize={{ base: 35, sm: 50, md: 80 }}
        color="secondary"
        fontWeight={800}
      >
        358 526
        <Text as="span" fontSize={{ base: 20, md: 25 }} ml={1}>
          tCO²
        </Text>
      </Text>
      <Text
        color="king"
        fontWeight={600}
        fontSize={{ base: 20, md: 25 }}
        mt={{ sm: -3 }}
      >
        économiées grâce à nos travaux !
      </Text>
      <HStack mt={4} align="center" w="fit-content" mx="auto">
        {ITEMS.map(({ color, quantity, title }, i) => (
          <Box
            key={i}
            rounded="md"
            bg={color}
            color="king"
            p={3}
            textAlign="center"
            minW={{ base: "130px", md: "190px" }}
            fontSize={{ base: 14, md: 20 }}
          >
            <Text fontWeight={600}>{title}</Text>
            <Text fontWeight={800} fontSize={{ base: 20, md: 35 }}>
              {quantity}
            </Text>
            <Text fontWeight={600}>tCO² eq</Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
