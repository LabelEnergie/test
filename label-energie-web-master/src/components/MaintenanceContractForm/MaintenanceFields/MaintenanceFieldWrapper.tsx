import { Box, FormLabel, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MaintenanceFieldWrapperProps {
  children: ReactNode;
  label?: string;
}

export default function MaintenanceFieldWrapper(
  props: MaintenanceFieldWrapperProps
) {
  const { children, label } = props;

  return (
    <Box>
      {label && (
        <FormLabel fontSize={13} color="king" fontWeight={600}>
          {label}
        </FormLabel>
      )}
      {children}
    </Box>
  );
}
