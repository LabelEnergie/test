"use client";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import Container from "../shared/Container";
import { Box, Center, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import TextHighlighter from "../shared/TextHighlighter";

interface CGVProps {}

export default function CGV(props: CGVProps) {
  const {} = props;

  return (
    <section>
      <Container>
        <Heading as="h2" mt={10} textAlign="left">
          Conditions Générales de Vente
        </Heading>
        <Heading textAlign="left" pt={20} mb={10} fontSize={22}>
          CONDITIONS GÉNÉRALES DE VENTE CONTRESIGNÉES PAR LE CONSOMMATEUR
        </Heading>

        {CONTENT.map(({ content, title }, i) => (
          <Fragment key={i}>
            <Text
              as="h3"
              textDecorationLine="underline"
              color="king"
              fontWeight={700}
              mt={10}
            >
              {title}
            </Text>
            {content.map((con, j) => (
              <Fragment key={j}>
                {con.title && (
                  <Text
                    as="h4"
                    mt={10}
                    textDecorationLine="underline"
                    color="king"
                    fontWeight={700}
                  >
                    {con.title}
                  </Text>
                )}
                {con.content.map((c2, k) => (
                  <Fragment key={k}>
                    {c2.includes("[CARD]") ? (
                      <TextHighlighter
                        borderWidth={1}
                        borderColor="king"
                        p={5}
                        my={5}
                      >
                        {c2.replace("[CARD]", "")}
                      </TextHighlighter>
                    ) : (
                      <TextHighlighter>{c2}</TextHighlighter>
                    )}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </Fragment>
        ))}
        <Center mt={10}>
          <Button
            variant="outline"
            href="/documents/formulaire_retractation.pdf"
            target="_blank"
          >
            Télécharger le formulaire de rétractation
          </Button>
        </Center>
      </Container>
    </section>
  );
}

const CONTENT: {
  title: string;
  content: { title?: string; content: string[] }[];
}[] = [
  {
    title: "ARTICLE 1 : DÉFINITIONS DES TERMES",
    content: [
      {
        title: "",
        content: [
          `Client : toute personne physique ou morale, ayant la capacité de conclure un tel acte, passant une commande pour la fourniture et, le cas échéant, l’installation d’un matériel vendu par le Vendeur - chaudière, pompe à chaleur, thermostat connecté, chauffe-eau électrique, radiateur électrique, etc.) - (ci-après « Produit (s) ») et/ou de diverses prestations pour ses besoins et éligible au service proposé en fonction de sa situation géographique. Le Client, en commandant, déclare sur l’honneur être capable de commander.
            Vendeur : la société LABEL ENERGIE, SAS au capital de 200 000 euros, spécialisée dans les travaux d’installation d’équipements thermiques et de climatisation, dont le siège social est situé au 3 allée du 1er mai, 77183 CROISSY- BEAUBOURG, N° 890 462 625 RCS MEAUX, Tél : 01 81 72 39 59, E-mail : contatc@labelenergie.fr, n° TVA Intracommunautaire FR 30890462625.
            Commande : la commande s’entend de la signature du contrat de vente (devis/bon de commande) par le Client.
            Livraison : la livraison s’entend de la remise directe des Produits vendus au Client et de leur installation sauf stipulation contraire insérée au contrat de vente (devis/bon de commande).
            Réception : la réception des biens commandés s’entend de la signature sans réserve du procès-verbal d’installation et/ou de réception par le Client.`,
        ],
      },
    ],
  },
  {
    title:
      "ARTICLE 2 : ACCEPTATION ET OPPOSABILITE DES CONDITIONS GÉNÉRALES DE VENTE",

    content: [
      {
        title: "2.1 ACCEPTATION",
        content: [
          "Les présentes Conditions Générales de Vente (ci-après les « CGV ») s’appliquent de plein droit à toutes les prestations de\
            service d’installation figurant sur le bon de commande, conclues par la LABEL ENERGIE (ci-après le « Vendeur » ou «\
            LABEL ENERGIE ») auprès de tout Client (ci-après le « Client » ou l’« Acheteur » ) qui les agrées et qui reconnaît en avoir\
            parfaite connaissance.",
        ],
      },
      {
        title: "2.2 OPPOSABILITE DES CONDITIONS GÉNÉRALES DE VENTE",
        content: [
          "Les présentes Conditions Générales de Vente s'appliquent à toute vente et installation de Produit(s) effectuée par LABEL ÉNERGIE au bénéfice du Client ayant la qualité de consommateur. La passation d’une Commande implique de la part du Client l’acceptation des présentes CGV. Toutes les clauses contraires aux présentes CGV ne peuvent être opposées à LABEL ÉNERGIE à moins qu’elles n’aient fait l’objet d’un accord particulier écrit et préalable.",
          "En conséquence, le seul fait de passer commande sans réserve implique que le Client a accepté et a adhéré entièrement aux présentes Conditions Générales de Vente, à la date de sa commande. Le Client reconnaît comme exacts et sincères tous les renseignements, mentions et déclarations portées à LABEL ENERGIE. Le fait que LABEL ÉNERGIE ne se prévale pas à un moment donné de l’une des dispositions des CGV ne peut en aucune manière être interprété comme valant renonciation de sa part à s’en prévaloir ultérieurement, notamment le fait de ne pas réclamer un paiement en retard. La nullité éventuelle d’une clause contractuelle n’entraîne pas la nullité des présentes, chaque clause étant autonome.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 3 : OFFRES – DEVIS – CATALOGUES",
    content: [
      {
        content: [
          "Les devis et offres faites par LABEL ENERGIE à un Client sont valables un mois à compter de leur émission, sauf stipulation\
            expresse contraire. Le contenu des documents commerciaux de LABEL ENERGIE ou de ses fournisseurs est purement\
            informatif et peut être modifié sans préavis par LABEL ENERGIE.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 4 : COMMANDES – BON DE COMMANDE – DISPONIBILITÉ DES STOCKS",
    content: [
      {
        title: "4.1. DISPONIBILITÉ DES STOCKS",
        content: [
          "Les Produits sont vendus, livrés et installés dans la limite des stocks disponibles. LABEL ENERGIE se réserve la possibilité de\
          modifier certains articles vendus. Le cas échéant, le Client se verra proposer le modèle du Produit le plus proche de celui\
          figurant sur sa Commande. En cas de désaccord avec le Client et si LABEL ÉNERGIE avait perçu des sommes avant\
          l’installation, il procède au remboursement des sommes versées dans un délai de 45 jours maximum à compter du refus\
          du consommateur. En dehors du remboursement du prix du Produit indisponible, LABEL ÉNERGIE n’est tenu à aucune\
          indemnité d’annulation.",
        ],
      },
      {
        title:
          "4.2. LES COMMANDES SONT PRISES SOUS RESERVE DE FAISABILITE TECHNIQUE",
        content: [
          "En cas de non faisabilité, la commande sera annulée et les acomptes remboursés. LABEL ENERGIE informera le Client de\
          l’infaisabilité technique dans un délai maximum de 4 mois à compter de la signature du Bon de commande ou du devis.",
        ],
      },
      {
        title: "4.3. LA DATE D’EFFET",
        content: [
          "Le Bon de commande d’installation de solutions énergétiques est conclu à la date de signature du bon de commande par\
          le Client.\
          Le Bon de commande prend effet à l’expiration du délai de rétractation.\
          TEXTE INTÉGRAL DE L’ARTICLE L.221-18 DU CODE DE LA CONSOMMATION :\
          « Le consommateur dispose d'un délai de quatorze jours pour exercer son droit de rétractation d'un contrat conclu à\
          distance, à la suite d'un démarchage téléphonique ou hors établissement, sans avoir à motiver sa décision ni à supporter\
          d'autres coûts que ceux prévus aux articles L. 221-23 à L. 221-25.\
          Le délai mentionné au premier alinéa court à compter du jour :\
          1° De la conclusion du contrat, pour les contrats de prestation de services et ceux mentionnés à l'article L. 221-4 ;\
          2° De la réception du bien par le consommateur ou un tiers, autre que le transporteur, désigné par lui, pour les contrats de\
          vente de biens. Pour les contrats conclus hors établissement, le consommateur peut exercer son droit de rétractation à\
          compter de la conclusion du contrat.\
          Dans le cas d'une commande portant sur plusieurs biens livrés séparément ou dans le cas d'une commande d'un bien\
          composé de lots ou de pièces multiples dont la livraison est échelonnée sur une période définie, le délai court à compter\
          de la réception du dernier bien ou lot ou de la dernière pièce. Pour les contrats prévoyant la livraison régulière de biens\
          pendant une période définie, le délai court à compter de la réception du premier bien ».",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 5 : RESERVE DE PROPRIETE",
    content: [
      {
        content: [
          "La propriété des marchandises fournies par LABEL ÉNERGIE ne sera transférée au Client que lorsque la totalité du\
  montant facturé sera encaissé par LABEL ENERGIE. Dans le cadre des subventions déduites sur la facture des travaux, la\
  propriété des marchandises fournies par LABEL ÉNERGIE ne sera transférée au Client que lorsque la totalité du montant\
  facturé sera encaissé par le(s) mandataire(s). Les acomptes reçus resteront définitivement acquis par LABEL ÉNERGIE à\
  titre d’indemnisation forfaitaire sans préjudice de toute autre action que LABEL ÉNERGIE serait en droit d’exercer.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 6 : INSTALLATION DU MATÉRIEL",
    content: [
      {
        content: [
          "L’emplacement du matériel, objet du bon de commande, devra être déterminé de manière définitive entre le Client et\
          LABEL ÉNERGIE, suivant les contraintes techniques finales éventuellement relevées par le LABEL ÉNERGIE au plus tard au\
          moment de l’installation. Le Client s’engage à laisser libre accès aux locaux tant à l’intérieur qu’à l’extérieur, à fournir l’eau,\
          électricité, si besoin, et à obtenir l’autorisation de l’accès chez les voisins, si nécessaire. Le Client s’engage à fournir tout\
          renseignement, ou tout justificatif sur le passage des canalisations, de gaz et d’électricité susceptibles de se trouver aux\
          endroits de perçage, des murs. La durée d’exécution des travaux LABEL ENERGIE ne saurait être tenue pour responsable\
          d’un manque de diligence du Client occasionnant un retard dans l’installation des matériels. Le Client ne recevra aucune\
          indemnité en raison de l’usure et des modifications affectant son bien immobilier. Le Client ne recevra aucune indemnité\
          en raison d’une éventuelle dépréciation de son bien immobilier, liée, notamment à des considérations esthétiques.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 7 : RECEPTION",
    content: [
      {
        content: [
          "Après l’installation du matériel, LABEL ÉNERGIE fera signer au Client notamment un procès-verbal de fin de travaux. La\
          réception sera alors réputée acquise sans réserve. En cas de refus, sans motif, du Client de signer le procès-verbal de\
          réception de l’installation, celui-ci sera redevable des frais engagés par LABEL ÉNERGIE en vue d’obtenir la signature du\
          procès-verbal ainsi que d’une indemnité de 30% du montant TTC de la commande. Lorsque la réception est assortie de\
          réserves techniquement justifiées, LABEL ÉNERGIE procèdera à leur levée dans un délai raisonnable. Immédiatement\
          après le constat contradictoire de levée de réserves, la réception sera prononcée et constatée par l’établissement d’un\
          procès-verbal établi sur le champ et signé par le Client et LABEL ENERGIE. Le refus du Client ne peut être motivé que par\
          l’inachèvement des travaux ou par un ensemble de défauts graves équivalents à un inachèvement. Dans tous les cas, le\
          Client doit indiquer par écrit les motifs de refus de réception.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 8 : PRIX",
    content: [
      {
        title: "8.1 LE PRIX",
        content: [
          "Le matériel et les fournitures installés peuvent être composés de plusieurs éléments qui doivent être appréhendés\
          comme formant un tout indivisible : un pack. Le prix indiqué au devis correspond au prix de vente du pack comme un tout\
          indissociable, ainsi qu’à la pose dudit pack. La TVA de chaque élément composant le pack et de sa pose sont indues au\
          prix TTC. Le prix de chacun des éléments composant le pack peut être fourni au consommateur, à sa demande. Au-delà\
          du montant éventuellement fixé dans le bon de commande, les frais seront à la charge du Client et feront l’objet d’une\
          facture complémentaire, notamment s’agissant d’éventuels frais de terrassement, de dépose ou de pose de matériaux,\
          (terrasse, carrelage...) de peinture, papier peint, papier peint.... Ce prix couvre également les démarches administratives\
          relatives à l’installation confiées. Ce prix ne comprend pas le prix des éventuelles fournisseurs et prestations\
          supplémentaires qui ne seraient pas prévues dans le bon de commande, notamment les prestations relatives à la mise en\
          conformité de la toiture nécessaire pour réaliser l’installation ou les frais de raccordement au-delà des limites ci-dessus\
          visées. Ce prix ne comprend pas notamment les travaux permettant d’installer les panneaux sans ombrages liés\
          notamment à la végétation, arbres, antennes, paraboles, ou conduits de cheminée qui demeurent à la charge du Client. Le\
          Client procèdera à ses frais avant l’installation à tous travaux d’élagage ou dépose des éléments gênants, notamment\
          pour le raccordement.",
        ],
      },
      {
        title: "8.2. INFORMATIONS LIÉES AUX PRODUITS INSTALLÉS",
        content: [
          "L’installation de ces équipements est susceptible de nécessiter une augmentation de la puissance du compteur\
            électrique. Dans ce cas, il appartiendra au Client de se rapprocher de son fournisseur d’électricité afin que le nécessaire\
            soit fait. LABEL ENERGIE ne saurait être tenue pour responsable d’un manque de puissance nécessaire au bon\
            fonctionnement des équipements.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 9 : PAIEMENT",
    content: [
      {
        title:
          "9.1. AVEC FINANCEMENT PROPOSÉ PAR L'INTERMÉDIAIRE DE LABEL ENERGIE",
        content: [
          "Le Client prend reconnaît avoir pris connaissance de l’ensemble des informations relatives au financement (TAEG,\
                    montant total du financement, montant des échéances, durée du crédit, assurances facultatives...).",
        ],
      },
      {
        title: "9.2. SANS FINANCEMENT",
        content: [
          "Le paiement total de la commande interviendra au plus tard le jour de l’installation. LABEL ENERGIE adressera au Client\
            les factures correspondantes. Un chèque de banque pourra être exigé par LABEL ENERGIE. Tous les prix sont exprimés\
            toutes taxes comprises et comprennent, le cas échéant, l’éco-participation dont le montant est précisé sur la commande\
            et/ou la facture. Les taxes sont appliquées selon la réglementation en vigueur. Sauf disposition contraire figurant dans la\
            commande, les paiements s’effectuent par chèque, par virement bancaire par mandat SEPA ou Carte bancaire. En cas de\
            changement de coordonnées bancaires avant le prélèvement de toutes les sommes dues, le Client s’engage à mettre à\
            jour ces derniers, dès connaissance. A défaut, le Client risque de se voir appliquer des intérêts de retard en cas de non-\
            paiement ou de rejet de prélèvement aux dates indiquées. Tout retard de paiement entraîne de plein droit et sans\
            formalité, l’application d’intérêts de retard au taux d’intérêt légal en vigueur. Pour les Clients professionnels, une indemnité\
            forfaitaire pour frais de recouvrement est due, sans formalité, à défaut de règlement le jour suivant la date d’échéance\
            figurant sur la facture. Le montant de cette indemnité forfaitaire est de 40 euros minimum par facture en application des\
            articles L.441-10 et D.441-5 du Code de commerce. Les conditions de paiement sont fermes. Le Client ne peut invoquer\
            quelque cause que ce soit pour différer ou modifier les conditions de paiement. Le Client ne peut pas, en cas de\
            réclamation, retenir tout ou partie des sommes dont il est redevable, ni opérer une quelconque compensation. En cas de\
            défaut de paiement dans les délais prévus et 48 heures après une mise en demeure restée infructueuse LABEL ÉNERGIE\
            aura la faculté d’exiger le paiement immédiat du solde restant dû, de suspendre la réalisation de ses obligations, de\
            suspendre ou annuler les commandes en cours sans préjudice de demander des dommages et intérêts et/ou la résiliation\
            du contrat. En outre de convention expresse, tous les frais de recouvrement engagés par LABEL ÉNERGIE seront mis à la\
            charge du Client. Le cas échéant tout règlement partiel de facture s’imputera d’abord et de plein droit sur la partie non\
            privilégiée de notre créance.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 10 : DÉMARCHES ADMINISTRATIVES",
    content: [
      {
        content: [
          "Sauf stipulation contraire indiquée au bon de commande, LABEL ENERGIE s’engage à effectuer les démarches\
            administratives nécessaires afin d’obtenir le certificat d’économie d'énergie (CEE) ainsi que la subvention de l’ANAH sous\
            réserve de la remise par le Client de l'ensemble de la documentation nécessaire ET sincère à la demande d’aide formulée\
            entre les mains de l’ANAH ou autres organismes ainsi que de la signature de tous documents nécessaires à la délivrance\
            de cette aide. Toutes démarches visant notamment à l’obtention d’un crédit d’impôt sont à la charge exclusive du Client\
            qui a pu, préalablement à la vente, vérifier les critères d'éligibilité, estimer les avantages de l'achat du Produit que lui\
            propose LABEL ÉNERGIE, ainsi que des démarches à effectuer pour obtenir le bénéfice l’avantage fiscal.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 11 : GARANTIE",
    content: [
      {
        title: "11.1. GARANTIES LÉGALES DE CONFORMITÉ ET DES VICES CACHÉES",
        content: [
          "Même si LABEL ÉNERGIE n’est pas le fabricant des matériels vendus, le Client bénéficie de la garantie légale de\
      conformité de l’article L.217-4. A ce titre, LABEL ÉNERGIE est tenu des défauts de conformité des biens au contrat dans les\
      conditions de l’article L.217-4 et suivants du Code de la consommation et des défauts cachés de la chose vendue dans les\
      conditions prévues aux articles 1641 à 1649 du Code civil.",
          "[CARD]**Lorsqu’il agit en garantie légale de conformité, le consommateur : - bénéficie d’un délai de deux ans à compter de la délivrance du\
            bien pour agir ; - peut choisir entre la réparation ou le remplacement du bien, sous réserve des conditions de coût prévues par l’article\
            L.211-9 du Code de la consommation ; - est dispensé de rapporter la preuve de l’existence du défaut de conformité du bien durant 6\
            mois suivant la délivrance du bien. Ce délai est porté à vingt-quatre-mois à compter du 18 mars 2016, sauf pour les biens d’occasion.",
          "La garantie légale de conformité s’applique indépendamment de la garantie commerciale éventuellement consentie. Le\
          consommateur peut décider de mettre en œuvre la garantie contre les défauts cachés de la chose vendue au sein de\
          l’article 1641 du Code civil et que dans cette hypothèse, il peut choisir entre la résolution de la vente ou une réduction du\
          prix de vente conformément à l’article 1644 du Code civil. Conformément à l’exigence posée par l’article L. 217-115 du Code\
          de la consommation, LABEL ÉNERGIE porte à la connaissance du Client, les dispositions des articles L. 217–4, L.2 217–5,\
          L.217–12, L.217–16 du Code de la consommation ainsi que l’article 1641 et le premier alinéa de l’article 1648 du Code civil,\
          dans leur intégralité",
        ],
      },
      {
        title: "11.2. GARANTIE DU FABRICANT",
        content: [
          "Le matériel utilisé est également couvert par la garantie délivrée par le fabricant. Le détail des garanties de chaque\
        matériel est précisé dans le devis et le bon de commande.La société ayant installé, ce matériel ne pourra pas être tenu\
        responsable en cas de refus de garantie, de la part du fabricant.La garantie du fabricant est exclue en cas d’usure normal,\
                de défaut d’entretien ou en cas d’utilisation non conforme aux prescriptions du fabricant contenues dans les brochures\
        remises au Client lors de l’installation de matériel.La mise en œuvre de cette garantie, s’effectue par l’intermédiaire de\
        LABEL ÉNERGIE dans les conditions décrites ci - dessous.Les pièces détachées indispensables à l’utilisation des\
        équipements seront disponibles sur le marché pendant une période de deux ans à compter de la signature du bon de\
        commande.",
        ],
      },
      {
        title: "11.3. GARANTIE DES TRAVAUX D’INSTALLATION",
        content: [
          "LABEL, ÉNERGIE a souscrit une police d’assurance : MAAF ASSURANCES SA – CHABAN – 79180 CHAURAY - CONTRAT\
            MULTIRISQUE PROFESSIONNELLE DU BÂTIMENT ET DES TRAVAUX PUBLICS, Numéro : 177310791 J – MCE – 001, au titre de\
            sa responsabilité civile professionnelle pour les travaux d’installation en France et DOM. Cette assurance couvre la\
            conception et les travaux d’installation réalisée par LABEL ÉNERGIE contre tout défaut de conformité pendant deux ans, à\
            compter de l’établissement du procès-verbal de réception de l’installation. La garantie est toutefois expressément limitée à\
            la réparation, ou au choix de LABEL ENERGIE et, au remplacement à neuf, pièce de rechange, y compris main-d’œuvre et\
            déplacement. La garantie est exclue en cas d’usure normal, de défaut d’entretien, ou en cas d’utilisation non conforme ou\
            aux prescriptions des fabricants contenues dans les brochures remises au Client lors de l’installation des matériels. LABEL\
            ENERGIE met à disposition du Client les détails de cette police d’assurance sur simple requête adressé par courriel au\
            service juridique. Indépendamment de cette garantie commerciale, LABEL ÉNERGIE reste tenue de la garantie légale de\
            conformité mentionné aux article L. 217–4 à L217–12 et de celle relative au défaut de la chose vendue dans les conditions\
            prévues aux articles 1641, 1648 et 2232 du Code civil.",
        ],
      },
      {
        title: "11.4 GARANTIE DÉCENNALE",
        content: [
          "Conformément à la loi numéro 78-12 du 4 janvier 1978 concernant l’assurance des travaux du bâtiment, LABEL ÉNERGIE a\
            souscrit pour ses installations d’économies ou de production d’énergie en France métropolitaine et DOM, une police\
            d’assurance : MAAF ASSURANCES SA – CHABAN – 79180 CHAURAY - CONTRAT MULTIRISQUE PROFESSIONNELLE DU\
            BÂTIMENT ET DES TRAVAUX PUBLICS, Numéro : 177310791 J – MCE – 001, au titre de sa responsabilité, susceptible d’être\
            engagée sur le fondement des articles 1792 et suivants du Code civil. LABEL ENERGIE met à disposition du Client les\
            détails de cette police d’assurance sur simple requête adressée par courriel au service juridique. Au cas où le Client\
            actionnerait la garantie décennale de LABEL ÉNERGIE, et si sa responsabilité est écartée, LABEL ENERGIE se réserve le\
            droit de facturer au Client, le montant des frais qui en ont découlé.",
        ],
      },
      {
        title: "11.5. APPLICATION DES GARANTIES",
        content: [
          "La garantie s’applique dans la mesure où le Client respecte les règles de bon fonctionnement. Il veille notamment à\
            maintenir l’équipement en bon état d’entretien en se conformant au manuel d’utilisation fourni par LABEL ENERGIE.\
            Compte tenu de la spécificité de l’équipement, et, pendant toute la durée de la garantie, le Client s’engage à informer sans\
            délai LABEL ÉNERGIE de tous les dégâts, détérioration en panne et à recouvrir exclusivement à ses services pour effectuer\
            les réparations nécessaires.",
        ],
      },
      {
        title: "11.6. MISE EN ŒUVRE DES GARANTIES",
        content: [
          "En cas de sinistre survenu pendant la période de garantie, le Client en informe LABEL ENERGIE dans les plus brefs délais,\
        par écrit à l’adresse postale suivante : LABEL ENERGIE service juridique 3 allée du 1er mai 77183 CROISSY BEAUBOURG.",
        ],
      },
      {
        title: "11.7. EXCLUSION DE GARANTIE",
        content: [
          `La garantie accordée ne saurait concerner le vol ou la casse du matériel vendu et installée, si ce n'est celle consécutive à un usage normal et prévisible des appareils. La présente garantie impose, pour le cas où elle sera valablement mise en œuvre, et au choix du Vendeur soit de réparer le matériel en cause soit de le remplacer. En toute hypothèse, cette garantie ne saurait financièrement dépasser le montant que le fournisseur justifiera avoir payé pour l’acquisition dudit Produit. La garantie est exclue et la responsabilité du Vendeur ne peut être engagée dans les cas suivants :
          - Non paiement partiel ou total du montant de la commande ;
          - Détérioration des appareils provenant directement ou indirectement d’accidents de toutes sortes, chocs, surtensions, foudre, inondations, incendie et d’une manière générale, toutes autres cause autre que celle résultant d'une utilisation normale ;
          - Mauvais fonctionnement résultant d’adjonction de pièces ou de dispositifs ne provenant pas du Vendeur ;
          - Intervention de quelque nature que ce soit par une personne non agréée par le Vendeur ;
          - Variation du courant électrique, dérangement, panne ou rupture des lignes téléphoniques
          - Modificationsdommageablesdel’environnementdel'appareil(température,hygrométrie, poussières)
          - Modification des spécifications d’un appareil ou utilisation non conforme aux caractéristiques techniques
          - Interférence et brouillage de toutes sortes, radioélectriques ou électriques
          - Les perturbations de fonctionnement dues à un événement relevant de la force majeure
          - Non respect des consignes d’utilisation des matériaux et ou des notices d’utilisation du matériel délivré
          - Utilisation des appareils dans des conditions non conforme à leur usage
          - Défaut d'entretien et de maintenance
          - Vices apparents
          - Défauts et détériorations provoqués par l’usure naturelle ou par une modification du Produit non prévue.`,
        ],
      },
      {
        title: "11.8. EXCLUSION DE RESPONSABILITÉ",
        content: [
          `La responsabilité de LABEL ENERGIE ne saurait être engagée en raison :
          - D’une modification ou de la suppression, légales ou réglementaires, des aides et subventions, d’origine publique ou privée, auquel le Client pourrait prétendre ;
          - Des conditions d’octroi et de montant du crédit d’impôt auquel le Client peut prétendre ainsi que toute évolution légales ou réglementaires susceptibles d’intervenir en la matière ;
          - De l’obtention ou non par ses Clients des subventions, aides et crédits d'impôt visés par le projet. Le contrat avec le Client ne pourra pas être résilié si le Client n'obtient pas les subventions, aides ou crédits d’impôt qu’il escomptait.
          - Les niveaux de subventions, aides ou crédits d'impôt mentionnés sont purement indicatifs et reflètent l’état des connaissances du Vendeur. En cas de financement par un organisme financier, la contribution de LABEL ÉNERGIE se limite à l’assistance dans la réalisation des démarches auprès des organismes concernés.
          - De toute évolution des conditions du rachat d’électricité par ERDF ;
          - De toute évolution ou suppression des aides de l’État existante au jour de la souscription du présent contrat d’achat par le Client ;
          - Des délais d’intervention de ERDF quant aux travaux de raccordement et/ou autres travaux en lien avec l’installation, objet du contrat ;
          - De toute promesse d’économie d’énergie sur facture du consommateur ou de toute promesse de subvention formulée est un représentant du professionnel, dès lors que ladite promesse n’aura pas été validée par le siège du professionnel par un document officiel (document Word, ou PDF, contresigné et tamponné, courriel, fax, étude) réalisé, préalablement en contrat en considération de l’étude des factures du consommateur sur une année, étant entendu que sans transmission desdites pièces sur une année, aucune étude ou promesses ne saurait être valable ;
          - En cas d’impossibilité d’exécution des travaux pour une cause de force majeure, la durée de chantier sera prolongée sans que le Client puisse rechercher la responsabilité de LABEL ENERGIE ;
          - En cas de difficultés rencontrées par LABEL ÉNERGIE dans le cadre de l’installation, consécutive à la communication, d’une information incomplète ou inexact ;`,
        ],
      },
      {
        title: "ATTENTION",
        content: [
          "L'indemnité et la facturation de déplacement seront déterminées en fonction de la nature du problème identifié lors du\
            Service Après-Vente (SAV). Si le problème découle de l'installation initiale du client ou une tierce partie, et non de\
            l'installation réalisée par LABEL ÉNERGIE pour laquelle une garantie est fournie, un forfait de déplacement et de\
            diagnostic de 299 € sera facturé au client.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 12 : ENGAGEMENTS ET RESPONSABILITE DU CLIENT",
    content: [
      {
        title: "12.1. ENGAGEMENTS GENERAUX",
        content: [
          "Au terme des travaux d'installation du matériel, le Client devra obligatoirement signer l’ensemble des documents remis\
                par les techniciens du LABEL ENERGIE comprenant notamment l’attestation de prise en charge, attestation de mise en\
                service, attestation de fin de travaux avec ou sans réserve ...) et transmettre tous les documents nécessaires jusqu’à la\
                valorisation complète de son dossier auprès des organismes étatiques (justificatifs de domicile, carte nationale d'identité,\
                le cadastre, les informations disponibles sur le Géoportail... ) et son entier paiement. De plus, si le Client peut en bénéficier,\
                ce dernier s’engage à signer tous documents permettant l’obtention d’éventuelles primes ou un certificat d’économie\
                d’énergie dans le cadre des présentes, uniquement au bénéfice de LABEL ÉNERGIE et à ne pas les céder à des tiers.",
        ],
      },
      {
        title:
          "12.2. ENGAGEMENTS POUR LES CLIENTS BÉNÉFICIANT DE L’AIDE MA PRIME RENOV",
        content: [
          `Les éventuelles aides d’organismes tiers sont conditionnelles et soumises au respect des engagements souscrits par le Client, bénéficiaire des aides. C’est la raison pour laquelle le Client s’engage :
          - A renvoyer le formulaire signé dénommé « Attestation de consentement à la demande de MaPrimeRénov’ » à l’ANAH ;
          - Se soumettre aux contrôles sur place en application de l’article 10 du décret n° 2020-26 du 14 janvier 2020 relatif à la prime de rénovation énergétique ;
          - Répondre aux mails et appels émis par le mandataire administratif et financier, notamment à répondre à leur enquête de satisfaction ;
          - Envoyer à LABEL ÉNERGIE sur demande, l’ensemble des documents et/ ou photos nécessaires à la valorisation du dossier ;
          - Répondre aux mails et appels de l’ANAH ;
          - A répondre aux critères d’éligibilité imposées par l’ANAH ;
          - A répondre à LABEL ENERGIE et ses techniciens en cas de service-après-vente ;`,
        ],
      },
      {
        title: "12.3. ENGAGEMENTS POUR LES CLIENTS BÉNÉFICIANT DE LA PRIME CEE",
        content: [
          "Les éventuelles aides d’organismes tiers sont conditionnelles et soumises au respect des engagements souscrits par le\
            Client, bénéficiaire des aides.\
            C’est la raison pour laquelle le Client s’engage :\
            - Se soumettre aux contrôles sur place (contrôles COFRAC) ;\
            - Signer l’ensemble du dossier CEE (cadre de contribution, attestation sur l’honneur, devis, facture...) ;\
            - Transmettre les documents sincères et véritables à jour.",
          `[CARD]**Pour les PROPRIÉTAIRES OCCUPANT :
            ● **Avis d’impôt dernière année de toutes les pages ;
            ● **Pièce d’identité en cours de validité ;
            ● **Taxe foncière ou acte notarié simplifié tamponné et signé par le notaire ;
            ● **Acte notarié simplifié tamponné et signé par la notaire obligatoire si l’adresse du bénéficiaire est un lieu-dit.

**Pour les PROPRIÉTAIRES BAILLEURS :
            ● **Avis impôt dernière année de toutes les pages du propriétaire et du ou des locataire(s) ;
            ● **Pièce d’identité en cours de validité du propriétaire et du ou des locataire(s) ;
            ● **Taxe foncière ou acte notarié simplifiée tamponné et signé par la notaire ;
            ● **Acte notarié simplifié tamponné et signé par le notaire ;
            ● **Acte notarié simplifié tamponné et signé par la notaire obligatoire si l’adresse du bénéficiaire est un lieu-dit
            ● **Bail de location.`,
          "A répondre aux critères d’éligibilité imposées par le pollueur :",
          `[CARD]**PROPRIÉTAIRE OCCUPANT (PO) OU PROPRIÉTAIRE BAILLEUR (PB)**
 Les PB doivent s’engager sur l’honneur à louer leur bien en tant que résidence principale sur une durée d’au moins 6 ans et dans un délai de 6 ans et dans un délai d’un an suivant la date de demande de paiement du solde de la prime. Si un propriétaire cesse de louer le logement avant cette durée de 6 ans, il devra rembourser une partie de l’aide perçue (1/6 de l’aide perçue pour chaque année non louée).`,
          "A répondre à LABEL ENERGIE et ses techniciens en cas de service-après-vente",
        ],
      },
      {
        title: "12.4. RESPONSABILITÉ DU CLIENT",
        content: [
          "En cas de non-respect des engagements, de fausse déclaration ou manœuvre frauduleuse, ou en cas de changement du\
      projet de travaux subventionné, le Client s’expose au retrait et reversement de tout ou partie de l'aide. Le Vendeur se\
      réserve aussi le droit de retirer les Produits installés auprès du Client. Les services de ces organismes pourront faire\
      procéder à tout contrôle des engagements. Dans ce cas, le Vendeur facturera le montant des subventions non accordées\
      mais déduites des factures adressées préalablement au Client.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 13 : RÉSILIATION CONTRAT",
    content: [
      {
        content: [
          "En cas de retard du début de l’installation du matériel par rapport à la date fixée entre le Client et LABEL ÉNERGIE, de\
        plus de 30 jours, le Client pourra demander dans un délai de 60 jours ouvrés à compter de l’expiration du délai figurant\
        dans le bon de commande, la résolution anticipée du contrat par lettre recommandée avec accusé de réception.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 14 : SOUS-TRAITANCE",
    content: [
      {
        content: [
          "LABEL ENERGIE se réserve le droit de sous-traiter à un tiers tout ou partie des prestations prévues au présent contrat,\
          sans que le Client puisse s’y opposer. En tout état de cause, la sous-traitance ne provoque aucune modification aux droits\
          et obligations découlant du présent contrat, pour le Client comme pour LABEL ENERGIE, ce dernier étant seul\
          responsable des sous-traitants qu’il pourrait désigner.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 15 : FORCE MAJEURE",
    content: [
      {
        content: [
          "LABEL ENERGIE ne pourra être considéré comme ayant failli à ses obligations dans la mesure où leur exécution sera\
          retardée, entravée ou empêchée par la force majeure. Outre les cas de force majeure définis par l’article 1218 du Code civil\
          et la jurisprudence, les événements suivants constitueront des cas de force majeure sans autre obligation pour LABEL\
          ÉNERGIE que d’établir leur existence et leur incidence sur l’exécution des obligations : guerres, émeutes, épidémie,\
          pandémie, événements internationaux ou naturels affectant les transports terrestres, maritimes ou fluviaux, grèves\
          partielles ou totales ou lock-out dans les usines des fabricants, l’industrie, le commerce ou les transports, sinistres\
          affectant gravement les installations de l’établissement livreur, les intempéries (ouragans, tempêtes, neige,...).",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 16 : DELAI DE RETRACTATION",
    content: [
      {
        title: "16.1. DISPOSITIONS GENERALES",
        content: [
          "Si les dispositions de l’article L.221-18 du Code de la consommation lui sont applicables, le Client dispose d’un délai de\
                quatorze jours pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.",
        ],
      },
      {
        title: "16.2. MODALITÉS D’EXERCICE DU DROIT DE RÉTRACTATION",
        content: [
          "Pour exercer son droit de rétractation, le Client adressera à LABEL ÉNERGIE le formulaire de rétractation complété ou\
          toute autre déclaration, dénuée d’ambiguïté, exprimant sa volonté de se rétracter. Le formulaire de rétractation ou toute\
          autre déclaration exprimant sa volonté de se rétracter devra être adressé par lettre recommandée avec accusé de\
          réception à l’adresse suivante :",
        ],
      },
      {
        title: "16.3. EFFETS DE LA RÉTRACTATION",
        content: [
          "Lorsque le Client exerce son droit de rétractation dans le délai légal, LABEL ENERGIE s’engage à lui rembourser le\
          montant du prix perçu dans un délai de quatorze jours à compter de la réception de la décision du Client de se rétracter.\
          Ce remboursement se fera en utilisant le même moyen de paiement que celui que le Client aura utilisé pour la\
          transaction initiale, sauf si le Client convient expressément d’un moyen différent ; en tout état de cause, ce\
          remboursement n’occasionnera pas de frais pour le Client. Le Client a la possibilité de demander expressément à LABEL\
          ÉNERGIE lors de sa commande d’exécuter la prestation de services avant la fin du délai de rétractation de quatorze jours.\
          Dans ce cas, le Client renonce expressément à exercer ce droit une fois la prestation de services objet du contrat\
          entièrement exécuté. Avant l’exécution complète de la prestation de services de LABEL ÉNERGIE, si le Client lui a\
          demandé de commencer la réalisation de la prestation de service pendant le délai de rétractation, le Client devra verser à\
          LABEL ÉNERGIE un montant proportionnel à ce qui lui a été fourni jusqu’au moment où le Client a informé LABEL\
          ÉNERGIE de sa rétractation du présent contrat, par rapport à l’ensemble des prestations prévues par le contrat. Si l’objet\
          du devis est une prestation de services : le délai de rétractation de quatorze jours mentionnés ci-dessus court à compter\
          de la date de la conclusion du contrat. Si l’objet du devis est la vente d’un bien : le délai de rétractation de quatorze jours\
          mentionnés ci-dessus court à compter (i) de la date où le Client, ou un tiers autre que le transporteur et désigné par le\
          Client, prend physiquement possession du bien, ou si plusieurs biens sont commandés, prend physiquement possession\
          du dernier bien ou (ii) s’il s’agit d’un contrat hors établissement, de la date de la conclusion du contrat. Dans ce cas, le\
          Client restitue le bien au professionnel dans un délai de quatorze jours à compter de sa décision de se rétracter. Ce délai\
          de quatorze jours est réputé respecté si le Client renvoie le bien avant l’expiration de ce délai. Le Client supporte les frais\
          directs de renvoi du bien et les frais de dépose du bien si celui-ci a déjà été installé.\
          Pour les contrats conclus hors établissement, lorsque LABEL ÉNERGIE a livré le bien au domicile du Client au moment de\
          la conclusion du contrat et que le bien ne peut être renvoyé normalement par voie postale alors LABEL ÉNERGIE\
          récupèrera à ses frais lesdits bien au domicile du Client.\
          La responsabilité du Client n’est engagée qu’à l’égard de la dépréciation du bien résultant de manipulations autres que\
          celles nécessaires pour établir la nature, les caractéristiques et le bon fonctionnement de ce bien.\
          LABEL ÉNERGIE peut différer le remboursement mentionné ci-dessus jusqu’à ce qu’il ait reçu le bien ou jusqu’à ce que le\
          Client ait fourni une preuve d’expédition du bien, la date retenue étant celle du premier de ces faits.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 17 : PROTECTION DES DONNÉES À CARACTÈRE PERSONNEL - RGPD",
    content: [
      {
        content: [
          "Conformément à la loi n°78-17 du 6 janvier 1978 modifiée (dite “loi informatique et Libertés”) et au Règlement général sur\
            la Protection des données 2016/679 du 27 avril 2016 (“RGPD”), des données à caractère personnel concernant les Clients\
            font l’objet d’un traitement informatique par LABEL ÉNERGIE agissant en qualité de responsable de traitement pour\
            notamment : effectuer des opérations relatives à la gestion des relations commerciales dans le cadre de la fourniture de\
            tous Produits, faciliter l'identification des Clients et informer les Clients de toute modification apportée aux Produits et\
            services, les améliorer mener des actions de prospections et des analyses statistiques. Ces données ne sont pas\
            susceptibles d’être transférées dans des pays non-membres de l’Espace Économique Européen. Pour les stricts besoins de\
            la gestion des relations commerciales, ces données peuvent être l'accomplissement des finalités rappelées ci-dessus. Sous\
            réserve d’en remplir les conditions, le Client ou le prospect dispose à tout moment d’un droit d’accès, de rectification,\
            d’opposition, à l’effacement, à la limitation et, si la technique le permet, à la portabilité de ses données personnelles. Pour\
            exercer ce droit, le Client doit adresser sa demande, ainsi qu’une copie d’un titre d’identité légalement reconnu si LABEL\
            ÉNERGIE le demande, par courrier postal au siège de LABEL ÉNERGIE à l’adresse indiquée en tête des présentes. Le Client\
            dispose également de la possibilité d’introduire une réclamation auprès de la CNIL.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 18 : CADRE JURIDIQUE",
    content: [
      {
        content: [
          "Les informations que le Client communique étant indispensables pour le traitement de son dossier, leur absence entraîne\
          la déchéance des garanties prévues au présent contrat. Dans le cadre d’un contrôle de qualité, les conversations\
          téléphoniques ayant eu lieu entre le Client et les services de LABEL ÉNERGIE pourraient donner lieu à enregistrement.",
        ],
      },
    ],
  },
  {
    title: "ARTICLE 19 : RÈGLEMENT DES LITIGES – DROIT APPLICABLE",
    content: [
      {
        content: [
          "Les opérations de prestations de service susmentionnées dans le bon de commande sont soumises au droit français. Tous\
          les litiges auxquels les opérations de prestation de services conclues en application des conditions générales de vente\
          applicables pourraient donner lieu, tant de leur validité, leur interprétation, leur exécution, leur résiliation, leurs\
          conséquences et leurs suites et qui n’auraient pu être résolues entre LABEL ENERGIE et le Client seront soumis aux\
          tribunaux compétents dans les conditions de droit commun. Le Tribunal compétent en cas de litige sera celui du lieu du\
          domicile du défendeur ou, au choix du demandeur, du lieu de livraison effective du Produit ou de la signature du contrat\
          de vente. Toutefois, les parties s’efforceront de trouver une solution amiable en cas de survenance d’un litige. En cas de\
          contestation, le Client a la possibilité d’adresser une réclamation, par écrit à l’adresse postale suivante : SERVICE\
          JURIDIQUE LABEL ENERGIE - 3 Allée du 1er mai - 77183 CROISSY BEAUBOURG. LABEL ÉNERGIE y répondra dans les\
          meilleurs délais. Par ailleurs, conformément aux dispositions de l’article L616-1 du Code de la consommation relatives au\
          processus de médiation des litiges de la consommation, le Client a le droit de recourir gratuitement au service de\
          médiation proposé par LABEL ÉNERGIE médiateur de la consommation ainsi proposé est : L’association MÉDIATION EN\
          SEINE par Courrier : 17/25 avenue du maréchal Joffre – 92000 NANTERRE ou par voie électronique en complétant le\
          formulaire mis à sa disposition sur consommation@mediation-en-seine.org.",
        ],
      },
    ],
  },
];
