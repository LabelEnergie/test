import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HighProps {
  children: ReactNode;
  color?: string | true;
  size?: number;
}

export function High(props: HighProps) {
  const { children, color, size } = props;

  return (
    <Box
      as="span"
      fontWeight="800"
      fontSize={size}
      color={color == true ? "theme.400" : color ? color : "theme.400"}
    >
      {children}
    </Box>
  );
}
