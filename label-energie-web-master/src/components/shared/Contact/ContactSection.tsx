import { TEL, EMAIL } from "@/constants/contacts";
import { BoxProps, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import GradientDivider from "../GradientDivider";
import ContactCard from "./ContactCard";
import Container from "../Container";

export default function ContactSection(props: BoxProps) {
  const {} = props;

  return (
    <section>
      <Container pt={20} id="contact" scrollMarginTop={20} {...props}>
        <Text
          as="h2"
          fontWeight={800}
          fontSize={{ base: 30, lg: 40 }}
          color="king"
          textAlign="center"
        >
          CONTACTEZ-NOUS
        </Text>
        <Stack
          flexDir={{ base: "column-reverse", lg: "row" }}
          spacing={{ base: 7, lg: 10, xl: "30px" }}
          p={{ base: 5, sm: "50px" }}
          my={10}
          mx="auto"
          w={{ base: "fit-content" }}
          bg="king"
          rounded={{ base: "20px", sm: "40px" }}
        >
          <VStack
            spacing={7}
            bg="white"
            rounded={{ base: "20px", sm: "40px" }}
            px={{ base: "10px", xl: "50px" }}
            py={{ base: 5, lg: 0 }}
            justifyContent="center"
          >
            <Image src="/images/france.png" w={{ sm: "250px" }} />
            <VStack>
              <Text
                as={Link}
                fontWeight={800}
                color="king"
                href={`tel:${TEL}`}
                fontSize={22}
              >
                {TEL}
              </Text>
              <GradientDivider />
              <Text
                as={Link}
                fontWeight={800}
                color="king"
                href={`mailto:${EMAIL}`}
                fontSize={22}
                wordBreak="break-all"
                textAlign="center"
              >
                {EMAIL}
              </Text>
            </VStack>
          </VStack>
          <ContactCard />
        </Stack>
      </Container>
    </section>
  );
}
