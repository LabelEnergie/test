import { SHADOW } from "@/style/constants";
import { Box, CardProps } from "@chakra-ui/react";

export default function Card(props: CardProps) {
  return (
    <Box
      boxShadow={SHADOW}
      borderWidth={1}
      borderColor={"gray.200"}
      bg="white"
      rounded="md"
      p={3}
      {...props}
    />
  );
}
