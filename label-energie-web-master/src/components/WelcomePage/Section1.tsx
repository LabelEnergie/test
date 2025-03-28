import {
  Box,
  Text,
  Image,
  Stack,
  Wrap,
  WrapItem,
  VStack,
  Flex,
} from "@chakra-ui/react";
import TextHighlighter from "../shared/TextHighlighter";
import Link from "next/link";

const ITEMS = [
  {
    label: "Chauffer mon eau chaude",
    icon: "eau_chaude.png",
    id: "eau-chaude",
  },
  {
    label: "Changer mon chauffage",
    icon: "chauffer_mon_logement.png",
    id: "changer-mon-chauffage",
  },
  {
    label: "Passer au solaire",
    icon: "passer_au_solaire.png",
    id: "passer-au-solaire",
  },
  {
    label: "Mon bilan énergétique",
    icon: "classe_energetique.png",
    id: "simulateur",
    href: "/simulateur",
  },
];

export default function Section1({ setType }: { setType(id: string): void }) {
  return (
    <section>
      <Flex position="relative" flexDir="column">
        <Box position="relative">
          <Image
            src="/images/maison_equipe_photovoltaique.jpg"
            w="full"
            maxH={{ base: "60vh", lg: "90vh" }}
            objectFit={{ base: "cover", xl: "unset" }}
          />
          <Box
            position="absolute"
            top={0}
            right={0}
            left={0}
            bottom={0}
            bg="king"
            opacity={0.4}
          />
        </Box>
        <TextHighlighter
          as="h1"
          position="absolute"
          fontSize={{ base: 35, md: 40, lg: 60 }}
          maxW="700px"
          my="auto"
          top={{ base: "calc(50% - 150px)", lg: "calc(50% - 100px)" }}
          transform="translateY(-50%)"
          left={{ base: "40px", xl: "calc((100vw - 1200px) / 2)" }}
          color="white"
        >
          {"**La rénovation énergétique**\naccessible à tous"}
        </TextHighlighter>

        <Stack
          position={{ lg: "absolute" }}
          bg="gray.50"
          flexDir={{ base: "column", lg: "row" }}
          bottom={{ base: 0 }}
          left={{ xl: "0" }}
          roundedTopRight="3xl"
          roundedTopLeft={{ base: "3xl", lg: "unset" }}
          color="king"
          p={{ base: 3, lg: 10 }}
          pl={{ lg: 0 }}
          spacing={{ base: 5, md: 10 }}
          align="center"
          w={{ base: "full", lg: "unset" }}
          transform={{ base: "translateY(-20px)", lg: "unset" }}
        >
          <Wrap
            spacing={{ base: 4, md: 10 }}
            justify="center"
            ml={{ lg: "40px", xl: "calc((100vw - 1200px) / 2)" }}
          >
            {ITEMS.map((item, i) => (
              <WrapItem
                key={i}
                as={Link}
                href={item.href ?? `/#${item.id}`}
                borderWidth={2}
                rounded="3xl"
                boxSize={{ base: "130px", xl: "170px" }}
                p={{ base: 3, xl: 5 }}
                boxShadow="md"
                onClick={() => setType(item.id)}
                _hover={{
                  bg: "gray.100",
                }}
                transition="background .2s"
              >
                <VStack spacing={3}>
                  <Image
                    src={`/icons/${item.icon}`}
                    h={{ base: "40px", lg: "50px", xl: "80px" }}
                  />
                  <Text
                    fontSize={13}
                    textAlign="center"
                    fontWeight={800}
                    lineHeight="16px"
                  >
                    {item.label}
                  </Text>
                </VStack>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </Flex>
    </section>
  );
}
