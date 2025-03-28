import Container from "@/components/shared/Container";
import GradientDivider from "@/components/shared/GradientDivider";
import { Fade, Zoom } from "@/components/shared/ScrollAnimation";
import {
  Box,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const ITEMS = [
  {
    icon: "conseiller.png",
    title: "Des conseillers à votre écoute",
    subtitle: "Disponibles du lundi au vendredi de 8h à 19h.",
  },
  {
    icon: "expert_renovation.png",
    title: "Experts en rénovation",
    subtitle: "Formés en continu aux nouveautés du secteur.",
  },
  {
    icon: "maison.png",
    title: "Un suivi personnalisé",
    subtitle: "Nos recommandations sont adaptées à votre logement.",
  },
  {
    icon: "conseiller.png",
    title: "Une assistance pour obtenir vos aides",
    subtitle: "Vous êtes guidé pour obtenir la Prime CEE et MaPrimeRenov'.",
  },
];

export default function AccompanySection() {
  return (
    <section>
      <Container mt="80px">
        <Box maxW="650px" mx="auto" textAlign="center">
          <Fade>
            <Text as="h2" fontSize={30} fontWeight={800}>
              Un accompagnement dédié, pour des travaux en toute sérénité
            </Text>
          </Fade>
          <GradientDivider mt={5} />
          <Fade>
            <Text mt={5} fontSize={20}>
              Nos conseillers spécialisés guident votre projet de A à Z.
            </Text>
          </Fade>
        </Box>
        <Stack
          flexDir={{ base: "column", xl: "row" }}
          mt={20}
          spacing={{ base: 0, md: 10 }}
        >
          <Image
            src="/images/conseillers.png"
            alt=""
            title=""
            w="450px"
            my="auto"
            mx={{ base: "auto", "2xl": "unset" }}
          />
          <Wrap
            justify="center"
            spacing={{ base: "30px", md: 10 }}
            mt={{ base: 20, lg: 0 }}
          >
            {ITEMS.map((item, i) => (
              <WrapItem
                as={Zoom}
                key={i}
                w="280px"
                flexDir="column"
                textAlign={{ base: "center", md: "unset" }}
              >
                <Image
                  src={`/icons/${item.icon}`}
                  alt=""
                  title=""
                  h="50px"
                  mx={{ base: "auto", md: "unset" }}
                />
                <Text
                  as="h3"
                  fontSize={25}
                  fontWeight={800}
                  h={{ md: "70px" }}
                  mt={2}
                >
                  {item.title}
                </Text>
                <Text mt={3}>{item.subtitle}</Text>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </Container>
    </section>
  );
}
