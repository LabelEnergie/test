import { Box, BoxProps, Image, Stack, Text } from "@chakra-ui/react";
import Container from "../Container";
import TextHighlighter from "../TextHighlighter";
import { Fade } from "../ScrollAnimation";

export default function CetelemSection(props: BoxProps) {
  return (
    <section>
      <Box bg="gray.100" w="full" mt={"100px"} {...props}>
        <Container py={10}>
          <Stack
            as={Fade}
            align="center"
            spacing={{ base: 0, lg: 20 }}
            flexDir={{ base: "column", lg: "row" }}
          >
            <Image src="/images/logodomofinance.png" h="80px" marginLeft={{ base: 0, md: 10 }}/>
            <Text
              textAlign="center"
              pt={{ base: 3, lg: 8 }}
              fontWeight={800}
              fontSize={30}
            >
              {/* X */}
            </Text>
            <Image src="/images/label_energie.png" h="60px" pt={3} />
          </Stack>
          <Box
            position="relative"
            bg="#00165A"
            w="full"
            rounded="2xl"
            px={{ base: 8, md: "70px" }}
            py={"50px"}
            mt={"20px"}
          >
            <Text
              position="absolute"
              top={0}
              left={0}
              bg="#FF861D"
              color="white"
              fontWeight={800}
              px={5}
              py={2}
              fontSize={18}
              roundedTopLeft="2xl"
              roundedBottomRight="2xl"
            >
              NOUVEAU
            </Text>
            <Image
              src="/images/LogoPourFondSombre.png"
              position="absolute"
              right={{ base: -2, sm: 5, lg: "50px" }}
              width={{ base: "120px", sm: "140px", xl: "180px" }}
              top={"60px"}
            />
            <Fade>
              <TextHighlighter
                as="h2"
                fontSize={{ base: 25, md: 30, xl: 40 }}
                color="white"
                maxW={{ base: "80%", xl: "87%" }}
              >
                {
                  "**Grâce à notre partenaire Domofinance**, financez simplement vos travaux de rénovation énergétique"
                }
              </TextHighlighter>
            </Fade>
          </Box>
        </Container>
      </Box>
    </section>
  );
}
