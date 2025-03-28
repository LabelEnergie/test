import { ContainerProps, Container as ChakraContainer } from "@chakra-ui/react";

export default function Container(props: ContainerProps) {
  return <ChakraContainer maxW="1200px" color="king" {...props} />;
}
