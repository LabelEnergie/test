import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PSP() {
  return (
    <Solution
      id={SolutionType.CG}
      h1="CHAUDIERE A GRANULE"
      subtitle="Une solution écologique et économique pour chauffer votre maison tout en réduisant vos factures énergétiques !"
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
        title: "Qu'est ce qu'une chaudière à granule ?",
        subtitle: `Une chaudière à granulés est un système de chauffage central qui utilise des granulés de bois compressés comme combustible pour produire de la chaleur. Ces granulés, fabriqués à partir de résidus de bois, brûlent de manière efficace et propre. La chaudière chauffe l'eau qui circule ensuite dans les radiateurs ou le plancher chauffant de la maison, assurant une répartition uniforme de la chaleur. 
        
L'utilité d'une chaudière à granulés réside dans sa capacité à fournir une source de chauffage durable, économique et écologique, réduisant ainsi la dépendance aux énergies fossiles et les émissions de gaz à effet de serre, tout en offrant un confort thermique optimal.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Une chaudière à granulés fonctionne en brûlant des granulés de bois compressés pour chauffer l'eau de votre système de chauffage central. Les granulés sont stockés dans un réservoir, d'où ils sont automatiquement acheminés vers le brûleur par une vis sans fin. Un élément d'allumage enflamme les granulés, produisant de la chaleur. Cette chaleur est transférée à l'eau circulant dans un échangeur de chaleur. 
        
L'eau chauffée est ensuite distribuée dans les radiateurs ou le plancher chauffant de la maison. Un système de contrôle automatique régule la température et l'alimentation en granulés, assurant une combustion efficace et un chauffage constant.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour une chaudière à granule ?",
        subtitle: `L’installation d'une chaudière à granule vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- TVA réduite à 5,5%**
**- MaPrimeRénov'**
**- MaPrimeRénov' Sérénité non cumulable**
**- Certificats d’économie d’énergie (CEE)**`,
        images: ["maprimerenov.png", "cee.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE CHAUDIÈRE À GRANULE",
        perks: ["alfaplam.png"],
      }}
      askEstimation={{
        title: "Un projet d'installation de Chaudière à Granule ?",
      }}
    />
  );
}
