"use client";

import {
  Box,
  BoxProps,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import Card from "../shared/Card";
import { FORM_MAINTENANCE_HREF, SOLUTIONS } from "@/constants/headerItems";
import { useMemo, useState } from "react";
import Button from "../shared/Button";
import { roundNumber } from "@/utils/number";
import { useRouter } from "next/navigation";

const CUSTOM_PERKS = [
  "Visite d'entretien tous les 2 ans*.",
  "Programmation automatique de la visite d'entretien.",
  "Attestation d'entretien téléchargeable sur votre espace client.",
  "Dépannages payants (main d'oeuvre et déplacement), dans les 72h (3)(5).",
  "Pièces détachées payantes avec -20% sur celles changées lors du 1er dépannage (6).",
  "Assistance technique à votre service.",
];

export default function CustomService(props: BoxProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const router = useRouter();

  const totalPrice = useMemo(() => {
    const solutions = SOLUTIONS.filter((s) => selected.includes(s.id)).map(
      (s) => s.price
    );
    return roundNumber(
      solutions.reduce((acc, value) => {
        let price = value?.monthly ?? 0;
        if (solutions.length > 1 && value?.combo) {
          price = value.combo;
        }
        return price + acc;
      }, 0),
      2
    )
      .toString()
      .replace(".", ",");
  }, [selected]);

  function onSubmit() {
    if (totalPrice != "0" && selected.length > 0) {
      router.push(
        `${FORM_MAINTENANCE_HREF}?type=custom&produits=${selected.join(",")}`
      );
    }
  }

  function Price(props: BoxProps) {
    return (
      <Box {...props}>
        <Text fontSize={16}>À partir de</Text>
        <Flex alignItems="center" mt={2} fontWeight={800} color="king">
          <Text fontSize={30}>{totalPrice}</Text>
          <Text ml={1} pb={2}>
            €/Mois
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Card p={5} mx="auto" {...props}>
      <Box bg="gray.100" rounded="md" px={10} py={5}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box
            textAlign={{ base: "center", md: "left" }}
            mx={{ base: "auto", md: "unset" }}
          >
            <Text fontSize={20} fontWeight={800} color="gray.400">
              FORMULE
            </Text>
            <Text
              color="king"
              fontSize={{ base: 25, lg: 35 }}
              fontWeight={800}
              as="h3"
            >
              SUR MESURE
            </Text>
          </Box>
          <Price display={{ base: "none", md: "block" }} />
        </Flex>
        <Box bg="secondary" rounded="full" w="full" h={2} my={2} />
        <Price
          display={{ md: "none" }}
          mx="auto"
          w="fit-content"
          textAlign="center"
        />
      </Box>
      <Box px={10} py={7}>
        <Text
          color="king"
          fontWeight={800}
          textAlign={{ base: "center", md: "left" }}
        >
          Un contrat sur mesure pour tous vos systèmes
        </Text>
        <Grid
          textAlign="center"
          templateColumns={{
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          }}
          columnGap={20}
          rowGap={7}
          my={10}
        >
          {CUSTOM_PERKS.map((perk, i) => (
            <Text key={i} maxW="250px" mx={{ base: "auto", md: "unset" }}>
              - {perk}
            </Text>
          ))}
        </Grid>
        <Text
          color="king"
          fontWeight={800}
          textAlign={{ base: "center", md: "left" }}
        >
          Sélectionner les produits
        </Text>
        <CheckboxGroup
          onChange={(value) => {
            setSelected(value as string[]);
          }}
        >
          <Grid
            templateColumns={{ lg: "repeat(2,1fr)" }}
            mt={10}
            w="fit-content"
            mx={{ base: "auto", md: "unset" }}
            columnGap={5}
          >
            {SOLUTIONS.filter((s) => s.price).map((solution) => (
              <Checkbox key={solution.id} my={1} size="lg" value={solution.id}>
                <Text color="king" fontSize={18} ml={2}>
                  {solution.title}
                </Text>
              </Checkbox>
            ))}
          </Grid>
        </CheckboxGroup>
        <Center mt={20}>
          <Button onClick={onSubmit}>Souscrire en ligne</Button>
        </Center>
      </Box>
    </Card>
  );
}
