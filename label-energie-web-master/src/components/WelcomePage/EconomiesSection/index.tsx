"use client";

import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import { Fade } from "@/components/shared/ScrollAnimation";
import TextHighlighter from "@/components/shared/TextHighlighter";
import { SHADOW } from "@/style/constants";
import {
  Box,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PERKS = [
  {
    label: "Système de Chauffage",
    color:"linear-gradient(to right, #26DDB4, #09B7F6)" ,
    id: "changer-mon-chauffage",
    items: [
      {
        title: "Pompe à Chaleur Air Eau",
        tag: "Jusqu’à 1 000€ d’économies par an",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe une PAC",
          href: "/simulateur",
        },
        image: "pompe_a_chaleur_air_eau.jpg",
      },
      {
        title: "Chaudière à\nGranule",
        tag: "Jusqu’à 1 000€ d’économies par an",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe une Chaudière",
          href: "/simulateur",
        },
        image: "chaudiere_a_granule.jpg",
      },
      {
        title: "Pompe à Chaleur Air Air",
        tag: "Des factures divisées par trois",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe une PAC",
          href: "/simulateur",
        },
        image: "pompe_a_chaleur_air_air.jpg",
      },
      {
        title: "Poêle à\nGranule",
        tag: "Jusqu’à 2 500€ d'aides",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe un Poêle",
          href: "/simulateur",
        },
        image: "poele_a_granule.jpg",
      },
    ],
  },
  {
    label: "Système solaire",
    color: "linear-gradient(to right, #26DDB4, #09B7F6)",
    id: "passer-au-solaire",

    items: [
      {
        title: "Chauffe Eau Solaire",
        tag: "Des factures divisées par trois",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe un chauffe eau",
          href: "/simulateur",
        },
        image: "chauffe_eau_solaire.png",
      },
      {
        title: "Système Solaire Combiné",
        tag: "Des factures divisées par trois",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe un système solaire",
          href: "/simulateur",
        },
        image: "systeme_solaire_combine.png",
      },
      {
        title: "Panneaux Solaire Photovoltaïque",
        tag: "Des factures divisées par trois",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe des panneaux solaires",
          href: "/simulateur",
        },
        image: "panneaux_photovoltaique.png",
      },
      {
        title: "Panneaux Photovoltaïque Thermique",
        tag: "Des factures divisées par trois",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe des panneaux thermiques",
          href: "/simulateur",
        },
        image: "panneaux_photovoltaique_thermique.png",
      },
    ],
  },
  {
    label: "Solution Eau chaude Sanitaire",
    color: "linear-gradient(to right, #26DDB4, #09B7F6)",
    id: "eau-chaude",
    items: [
      {
        title: "Ballon Thermodynamique",
        tag: "Jusqu’à 1 000€ d’économies par an",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe un ballon",
          href: "...",
        },
        image: "ballon_thermo.png",
      },
      {
        title: "Pompe à Chaleur Air Eau",
        tag: "Jusqu’à 1 000€ d’économies par an",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe une PAC",
          href: "...",
        },
        image: "pompe_a_chaleur_air_eau.jpg",
      },
      {
        title: "Chauffe Eau Solaire",
        tag: "Des factures divisées par trois",
        perks: ["Économie", "Confort", "Écologie"],
        button: {
          label: "J'installe un chauffe eau",
          href: "...",
        },
        image: "chauffe_eau_solaire.png",
      },
    ],
  },
];

export default function EconomiesSection({
  defaultType,
}: {
  defaultType: string;
}) {
  const [selected, setSelected] = useState(defaultType);

  useEffect(() => {
    setSelected(defaultType);
  }, [defaultType]);

  return (
    <section>
      <Container mt={"80px"}>
        <Fade>
          <Text
            as="h2"
            fontWeight={800}
            textAlign="center"
            mx="auto"
            fontSize={30}
          >
            Vous voulez faire des économies d'énergie ?
          </Text>
        </Fade>
        <Fade>
          <Text mx="auto" textAlign="center" mt={3} fontSize={20}>
            Nos travaux pour répondre à vos besoins :
          </Text>
        </Fade>
        <Box bg="gray.200" rounded="2xl" w="full" mt="150px" pb={20}>
          <Fade>
            <Flex
              w="fit-content"
              transform="translateY(-50%)"
              mx="auto"
              boxShadow={SHADOW}
              rounded="2xl"
              bg="#00165A"
              p={{ base: 1, md: 2 }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: 1, md: 0 }}
            >
              {PERKS.map((perk, i) => (
                <Stack
                  key={perk.id}
                  id={perk.id}
                  scrollMarginTop="280px"
                  flexDir="row"
                  align="center"
                  justify="center"
                  bgImage={perk.id == selected ? perk.color : "none"}
                  p={{ base: 2, sm: 3, lg: 4 }}
                  spacing={{ base: 1, lg: 2 }}
                  position="relative"
                  cursor="pointer"
                  onClick={() => setSelected(perk.id)}
                  rounded="xl"
                  transition="all 0.3s ease"
                  minH={{ base: "40px", sm: "50px" }}
                  minW={{ base: "280px", sm: "300px", md: "auto" }}
                  display="flex"
                  alignItems="center"
                >
                  <Text
                    fontWeight={perk.id == selected ? "800" : "400"}
                    w="full"
                    fontSize={{ base: 14, sm: 16, lg: 18 }}
                    textAlign="center"
                    color="white"
                    px={2}
                  >
                    {perk.label}
                  </Text>
                </Stack>
              ))}
            </Flex>
          </Fade>

          <Wrap
            px={{ base: 3, md: 10 }}
            spacing={10}
            justify="center"
            mt={{ base: -10, md: 0 }}
          >
            {PERKS.map((perk, i) =>
              perk.items.map((item, j) => (
                <WrapItem
                  as={Fade}
                  key={`${i}-${j}`}
                  w={{ base: "full", sm: "500px" }}
                  bg="white"
                  rounded="xl"
                  overflow="hidden"
                  boxShadow="md"
                  // flexDir={{ base: "column", sm: "row" }}
                  display={perk.id == selected ? "flex" : "none"}
                >
                  <Image
                    src={`/images/${item.image}`}
                    w={{ base: "30%" }}
                    h={{ base: "full" }}
                    objectFit="cover"
                  />
                  <Flex w="full" flexDir={"column"} h="full" flex={1}>
                    <Text bg="skin" fontSize={{ base: "12px", sm: 14 }} p={3}>
                      {item.tag}
                    </Text>
                    <Box px={5} py={2} h="full">
                      <TextHighlighter
                        as="h3"
                        fontSize={{ base: 16, sm: 25 }}
                        fontWeight={800}
                      >
                        {item.title}
                      </TextHighlighter>
                      <Box mt={3} ml={1}>
                        {item.perks.map((perk, j) => (
                          <Text
                            key={j}
                            my={1}
                            fontSize={{ base: "12px", sm: "unset" }}
                          >
                            • {perk}
                          </Text>
                        ))}
                      </Box>
                    </Box>

                    <Text
                      color="white"
                      fontWeight={600}
                      px={6}
                      py={3}
                      mx={5}
                      mb={4}
                      mt={5}
                      textAlign="center"
                      rounded="full"
                      bg="#26DDB4"
                      as={Link}
                      href={item.button.href}
                      fontSize={{ base: "12px", sm: "unset" }}
                    >
                      {item.button.label}
                    </Text>
                  </Flex>
                </WrapItem>
              ))
            )}
          </Wrap>
        </Box>
      </Container>
    </section>
  );
}
