"use client";

import { Accordion, Box, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import GradientDivider from "../shared/GradientDivider";
import { useState } from "react";
import { SolutionType } from "@/types/solution.types";
import FAQSection from "../shared/Sections/FAQSection";
import FAQItem from "../shared/Sections/FAQSection/FAQItem";

interface SAVFAQSectionProps {}

export default function SAVFAQSection(props: SAVFAQSectionProps) {
  const {} = props;

  const [selected, setSelected] = useState(SolutionType.PAC_AW);

  return (
    <section>
      <Box bg="king" py={10}>
        <Container>
          <Heading as="h2" color="white" mt={10}>
            FAQ : Foire Aux Questions
          </Heading>
          <GradientDivider mt={10} />
          <Text
            color="white"
            textAlign="center"
            mt={10}
            fontSize={{ base: 30, lg: 40 }}
          >
            Service Après Vente
          </Text>
          <Wrap mt={10} justify="center" spacing={5}>
            {SOLUTIONS.map(({ title, value }) => (
              <WrapItem key={value}>
                <Text
                  color="white"
                  bg="king"
                  borderWidth={1}
                  borderColor="white"
                  rounded="full"
                  px={5}
                  py={2}
                  fontWeight={500}
                  cursor="pointer"
                  onClick={() => setSelected(value)}
                  transition="all .3s"
                  userSelect="none"
                  {...(selected == value && {
                    color: "king",
                    borderColor: "primary",
                    bg: "primary",
                  })}
                >
                  {title}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
          <Accordion allowMultiple mt={20}>
            {QUESTIONS.filter((q) => q.types.includes(selected) || q.isGlobal)
              .flatMap((q) => q.items)
              .map((q, i) => (
                <FAQItem {...q} key={q.title + i} bg="white" />
              ))}
          </Accordion>
        </Container>
      </Box>
    </section>
  );
}

const SOLUTIONS = [
  { title: "Pompe à Chaleur Air Eau", value: SolutionType.PAC_AW },
  { title: "Pompe à Chaleur Air Air", value: SolutionType.PAC_AA },
  { title: "Chauffe-eau Thermodynamique", value: SolutionType.CET },
  // { title: "VMC", value: SolutionType.VMC },
  { title: "Système Solaire Combiné", value: SolutionType.SSC },
  { title: "Chauffe-eau Solaire", value: SolutionType.CES },
  { title: "Chaudière à Granule", value: SolutionType.CG },
  { title: "Poêle à Granule", value: SolutionType.PG },
];

const QUESTIONS: {
  types: SolutionType[];
  items: {
    title: string;
    response: string;
  }[];
  isGlobal?: boolean;
}[] = [
  {
    types: [SolutionType.PAC_AW],
    items: [
      {
        title: "Ma pompe à chaleur ne fonctionne plus, que dois-je faire ?",
        response:
          "Vérifiez d'abord les paramètres de votre appareil, assurez-vous que le thermostat est correctement réglé et que\
l'alimentation électrique est active. Si le problème persiste, contactez notre service après-vente.",
      },
      {
        title: "Pourquoi ma pompe à chaleur fonctionne-t-elle en continu ?",
        response:
          "Cela peut indiquer un problème de thermostat, un manque de fluide frigorigène ou un dimensionnement incorrect.\
      Un diagnostic professionnel est nécessaire pour déterminer la cause exacte.",
      },
      {
        title: "Pourquoi ma pompe à chaleur Air-Eau gèle-t-elle en hiver ?",
        response:
          "Le givre sur l'unité extérieure peut être normal, mais si l'unité gèle complètement, cela peut indiquer un problème\
      avec le cycle de dégivrage automatique. Contactez notre service technique pour une inspection.",
      },
      {
        title: "La pompe à chaleur Air-Eau fait un bruit anormal, que faire ?",
        response:
          "Vérifiez que rien ne bloque l'unité extérieure et que les filtres sont propres. Si le bruit persiste, éteignez l'appareil et\
      contactez notre service après-vente pour éviter des dommages supplémentaires.",
      },
      {
        title:
          "Ma pompe à chaleur Air-Eau produit de l'eau chaude irrégulière, pourquoi ?",
        response:
          "Cela peut être dû à des problèmes de circulation de fluide ou à des réglages incorrects du thermostat. Contactez\
      notre service après-vente pour un diagnostic approfondi.",
      },
      {
        title:
          "Mon thermostat ne semble pas contrôler correctement ma pompe à chaleur Air-Eau, que dois-je faire ?",
        response:
          "Assurez-vous que le thermostat est correctement programmé et que les piles sont en bon état. Si le problème\
      persiste, il peut s'agir d'un dysfonctionnement nécessitant l'intervention d'un professionnel.",
      },
      {
        title:
          "Ma pompe à chaleur Air-Eau consomme plus d'électricité que d'habitude, pourquoi ?",
        response:
          "Une consommation excessive peut être due à un entretien insuffisant, à un filtre à air obstrué, ou à une demande de\
      chauffage accrue. Un entretien régulier et une inspection par un professionnel peuvent aider à identifier la cause.",
      },
      {
        title:
          "Quelle est la meilleure façon de programmer ma pompe à chaleur Air-Eau pour des économies d'énergie ?",
        response:
          "Utilisez des thermostats programmables pour régler des températures différentes selon les moments de la journée\
      et les jours de la semaine. Abaissez la température lorsque vous êtes absent ou pendant la nuit pour économiser de\
      l'énergie.",
      },
    ],
  },
  {
    types: [SolutionType.CES],
    items: [
      {
        title:
          "Mon chauffe-eau solaire ne chauffe plus l'eau correctement, que dois-je faire ?",
        response:
          "Vérifiez l'état des capteurs solaires et des circuits de fluide. En hiver, il est recommander de fermer les vannes du\
          capteur solaire. Si tout semble en ordre, contactez notre service après-vente pour un diagnostic approfondi.",
      },
    ],
  },
  {
    types: [SolutionType.SSC],
    items: [
      {
        title:
          "Mon système solaire ne produit plus d'énergie, que puis-je vérifier ?",
        response:
          "Assurez-vous que les panneaux solaires ne sont pas couverts de saleté ou d'ombre. Vérifiez également l'état du\
          contrôleur de charge et des connexions. Si nécessaire, contactez notre service technique.",
      },
    ],
  },
  {
    types: [SolutionType.PG],
    items: [
      {
        title: "Mon poêle à granules ne s'allume plus, que dois-je vérifier ?",
        response:
          "Les aides couvrent divers travaux, tels que le remplacement de systèmes de chauffage, l'installation de dispositifs\
          utilisant des énergies renouvelables, et bien plus encore.",
      },
    ],
  },
  {
    types: [],
    isGlobal: true,
    items: [
      {
        title:
          "Quel délai d'intervention après avoir contacté le service après-vente ?",
        response:
          "Nous nous engageons à intervenir dans les plus bref délai suivant votre demande et l’urgence, sauf en cas de\
          situation exceptionnelle.",
      },
      {
        title:
          "Mon équipement est encore sous garantie, que couvre-t-elle exactement ?",
        response:
          "La garantie couvre les défauts de fabrication et les pannes dues à des composants défectueux. Elle ne couvre pas les\
          dommages causés par une mauvaise utilisation ou un entretien inadéquat.",
      },
    ],
  },
];
