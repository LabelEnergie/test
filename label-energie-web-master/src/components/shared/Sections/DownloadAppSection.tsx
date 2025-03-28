import {
  Box,
  BoxProps,
  Center,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Heading from "../Heading";
import Container from "../Container";
import GradientDivider from "../GradientDivider";
import DownloadButtons from "../DownloadButton/DownloadButtons";

const PERKS = [
  "Suivez vos dossiers en temps réel",
  "Télécharger tous vos documents en toute sécurité",
  "Simulez vos aides en quelques clics",
];

export default function DownloadAppSection(props: BoxProps) {
  return (
    <section>
      <Box mt={20} bg="gray.100" position="relative" {...props}>
        <Box
          h="full"
          bg="king"
          w={{ base: "full", xl: "80%" }}
          px={{ base: 5, xl: "unset" }}
          pl={{ xl: "calc((100vw - 1200px) / 2)" }}
          color="white"
          py={10}
        >
          <Stack
            flexDir={{ base: "column", md: "row" }}
            align="center"
            spacing={5}
            ml={-5}
            mx={{ base: "auto", xl: "unset" }}
            w={{ base: "fit-content", xl: "unset" }}
          >
            <Image src="/logo_application.png" boxSize="150px" />
            <Heading
              as="h2"
              color="white"
              maxW={{ xl: "500px" }}
              textAlign={{ base: "center", md: "left" }}
            >
              Télécharger notre application
            </Heading>
          </Stack>
          <Mockups
            display={{ xl: "none" }}
            mx="auto"
            boxSize={{ sm: "full", md: "600px" }}
          />

          <Text
            mt={{ base: 5, md: 10, xl: 20 }}
            maxW={{ xl: "50%" }}
            fontWeight={800}
            textAlign={{ base: "center", xl: "left" }}
          >
            Téléchargez notre application mobile dès maintenant pour un suivi et
            une gestion de vos dossiers en toute simplicité, où que vous soyez.
          </Text>
          <VStack
            align="stretch"
            mt={10}
            spacing={10}
            mx={{ base: "auto", xl: "0" }}
            w="fit-content"
          >
            {PERKS.map((perk, i) => (
              <HStack key={i} spacing={7}>
                <GradientDivider mx={0} w="30px" zoom={false} />
                <Text>{perk}</Text>
              </HStack>
            ))}
          </VStack>
          <DownloadButtons
            mt={{ base: 10, xl: 20 }}
            mx={{ base: "auto", xl: "unset" }}
            w={"fit-content"}
          />
        </Box>
        <Mockups
          display={{ base: "none", xl: "flex" }}
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          boxSize={"800px"}
        />
      </Box>
    </section>
  );
}

interface MockupProps extends BoxProps {}

function Mockups({ ...props }: MockupProps) {
  return (
    <Center position="relative" {...props}>
      <Image src="/images/cercle.png" w="full" h="full" />
      <HStack
        position="absolute"
        top={0}
        bottom={0}
        spacing={{ base: 3, sm: 5 }}
        left="50%"
        ml={{ base: "-7%", md: "-5%" }}
        transform="translateX(-50%)"
      >
        <Image src="/images/mockup_application1.png" h="70%" />
        <Image src="/images/mockup_application2.png" h="70%" />
      </HStack>
    </Center>
  );
}
