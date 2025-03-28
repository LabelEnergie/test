import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PSP() {
  return (
    <Solution
      id={SolutionType.CET}
      h1="CHAUFFE EAU THERMODYNAMIQUE"
      subtitle="Une solution écologique et économique pour réduire votre consommation d'énergie tout en garantissant un confort optimal avec de l'eau chaude en continu."
      bandItems={[
        {
          icon: "economies.png",
          title:
            "Jusqu’à 70% d’économie sur votre facture d'eau chaude sanitaires",
        },
        {
          icon: "euro.png",
          title: "Aides & Subventions pour votre installations",
        },
        {
          icon: "maison_couleurs.png",
          title: "Confort d'eau chaude sanitaire dans votre logement",
        },
      ]}
      section1={{
        title: "Qu'est ce qu'un chauffe-eau thermodynamique ?",
        subtitle: `Un chauffe-eau thermodynamique est un appareil qui utilise une pompe à chaleur pour chauffer de l'eau sanitaire.
        
Contrairement aux chauffe-eau traditionnels qui utilisent souvent des résistances électriques pour chauffer l'eau, un chauffe-eau thermodynamique utilise la chaleur présente dans l'air ambiant pour chauffer un fluide frigorigène. Ce fluide frigorigène est ensuite comprimé et condensé, libérant ainsi de la chaleur qui est transférée à l'eau dans le réservoir du chauffe-eau.
        
Ce système est très efficace car il utilise principalement de l'énergie renouvelable (la chaleur de l'air ambiant) pour chauffer l'eau, ce qui le rend plus écologique et souvent plus économique à long terme.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Le ballon thermodynamique combine une pompe à chaleur et un ballon d'eau chaude pour capturer les calories de l'air ambiant et les utiliser pour chauffer l'eau, réduisant ainsi la consommation d'énergie jusqu'à 70 %. 
        
Cette technologie écologique contribue à réduire les émissions de CO2 et à préserver l'environnement. En offrant un approvisionnement constant en eau chaude et une installation flexible, le ballon thermodynamique garantit confort et économies, tout en pouvant bénéficier de primes et subventions pour son installation.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour un chauffe eau thermodynamique ?",
        subtitle: `L’installation d'un chauffe eau thermodynamique vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- TVA réduite à 5,5%**
**- MaPrimeRénov'**
**- MaPrimeRénov' Sérénité non cumulable**
**- Certificats d’économie d’énergie (CEE)**`,
        images: ["maprimerenov.png", "cee.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE CHAUFFE EAU THERMODYNAMOQUE",
        perks: ["thaleos.png", "thermor.png", "chaffoteaux.png"],
      }}
      askEstimation={{
        title: "Un projet d'installation de chauffe eau thermodynamique ?",
      }}
    />
  );
}
