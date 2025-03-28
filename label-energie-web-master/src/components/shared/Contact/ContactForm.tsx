"use client";

import { Stack, VStack, useToast } from "@chakra-ui/react";
import { Form, useZodForm } from "../form/form";
import { z } from "zod";
import { noEmptyStringSchema } from "@/utils/schemas";
import { Input } from "../form/Input";
import { SubmitButton } from "../SubmitButton";
import { sendEmail } from "@/utils/email";

interface ContactFormProps {}

const schema = z.object({
  firstName: noEmptyStringSchema,
  lastName: noEmptyStringSchema,
  tel: noEmptyStringSchema,
  message: z.string(),
});

const DEFAULT_FORM = {
  firstName: "",
  lastName: "",
  tel: "",
  message: "",
};

export default function ContactForm(props: ContactFormProps) {
  const {} = props;

  const toast = useToast();

  const form = useZodForm({
    schema,
    defaultValues: DEFAULT_FORM,
  });

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        const result = await sendEmail(
          "Contact depuis labelenergie.fr",
          `Un utilisateur souhaite être rappelé :
- Nom : ${values.lastName}
- Prénom : ${values.firstName}
- Tel : ${values.tel}
${values.message ? `- Message : ${values.message}` : ""}`
        );

        if (result == 200) {
          toast({
            title: "Message envoyé avec succès",
            description: "Merci pour votre confiance",
            status: "success",
            position: "top",
          });
        } else {
          toast({
            title: "Erreur à l'envoi de l'email",
            status: "error",
            position: "top",
          });
        }
        form.reset(DEFAULT_FORM);
      }}
    >
      <VStack spacing={5} mt={10} maxW="700px" mx="auto">
        <Stack w="full" flexDir={{ base: "column", sm: "row" }} spacing={5}>
          <Input label="Nom" {...form.register("lastName")} minW="0" />
          <Input label="Prénom" {...form.register("firstName")} minW="0" />
        </Stack>
        <Input label="Téléphone" {...form.register("tel")} minW="0" />
        <Input
          multiLine
          label="Message (Optionnel)"
          minW="0"
          {...form.register("message")}
        />
        {/* <Text as={Link} textDecorationLine="underline" href="" w="full">
          Protection des données à caractère personnel
        </Text> */}
      </VStack>
      <SubmitButton mt={10} fontSize={{ base: 12, sm: 16 }}>
        ENVOYER MA DEMANDE
      </SubmitButton>
    </Form>
  );
}
