import { SHADOW, SHADOW_SM } from "@/style/constants";
import { TSimulatorTreeValue } from "@/types/simulator.types";
import {
  Box,
  Center,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

interface SimulatorSelectProps {
  options: { title?: string; values: TSimulatorTreeValue[] }[];
  isMulti?: boolean;
  onNext(values: string[]): void;
  values: string[];
  onChange(v: string[]): void;
}

export default function SimulatorSelect(props: SimulatorSelectProps) {
  const { options, onNext, isMulti, values, onChange } = props;

  function onClick(id: string) {
    if (isMulti) {
      let newValues = values;
      if (values.includes(id)) {
        // Uncheck this value
        newValues = newValues.filter((va) => va != id);
      } else {
        // Add this value
        newValues = [...newValues, id];
      }
      onChange(newValues);
    } else {
      onChange([id]);
      onNext([id]);
    }
  }

  return (
    <VStack spacing={10}>
      {options.map(({ values: sectionValue, title }, i) => (
        <Box key={i}>
          {title && (
            <Text fontWeight={800} fontSize={18} color="king">
              {title}
            </Text>
          )}
          <Wrap justify="center">
            {sectionValue.map(({ id, title, icon, subtitle }) => {
              const isSelected = values.includes(id);
              return (
                <WrapItem key={id} w={{ base: "full", md: "unset" }}>
                  <Center
                    cursor="pointer"
                    borderWidth={1}
                    {...(values.includes(id) && {
                      borderColor: "primary",
                    })}
                    onClick={() => onClick(id)}
                    w={{ base: "full", md: "200px" }}
                    maxW={{ base: "350px", md: "unset" }}
                    h={{ md: "180px" }}
                    bg="white"
                    boxShadow={{ base: SHADOW_SM, md: SHADOW }}
                    m={{ base: 1, md: 5 }}
                    mx={{ base: "auto", md: "unset" }}
                    flexDir={{ md: "column" }}
                    py={{ base: 2, md: 6 }}
                    px={{ base: 3, md: 4 }}
                    rounded="md"
                    position="relative"
                    {...(isSelected && {
                      bg: "primaryLight",
                      borderColor: "primary",
                    })}
                    justifyContent={{ base: "flex-start", md: "center" }}
                  >
                    {icon && <Image src={icon} h="50px" />}
                    <Text
                      mt={{ md: 2 }}
                      ml={{ base: 2, md: 0 }}
                      userSelect="none"
                      textAlign={{ base: "left", md: "unset" }}
                    >
                      {title}
                    </Text>
                    <Box
                      position={{
                        md: "absolute",
                      }}
                      rounded="full"
                      boxSize="25px"
                      minW="25px"
                      borderWidth={1}
                      bg="white"
                      borderColor="king"
                      top={{ md: 2 }}
                      ml={{ base: "auto", md: "unset" }}
                      right={2}
                      {...(isSelected && {
                        borderColor: "primary",
                        bg: "primary",
                      })}
                    />
                  </Center>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      ))}
    </VStack>
  );
}
