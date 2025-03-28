import { Box, BoxProps, Center, Text } from "@chakra-ui/react";

interface FAQCollapseButtonProps extends BoxProps {
  isExpanded: boolean;
  size?: number;
}

export default function FAQCollapseButton(props: FAQCollapseButtonProps) {
  const { isExpanded, size = 25, ...rest } = props;

  return (
    <Center position="relative" boxSize={`${size}px`} {...rest}>
      <Box w="full" h="13%" rounded="full" bg="secondary" />
      <Box
        position="absolute"
        top={0}
        left="50%"
        bottom={0}
        w="13%"
        transform="translateX(-50%)"
        bg="secondary"
        rounded="full"
        opacity={isExpanded ? 0 : 1}
        transition="opacity .3s"
      />
    </Center>
  );
}
