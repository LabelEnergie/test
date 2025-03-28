import { BoxProps, Center, Spinner, Text } from "@chakra-ui/react";

export default function LoadingPage(props: BoxProps) {
  const { children, ...rest } = props;

  return (
    <Center flexDir={"column"} color="primary" {...rest}>
      <Text fontWeight={800}>{children}</Text>
      <Spinner boxSize="100px" thickness="10px" mt={5} />
    </Center>
  );
}
