"use client";

import { useResetPassword } from "@/services/auth.services";
import { VStack, useToast } from "@chakra-ui/react";
import { SubmitButton } from "../shared/SubmitButton";
import { Form, useZodForm } from "../shared/form/form";
import Container from "../shared/Container";
import { noEmptyStringSchema } from "@/utils/schemas";
import { z } from "zod";
import { Input } from "../shared/form/Input";
import { getError } from "@/utils/error";
import { useRouter, useSearchParams } from "next/navigation";
import { InputPassword } from "../shared/form/InputPassword";

const schema = z
  .object({
    password: noEmptyStringSchema,
    password2: noEmptyStringSchema,
  })
  .superRefine((obj, ctx) => {
    if (obj.password != obj.password2) {
      ctx.addIssue({
        message: "Les mots de passes ne correspondent pas",
        path: ["password2"],
        code: "custom",
      });
    }
  });

const DEFAULT_VALUES = {
  password: "",
  password2: "",
};

export default function ResetPassword() {
  const { mutate: doResetPassword, isPending } = useResetPassword();

  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const email = searchParams.get("email") ?? "";

  const form = useZodForm({ schema, defaultValues: DEFAULT_VALUES });
  const toast = useToast();

  return (
    <Container>
      <Form
        form={form}
        onSubmit={(values) => {
          doResetPassword(
            { newPassword: values.password, code },
            {
              onSuccess() {
                toast({
                  title: "Mot de passe modifié avec succès",
                  description: "Veuillez vous reconnecter",
                  status: "success",
                  position: "top",
                });
                router.push("/app/connexion");
              },
              onError(err) {
                const error = getError(err);

                toast({
                  title: error.message,
                  status: "error",
                  position: "top",
                });
              },
            }
          );
        }}
      >
        <VStack>
          <InputPassword
            label="Mot de passe"
            type="password"
            {...form.register("password")}
          />
          <InputPassword
            label="Confirmer le mot de passe"
            type="password"
            {...form.register("password2")}
          />
        </VStack>
        <SubmitButton isLoading={isPending} fontSize={16} mt={10} mx="auto">
          Modifier mon mot de passe
        </SubmitButton>
      </Form>
    </Container>
  );
}
