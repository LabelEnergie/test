import { forwardRef, ReactNode } from "react";
import {
  FormControl,
  CheckboxProps as ChakraCheckboxProps,
  FormErrorMessage,
  Checkbox as ChakraCheckbox,
} from "@chakra-ui/react";
import { useFieldError } from "./form";

export interface CheckboxProps extends ChakraCheckboxProps {
  label?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, leftAddon, rightAddon, isRequired, ...props }, ref) => {
    const error = useFieldError(props.name);
    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        <ChakraCheckbox {...props} />

        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

CheckboxInput.displayName = "Checkbox";
