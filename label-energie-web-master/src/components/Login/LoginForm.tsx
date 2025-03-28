"use client";

import { Box, BoxProps, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, useZodForm } from "../shared/form/form";
import { z } from "zod";
import { noEmptyEmailSchema, noEmptyStringSchema } from "@/utils/schemas";
import Link from "next/link";
import { Input } from "../shared/form/Input";
import { SubmitButton } from "../shared/SubmitButton";
import { getError } from "@/utils/error";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

// Ajout du hook useLogin pour Firebase
function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || 
            error.code === 'auth/user-not-found' || 
            error.code === 'auth/wrong-password') {
          throw new Error("Email ou mot de passe incorrect");
        }
        throw new Error(error.message || "Erreur de connexion");
      }
    }
  });
}

const schema = z.object({
  email: noEmptyEmailSchema,
  password: noEmptyStringSchema,
});

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

interface LoginFormProps extends BoxProps {
  onSuccess?(): void;
  displayForgotPassword?: boolean;
}

export default function LoginForm(props: LoginFormProps) {
  const { onSuccess, displayForgotPassword = true, ...rest } = props;
  const { mutate: doLogin, isPending } = useLogin();

  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useZodForm({ schema, defaultValues: DEFAULT_VALUES });

  return (
    <Box {...rest}>
      <Form
        form={form}
        onSubmit={(values) => {
          doLogin(values, {
            onSuccess() {
              console.log("Connexion réussie, redirection en cours...");
              const redirectPath = searchParams?.get("redirect");
              if (redirectPath) {
                console.log("Redirection vers:", redirectPath);
                router.push(redirectPath);
              } else if (onSuccess) {
                console.log("Appel du callback onSuccess");
                onSuccess();
              } else {
                console.log("Redirection vers la page mes-informations");
                router.push("/app/mon-compte/mes-informations");
              }
            },
            onError(err) {
              const message = getError(err).message;
              form.setError("password", { message });
              form.setValue("password", "");
            },
          });
        }}
      >
        <VStack>
          <Input label="Email" type="email" {...form.register("email")} />
          <Input
            label="Mot de passe"
            type="password"
            {...form.register("password")}
            mb={5}
          />
          {displayForgotPassword && (
            <Text
              as={Link}
              href="/app/oublie-mot-de-passe"
              fontSize={12}
              pb={5}
              textAlign="right"
              w="full"
              textDecorationLine="underline"
            >
              Mot de passe oublié ?
            </Text>
          )}
          <SubmitButton isLoading={isPending} w="full" mb={5}>
            ME CONNECTER
          </SubmitButton>
        </VStack>
      </Form>
    </Box>
  );
}
