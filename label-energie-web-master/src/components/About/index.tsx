"use client";

import { Box, Flex, Grid, Image, Stack, Text, Wrap } from "@chakra-ui/react";
import Heading from "../shared/Heading";
import { useState } from "react";
import GradientDivider from "../shared/GradientDivider";
import AboutHistorySection from "./AboutHistorySection";
import AboutClimatSection from "./AboutClimatSection";
import AboutMissionSection from "./AboutMissionSection";
import AboutSolutionsSection from "./AboutSolutionsSection";
import AboutLeaderSection from "./AboutLeaderSection";
import CertificationsSection from "../shared/Sections/CertificationsSection";
import ContactSection from "../shared/Contact/ContactSection";
import Link from "next/link";

const ITEMS = [
  {
    title: "NOTRE HISTOIRE",
    id: "histoire",
  },
  {
    title: "NOTRE MISSION",
    id: "mission",
  },
  {
    title: "NOS ENGAGEMENTS",
    id: "engagement",
  },
  {
    title: "NOTRE ÉQUIPE",
    id: "equipe",
  },
];

const ML = { base: "20px", lg: "50px", xl: "100px" };

interface AboutProps {}
export default function About(props: AboutProps) {
  const {} = props;

  const [selected, setSelected] = useState("histoire");

  return (
    <>
      <section>
        <Box position="relative">
          <Box position="relative">
            <Box
              bgGradient="linear(to-r,king,transparent)"
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              top={0}
              opacity={0.8}
            />
            <Image
              src="/images/qui_sommes_nous/accueil.png"
              w="full"
              h="80vh"
              objectFit="cover"
            />
          </Box>
          <Box
            position="absolute"
            left={ML}
            top={{ base: "50%", md: "200px" }}
            transform={{ base: "translateY(calc(-50% - 100px))", md: "unset" }}
            color="white"
          >
            <Text fontWeight={800} fontSize={20}>
              Nous connaître
            </Text>
            <Heading
              as="h1"
              mt={2}
              color="white"
              fontSize={{ base: 35, lg: 45 }}
              textAlign="left"
            >
              Qui sommes-nous
            </Heading>
            <GradientDivider w="50px" mx="0" mt={2} zoom={false} />
          </Box>
          <Grid
            position="absolute"
            bottom={0}
            right={{ base: "0", xl: "unset" }}
            bg="secondaryLight"
            px={ML}
            left={{ base: 0, xl: -10 }}
            roundedRight={{ xl: "full" }}
            roundedTop={{ base: "50px" }}
            gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            columnGap={3}
          >
            {ITEMS.map((item, i) => (
              <Box
                key={i}
                py={{ base: 10, lg: 20 }}
                px={{ xl: 6 }}
                w="fit-content"
                mx={{ base: "auto", md: "unset" }}
              >
                <Text
                  as={Link}
                  href={`#${item.id}`}
                  color="king"
                  fontWeight={800}
                  fontSize={{ base: 15, lg: 18 }}
                  textAlign="center"
                  onClick={() => setSelected(item.id)}
                >
                  {item.title}
                </Text>
                <GradientDivider
                  w="full"
                  h={{ base: 2, lg: 3 }}
                  mx={0}
                  zoom={false}
                  opacity={item.id == selected ? 1 : 0}
                />
              </Box>
            ))}
          </Grid>
        </Box>
      </section>
      <AboutHistorySection />
      <AboutClimatSection />
      <AboutMissionSection />
      <Box position="relative">
        <AboutSolutionsSection />
        <AboutLeaderSection />
      </Box>
      <CertificationsSection />
      <ContactSection />
    </>
  );
}
