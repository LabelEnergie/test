"use client";

import { Box, BoxProps, Flex, Image, Stack, Text } from "@chakra-ui/react";
import TextHighlighter from "../TextHighlighter";
import { Fade } from "../ScrollAnimation";
import Container from "../Container";
import { useEffect, useRef } from "react";

interface CardSectionProps extends BoxProps {
  title: string;
  tag?: string;
  text: string;
  image: string;
  reversed?: boolean;
}

export default function CardSection(props: CardSectionProps) {
  const { image, tag, text, title, children, reversed, ...rest } = props;

  return (
    <section>
      <Box {...rest}>
        <Container>
          <Stack
            flexDir={{
              base: "column",
              xl: reversed ? "row-reverse" : "row",
            }}
            align="center"
            spacing={{ base: 10, xl: "unset" }}
            justifyContent="space-between"
          >
            <Flex
              flexDir="column"
              alignItems="flex-start"
              w="full"
              pr={{ lg: "100px" }}
              {...(reversed && { pl: { xl: 20 } })}
            >
              {tag && (
                <Text
                  as={Fade}
                  color="king"
                  fontWeight={800}
                  lineHeight="5px"
                  fontSize={18}
                >
                  {tag}
                </Text>
              )}
              <Fade>
                <Text
                  as="h2"
                  fontWeight={800}
                  fontSize={{ base: 30, lg: 40 }}
                  color="secondary"
                  maxW="800px"
                >
                  {title}
                </Text>
              </Fade>
              <TextHighlighter
                as={Fade}
                mb={"50px"}
                mt="30px"
                fontSize={{ base: 16, md: 20 }}
                maxW={{ xl: "800px" }}
              >
                {text}
              </TextHighlighter>
              {children}
            </Flex>

            <Box position="relative">
              <Box
                as={Fade}
                boxSize={{ base: "250px", md: "400px", xl: "450px" }}
                transform={`skewX(${reversed ? "-" : ""}15deg)`}
                bg="white"
                position="relative"
                rounded="2xl"
                boxShadow="-10px 10px 17px -8px #000000"
                overflow="auto"
                {...(reversed && {
                  mx: { xl: "50px" },
                  minW: { xl: "350px" },
                })}
                sx={{
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Image
                  src={image}
                  transform={`skewX(${reversed ? "" : "-"}15deg)`}
                  position="absolute"
                  top={0}
                  left="-70px"
                  h="full"
                  w="full"
                  minW={{ base: "360px", md: "530px", xl: "590px" }}
                  objectFit="cover"
                />
              </Box>
              <Box
                position="absolute"
                top={0}
                left={"-60px"}
                right="-60px"
                bottom={0}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </section>
  );
}
