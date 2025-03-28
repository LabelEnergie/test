import { Box, BoxProps, Text } from "@chakra-ui/react";

interface DividerProps extends BoxProps {}

export default function Divider(props: DividerProps) {
  const { ...rest } = props;

  return <Box w="full" h={"1px"} bg="gray.200" my={3} {...rest} />;
}
