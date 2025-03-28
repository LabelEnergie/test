import { formatRevenues } from "@/utils/number";
import { Box, Flex, Text } from "@chakra-ui/react";
import Divider from "../shared/Divider";
import { TProduct } from "@/types/maintenance.types";
import { useFormContext } from "react-hook-form";
import { TAddress } from "@/types/auth.types";
import { formatAddress } from "@/utils/address";
import { formatDate } from "date-fns";
import { fr } from "date-fns/locale";

interface MaintenanceCartProps {
  totalPrice: number;
  contractLabel: string;
  products: TProduct[];
}

export default function MaintenanceCart(props: MaintenanceCartProps) {
  const { contractLabel, products, totalPrice } = props;

  const form = useFormContext();

  const paymentType = form.watch("payment-type") ?? "month";
  const address: TAddress | null = form.watch("adresse");
  const date: string | null = form.watch("date");

  return (
    <Box
      w="full"
      maxW="370px"
      borderWidth={1}
      borderColor="king"
      bg="white"
      px={7}
      py={4}
      mt={{ base: 5, lg: 0 }}
      color="king"
      h="fit-content"
    >
      <Text fontWeight={700} fontSize={20}>
        Votre panier
      </Text>
      <Divider />
      <Flex justifyContent="space-between">
        <Text>Total</Text>
        <Box textAlign="right">
          <Text fontWeight={700}>{formatRevenues(totalPrice)} TTC/mois</Text>
          <Text>Soit {formatRevenues(totalPrice * 12)} TTC/an</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" mt={5}>
        <Text>TVA</Text>
        <Text fontWeight={200}>5,5%</Text>
      </Flex>
      <Divider />
      <Box>
        <Flex justifyContent="space-between">
          <Box>
            <Text>Formule</Text>
            <Text mb={2}>{contractLabel}</Text>
          </Box>
          <Box textAlign="right" fontSize={13} mt={1}>
            <Text>{formatRevenues(totalPrice)} TTC/mois</Text>
            <Text>Soit {formatRevenues(totalPrice * 12)} TTC/an</Text>
          </Box>
        </Flex>
        {products.map((p) => (
          <Text key={p.id} fontSize={13} noOfLines={1}>
            - {p.name}
          </Text>
        ))}
      </Box>

      <Flex
        bg="secondary"
        px={3}
        py={2}
        justifyContent="space-between"
        my={5}
        color="white"
        fontWeight={600}
        alignItems="center"
      >
        <Text fontSize={18}>TOTAL CONTRAT</Text>
        <Text fontSize={13}>
          {formatRevenues(totalPrice * (paymentType == "month" ? 1 : 12))} TTC/
          {paymentType == "month" ? "mois" : "an"}
        </Text>
      </Flex>

      {address && date && (
        <Box bg="secondaryLight" rounded="md" px={7} py={4}>
          <Text>Votre rendez-vous temporaire</Text>
          <Text mt={5} fontWeight={700}>
            {formatAddress(address)}
          </Text>
          <Text mt={3} fontWeight={700} textTransform="capitalize">
            {formatDate(new Date(date.split("|")[0]), "EEEE dd MMMM yyyy", {
              locale: fr,
            })}
          </Text>
          <Text mt={3} fontWeight={700}>
            {date.split("|")[1]}
          </Text>
        </Box>
      )}
    </Box>
  );
}
