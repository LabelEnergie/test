"use client";

import Button from "@/components/shared/Button";
import { useGenerateMaintenanceContract } from "@/services/maintenance.service";
import { TProduct } from "@/types/maintenance.types";
import {
  Box,
  Center,
  Checkbox,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface MaintenanceCheckContractProps {
  products: TProduct[];
  onSubmit(): void;
  type: string;
}

export default forwardRef<any, MaintenanceCheckContractProps>((props, ref) => {
  const { products, onSubmit, type } = props;

  const { watch, setValue, getValues } = useFormContext();

  const { mutate: generateContract, isPending } =
    useGenerateMaintenanceContract();

  const [signedContract, setSignedContract] = useState("");

  const unsignedDocUrl = watch("unsignedDocUrl");
  const recipientViewUrl = watch("recipientViewUrl");

  function handleStorageChange(event: StorageEvent) {
    if (event.key === "signedContract") {
      setSignedContract(event.newValue ?? "");
    }
  }

  useEffect(() => {
    if (!signedContract) {
      generateContract(
        {
          currentForm: getValues(),
          productIds: products.map((p) => p.id),
          type,
        },
        {
          onSuccess({ recipientViewUrl, docUrl, envelopeId }) {
            setValue("recipientViewUrl", recipientViewUrl);
            setValue("unsignedDocUrl", docUrl);
            setValue("envelopeId", envelopeId);
          },
        }
      );
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [signedContract]);

  const cb1 = getValues("contractCheckbox1");
  const cb2 = getValues("contractCheckbox2");

  return (
    <Box position="relative">
      {isPending && (
        <Spinner
          position="absolute"
          left="calc(50% - 50px)"
          top={10}
          boxSize="100px"
          color="primary"
        />
      )}
      <Box
        visibility={
          recipientViewUrl && unsignedDocUrl && !isPending
            ? "visible"
            : "hidden"
        }
      >
        {!signedContract && (
          <Center
            flexDir="column"
            bg="#9ce2fb"
            p={5}
            color="king"
            fontSize={18}
            rounded="md"
          >
            <Image src="/icons/maison_securisee.png" h="60px" />
            <Text fontWeight={600} my={2}>
              Mon contrat d'entretien
            </Text>
            <VStack>
              {products.map((p) => (
                <Text key={p.id}>{p.name}</Text>
              ))}
            </VStack>
            <Button my={5} h="55px" href={unsignedDocUrl} target="_blank">
              Visualiser mon contrat
            </Button>
          </Center>
        )}
        {signedContract ? (
          <>
            <Text fontSize={11} textAlign="center" mt={10}>
              En cliquant sur "Procéder au paiement", je confirme ma
              souscription et m'engage à régler les factures correspondant au
              contrat
            </Text>
            <Button
              h="55px"
              mx="auto"
              mt={10}
              isDisabled={!cb1 || !cb2}
              onClick={() => {
                localStorage.setItem("signedContract", "");
                onSubmit();
              }}
            >
              Procéder au paiement
            </Button>
          </>
        ) : (
          <>
            <VStack mt={10} align="stretch">
              <Checkbox
                size="lg"
                isChecked={cb1}
                onChange={(e) =>
                  setValue("contractCheckbox1", e.currentTarget.checked)
                }
              >
                <Text ml={4}>
                  J'ai pris connaissance de mon contrat et pièces annexes
                  ci-dessus
                </Text>
              </Checkbox>
              <Checkbox
                size="lg"
                isChecked={cb2}
                onChange={(e) =>
                  setValue("contractCheckbox2", e.currentTarget.checked)
                }
              >
                <Text ml={4}>
                  J'ai pris connaissance des{" "}
                  <Text
                    as={Link}
                    href="/mentions-legales"
                    color="secondary"
                    textDecorationLine="underline"
                  >
                    conditions générales de vente et de leur(s) annexe(s)
                  </Text>{" "}
                </Text>
              </Checkbox>
            </VStack>
            <Button
              h="55px"
              mx="auto"
              mt={10}
              isDisabled={!cb1 || !cb2}
              href={recipientViewUrl}
              target="_blank"
            >
              Signer mon contrat
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
});
