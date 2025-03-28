import Container from "@/components/shared/Container";
import { Box, BoxProps, Image, Text } from "@chakra-ui/react";
import DividerProcess from "./DividerProcess";
import { Fade } from "@/components/shared/ScrollAnimation";
import ProcessStep from "./ProcessStep";

const CARDS = [
  {
    title: "ÉTUDE GRATUITE",
    perks: ["Évaluation du projet", "Premières informations sur l'habitation"],
  },
  {
    title: "MONTAGE DOSSIER",
    perks: ["Analyse du logement", "Bilan énergétique et recommandations"],
  },
  {
    title: "VISITE TECHNIQUE",
    perks: ["Analyse du logement", "Bilan énergétique et recommandations"],
  },
  {
    title: "INSTALLATION",
    perks: ["Analyse du logement", "Bilan énergétique et recommandations"],
  },
  {
    title: "ENTRETIEN & MAINTENANCE",
    perks: ["Analyse du logement", "Bilan énergétique et recommandations"],
  },
];

export default function ProcessSection(props: BoxProps) {
  return (
    <section>
      <Box position="relative" mt={"150px"} h="800px" {...props}>
        <Image
          src="/images/panneaux_solaires_bleu_roi.jpg"
          w="full"
          h="full"
          objectFit="cover"
          zIndex={-1}
          position="absolute"
        />
        <Fade>
          <Text
            as="h2"
            textAlign="center"
            fontSize={30}
            color="white"
            pt={"100px"}
            fontWeight={800}
          >
            PROCESSUS
          </Text>
        </Fade>

        <Container
          display="flex"
          position="relative"
          color="white"
          mt="100px"
          justifyContent="center"
          maxH="555px"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <ProcessStep
            {...CARDS[0]}
            orientation="left"
            top={{ base: "0px", md: "20px" }}
          />
          <ProcessStep
            {...CARDS[2]}
            orientation="left"
            top={{ base: "400px", md: "420px" }}
          />
          <ProcessStep
            {...CARDS[4]}
            orientation="left"
            top={{ base: "800px", md: "820px" }}
          />
          <DividerProcess />
          <ProcessStep
            {...CARDS[1]}
            orientation="right"
            top={{ base: "200px", md: "220px" }}
          />
          <ProcessStep
            {...CARDS[3]}
            orientation="right"
            top={{ base: "600px", md: "620px" }}
          />
        </Container>
      </Box>
    </section>
  );
}
