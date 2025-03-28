"use client";

import { Box, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import { SHADOW } from "@/style/constants";
import ContactModal, { ContactModalRef } from "../shared/Modals/ContactModal";
import { useRef } from "react";
import TechnicalDocModal, { TechnicalDocModalRef } from "../shared/Modals/TecnicalDocModal";

const IMAGES = [
  "entretien_clim1.jpg",
  "entretien_clim2.jpg",
  "entretien_clim3.jpg",
  "entretien_clim4.jpg",
];

interface SAVHomeSectionProps {}

export default function SAVHomeSection(props: SAVHomeSectionProps) {
  const {} = props;

  const contactModalRef = useRef<ContactModalRef>(null);
  const TechnicalDocModalRef = useRef<TechnicalDocModalRef>(null);

  return (
    <>
      <section>
        <Box maxW="1400px" px={5} mx="auto" mb={20}>
          <Stack
            flexDir={{ base: "column", lg: "row" }}
            mt={10}
            align="center"
            justifyContent="space-between"
            spacing={5}
          >
            <Box w={{ lg: "400px" }}>
              <Heading
                as="h1"
                fontSize={{ base: 40, lg: 40, xl: 50 }}
                textAlign="left"
              >
                SERVICE APRÈS VENTE
              </Heading>
              <Text mt={5} color="king">
                Notre service après-vente est à votre écoute et à votre service
                en cas de besoin, avec une intervention rapide pour vous
                garantir une satisfaction totale.
              </Text>
              <Button mt={20} onClick={() => contactModalRef.current?.onOpen()}>
                J'ai besoin d'assistance
              </Button>
              <Button variant="outline" mt={5} onClick={() => TechnicalDocModalRef.current?.onOpen()}>
                Doc Technique
              </Button>
            </Box>
            <Grid
              gridTemplateColumns={{ md: "repeat(2,1fr)" }}
              gap={5}
              // w={{ base: "fit-content", md: "unset" }}
            >
              {IMAGES.map((image, i) => (
                <Image
                  key={image}
                  src={`/images/sav/${image}`}
                  w={{ md: "450px" }}
                  h="full"
                  alt=""
                  title=""
                  rounded="md"
                  boxShadow={SHADOW}
                  display={{ base: i % 2 == 0 ? "block" : "none", md: "block" }}
                />
              ))}
            </Grid>
          </Stack>
        </Box>
      </section>
      <ContactModal ref={contactModalRef} />
      <TechnicalDocModal ref={TechnicalDocModalRef} />
    </>
  );
}
