import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PSH() {
  return (
    <Solution
      id={SolutionType.PSH}
      h1="PANNEAUX SOLAIRE HYBRIDE"
      subtitle="Les panneaux solaires hybrides vous offrent une double solution en combinant
      production d’électricité et de chaleur, maximisant ainsi votre rendement
      énergétique et vos économies tout en respectant l’environnement."
      bandItems={[
        {
          icon: "economies.png",
          title:
            "Économies sur votre facture de chauffage et eau chaude sanitaire",
        },
        {
          icon: "euro.png",
          title: "Aides & Subventions pour votre installation",
        },
        {
          icon: "elec.png",
          title: "Produire sa propre électricité",
        },
      ]}
      section1={{
        title: "Qu’est-ce qu’un panneaux solaire hybride ?",
        subtitle: `Un panneau solaire hybride est une technologie innovante qui combine à la fois des cellules photovoltaïques pour produire de l'électricité et des capteurs thermiques pour générer de la chaleur.
        
En intégrant ces deux fonctions, les panneaux solaires hybrides optimisent l'utilisation de l'énergie solaire, augmentant l'efficacité globale du système et permettant de répondre à plusieurs besoins énergétiques, comme l'alimentation électrique et le chauffage de l'eau, avec une seule installation.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Les panneaux solaires hybrides fonctionnent en combinant des cellules photovoltaïques et des capteurs thermiques dans une seule unité.
        
Les cellules photovoltaïques convertissent la lumière du soleil en électricité, tandis que les capteurs thermiques absorbent la chaleur du soleil pour chauffer de l'eau ou un fluide caloporteur.
        
Cette double utilisation de l'énergie solaire permet de maximiser le rendement énergétique de chaque panneau, offrant ainsi une solution efficace pour produire à la fois de l'électricité et de la chaleur à partir d'une seule installation solaire.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour un panneaux solaire hybride ?",
        subtitle: `L’installation d'un panneau solaire hybride vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- TVA réduite à 5,5%**
**- MaPrimeRénov'**`,
        images: ["maprimerenov.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE PANNEAUX SOLAIRES HYBRIDES",
        perks: ["orion.png"],
      }}
      askEstimation={{
        title: "Un projet d'installation de Panneau solaire hybride ?",
      }}
    />
  );
}
