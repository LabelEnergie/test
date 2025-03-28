import { Box, Flex, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import Button from "../shared/Button";

const PERKS = [
  "Accélérer la transition écologique, grâce à la rénovation énergétique.",
  "Mettre tout en œuvre pour accélérer la rénovation thermique des logements en France.",
];

interface AboutMissionSectionProps {}

export default function AboutMissionSection(props: AboutMissionSectionProps) {
  const {} = props;

  return (
    <section>
      <Box
        bg="gray.50"
        mt={10}
        pt={20}
        mb="100px"
        id="mission"
        scrollMarginTop={10}
      >
        <Container>
          <Heading as="h2">Notre mission</Heading>
          <GradientDivider mt={3} w="50px" />
          <Stack flexDir={{ base: "column", md: "row" }} spacing={20} mt={10}>
            <Box maxW={{ md: "500px" }}>
              <Heading
                as="h3"
                textAlign="left"
                maxW="90%"
                fontSize={{ base: 25, md: 30, lg: 40 }}
              >
                Rendre simples et accessibles les travaux de rénovation
                énergétique pour tous les Français.
              </Heading>
              <VStack mt={20} spacing={10} mb={10}>
                {PERKS.map((perk, i) => (
                  <Flex key={i} color="king" alignItems="center">
                    <Image src="/icons/fleche.png" w="32px" h="20px" mr={5} />
                    <Text>{perk}</Text>
                  </Flex>
                ))}
              </VStack>
              <Button href="/simulateur">J'en profite dès maintenant</Button>
            </Box>
            <Box>
              <Text color="king">
                Notre mission est de conseiller et accompagner nos clients au
                quotidien en adaptant nos services à leurs besoins spécifiques,
                pour garantir leur satisfaction et offrir une expérience
                exceptionnelle.
              </Text>
              <Image
                src={`/images/qui_sommes_nous/notre_mission.jpg`}
                rounded="2xl"
                transform="translateY(50px)"
                w={{ base: "400px", md: "full" }}
                mx={{ base: "auto", md: "unset" }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </section>
  );
}
