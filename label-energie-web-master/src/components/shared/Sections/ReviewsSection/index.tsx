import { Fade } from "@/components/shared/ScrollAnimation";
import { BoxProps, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";

export default function ReviewsSection(props: BoxProps) {
  return null;
  return (
    <section>
      <Stack
        bg="gray.200"
        mt={{ base: 20, lg: "120px" }}
        flexDir={{ base: "column-reverse", lg: "row" }}
        pt={{ base: 20, lg: "150px" }}
        spacing={20}
        px={{ base: 10, lg: 4 }}
        textAlign={{ base: "center", lg: "unset" }}
        {...props}
      >
        <Image
          src="/images/groupe.png"
          ml={{ base: 0, lg: "100px", xl: "200px" }}
          w={{ md: "50%", lg: "auto" }}
          minW="300px"
          mx={{ base: "auto", lg: "unset" }}
        />
        <VStack align="stretch" spacing={8}>
          <Stack
            mx="auto"
            spacing={10}
            flexDir={{ base: "column-reverse", lg: "row" }}
            align="center"
          >
            <Fade>
              <Text
                as="h2"
                fontWeight={800}
                color="dark"
                fontSize={{ base: 30, lg: 40 }}
              >
                L'AVIS DE NOS CLIENTS
              </Text>
            </Fade>
            <Image src="/images/trustpilot.png" w="150px" />
          </Stack>
          <Text as={Fade} maxW="800px">
            Nous sommes fiers d’être reconnus pour notre qualité exceptionnelle
            et notre service clientèle exceptionnel. Nos clients nous ont fait
            confiance pour leur énergie solaire photovoltaïque, et nous sommes
            heureux d’avoir reçu des commentaires positifs sur notre travail.
          </Text>
        </VStack>
      </Stack>
    </section>
  );
}
