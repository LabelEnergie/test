import AllSubventionsSection from "@/components/HelpsAndSubventions/AllSubventionsSection";
import FAQHelpsAndSubventionsSection from "@/components/HelpsAndSubventions/FAQHelpsAndSubventionsSection";
import Button from "@/components/shared/Button";
import ContactSection from "@/components/shared/Contact/ContactSection";
import IllustratedTextSection from "@/components/shared/IllustratedTextSection";
import CertificationsSection from "@/components/shared/Sections/CertificationsSection";
import DownloadAppSection from "@/components/shared/Sections/DownloadAppSection";
import { Box, Image } from "@chakra-ui/react";

export default function HelpSubventionsPage() {
  return (
    <main>
      <Box position="relative">
        <Image
          w="full"
          src="/images/ligne.svg"
          position="absolute"
          left={0}
          right={0}
          //   transform="scaleX(-1)"
          zIndex={-1}
        />
        <IllustratedTextSection
          image="/images/maison_economies.png"
          title="Aides & Subventions"
          subtitle="Les aides et subventions sont disponibles sous condition de
revenus afin de soutenir financièrement les ménages à
revenu modeste ou moyen dans leurs projets d'amélioration
énergétique ou de transition vers des solutions durables."
          footer={
            <Button href="/simulateur" mt={20}>
              CALCULER MES AIDES
            </Button>
          }
          titleStyle={{
            as: "h1",
            color: "king",
            fontSize: { base: 40, lg: 50 },
          }}
          imageStyle={{
            height: { md: "500px" },
            w: "auto",
          }}
        />

        <AllSubventionsSection />
      </Box>
      <FAQHelpsAndSubventionsSection />
      <CertificationsSection />
      <DownloadAppSection mt={40} />
      <ContactSection />
    </main>
  );
}
