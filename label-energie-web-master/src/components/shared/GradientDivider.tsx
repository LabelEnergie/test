import { Box, BoxProps } from "@chakra-ui/react";
import { Zoom } from "./ScrollAnimation";

interface GradientDividerProps extends BoxProps {
  zoom?: boolean;
}

export default function GradientDivider({
  zoom = true,
  ...props
}: GradientDividerProps) {
  return (
    <Box
      {...(zoom && { as: Zoom })}
      bgGradient="linear(to-r,primary,secondary)"
      h="10px"
      w="100px"
      rounded="full"
      mx="auto"
      {...props}
    />
  );
}
