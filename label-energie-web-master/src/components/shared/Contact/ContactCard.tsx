import { Box, BoxProps, Text } from "@chakra-ui/react";
import ContactForm from "./ContactForm";

interface ContactCardProps extends BoxProps {}

export default function ContactCard(props: ContactCardProps) {
  const { ...rest } = props;

  return (
    <Box
      bg="white"
      borderWidth={1}
      boxShadow="md"
      rounded={{ base: "20px", sm: "40px" }}
      p={{ base: 3, sm: 7 }}
      maxW="700px"
      w={{ lg: "500px", xl: "600px" }}
      {...rest}
    >
      <Text
        as="h3"
        // textAlign="center"
        fontWeight={800}
        fontSize={{ base: 20, md: 20 }}
      >
        DEMANDE DE RENSEIGNEMENTS
      </Text>
      <ContactForm />
    </Box>
  );
}
