import { Box, HStack, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Button from "../Button";

interface HeaderWithPerksSectionProps {
  h1: string;
  image: string;
  subtitle?: string;
  button?: {
    label: string;
    href: string;
  };
  bandItems?: { title: string; icon: string }[];
}

export default function HeaderWithPerksSection(
  props: HeaderWithPerksSectionProps
) {
  const { bandItems, button, h1, image, subtitle } = props;

  return (
    <section>
      <Box position="relative">
        <Box position="relative">
          <Box
            position="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            bg="white"
            opacity={0.6}
          />
          <Image
            src={image}
            w="full"
            objectFit="cover"
            maxH="80vh"
            zIndex={-1}
            h={{ base: "200px", md: "unset" }}
          />
        </Box>

        <Box
          position={{ md: "absolute" }}
          bottom={{ base: 7, lg: 20 }}
          left={{ base: 7, lg: 20 }}
          maxW={{ sm: "500px", lg: "700px" }}
          color="king"
          fontWeight={800}
          mx={{ base: "auto", md: "unset" }}
          my={{ base: 7, md: "unset" }}
          px={{ base: 5, md: 0 }}
        >
          <Text as="h1" fontSize={{ base: 40, lg: 60 }}>
            {h1}
          </Text>
          {subtitle && (
            <Text
              fontSize={{ base: 16, lg: 20 }}
              mt={3}
              mb={5}
              fontWeight={500}
            >
              {subtitle}
            </Text>
          )}
          {button && <Button href={button.href}>{button.label}</Button>}
        </Box>
      </Box>
      {bandItems && (
        <Wrap
          bg="king"
          w="full"
          py={10}
          px={3}
          justify="center"
          spacing={{ base: 10, xl: 20 }}
        >
          {bandItems.map((item, i) => (
            <WrapItem key={i}>
              <HStack spacing={{ base: 4, xl: 6 }}>
                <Image
                  src={`/icons/${item.icon}`}
                  h={{ base: "50px", xl: "80px" }}
                />
                <Box
                  w={1}
                  h={{ base: "60px", xl: "90px" }}
                  bg="white"
                  rounded="full"
                />
                <Text
                  color="white"
                  maxW="220px"
                  fontSize={{ base: 14, xl: 16 }}
                >
                  {item.title}
                </Text>
              </HStack>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </section>
  );
}
