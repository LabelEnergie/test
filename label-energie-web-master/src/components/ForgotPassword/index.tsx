"use client";

import { useForgotPassword } from "@/services/auth.services";
import { VStack, useToast } from "@chakra-ui/react";
import { SubmitButton } from "../shared/SubmitButton";
import { Form, useZodForm } from "../shared/form/form";
import Container from "../shared/Container";
import { noEmptyEmailSchema } from "@/utils/schemas";
import { z } from "zod";
import { Input } from "../shared/form/Input";
import UnLoggedClientContainer from "../shared/UnLoggedClientContainer";

const schema = z.object({
  email: noEmptyEmailSchema,
});

const DEFAULT_VALUES = {
  email: "",
};

export default function ForgotPassword() {
  const { mutate: doForgotPassword, isPending } = useForgotPassword();

  const form = useZodForm({ schema, defaultValues: DEFAULT_VALUES });
  const toast = useToast();

  return (
    <UnLoggedClientContainer
      title="Mot de passe perdu ?"
      cardTitle="Mot de passe oublié ?"
      canGoBack
    >
      <Form
        form={form}
        onSubmit={(values) => {
          doForgotPassword(values.email, {
            onSuccess() {
              toast({
                title: "Un email de vérification vient de vous être envoyé",
                status: "success",
                description: "Pensez à vérifier vos spams",
                position: "top",
              });
              form.reset(DEFAULT_VALUES);
            },
          });
        }}
      >
        <VStack spacing={10}>
          <Input label="Email" type="email" {...form.register("email")} />
          <SubmitButton isLoading={isPending} fontSize={16}>
            Réinitialiser mon mot de passe
          </SubmitButton>
        </VStack>
      </Form>
    </UnLoggedClientContainer>
  );
}
