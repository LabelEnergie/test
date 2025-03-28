"use client";

import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Button from "../shared/Button";
import IllustratedTextSection from "../shared/IllustratedTextSection";
import ReviewsSection from "../shared/Sections/ReviewsSection";
import HandKeySection from "../shared/Sections/HandKeySection";
import CetelemSection from "../shared/Sections/CetelemSection";
import CertificationsSection from "../shared/Sections/CertificationsSection";
import ContactSection from "../shared/Contact/ContactSection";
import { SolutionType } from "@/types/solution.types";
import CardSection from "../shared/Sections/CardSection";
import HeaderWithPerks from "../shared/Sections/HeaderWithPerksSection";
import DownloadAppSection from "../shared/Sections/DownloadAppSection";

interface SolutionProps {
  id: SolutionType;
  h1: string;
  subtitle: string;
  bandItems: { icon: string; title: string }[];
  section1: {
    title: string;
    subtitle: string;
  };
  section2: {
    title: string;
    subtitle: string;
  };
  section3?: {
    title: string;
    subtitle: string;
    images?: string[];
  };
  partnersSection: {
    title: string;
    perks: string[];
  };
  askEstimation: {
    title: string;
  };
  displayCertifications?: boolean;
  displayCetelem?: boolean;
  simulationPath?: string;
}

export default function Solution(props: SolutionProps) {
  const {
    id,
    h1,
    subtitle,
    bandItems,
    section1,
    section2,
    section3,
    partnersSection,
    askEstimation,
    displayCertifications,
    displayCetelem,
    simulationPath,
  } = props;

  return (
    <main>
      <HeaderWithPerks
        image={`/images/solutions/${id}_accueil.jpg`}
        button={{
          label: "Je simule mon projet",
          href: simulationPath ?? "/simulateur",
        }}
        bandItems={bandItems}
        h1={h1}
        subtitle={subtitle}
      />
      <IllustratedTextSection
        {...section1}
        image={`/images/solutions/${id}_section1.jpg`}
      />

      <CardSection
        title={section2.title}
        image={`/images/solutions/${id}_section2.jpg`}
        text={section2.subtitle}
        bg="gray.100"
        py={{ base: 10, xl: 20 }}
        mt={5}
        mb={8}
        reversed
      />
      {section3 && (
        <CardSection
          title={section3.title}
          image="/images/aides_et_subventions.jpg"
          text={section3.subtitle}
          py={20}
        >
          <Wrap spacing={7} justify="center">
            <WrapItem>
              <Button
                my="auto"
                href={simulationPath ?? "/simulateur"}
                px={6}
                fontSize={18}
              >
                Je simule mon projet
              </Button>
            </WrapItem>
            {section3.images?.map((image, i) => (
              <WrapItem key={i}>
                <Image src={`/images/certifications/${image}`} h="110px" />
              </WrapItem>
            ))}
          </Wrap>
        </CardSection>
      )}
      <section>
        <Box
          bgGradient="linear(to-r, secondary,primary)"
          w={{ base: "full", xl: "80%" }}
          roundedRight={{ xl: "full" }}
          px={{ base: 5, xl: "100px", "2xl": "150px" }}
          py={{ base: 10, lg: 20 }}
          mb="50px"
        >
          <Text
            as="h2"
            color="white"
            fontWeight={800}
            fontSize={{ base: 30, md: 40 }}
            textAlign="center"
          >
            {partnersSection.title}
          </Text>
          <Wrap justify="center" mt={10} spacing={{ base: 4, md: 10 }}>
            {partnersSection.perks.map((perk, i) => (
              <WrapItem
                key={i}
                bg="white"
                rounded="full"
                h={{ base: "40px", sm: "60px", md: "80px" }}
                w={{ base: "140px", sm: "200px", md: "300px" }}
              >
                <Image
                  src={`/images/partenaires/${perk}`}
                  h="50%"
                  mx="auto"
                  my="auto"
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </section>
      <HandKeySection />
      <section>
        <Box w="full" position="relative" h="300px">
          <Image
            src={`/images/solutions/${id}_accueil.jpg`}
            w="full"
            h="full"
            objectFit="cover"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="king"
            opacity={0.6}
          />
          <VStack
            px={5}
            position="absolute"
            left={0}
            right={0}
            top="50%"
            transform="translateY(calc(-50% - 20px))"
            spacing={7}
          >
            <Text
              as="h2"
              color="white"
              fontSize={{ base: 30, lg: 40 }}
              fontWeight={800}
              textAlign="center"
              pt={10}
            >
              {askEstimation.title}
            </Text>
            <Button href={simulationPath ?? "/simulateur"}>
              Demander un devis
            </Button>
          </VStack>
        </Box>
      </section>
      <ReviewsSection mt={0} />

      <CetelemSection mt={0} py={10} />

      <CertificationsSection />
      <DownloadAppSection />
      <ContactSection />
    </main>
  );
}
