import { Box, BoxProps, Text } from "@chakra-ui/react";

export default function DividerProcess(props: BoxProps) {
  return (
    <Box
      position="relative"
      bg="secondary"
      w="3px"
      h="900px"
      rounded="full"
      mb={"100px"}
      {...props}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Circle key={i} top={`${i * 200}px`} />
      ))}
    </Box>
  );
}

function Circle(props: BoxProps) {
  return (
    <Box
      position="absolute"
      boxSize={{ base: "30px", md: "80px" }}
      rounded="full"
      bg="king"
      borderWidth="3px"
      borderColor="secondary"
      left={{ base: "-14px", md: "-37px" }}
      {...props}
    />
  );
}
