import { Fade } from "@/components/shared/ScrollAnimation";
import { Text, Wrap, WrapItem, Image, HStack, Box } from "@chakra-ui/react";

const PARTNERS = [
  "daikin.png",
  "atlantic.png",
  "lg.png",
  "axdis_pro.png",
  "panasonic.png",
  "ariston.png",
  "chaffoteaux.png",
  "enphase.png",
  "maaf.png",
  "orion.png",
  "stove_italia.png",
  "thaleos.png",
  "thomson.png",
];

const REALISATIONS = [
  "installation_chaudiere_a_granule.jpg",
  "installation_chauffe_eau_solaire.jpg",
  "installation_photovoltaique.jpg",
  "installation_poele_a_granule.jpg",
  "installation_pompe_a_chaleur_air.jpg",
  "installation_SSC.jpg",
];

export default function PartnersSection() {
  return (
    <section>
      <Fade>
        <Text
          as="h2"
          mt="100px"
          textAlign="center"
          fontSize={{ base: 30, lg: 40 }}
          fontWeight={800}
        >
          NOS PARTENAIRES
        </Text>
      </Fade>
      <Box position="relative" h="70px">
        <HStack
          mt="60px"
          spacing={20}
          animation="move 30s infinite linear"
          position="absolute"
          sx={{
            "@keyframes move": {
              from: {
                left: "50px",
              },
              to: {
                left: "-3400px",
              },
            },
          }}
        >
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <Image
              key={i}
              src={`/images/partenaires/${p}`}
              alt=""
              title=""
              h="50px"
            />
          ))}
        </HStack>
      </Box>

      <Fade>
        <Text
          as="h2"
          mt="120px"
          textAlign="center"
          fontSize={{ base: 30, lg: 40 }}
          fontWeight={800}
        >
          NOS RÉALISATIONS
        </Text>
      </Fade>
      <Wrap justify="center" mt="60px" spacing={{ base: 5, md: 10 }} px={5}>
        {REALISATIONS.map((r, i) => (
          <WrapItem as={Fade} key={i} flexDirection="column" textAlign="center" position="relative">
            <Image
              src={`/images/realisations/${r}`}
              alt=""
              title=""
              boxSize={{
                base: "150px",
                sm: "300px",
                xl: "410px",
                "2xl": "450px",
              }}
              rounded="2xl"
            />
            <Text
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              py={3}
              px={6}
              fontWeight={600}
              color="white"
              fontSize={{ base: 14, sm: 16 }}
              bg="rgba(0, 22, 90, 0.9)"
              rounded="2xl"
              _hover={{
                bg: "rgba(38, 221, 180, 0.9)",
                transform: "translateX(-50%) translateY(-2px)",
              }}
              transition="all 0.3s ease"
              boxShadow="lg"
              maxW="90%"
            >
              {r.replace('.jpg', '')
                .replace('installation_', '')
                .split('_')
                .join(' ')
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
          </WrapItem>
        ))}
      </Wrap>
    </section>
  );
}