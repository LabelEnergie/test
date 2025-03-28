import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import Button from "../shared/Button";
import { colors } from "@/style/colors";
import Card from "../shared/Card";

interface OfferProps {
  title: string;
  price: string;
  subtitle: string;
  perks: string[];
  id: string;
  isSelected?: boolean;
  href: string;
}

export default function Offer(props: OfferProps) {
  const { id, perks, price, subtitle, title, isSelected, href } = props;

  return (
    <Card
      boxShadow={`0px 0px 15px 2px ${isSelected ? colors.primary : "#D9D9D9"}`}
      borderWidth={isSelected ? 3 : 1}
      borderColor={isSelected ? "primary" : "gray.200"}
      textAlign="center"
      w="300px"
      pb={10}
      position="relative"
    >
      {isSelected && (
        <Center
          bg="primary"
          position="absolute"
          left={0}
          top={0}
          borderBottomRightRadius="md"
          borderTopLeftRadius="sm"
          px={2}
          py={1}
        >
          <Image src="/icons/light.png" boxSize="20px" />
          <Text color="white" fontWeight={800} fontSize={13} ml={2}>
            Populaire
          </Text>
        </Center>
      )}
      <Box bg="gray.100" rounded="md" w="full" p={3}>
        <Text color="gray.400" fontWeight={800}>
          FORMULE
        </Text>
        <Text as="h3" fontSize={{ base: 25, lg: 35 }} color="king">
          {title}
        </Text>
        <Box rounded="full" h={2} w="100px" bg="secondary" mx="auto" mt={2} />
        <Text pt={2} color="king">
          À partir de
        </Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          mt={2}
          fontWeight={800}
        >
          <Text fontSize={30}>{price}</Text>
          <Text pb={2} pl={1}>
            €/Mois
          </Text>
        </Flex>
      </Box>
      <Text my={7} fontWeight={800} color="king" height="70px">
        {subtitle}
      </Text>
      <Box h="420px">
        {perks.map((perk, i) => (
          <Text key={i} my={5}>
            - {perk}
          </Text>
        ))}
      </Box>
      <Button mx="auto" href={href}>
        Choisir cette offre
      </Button>
    </Card>
  );
}
