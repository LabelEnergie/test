import { Box, Text } from "@chakra-ui/react";

interface SimulatorProgressBarProps {
  progress: number; // [0:1]
}

export default function SimulatorProgressBar(props: SimulatorProgressBarProps) {
  const { progress } = props;

  return (
    <Box
      position="fixed"
      top={{ base: "60px", lg: "100px" }}
      left={0}
      right={0}
      // bg="gray.50"
      h="10px"
      zIndex={1}
    >
      <Box
        h="full"
        w={`${Math.max(Math.min(100, 100 * progress), 1)}%`}
        bgGradient="linear(to-r,secondary,primary)"
        roundedRight="full"
        transition="all .4s"
      />
    </Box>
  );
}
