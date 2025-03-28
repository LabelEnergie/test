import { Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import Container from "../shared/Container";
import { SHADOW } from "@/style/constants";

interface AboutHistorySectionProps {}

export default function AboutHistorySection(props: AboutHistorySectionProps) {
  const {} = props;

  return (
    <section>
      <Heading mt={"80px"} px={4} id="histoire" scrollMarginTop="100px">
        Pourquoi avoir crée Label Energie ?
      </Heading>
      <GradientDivider w="60px" mt={3} />

      <Container my={{ base: 10, md: 20 }}>
        <Stack
          flexDir={{ base: "column", md: "row" }}
          align="center"
          spacing={{ base: 10, md: "unset" }}
        >
          <Text maxW={{ md: "50%" }}>
            « Fondée il y a de nombreuses années par notre famille de
            chauffagistes expérimentés, Label Energie s'est spécialisée dans les
            énergies renouvelables, le chauffage et le génie climatique. Nous
            avons créé Label Energie avec un idéal en tête : rendre la
            rénovation énergétique accessible à tous.
            <br />
            <br />
            En tant que spécialistes professionnels du chauffage et du génie
            climatique, nous nous engageons à relever le défi de la rénovation
            énergétique en apportant des solutions concrètes et durables à tous
            les Français désireux de réaliser des économies d'énergie,
            d'améliorer leur confort de vie et de contribuer à la protection de
            l'environnement.. »
          </Text>
          <VStack w="full" textAlign="center" color="king">
            <Image
              src="/images/ruben_zeitoun.png"
              rounded="full"
              boxShadow={SHADOW}
              boxSize={"200px"}
            />
            <Text fontWeight={800}>Ruben Zeitoun</Text>
            <Text>Président Co-fondateur de Label Energie</Text>
            <GradientDivider w="50px" />
          </VStack>
        </Stack>
      </Container>
    </section>
  );
}
