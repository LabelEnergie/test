import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PACAirEau() {
  return (
    <Solution
      id={SolutionType.PAC_AW}
      h1="POMPE À CHALEUR AIR EAU"
      subtitle="La pompe à chaleur Air-Eau vous permet d’effectuer jusqu’à
  70% d’économies d’énergie en remplacement de votre
  système de chauffage traditionnel. Il s’agit d’un système de
  chauffage performant, économe et silencieux."
      bandItems={[
        {
          icon: "economies.png",
          title: "Jusqu’à 50% d’économie sur votre facture de chauffage",
        },
        {
          icon: "euro.png",
          title: "Aides & Subventions pour votre installations",
        },
        {
          icon: "maison_couleurs.png",
          title: "Confort de chauffage dans votre logement",
        },
      ]}
      section1={{
        title: "Qu'est ce qu'une pompe à chaleur ?",
        subtitle: `La pompe à chaleur Air-Eau, également appelée PAC Air-Eau ou pompe à chaleur aérothermique permet de chauffer l’ensemble de votre maison, et peut également être utilisée pour chauffer l’eau chaude sanitaire.

Les systèmes de pompes à chaleur sélectionnés par Label Energie apportent chaleur et confort dans votre maison.
        
Du fait de sa grande efficacité, la pompe à chaleur Air-Eau est souvent utilisée dans le cadre de travaux de rénovation énergétique.

L’installation d’une pompe à chaleur apporte une réelle plus-value à votre habitation, en la dotant d’un système de chauffage moderne, pérenne, économique et ultra-performant.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `La pompe à chaleur Air-Eau prélève les calories présentes dans l’air extérieur pour les restituer à l’intérieur de votre maison.
Ces calories sont utilisées pour chauffer l’eau qui circule dans votre circuit de chauffage, via l’échangeur du système de la pompe à chaleur.

Label Energie maîtrise les différents systèmes de pompe à chaleur Air-Eau, à savoir :

- Les pompes à chaleur basse température, utilisées pour les maisons, avec des radiateurs ne nécessitant pas une température élevée ou pour des planchers chauffants

- Les pompes à chaleur haute température, utilisées pour les maisons avec des radiateurs nécessitants de l’eau à température élevée (75°- 80°)`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour une pompe à chaleur Air-Eau ?",
        subtitle: `L’installation d’une PAC Air/Eau vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- TVA réduite à 5,5%**
**- MaPrimeRénov'**
**- MaPrimeRénov' Sérénité non cumulable avec MaPrimeRénov'**
**- Certificats d’économie d’énergie (CEE)**
**- Prime Coup de pouce Pompe à chaleur Air-Eau**
**- Eco-PTZ**
**- Chèque énergie**
**- Autres aides locales ou régionales**`,
        images: ["maprimerenov.png", "cee.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE POMPE À CHALEUR",
        perks: [
          "daikin.png",
          "lg.png",
          "ariston.png",
          "chaffoteaux.png",
          "panasonic.png",
          "atlantic.png",
        ],
      }}
      askEstimation={{
        title: "Un projet d'installation de Pompe à Chaleur ?",
      }}
    />
  );
}
