import { Flex, Text } from "@chakra-ui/react";

const ITEMS = [
  "Un contrat adapté à vos besoins et un suivi sur-mesure de votre équipement.",
  "Des interventions rapide avec notre couverture nationale",
  "Des conseillers et techniciens experts à votre écoute.",
];

export default function MaintenanceFooter() {
  return (
    <Flex justifyContent="space-between" mt={20}>
      {ITEMS.map((item, i) => (
        <Text key={i} maxW="270px" fontSize={13} textAlign="center">
          {item}
        </Text>
      ))}
    </Flex>
  );
}
