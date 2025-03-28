"use client";

import {
  Box,
  BoxProps,
  Center,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import { useRef } from "react";
import Card from "../shared/Card";
import Container from "../shared/Container";
import IllustratedTextSection from "../shared/IllustratedTextSection";
import Button from "../shared/Button";

const SUBVENTIONS = [
  {
    text: "Rénover malin : profitez de la TVA\
    réduite à 5,5 % pour vos travaux de\
    rénovation énergétique, des\
    économies immédiates et un\
    confort durable !",
    image: "tva5.png",
  },
  {
    text: "Bénéficiez de MaPrimeRénov' :\
    financez vos travaux de rénovation\
    énergétique et profitez\
    d'économies immédiates et d'un\
    confort amélioré !",
    image: "maprimerenov2.png",
  },
  {
    text: "Assurez vos rénovations\
    énergétiques en toute sérénité\
    avec les Certificats d'Économies\
    d'Énergie (CEE) : des aides\
    financières pour des économies\
    garanties et un confort optimal !",
    image: "cee.png",
  },
  {
    text: "Sérénité garantie avec le Prêt à\
    Taux Zéro (PTZ) : financez vos\
    travaux de rénovation énergétique\
    sans intérêts, pour des économies\
    durables et un confort accru !",
    image: "PTZ.png",
  },
  {
    text: "Simplifiez vos dépenses\
    énergétiques avec le chèque\
    énergie : une aide financière pour\
    alléger vos factures et améliorer\
    votre confort quotidien !",
    image: "cheque_energie_logo.png",
  },
];

interface AllSubventionsSectionProps {}

export default function AllSubventionsSection(
  props: AllSubventionsSectionProps
) {
  const {} = props;

  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <Box px={{ base: 5, lg: 20 }} mt={20}>
        <Heading as="h2">
          Économisez et rénovez avec les aides énergétiques
        </Heading>
        <GradientDivider my={7} />
        <Text textAlign="center" fontSize={18}>
          Améliorez votre maison et réduisez vos factures grâce aux aides
          énergétiques!
        </Text>
      </Box>
      <Box position="relative">
        <HStack
          ref={stackRef}
          my={20}
          align="stretch"
          overflowX={{ base: "auto", md: "hidden" }}
          spacing={10}
          px={{ base: "5px", sm: "50px", md: "50px" }}
        >
          {SUBVENTIONS.map(({ image, text }, i) => (
            <Card
              key={i}
              minW={{ base: "250px", lg: "350px" }}
              h={{ base: "330px", lg: "300px" }}
              my={5}
            >
              <Image
                src={`/images/subventions/${image}`}
                h={{ base: "40px", lg: "50px" }}
                mx="auto"
                mt={5}
                mb={{ base: 5, lg: 10 }}
              />
              <Text textAlign="center">{text}</Text>
            </Card>
          ))}
        </HStack>
        <ArrowButton
          onClick={() => {
            stackRef.current?.scrollTo({
              left: Math.max((stackRef.current?.scrollLeft ?? 0) - 340, 0),
              behavior: "smooth",
            });
          }}
          position="absolute"
          top="0"
          left={0}
          display={{ base: "none", md: "flex" }}
        />
        <ArrowButton
          onClick={() => {
            stackRef.current?.scrollTo({
              left: Math.min(
                (stackRef.current?.scrollLeft ?? 0) + 340,
                (stackRef.current?.scrollWidth ?? 0) -
                  (stackRef.current?.clientWidth ?? 0)
              ),
              behavior: "smooth",
            });
          }}
          position="absolute"
          top="0"
          display={{ base: "none", md: "flex" }}
          right="0"
          transform="rotate(180deg)"
        />
      </Box>
      <Container>
        <IllustratedTextSection
          title="Bénéficiez des subventions pour des économies et un confort durable !"
          subtitle="Avec Label Energie découvrez toutes les opportunités offertes par les aides et
subventions pour la rénovation énergétique ! Que ce soit avec la TVA réduite à
5,5 %, MaPrimeRénov', le Prêt à Taux Zéro (PTZ) ou encore les Certificats
d'Économies d'Énergie (CEE), vous avez à votre disposition une gamme
complète de soutiens financiers pour réaliser vos travaux.
Ces dispositifs sont conçus pour rendre vos rénovations plus abordables,
réduire vos factures énergétiques et améliorer votre confort de vie. Profitez de
ces aides pour transformer votre habitat, faire des économies immédiates et
contribuer à la protection de l'environnement. Passez à l'action et bénéficiez
d'un accompagnement sur mesure pour tous vos projets de rénovation
énergétique !"
          image="/images/maison_aides_et_subventions.png"
          titleStyle={{ color: "king" }}
          footer={
            <Button href="/simulateur" mt={10}>
              J'EN PROFITE MAINTENANT
            </Button>
          }
        />
      </Container>
    </section>
  );
}

function ArrowButton({ onClick, ...rest }: BoxProps) {
  return (
    <Flex
      bgGradient="linear(to-r,white 30%,transparent)"
      h="full"
      w={{ base: "50px", lg: "100px" }}
      alignItems="center"
      {...rest}
    >
      <Image
        src={`/icons/caret.svg`}
        boxSize={{ sm: "25px", md: "40px" }}
        userSelect="none"
        cursor="pointer"
        title=""
        onClick={onClick}
        alt=""
      />
    </Flex>
  );
}
