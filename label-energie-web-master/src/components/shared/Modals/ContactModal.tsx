import {
  HStack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "../Modal";
import Heading from "../Heading";
import GradientDivider from "../GradientDivider";
import { Form, useZodForm } from "../form/form";
import { z } from "zod";
import { noEmptyStringSchema } from "@/utils/schemas";
import { Input } from "../form/Input";
import Button from "../Button";
import { SubmitButton } from "../SubmitButton";
import { sendEmail } from "@/utils/email";

export interface ContactModalRef {
  onOpen(): void;
}

interface ContactModalProps {}

const schema = z.object({
  lastName: noEmptyStringSchema,
  firstName: noEmptyStringSchema,
  tel: noEmptyStringSchema,
  contractNum: noEmptyStringSchema,
  message: z.string(),
});

export default forwardRef<ContactModalRef, ContactModalProps>((props, ref) => {
  const {} = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useImperativeHandle(ref, () => ({
    onOpen: () => {
      onOpen();
      form.reset({
        contractNum: "",
        firstName: "",
        lastName: "",
        message: "",
        tel: "",
      });
    },
  }));

  const form = useZodForm({ schema });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      contentStyle={{ px: 20 }}
      size="2xl"
    >
      <Heading fontSize={20}>Parler à un Technicien ?</Heading>
      <GradientDivider zoom={false} my={3} />
      <Text textAlign="center" my={5}>
        Remplisser ce formulaire et notre équipe technique vous rappel dans les
        plus bref délai.
      </Text>
      <Form
        form={form}
        onSubmit={async ({
          contractNum,
          firstName,
          lastName,
          message,
          tel,
        }) => {
          setIsLoading(true);
          const response = await sendEmail(
            "Un client à besoin d'assistance",
            `Prénom = ${firstName}
             Nom = ${lastName}
             Téléphone = ${tel}
             N° Contrat = ${contractNum}
             ${message ? `Message = ${message}` : ""}`
              );
          setIsLoading(false);

          if (response == 200) {
            toast({
              title: "Message envoyé avec succès !",
              description:
                "Nous vous recontacterons dans les plus brefs délais",
              status: "success",
              position: "top",
            });
            onClose();
          } else {
            toast({
              title: "Impossible d'envoyer le message",
              description: "Veuillez réessayer ultérieurement",
              status: "error",
              position: "top",
            });
          }
        }}
      >
        <VStack>
          <HStack>
            <Input label="Prénom" {...form.register("firstName")} />
            <Input label="Nom" {...form.register("lastName")} />
          </HStack>
          <Input label="Téléphone" {...form.register("tel")} />
          <Input label="N° Contrat" {...form.register("contractNum")} />
          <Input label="Message (optionnel)" {...form.register("message")} />
        </VStack>
        <SubmitButton
          mt={10}
          fontSize={14}
          h="45px"
          mx="auto"
          isLoading={isLoading}
        >
          ENVOYER MA DEMANDE
        </SubmitButton>
      </Form>
    </Modal>
  );
});
