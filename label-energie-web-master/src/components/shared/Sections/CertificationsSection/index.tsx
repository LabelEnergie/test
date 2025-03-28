import { Fade } from "@/components/shared/ScrollAnimation";
import { Box, Image, Text, Wrap, WrapItem, Flex } from "@chakra-ui/react";
import { px } from "framer-motion";
import Link from "next/link";

const CERTIFS = ["QUALIPV", "QUALIBOIS", "QUALIPAC", "QUALISOL"];

export default function CertificationsSection() {
  return (
    <section>
      <Fade>
        <Text
          as="h2"
          color="king"
          textAlign="center"
          fontSize={{ base: 30, lg: 40 }}
          fontWeight={800}
          mt="100px"
        >
          NOS CERTIFICATIONS
        </Text>
      </Fade>

      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px={4}
        mt={{ base: 10, lg: 20 }}
      >
        <Box maxW={{ base: "100%", lg: "50%" }} mb={{ base: 8, lg: 0 }}>
          <Text
            fontSize={{ base: "lg", lg: "xl" }}
            color="gray.700"
            mb={8}
            maxW="600px"
            marginBottom={20}
          >
            Professionnel certifiés RGE, nous garantissons des travaux de qualité respectant l&apos;environnement et vous permettant de bénéficier d&apos;aides financières. Faites confiance à notre expertise pour un résultat durable et fiable.
          </Text>
          <Box>
            <Flex 
              direction="column" 
              gap={8}
              align="flex-start"
            >
              <Flex justify="flex-start" gap={8}>
                <WrapItem as={Fade}>
                  <Link
                    href={`/documents/${CERTIFS[0]}.pdf`}
                    target="_blank"
                    rel="nofollow"
                    aria-label={`Certification ${CERTIFS[0]}`}
                  >
                    <Image src={`/images/certifications/${CERTIFS[0]}.png`} h="60px" />
                  </Link>
                </WrapItem>
                <WrapItem as={Fade}>
                  <Link
                    href={`/documents/${CERTIFS[1]}.pdf`}
                    target="_blank"
                    rel="nofollow"
                    aria-label={`Certification ${CERTIFS[1]}`}
                  >
                    <Image src={`/images/certifications/${CERTIFS[1]}.png`} h="60px" />
                  </Link>
                </WrapItem>
              </Flex>
              <Flex justify="flex-start" gap={8}>
                <WrapItem as={Fade}>
                  <Link
                    href={`/documents/${CERTIFS[2]}.pdf`}
                    target="_blank"
                    rel="nofollow"
                    aria-label={`Certification ${CERTIFS[2]}`}
                  >
                    <Image src={`/images/certifications/${CERTIFS[2]}.png`} h="60px" />
                  </Link>
                </WrapItem>
                <WrapItem as={Fade}>
                  <Link
                    href={`/documents/${CERTIFS[3]}.pdf`}
                    target="_blank"
                    rel="nofollow"
                    aria-label={`Certification ${CERTIFS[3]}`}
                  >
                    <Image src={`/images/certifications/${CERTIFS[3]}.png`} h="60px" />
                  </Link>
                </WrapItem>
              </Flex>
            </Flex>
          </Box>
        </Box>

        <Box maxW={{ base: "100%", lg: "45%" }}>
          <Image
            src="/images/certification-illustration.png"
            alt="Certification illustration"
            w="full"
            h="auto"
          />
        </Box>
      </Flex>

      <Box bg="gray.100" py={12} mt={20} width={{ base: "90%", md: "75%", lg: "60%" }} mx="auto" borderRadius="xl">
        <Flex
          direction="column"
          maxW="800px"
          mx="auto"
          px={4}
          align="center"
        >
          <Flex 
            justify="center" 
            align="center" 
            gap={8}
            wrap="wrap"
          >
            <Image
              src="/images/logodomofinance.png"
              alt="Partenaire EDF"
              h="80px"
              objectFit="contain"
            />
            <Image
              src="/images/synerciel-logo.png"
              alt="Synerciel" 
              marginTop={7}
              h="100px"
              objectFit="contain"
            />
          </Flex>
          <Text
            textAlign="center"
            fontSize={{ base: "lg", lg: "xl" }}
            color="gray.700"
            width={{ base: "100%", md: "90%", lg: "800px" }}
            mt={8}
          >
            En tant que partenaire EDF, nous garantissons des travaux réalisés selon les standards les plus élevés, assurant une efficacité énergétique optimale. Notre collaboration avec EDF témoigne de notre engagement envers la qualité et la satisfaction client.
          </Text>
        </Flex>
      </Box>
    </section>
  );
}