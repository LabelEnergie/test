import Button from "@/components/shared/Button";
import GradientDivider from "@/components/shared/GradientDivider";
import Modal from "@/components/shared/Modal";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { forwardRef, useImperativeHandle } from "react";

export interface ChangeFormulaModalRef {
  onOpen(): void;
}

interface ChangeFormulaModalProps {}

export default forwardRef<ChangeFormulaModalRef, ChangeFormulaModalProps>(
  (props, ref) => {
    const {} = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
      onOpen: () => {
        onOpen();
      },
    }));

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <VStack
          flexDir={{ base: "column", lg: "row" }}
          spacing={8}
          overflowX="hidden"
        >
          <Box borderWidth={1} borderRadius="lg" w="50%">
            <VStack align="stretch" spacing={0}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
                bg="secondaryLight"
                px={4}
                py={3}
                borderBottomWidth={1}
              >
                FORMULE LIBERTÉ PAC
              </Text>
              <Text
                fontSize="sm"
                fontWeight="bold"
                px={4}
                py={3}
                textAlign="center"
                borderBottomWidth={1}
              >
                14,90 €/mois soit 178,80 €/an
              </Text>
              <VStack px={4} py={2} align="stretch">
                <HStack spacing={5}>
                  <GradientDivider zoom={false} w="20px" minW="20px" />
                  <Text w="full">Visite d'entretien annuel</Text>
                </HStack>
                <Flex mt={2}>
                  <GradientDivider
                    zoom={false}
                    w="20px"
                    minW="20px"
                    mt="6px"
                    mr={5}
                  />
                  <Text w="full" verticalAlign="top">
                    Lors du 1er dépannage bénéficiez de 20% de réduction sur les
                    pièces
                  </Text>
                </Flex>
              </VStack>
            </VStack>
          </Box>
          <Box w="50%">
            <Text fontSize="2xl" fontWeight="bold">
              Changement de formule
            </Text>
            <Text mt={5}>
              Compte tenu de l'ancienneté de votre équipement, nous ne sommes
              pas en mesure de vous proposer la formule "Sécurité".
            </Text>
            <Text my={3}>
              Nous vous suggérons de poursuivre avec la Formule Liberté, qui est
              la plus proche de la Formule Sécurité.
            </Text>

            <VStack spacing={4} w="full" mt={5}>
              <Button
                w="full"
                onClick={() => {
                  onClose();
                }}
                fontSize={16}
                href="/services/contrat-entretien?type=liberte"
              >
                Continuer avec la formule Liberté
              </Button>
              <Text
                as={Link}
                href="/services/entretien-maintenance#offres"
                onClick={onClose}
                fontWeight={600}
              >
                Choisir une autre formule
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Modal>
    );
  }
);
