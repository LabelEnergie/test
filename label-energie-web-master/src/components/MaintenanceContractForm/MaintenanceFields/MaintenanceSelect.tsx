import { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useFieldError } from "@/components/shared/form/form";
import { useFormContext } from "react-hook-form";
import MaintenanceFieldWrapper from "./MaintenanceFieldWrapper";

export interface MaintenanceSelectProps {
  label?: string;
  options: { title: string; id: string }[];
  isRequired?: boolean;
  name: string;
}

export const MaintenanceSelect = forwardRef<
  HTMLDivElement,
  MaintenanceSelectProps
>(({ label, options, isRequired, name }, ref) => {
  const error = useFieldError(name);

  const { watch, setValue } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>(
    watch(name) || ""
  );

  function handleClick(value: string) {
    setSelectedOption(value);
    setValue(name, value);
  }

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} ref={ref}>
      <MaintenanceFieldWrapper label={label}>
        <HStack spacing={4} align="stretch">
          {options.map((option) => (
            <Center
              key={option.id}
              onClick={() => handleClick(option.id)}
              p={4}
              borderWidth="2px"
              borderRadius="md"
              borderColor={
                selectedOption === option.id ? "secondary" : "gray.200"
              }
              bg={"white"}
              flex={1}
              maxW="180px"
              cursor="pointer"
            >
              <Text textAlign="center" color={"king"}>
                {option.title}
              </Text>
            </Center>
          ))}
        </HStack>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </MaintenanceFieldWrapper>
    </FormControl>
  );
});

MaintenanceSelect.displayName = "MaintenanceSelect";
