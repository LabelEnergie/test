import Solution from "@/components/Solution";
import { SolutionType } from "@/types/solution.types";

export default function PSP() {
  return (
    <Solution
      id={SolutionType.PSP}
      h1="PANNEAUX SOLAIRE PHOTOVOLTAIQUE"
      subtitle="Optez pour des panneaux solaires photovoltaïques en autoconsommation et produisez votre propre électricité tout en réduisant vos factures énergétiques !"
      bandItems={[
        {
          icon: "energie_solaire.png",
          title: "L'énergie solaire, une énergie inépuisable",
        },
        {
          icon: "euro.png",
          title: "Prime à l'autoconsommation d'EDF",
        },
        {
          icon: "elec.png",
          title: "Produire sa propre électricité",
        },
      ]}
      section1={{
        title: "Qu'est ce que des panneaux solaire photovoltaïque ?",
        subtitle: `Un panneau solaire photovoltaïque a des avantages économiques indéniables, et ce, parce que son installation est rentabilisée dans le temps. 

Non seulement vos factures d'électricité baissent automatiquement dès que l'installation est en ordre de marche, mais en plus ladite installation s'amortit sur quelques années.

L’énergie solaire est une énergie qui vient du soleil. Elle est donc naturelle, écologique et presque sans limite. En devenant producteur d’énergie, chacun fait le choix d’une solution excellente pour produire de l’énergie propre à partir du soleil.`,
      }}
      section2={{
        title: "Comment ça fonctionne ?",
        subtitle: `Les panneaux solaires photovoltaïques transforment l'énergie solaire, disponible gratuitement, en électricité. Un onduleur transforme ce courant continu en courant alternatif, pour l'injecter sur le réseau ou le consommer sur place.

Les photons des rayons solaires entrent en contact avec ces semi-conducteurs, ce qui libère les électrons des cellules photovoltaïques ; une direction est appliquée au flux d'électrons, grâce à une borne positive et à une borne négative. Ce flux d'électron devient alors un courant électrique.`,
      }}
      section3={{
        title:
          "Quelles sont les aides et subventions pour des panneaux solaires photovoltaïques ?",
        subtitle: `L’installation de panneaux solaires photovoltaïques vous permet de bénéficier d’un certain nombre d’aides et subventions :

**- Primes à l’auto-consommation EDF**`,
        images: ["autoconso.png"],
      }}
      partnersSection={{
        title: "NOS FOURNISSEURS DE PANNEAUX PHOTOVOLTAIQUE",
        perks: ["thaleos.png", "orion.png", "chaffoteaux.png", "dualsun.png"],
      }}
      askEstimation={{
        title: "Un projet d'installation de Panneaux Photovoltaïque ?",
      }}
      simulationPath="/simulateur/panneaux-solaires-photovoltaiques"
    />
  );
}
