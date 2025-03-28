import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function SystemSolaireCombine() {
  return (
    <Solution
      id={SolutionType.SSC}
      h1="SYSTEME SOLAIRE COMBINE"
      subtitle="Adoptez le système solaire combiné : profitez de l'énergie inépuisable du soleil pour chauffer votre eau et votre maison, tout en réalisant des économies et en préservant l'environnement !"
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
        title: "Qu’est-ce qu’un système solaire combiné ?",
        subtitle: `Un système solaire combiné utilise l'énergie du soleil pour chauffer à la fois l'eau sanitaire et l'intérieur de votre maison. Grâce à des panneaux solaires thermiques, il capte la chaleur solaire et la transfère soit à un réservoir d'eau chaude, soit à un système de chauffage central.
        
Cette solution permet de réduire la consommation d'énergie traditionnelle, d'économiser sur les factures énergétiques, et de diminuer les émissions de gaz à effet de serre, tout en exploitant une source d'énergie renouvelable et inépuisable.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Un système solaire combiné (SSC) capte l'énergie solaire via des panneaux solaires thermiques, où un fluide caloporteur (souvent un mélange d'eau et d'antigel) circule et se réchauffe. Ce fluide chaud est ensuite acheminé vers un échangeur de chaleur, où il transfère son énergie soit à un réservoir d'eau pour l'eau chaude sanitaire, soit au circuit de chauffage central de la maison. Des régulateurs et pompes assurent la circulation optimale du fluide et la distribution de la chaleur selon les besoins.

Ainsi, le SSC maximise l'utilisation de l'énergie solaire pour chauffer à la fois l'eau et l'intérieur de la maison, réduisant la dépendance aux sources d'énergie traditionnelles.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour un système solaire combiné ?",
        subtitle: `L’installation d’un système solaire combiné vous permet de bénéficier d’un certain nombre d’aides et subventions :
**- TVA réduite à 5,5%**
**- MaPrimeRénov'**
**- MaPrimeRénov' Sérénité non cumulable avec MaPrimeRénov'**
**- Certificats d’économie d’énergie (CEE)**`,
        images: ["maprimerenov.png", "cee.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE SYSTEMES SOLAIRES COMBINES",
        perks: [
          "orion.png",
          "sonnenkraft.png",
          "chaffoteaux.png",
          "clipsol.png",
        ],
      }}
      askEstimation={{
        title: "Un projet d'installation de Système Solaire Combiné ?",
      }}
    />
  );
}
