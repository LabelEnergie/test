import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PSP() {
  return (
    <Solution
      id={SolutionType.PG}
      h1="POÊLE A GRANULE"
      subtitle="La solution d'appoint de chauffage écologique et économique"
      bandItems={[
        {
          icon: "economies.png",
          title: "Jusqu’à 20% d’économie sur votre facture de chauffage",
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
        title: "Qu'est ce qu'un poêle à granule ?",
        subtitle: `Un poêle à granulés est un appareil de chauffage qui utilise des granulés de bois compressés comme combustible. Ces granulés brûlent de manière efficace et propre, produisant une chaleur confortable pour chauffer une pièce ou une zone spécifique de la maison. Utilisé en appoint de chauffage, le poêle à granulés permet de réduire la consommation d'énergie principale en fournissant une chaleur complémentaire, ce qui peut diminuer les coûts énergétiques et les émissions de gaz à effet de serre.
        
De plus, il offre une solution de chauffage renouvelable et économique, avec des systèmes de contrôle automatisés pour une utilisation pratique et un entretien minimal.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Un poêle à granulés fonctionne en brûlant des granulés de bois compressés pour produire de la chaleur. Les granulés sont stockés dans un réservoir et transportés vers le brûleur par une vis sans fin. Un élément d'allumage électrique enflamme les granulés, et la chaleur générée est transférée à l'air ambiant via un échangeur de chaleur, souvent avec l'aide d'un ventilateur pour une diffusion optimale. Un thermostat intégré régule la température en ajustant l'alimentation en granulés et la ventilation, tandis que les gaz de combustion sont évacués à l'extérieur par un conduit. 
        
Cela permet une combustion efficace, propre et contrôlée, offrant une source de chaleur renouvelable et confortable.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour un poêle à granule ?",
        subtitle: `L’installation de poêle à granule vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- TVA réduite à 5,5%**
**- MaPrimeRénov'**
**- MaPrimeRénov' Sérénité non cumulable**
**- Certificats d’économie d’énergie (CEE)**`,
        images: ["maprimerenov.png", "cee.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE POÊLE À GRANULE",
        perks: ["stove_italia.png", "orion.png", "thaleos.png", "unical.png"],
      }}
      askEstimation={{
        title: "Un projet d'installation de Poêle à granule  ?",
      }}
    />
  );
}
