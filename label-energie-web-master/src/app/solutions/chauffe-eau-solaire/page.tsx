import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function CES() {
  return (
    <Solution
      id={SolutionType.CES}
      h1="CHAUFFE-EAU SOLAIRE"
      subtitle="Laissez le soleil prendre soin de votre confort avec un chauffe-eau solaire : une solution économique et écologique pour une eau chaude toute l'année !"
      bandItems={[
        {
          icon: "economies.png",
          title:
            "Jusqu’à 70% d’économie sur votre facture d'eau chaude sanitaires",
        },
        {
          icon: "euro.png",
          title: "Aides & Subventions pour votre installation",
        },
        {
          icon: "maison_couleurs.png",
          title: "Confort d'eau chaude sanitaire dans votre logement",
        },
      ]}
      section1={{
        title: "Qu'est ce qu'un chauffe-eau solaire ?",
        subtitle: `Un chauffe-eau solaire utilise l'énergie du soleil pour chauffer l'eau grâce à des panneaux solaires thermiques installés sur le toit, au mur ou au sol.

Le système comprend un circuit de transfert de chaleur où un fluide caloporteur (eau technique) réchauffé par le(s) capteur(s) transporte la chaleur vers un réservoir isolé pour stocker l'eau chaude. Cette technologie écologique réduit la consommation d'énergie, diminue les émissions de gaz à effet de serre et offre une indépendance énergétique partielle.

Avec une longue durée de vie et un entretien minimal, le chauffe-eau solaire est une solution durable et économique pour produire de l'eau chaude.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Un chauffe-eau solaire utilise l'énergie inépuisable du soleil pour chauffer un fluide, qui transfère ensuite cette chaleur à l'eau sanitaire dans un réservoir.
        
Cela permet de produire de l'eau chaude de manière écologique et économique, réduisant ainsi la consommation d'énergie traditionnelle et les émissions de gaz à effet de serre.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour un chauffe-eau solaire ?",
        subtitle: `L’installation d'un chauffe eau thermodynamique vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- TVA réduite à 5,5%**
**- MaPrimeRénov'**
**- MaPrimeRénov' Sérénité non cumulable**
**- Certificats d’économie d’énergie (CEE)**`,
        images: ["maprimerenov.png", "cee.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE CHAUFFE EAU SOLAIRE",
        perks: ["orion.png", "thaleos.png"],
      }}
      askEstimation={{
        title: "Un projet d'installation de Chauffe-Eau Solaire ?",
      }}
    />
  );
}
