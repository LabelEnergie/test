import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Container from "../shared/Container";
import { useFormContext } from "react-hook-form";

interface MaintenanceHeaderProps {
  step: number;
  type: { type: string; label: string };
  onChangeStep(s: number): void;
}

const STEPS = [
  "Logement",
  "Équipement",
  "Coordonnées",
  "Adresse",
  "Rendez-vous",
  "Contrat",
  "Paiement",
];

export default function MaintenanceHeader(props: MaintenanceHeaderProps) {
  const { step, type, onChangeStep } = props;

  const form = useFormContext();

  const paymentTypeLabel =
    (form.watch("payment-type") ?? "month") == "month"
      ? "mensuelle"
      : "annuelle";

  return (
    <>
      <Box bg="gray.200" w="full" p={{ base: 5, lg: 10 }} overflowX="auto">
        <Wrap justify="center">
          {STEPS.map((s, i) => (
            <WrapItem
              key={i}
              minW={"120px"}
              w={{ lg: `calc(${100 / STEPS.length}% - 10px)` }}
            >
              <Text
                color="gray.400"
                fontWeight={600}
                textAlign="center"
                w="full"
                {...(i == step && {
                  color: "king",
                  fontWeight: 800,
                })}
                {...(i < step && {
                  cursor: "pointer",
                  onClick: () => onChangeStep(i),
                })}
                fontSize={{ base: 12, lg: 13, "2xl": 16 }}
              >
                0{i + 1}. {s}
              </Text>
            </WrapItem>
          ))}
        </Wrap>
        <Box bg="gray.300" rounded="full" h={2} mt={{ base: 5, md: 10 }}>
          <Box
            h="full"
            transition="width .4s"
            w={
              step == STEPS.length - 1
                ? "full"
                : `${(step + 1) * (100 / STEPS.length) - 50 / STEPS.length}%`
            }
            bg="primary"
            rounded="full"
          />
        </Box>
      </Box>
      <Box w="full" bg="king" py={"50px"}>
        <Container
          display="flex"
          justifyContent="space-between"
          color="white"
          alignItems="center"
          flexDir={{ base: "column", lg: "row" }}
        >
          <Text fontSize={30} fontWeight={700}>
            Offre {paymentTypeLabel} {type.label}{" "}
            {type.type != "custom" && "PAC"}
          </Text>
          <Text fontSize={14}>
            Offre {paymentTypeLabel}, résilliable à tout moment
          </Text>
        </Container>
      </Box>
    </>
  );
}
