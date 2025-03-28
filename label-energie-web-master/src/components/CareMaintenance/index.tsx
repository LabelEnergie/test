import { Box, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";
import HeaderWithPerksSection from "../shared/Sections/HeaderWithPerksSection";
import IllustratedTextSection from "../shared/IllustratedTextSection";
import Button from "../shared/Button";
import Container from "../shared/Container";
import Offer from "./Offer";
import CustomService from "./CustomService";
import DownloadAppSection from "../shared/Sections/DownloadAppSection";
import FAQSection from "../shared/Sections/FAQSection";
import ContactSection from "../shared/Contact/ContactSection";
import TextHighlighter from "../shared/TextHighlighter";
import { OFFERS } from "@/constants/contract";

export default function CareMaintenance() {
  return (
    <>
      <HeaderWithPerksSection
        h1="ENTRETIEN & MAINTENANCE"
        subtitle="Un contrat d'entretien sur mesure et dédié à votre installation de chauffage, d'eau chaude sanitaire et système solaire."
        button={{
          label: "Souscrire",
          href: "#offres",
        }}
        image="/images/entretien_technicien.png"
        bandItems={[
          {
            icon: "economies.png",
            title: "Jusqu'à 50% d'économie sur votre facture de chauffage",
          },
          {
            icon: "durabilite.png",
            title: "Durabilité de votre installation",
          },
          {
            icon: "chauffagiste.png",
            title: "Confort de chauffage dans votre logement",
          },
        ]}
      />
      <Box position="relative">
        <Image
          position="absolute"
          src="/images/ligne.svg"
          w="full"
          objectFit="fill"
          top="100px"
          left="0"
          right={0}
          zIndex={-1}
          display={{ base: "none", lg: "block" }}
        />
        <IllustratedTextSection
          image="/images/entretien_annuel.png"
          title="Entretien Annuel"
          subtitle="Découvrez les contrats d'entretien de Label Energie, conçus
pour optimiser la performance de vos systèmes de chauffage
et de climatisation. Ces contrats garantissent un confort
maximal, des économies d'énergie, et prolongent la durée de
vie de vos équipements. Ils assurent également la sécurité de
votre système de chauffage grâce à des interventions
régulières et une garantie de performance optimale."
          titleStyle={{ color: "king" }}
        />
        <IllustratedTextSection
          image="/images/assistance_technique.png"
          title="Assistance Technique"
          subtitle="Chez Label Energie, nous offrons un service d'assistance
        technique complet pour répondre à tous vos besoins. En cas de
        panne ou de dysfonctionnement, notre service d'assistance
        technique est disponible pour vous offrir une aide immédiate,
        garantissant la sécurité et la performance de votre
        équipement. Grâce à notre assistance, vous pouvez retrouver
        rapidement le confort et la sérénité dans votre domicile. De
        plus, nous fournissons des conseils d'experts pour optimiser
        l'utilisation et l'entretien de vos systèmes, contribuant ainsi à
        leur durabilité et à votre satisfaction."
          titleStyle={{ color: "king" }}
          reversed
          mt={10}
        />
        <IllustratedTextSection
          image="/images/depannage_urgent.png"
          title="Dépannage Urgent"
          subtitle="Label Energie propose un service d'intervention de dépannage
        en cas d'urgence, disponible pour résoudre rapidement tout
        problème lié à votre système de chauffage, de climatisation, ou
        d'eau chaude. Nos techniciens spécialisés sont prêts à
        intervenir à tout moment pour diagnostiquer et réparer les
        pannes, garantissant ainsi la sécurité et le confort de votre
        domicile. Grâce à notre réactivité et à notre expertise, vous
        pouvez avoir l'esprit tranquille, sachant que votre système de
        chauffage, de climatisation, et d'eau chaude est entre de
        bonnes mains."
          titleStyle={{ color: "king" }}
          mt={10}
          footer={
            <Box mt={5}>
              <Button href="#offres">Souscrire en ligne</Button>
            </Box>
          }
        />
      </Box>

      <section>
        <Container mt={10} id="offres" scrollMarginTop="100px">
          <Text
            as="h2"
            color="king"
            fontWeight={800}
            textAlign="center"
            fontSize={{ base: 30, lg: 40 }}
          >
            NOS OFFRES
          </Text>
          <Wrap justify="center" mt={10} spacing={10} mb={10} w="full">
            {OFFERS.map((offer) => (
              <WrapItem key={offer.id}>
                <Offer {...offer} />
              </WrapItem>
            ))}
          </Wrap>
          <CustomService mt={20} maxW="980px" />
        </Container>
      </section>
      <DownloadAppSection />
      <FAQSection />
      <section>
        <Container>
          <TextHighlighter>
            {`*La programmation de votre 1ère visite d’entretien se fera à l’issue de votre demande de souscription en ligne. La prochaine visite d’entretien sera programmée automatiquement par Label Energie 2 ans après, sauf résiliation de la formule Liberté .

(1) Obligation légale selon le décret n°2020-912 du 28 juillet 2020 relatif à l’inspection et à l’entretien des chaudières, des systèmes de chauffages et des systèmes de climatisation dont la puissance nominale est comprise entre 4kW et 70 Kw.

(2) Prise en charge en moins de 2 heures : lors de la détection d’un dysfonctionnement de la pompe à chaleur grâce au service illigo, l’agence Label Energie prend contact avec le client (par sms, e-mail ou par téléphone) dans les 2 heures pour l’informer de sa prise en charge.

(3) Délai d’intervention : le délai d’intervention d’un technicien, en cas de dépannage, et sauf cas de force majeure, est de 72 heures ouvrables à compter de la demande d’intervention.

(4) Le diagnostic à distance permet une résolution rapide des pannes : tutoriel à distance proposé en cas de dysfonctionnement mineur ne nécessitant pas le déplacement d’un technicien ou si une intervention est nécessaire, elle est facilitée par le diagnostic. Le déplacement et la main d’oeuvre sont compris dans le tarif. Les pièces de rechange donnent lieu à une proposition de devis gratuit au client (sauf en cas d'application d'une garantie).

(5) Avant l’intervention, un devis vous sera remis.

(6) Uniquement valable lors du 1er dépannage incluant un changement de pièces. Hors compresseur et fluides frigorigènes.

(* *) Service en option disponible sans supplément en plus du contrat d’entretien Sécurité PAC.`}
          </TextHighlighter>
        </Container>
      </section>
      <ContactSection />
    </>
  );
}
