"use client";

import { Box, BoxProps, Stack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, useZodForm } from "../shared/form/form";
import { SubmitButton } from "../shared/SubmitButton";
import { Input } from "../shared/form/Input";
import { getError } from "@/utils/error";
import { HttpStatusCode } from "axios";
import { useSignUp } from "@/services/auth.services"; // Assurez-vous que cette importation est correcte
import {
  addressSchema,
  noEmptyEmailSchema,
  noEmptyStringSchema,
} from "@/utils/schemas";
import { VStack } from "@chakra-ui/react";
import { z } from "zod";
import { InputPassword } from "../shared/form/InputPassword";
import { TAddress } from "@/types/auth.types";
import { InputAddress } from "../shared/form/InputAddress";
import { FirebaseError } from 'firebase/app';

const schema = z
  .object({
    email: noEmptyEmailSchema,
    firstName: noEmptyStringSchema,
    lastName: noEmptyStringSchema,
    password: noEmptyStringSchema,
    password2: noEmptyStringSchema,
    address: addressSchema,
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
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  password2: "",
};

interface SignUpFormProps extends BoxProps {
  defaultAddress?: TAddress;
  onEnd?(): void;
}

export default function SignUpForm(props: SignUpFormProps) {
  const { defaultAddress, onEnd, ...rest } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useZodForm({
    schema,
    defaultValues: { ...DEFAULT_VALUES, address: defaultAddress },
  });

  const { mutate: doSignUp, isPending } = useSignUp();

  const handleSignUpSuccess = () => {
    const redirect = searchParams?.get("redirect") || null; // Gestion de 'searchParams' possiblement null
    
    try {
      if (redirect) {
        router.push(redirect);
      } else if (onEnd) {
        onEnd();
      } else {
        router.replace("/app/mon-compte/mes-informations");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback navigation
      window.location.href = "/app/mon-compte/mes-informations";
    }
  };

  return (
    <Box {...rest}>
      <Form
        form={form}
        onSubmit={(values) => {
          doSignUp(values, {
            onSuccess: handleSignUpSuccess,
            onError(error) {
              if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
                form.setError("email", { message: "Cette adresse email est déjà utilisée" });
              } else {
                const errorMsg = getError(error);
                form.setError("email", { message: errorMsg.message });
              }
            },
          });
        }}
      >
        <VStack>
          <Stack flexDir={{ base: "column", sm: "row" }} w="full">
            <Input label="Prénom" {...form.register("firstName")} />
            <Input label="Nom" {...form.register("lastName")} />
          </Stack>
          <Input label="Email" type="email" {...form.register("email")} />
          <InputPassword label="Mot de passe" {...form.register("password")} />
          <InputPassword
            label="Confirmer le mot de passe"
            {...form.register("password2")}
          />
        </VStack>
        {!defaultAddress && (
          <Box mt={10}>
            <InputAddress label="Adresse" {...form.register("address")} />
          </Box>
        )}

        <SubmitButton isLoading={isPending} mt={10}>
          Créer mon compte
        </SubmitButton>
      </Form>
    </Box>
  );
}