"use client";

import { z } from "zod";
import AppPage from "../shared/AppPage";
import { Form, useZodForm } from "../shared/form/form";
import { noEmptyEmailSchema, noEmptyStringSchema } from "@/utils/schemas";
import { useToast, Flex, Box } from "@chakra-ui/react";
import { VStack, Stack } from "@chakra-ui/react";
import { Input } from "../shared/form/Input";
import { SubmitButton } from "../shared/SubmitButton";
import { TUser, TUpdateUserBody } from "@/types/auth.types";
import LoadingPage from "../shared/LoadingPage";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/services/auth.services";
import AppHeader from "@/app/app/mon-compte/AppHeader"; // Importez AppHeader
import AppHeaderMobile from "@/app/app/mon-compte/AppHeaderMobile"; // Importez AppHeaderMobile

const schema = z.object({
  firstName: noEmptyStringSchema.refine((val) => val.trim().length > 0, {
    message: "Le prénom est requis",
  }),
  lastName: noEmptyStringSchema.refine((val) => val.trim().length > 0, {
    message: "Le nom est requis",
  }),
  address: noEmptyStringSchema.refine((val) => val.trim().length > 0, {
    message: "L'adresse est requise",
  }),
  address2: z.string().optional(),
  zipCode: noEmptyStringSchema.refine((val) => val.trim().length > 0, {
    message: "Le code postal est requis",
  }),
  city: noEmptyStringSchema.refine((val) => val.trim().length > 0, {
    message: "La ville est requise",
  }),
  email: noEmptyEmailSchema.refine((val) => val.includes("@"), {
    message: "L'e-mail doit être valide",
  }),
});

export default function Home({ user }: { user: TUser }) {
  const toast = useToast();

  const { mutate: updateMe, isPending } = useMutation({
    mutationFn: (data: TUpdateUserBody) => updateUser(data),
    onSuccess: () => {
      toast({
        title: "Informations modifiées avec succès",
        status: "success",
        position: "top",
      });
    },
    onError: () => {
      toast({
        title: "Erreur lors de la mise à jour",
        status: "error",
        position: "top",
      });
    },
  });

  const form = useZodForm({
    schema,
    defaultValues: {
      address: user.address?.address || "",
      address2: user.address?.address2 || "",
      city: user.address?.city || "",
      zipCode: user.address?.zipCode || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    },
  });

  return (
    
    <Flex h="100vh" flexDir={{ base: "column", md: "row" }}>
      
      {/* Contenu principal à droite */}
      <Box flex={1} overflowY="auto" p={{ base: 4, md: 6 }}>
        <AppPage title="Mes informations">
          <Form
            form={form}
            onSubmit={(values) => {
              updateMe({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                address: {
                  address: values.address,
                  address2: values.address2,
                  city: values.city,
                  zipCode: values.zipCode,
                },
              });
            }}
          >
            <VStack align="stretch" spacing={5}>
              <Stack flexDir={{ base: "column", lg: "row" }} spacing={5}>
                <Input label="Nom *" {...form.register("lastName")} isDisabled={isPending} />
                <Input label="Prénom *" {...form.register("firstName")} isDisabled={isPending} />
              </Stack>
              <Input label="Adresse *" {...form.register("address")} isDisabled={isPending} />
              <Input label="Complément d'adresse" {...form.register("address2")} isDisabled={isPending} />
              <Stack flexDir={{ base: "column", lg: "row" }} spacing={5}>
                <Input label="Code Postal *" {...form.register("zipCode")} isDisabled={isPending} />
                <Input label="Ville *" {...form.register("city")} isDisabled={isPending} />
              </Stack>
              <Input label="Email *" type="email" {...form.register("email")} isDisabled={isPending} />
            </VStack>
            <SubmitButton maxW="400px" w="full" mt={10} isLoading={isPending}>
              METTRE À JOUR
            </SubmitButton>
          </Form>
        </AppPage>
      </Box>
    </Flex>
  );
}