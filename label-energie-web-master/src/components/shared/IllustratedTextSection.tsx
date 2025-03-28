import {
  Box,
  BoxProps,
  Image,
  ImageProps,
  Stack,
  Text,
  TextProps,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import TextHighlighter from "./TextHighlighter";
import Container from "./Container";
import { ReactNode } from "react";

interface IllustratedTextSectionProps extends BoxProps {
  title: string;
  subtitle: string;
  image: string;
  imageStyle?: ImageProps;
  footer?: ReactNode;
  reversed?: boolean;
  titleStyle?: TextProps;
  subTitleStyle?: TextProps;
}

export default function IllustratedTextSection(
  props: IllustratedTextSectionProps
) {
  const {
    image,
    subtitle,
    title,
    imageStyle,
    footer,
    reversed,
    titleStyle,
    subTitleStyle,
    ...rest
  } = props;

  return (
    <section>
      <Box {...rest}>
        <Container py="60px">
          <Stack
            flexDir={{ base: "column", lg: reversed ? "row-reverse" : "row" }}
            justifyContent="space-between"
            align="center"
            spacing={{ base: 10, lg: "unset" }}
          >
            <Box maxW="600px">
              <Text
                as="h2"
                fontSize={{ base: 30, lg: 40 }}
                color="secondary"
                fontWeight={800}
                {...titleStyle}
              >
                {title}
              </Text>
              <TextHighlighter
                mt={6}
                color="king"
                fontSize={18}
                {...subTitleStyle}
              >
                {subtitle}
              </TextHighlighter>
              {footer}
            </Box>
            <Image
              src={image}
              w={{ base: "250px", lg: "350px" }}
              h="auto"
              {...imageStyle}
            />
          </Stack>
        </Container>
      </Box>
    </section>
  );
}
