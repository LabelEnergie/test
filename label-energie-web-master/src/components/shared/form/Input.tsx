import { forwardRef, ReactNode, useEffect, useState } from "react";
import {
  FormControl,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormLabel,
  InputRightElement,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useFieldError } from "./form";
import { useFormContext } from "react-hook-form";
import { colors } from "@/style/colors";

export interface InputProps extends ChakraInputProps {
  label?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  rightIcon?: ReactNode;
  error?: { message?: string } | null;
  multiLine?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      leftAddon,
      rightAddon,
      isRequired,
      onChange,
      rightIcon,
      error: errorProps,
      multiLine,
      ...props
    },
    ref
  ) => {
    const errorField = useFieldError(props.name);

    const error = errorProps ?? errorField;

    const { watch } = useFormContext();

    const [value, setValue] = useState<string>("");

    const defaultValue = watch(props.name ?? "");
    useEffect(() => {
      if (defaultValue != undefined) {
        setValue(defaultValue);
      }
    }, [defaultValue]);

    return (
      <FormControl
        isInvalid={!!error}
        isRequired={isRequired}
        position="relative"
      >
        <FormLabel
          position="absolute"
          left={3}
          top={"-5px"}
          zIndex={1}
          bg="white"
          lineHeight={"10px"}
          fontSize={11}
          sx={{
            animationDuration: ".3s",
          }}
          className={`animate__animated animate__${
            value?.length > 0 ? "fadeInUp" : "fadeOutDown"
          }`}
        >
          {label}
        </FormLabel>
        <InputGroup size={props.size}>
          {leftAddon && <InputLeftAddon children={leftAddon} />}

          <Box
            as={multiLine ? Textarea : ChakraInput}
            ref={ref}
            bg="white"
            placeholder={label}
            h="50px"
            onChange={async (e: any) => {
              setValue(e.target?.value);
              onChange?.(e);
            }}
            _focusVisible={{
              borderColor: "primary",
              boxShadow: `0 0 0 1px ${colors.primary}`,
            }}
            {...(error && {
              borderColor: "red !important",
              boxShadow: "0 0 0 1px red !important",
            })}
            {...props}
          />
          {rightAddon && <InputRightAddon children={rightAddon} />}
          {rightIcon && (
            <InputRightElement children={rightIcon} h="full" pr={2} />
          )}
        </InputGroup>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

Input.displayName = "Input";
