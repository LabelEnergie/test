import { Box, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import Button from "../shared/Button";

const ITEMS = [
  {
    title: "Chauffage",
    perks: ["Chaudière à Granule", "Poêle à Granule"],
  },
  {
    title: "Chauffe-eau",
    perks: ["Chauffe-eau thermodynamique", "Chauffe-eau solaire individuel"],
  },
  {
    title: "Pompe à Chaleur",
    perks: ["Pompe à Chaleur Air/Eau", "Pompe à Chaleur Air/Air"],
  },
  {
    title: "Solaire",
    perks: [
      "Panneaux solaires photovoltaïques",
      "Système Solaire Combiné",
      "Panneaux photovoltaïques thermique",
    ],
  },
];

interface AboutSolutionsSectionProps {}

export default function AboutSolutionsSection(
  props: AboutSolutionsSectionProps
) {
  const {} = props;

  return (
    <section>
      <Image
        src="/images/ligne.svg"
        w="full"
        position="absolute"
        left={0}
        bottom={0}
        top={20}
        zIndex={-1}
      />
      <Container pt={"150px"} id="engagement">
        <Card
          position="relative"
          bg="king"
          rounded="30px"
          color="white"
          px={{ base: 5, lg: "60px" }}
          py={10}
          pb={0}
          pr={{ lg: 0 }}
          display="flex"
        >
          <Box pb={10}>
            <Heading
              as="h2"
              color="white"
              textAlign={{ base: "center", md: "left" }}
            >
              Nos solutions pour répondre à tous les besoins
            </Heading>
            <GradientDivider ml={{ md: 0 }} mt={5} />
            <Text
              fontSize={22}
              mt={7}
              textAlign={{ base: "center", md: "left" }}
            >
              Plus de 20 typologies de travaux pour la maison ! C’est simple,
              vous venez avec un besoin et nous apportons une solution.
            </Text>
            <Wrap
              spacing={{ base: 20, md: 3, lg: 10 }}
              mt="60px"
              mb="40px"
              justify={{ base: "center", lg: "unset" }}
            >
              {ITEMS.map(({ perks, title }, i) => (
                <WrapItem
                  key={i}
                  flexDir={"column"}
                  fontSize={18}
                  w={{ md: "300px" }}
                  alignItems={{ base: "center", md: "unset" }}
                >
                  <Text
                    as="h3"
                    fontWeight={800}
                    textAlign={{ base: "center", md: "left" }}
                  >
                    {title}
                  </Text>
                  <GradientDivider
                    h="5px"
                    w="40px"
                    ml={{ md: 0 }}
                    mb={2}
                    mt={1}
                  />
                  {perks.map((perk, j) => (
                    <Text
                      key={j}
                      my={2}
                      textAlign={{ base: "center", md: "unset" }}
                    >
                      {perk}
                    </Text>
                  ))}
                </WrapItem>
              ))}
            </Wrap>
            <Box
              mx={{ base: "auto", lg: 0 }}
              w={{ base: "fit-content", lg: "unset" }}
            >
              <Button
                href="/simulateur"
                fontSize={{ base: "14px", sm: "unset" }}
              >
                J'en profite dès maintenant
              </Button>
            </Box>
          </Box>
          <Image
            src="/images/qui_sommes_nous/batiment.png"
            h={{ lg: "400px", xl: "600px" }}
            mt="auto"
            ml="auto"
            display={{ base: "none", lg: "block" }}
          />
        </Card>
      </Container>
    </section>
  );
}
