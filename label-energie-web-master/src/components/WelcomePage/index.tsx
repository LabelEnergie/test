"use client";

import { Box } from "@chakra-ui/react";
import Section1 from "./Section1";
import CardSection from "../shared/Sections/CardSection";
import Button from "../shared/Button";
import CetelemSection from "../shared/Sections/CetelemSection";
import EconomiesSection from "./EconomiesSection";
import AccompanySection from "./AccompanySection";
import ProcessSection from "./ProcessSection";
import PartnersSection from "./PartnersSection";
import ReviewsSection from "../shared/Sections/ReviewsSection";
import CertificationsSection from "../shared/Sections/CertificationsSection";
import ContactSection from "../shared/Contact/ContactSection";
import DownloadAppSection from "../shared/Sections/DownloadAppSection";
import { useState } from "react";

export default function Welcome() {
  const [type, setType] = useState("changer-mon-chauffage");

  return (
    <Box>
      <Section1 setType={setType} />
      <CardSection
        image="/images/lequipe.jpg"
        tag="Label Energie"
        title="L'énergie au sens propre"
        text={`Label Energie se présente comme le spécialiste français en matière de rénovation énergétique. Avec plusieurs années d’expérience dans le domaine de l’énergie renouvelable, nous avons acquis une solide connaissance des différents types de système solaire, thermodynamique et de leur fonctionnement.

Nous offrons des conseils personnalisés pour aider nos clients à choisir les meilleures solutions en matière d’énergie solaire pour leurs besoins, ainsi qu’une installation rapide et fiable de haute qualité.

Nous sommes convaincus que l’énergie solaire est la clé d’un avenir durable et nous sommes ravis de faire notre part pour aider à atteindre cet objectif.`}
        mt={{ base: "40px", lg: "100px" }}
      >
        <Button variant="outline" href="/qui-sommes-nous">
          En savoir plus
        </Button>
      </CardSection>
      <CetelemSection pb={10}/>
      <EconomiesSection defaultType={type} />
      <AccompanySection />
      {/* <CetelemSection pb={10} /> */}

      <ProcessSection mt={10} />
      <PartnersSection />
      <ReviewsSection />
      <CetelemSection pb={10}/>
      <CertificationsSection />
      <DownloadAppSection mt={0}/>
      <CertificationsSection />
      <ContactSection />
    </Box>
  );
}
