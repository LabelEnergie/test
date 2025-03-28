import { Box, Text, TextProps } from "@chakra-ui/react";

interface HeadingProps extends TextProps {}

export default function Heading(props: HeadingProps) {
  const { ...rest } = props;

  return (
    <Text
      fontSize={{ base: 30, lg: 40 }}
      textAlign="center"
      color="king"
      fontWeight={800}
      {...rest}
    />
  );
}
