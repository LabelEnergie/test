import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PACAirAir() {
  return (
    <Solution
      id={SolutionType.PAC_AA}
      h1="POMPE À CHALEUR AIR AIR"
      subtitle="La pompe à chaleur Air-Air est la solution idéale pour un chauffage performant, économique et respectueux de l'environnement, tout en offrant un confort silencieux."
      bandItems={[
        {
          icon: "economies.png",
          title: "Économies sur votre facture de chauffage",
        },
        {
          icon: "feuille.png",
          title: "Écologique et respectueux de l'environnement",
        },
        {
          icon: "clim.png",
          title: "Confort de chauffage et climatisation dans votre logement",
        },
      ]}
      section1={{
        title: "Qu’est-ce qu’une pompe à chaleur Air Air ?",
        subtitle: `Une pompe à chaleur Air-Air est un système de chauffage et de climatisation qui extrait les calories présentes dans l'air extérieur pour les transférer à l'intérieur de votre habitation.

Elle fonctionne grâce à un cycle thermodynamique, utilisant un fluide frigorigène pour capter et restituer la chaleur.
        
Ce dispositif est reconnu pour son efficacité énergétique, son faible impact environnemental et sa capacité à offrir un confort thermique optimal, aussi bien en hiver qu'en été.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Une pompe à chaleur Air-Air fonctionne en captant la chaleur présente dans l'air extérieur pour la transférer à l'intérieur de votre maison. Même par temps froid, elle extrait les calories de l'air extérieur et les utilise pour chauffer votre intérieur.

En été, ce processus peut être inversé pour rafraîchir votre habitation. Ce système utilise un fluide spécial pour transporter la chaleur, rendant le processus très efficace et permettant de réaliser des économies d'énergie tout en maintenant un confort thermique optimal.
        
Grâce à ce cycle, la pompe à chaleur Air-Air peut transférer de la chaleur de l'extérieur vers l'intérieur en hiver, et inverser le cycle en été pour climatiser l'habitation. Ce système est très efficace, car il utilise une petite quantité d'électricité pour déplacer une grande quantité de chaleur, ce qui permet de réaliser des économies d'énergie importantes.`,
      }}
      //       section3={{
      //         title:
      //           "Quelles sont les aides et subventions pour une pompe à chaleur Air-Eau ?",
      //         subtitle: `L’installation d’une PAC Air/Eau vous permet de bénéficier d’un certain nombre d’aides et subventions :

      // **- TVA réduite à 5,5%**
      // **- MaPrimeRénov'**
      // **- MaPrimeRénov' Sérénité non cumulable avec MaPrimeRénov'**
      // **- Certificats d’économie d’énergie (CEE)**
      // **- Prime Coup de pouce Pompe à chaleur Air-Eau**
      // **- Eco-PTZ**
      // **- Chèque énergie**
      // **- Autres aides locales ou régionales**`,
      //         images: ["maprimerenov.png", "cee.png"],
      //       }}
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
        title: "Un projet d'installation de Pompe à Chaleur Air Air ?",
      }}
    />
  );
}
