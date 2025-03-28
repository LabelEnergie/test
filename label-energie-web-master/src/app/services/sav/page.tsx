import SAVFAQSection from "@/components/SAV/SAVFAQSection";
import SAVHomeSection from "@/components/SAV/SAVHomeSection";
import Button from "@/components/shared/Button";
import ContactSection from "@/components/shared/Contact/ContactSection";
import IllustratedTextSection from "@/components/shared/IllustratedTextSection";
import CertificationsSection from "@/components/shared/Sections/CertificationsSection";
import DownloadAppSection from "@/components/shared/Sections/DownloadAppSection";
import { FORM_MAINTENANCE_HREF } from "@/constants/headerItems";
import { Image } from "@chakra-ui/react";

export default function ServiceSavPage() {
  return (
    <main>
      <SAVHomeSection />
      <IllustratedTextSection
        image="/images/sav/un_pro_a_votre_ecoute.png"
        title={`Une panne ?
Un pro à votre écoute`}
        subtitle="Notre service après-vente incarne la réactivité et
              l'engagement envers la satisfaction client. Il se
              distingue par sa capacité à répondre avec
              promptitude aux besoins et aux préoccupations
              des clients, offrant des solutions sur mesure qui
              résolvent efficacement les problèmes
              rencontrés. Que ce soit pour résoudre un
              dysfonctionnement technique, répondre à une
              question ou simplement offrir un soutien, notre
              service SAV de qualité se tient toujours prêt à
              intervenir, assurant ainsi une expérience client
              fluide et gratifiante."
        bg="king"
        titleStyle={{ color: "white" }}
        subTitleStyle={{ color: "white" }}
        pb={{ base: "50px", lg: "100px" }}
      />
      <Image w="full" h="100px" src="/images/demi-cercle.svg" mb={10} mt={-1} />
      <IllustratedTextSection
        image="/images/assistance_technique.png"
        title="Assistance Technique"
        subtitle="Chez Label Energie, nous offrons un service
        d'assistance technique complet pour répondre à
        tous vos besoins. En cas de panne ou de
        dysfonctionnement, notre service d'assistance
        technique est disponible pour vous offrir une
        aide immédiate, garantissant la sécurité et la
        performance de votre équipement. Grâce à
        notre assistance, vous pouvez retrouver
        rapidement le confort et la sérénité dans votre
        domicile. De plus, nous fournissons des conseils
        d'experts pour optimiser l'utilisation et
        l'entretien de vos systèmes, contribuant ainsi à
        leur durabilité et à votre satisfaction."
        reversed
        titleStyle={{ color: "king" }}
        footer={
          <Button href={FORM_MAINTENANCE_HREF} mt={5}>
            SOUSCRIRE
          </Button>
        }
      />
      <IllustratedTextSection
        image="/images/sav/reactivite_intervention.png"
        title="Réactivité d'Intervention"
        subtitle="Notre service après-vente incarne la réactivité et
        l'engagement envers la satisfaction client. Il se
        distingue par sa capacité à répondre avec
        promptitude aux besoins et aux préoccupations des
        clients, offrant des solutions sur mesure qui résolvent
        efficacement les problèmes rencontrés. Que ce soit
        pour résoudre un dysfonctionnement technique,
        répondre à une question ou simplement offrir un
        soutien, notre service SAV de qualité se tient toujours
        prêt à intervenir, assurant ainsi une expérience client
        fluide et gratifiante."
        bg="gray.100"
        mt={20}
        titleStyle={{ color: "king" }}
      />
      <IllustratedTextSection
        image="/images/sav/operateur_sav.png"
        title="Un Problème ?"
        subtitle="Notre équipe de profesionnels est à votre écoute pour répondre à tous vos besoins."
        reversed
        titleStyle={{ color: "king" }}
        footer={
          <Button mt={10} href="#contact">
            Nous contacter
          </Button>
        }
        my={10}
      />
      <SAVFAQSection />
      <CertificationsSection />
      <DownloadAppSection mt={40} />
      <ContactSection />
    </main>
  );
}
