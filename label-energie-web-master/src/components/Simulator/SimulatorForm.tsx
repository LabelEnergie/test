import {
  TSimulatorResult,
  TSimulatorResultValue,
  TSimulatorTree,
  TSimulatorType,
} from "@/types/simulator.types";
import {
  Box,
  ButtonProps,
  Center,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Button from "../shared/Button";
import SimulatorSelect from "./SimulatorInputs/SimulatorSelect";
import { useEffect, useState } from "react";
import { Input } from "../shared/form/Input";
import { Form } from "../shared/form/form";
import { useForm } from "react-hook-form";
import { InputAddress } from "../shared/form/InputAddress";
import { TAddress } from "@/types/auth.types";
import SimulatorSignUp from "./SimulatorSignUp";
import { auth } from "@/config/firebase";

interface SimulatorFormProps extends TSimulatorTree {
  onPrevious?(): void;
  onNext(value?: TSimulatorResultValue): void;
  displayOnNext?: boolean;
  defaultValue?: TSimulatorResultValue;
  simulatorResult: TSimulatorResult[]; // Used for get defaultAddress whenc reate account
  onEnd(): void;
}

const DISPLAY_ONNEXT_INPUTS: TSimulatorType[] = [
  "input-number",
  "input-moreless",
  "input-address",
  "input-text",
  "select-multi",
];

export default function SimulatorForm(props: SimulatorFormProps) {
  const {
    id,
    title,
    type,
    bigTitle,
    label,
    mask,
    max,
    onNext,
    onPrevious,
    subtitle,
    tag,
    values,
    valuesSection,
    displayOnNext: displayOnNext = false,
    defaultValue,
    simulatorResult,
    onEnd,
  } = props;

  const [inputValue, setInputValue] = useState(defaultValue ?? "");

  const form = useForm();

  function onEnterPress() {
    if (inputValue && (!Array.isArray(inputValue) || inputValue.length > 0)) {
      onNext(inputValue);
    }
  }

  useEffect(() => {
    setInputValue(defaultValue ?? "");
  }, [defaultValue, type, id]);

  function listenKeyBoard(e: KeyboardEvent) {
    if (e.code == "Enter") {
      onEnterPress();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", listenKeyBoard);
    return () => {
      document.removeEventListener("keydown", listenKeyBoard);
    };
  }, [inputValue]);

  return (
    <Flex
      alignItems="center"
      flexDir="column"
      h="full"
      px={{ base: 5, lg: 10 }}
    >
      {onPrevious && (
        <HStack
          position="fixed"
          top={{ base: "90px", lg: "130px" }}
          left={0}
          onClick={onPrevious}
          cursor="pointer"
          zIndex={1}
          bg="white"
          px={5}
          py={1}
          rounded="full"
        >
          <Image src="/icons/fleche.png" w="25px" transform="rotate(180deg)" />
          <Text fontWeight={700} color="primary" userSelect="none">
            Retour
          </Text>
        </HStack>
      )}
      {tag && (
        <Text
          bg="primaryLight"
          color="primary"
          fontWeight={600}
          py={4}
          px={{ base: 10, lg: 20 }}
          w="fit-content"
          rounded="full"
        >
          {tag}
        </Text>
      )}

      {bigTitle && (
        <Text as="h1" my={10} fontSize={{ base: 25, lg: 35 }} fontWeight={800}>
          {bigTitle}
        </Text>
      )}
      <Box mt={{ base: bigTitle ? 10 : "70px", md: bigTitle ? 10 : 20 }} mb={8}>
        {title && (
          <Text fontWeight={800} fontSize={20} mb={3}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text color="gray.400" fontWeight={500}>
            {subtitle}
          </Text>
        )}
      </Box>

      {/* // Dynamic Input */}
      {["signup"].includes(type) && (
        <SimulatorSignUp
          mt={4}
          simulatorResult={simulatorResult.map(item => ({
            ...item,
            value: Array.isArray(item.value) ? 
              item.value.map(v => v.toString()) : 
              [item.value.toString()]
          }))}
          onEnd={async () => {
            try {
              // Ensure user is authenticated
              const user = auth.currentUser;
              if (!user) {
                throw new Error("Authentication required");
              }
              
              // Refresh token before submission
              await user.getIdToken(true);
              
              // Call the end callback
              onEnd();
            } catch (error) {
              console.error("Submission error:", error);
              // You might want to add error handling UI here
            }
          }}
        />
      )}
      <Box
        as={Form}
        h="full"
        form={form}
        w="100%"
        position="relative"
        onSubmit={() => {
          onEnterPress();
        }}
      >
        {["select", "select-multi"].includes(type) &&
          (() => {
            const isMaxReached =
              max != undefined && (inputValue as string[]).length > max;
            return (
              <>
                <SimulatorSelect
                  options={(values ? [{ values }] : valuesSection) ?? []}
                  isMulti={type == "select-multi"}
                  onNext={onNext}
                  values={(inputValue ?? []) as string[]}
                  onChange={(v) => setInputValue(v)}
                />
                {type == "select-multi" && (
                  <NextButton
                    onClick={() => onNext(inputValue)}
                    isDisabled={
                      (inputValue as string[]).length < 1 || isMaxReached
                    }
                    error={
                      isMaxReached
                        ? `Vous pouvez choisir au maximum ${max} éléments`
                        : undefined
                    }
                  >
                    CONTINUER
                  </NextButton>
                )}
              </>
            );
          })()}
        {["input-number", "input-moreless"].includes(type) && (
          <>
            <Input
              label={label}
              value={inputValue.toString()}
              type="number"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <NextButton
              onClick={() => onNext(inputValue)}
              isDisabled={
                isNaN(parseInt(inputValue.toString())) ||
                parseInt(inputValue.toString()) <= 0
              }
            >
              CONTINUER
            </NextButton>
          </>
        )}
        {["input-text"].includes(type) && (
          <>
            <Input
              label={label}
              value={inputValue.toString()}
              onChange={(e) => {
                setInputValue(e.currentTarget.value);
              }}
            />
            <NextButton
              onClick={() => onNext(inputValue)}
              isDisabled={inputValue.toString().length < 1}
            >
              CONTINUER
            </NextButton>
          </>
        )}
        {["input-address"].includes(type) &&
          (() => {
            let parsedAddress: TAddress | undefined = undefined;

            try {
              const parsed = JSON.parse(inputValue.toString());
              if (parsed?.address) {
                parsedAddress = parsed;
              }
            } catch {}

            return (
              <>
                <InputAddress
                  label={label}
                  value={parsedAddress}
                  onChangeValue={(address) => {
                    setInputValue(JSON.stringify(address));
                  }}
                />
                <NextButton
                  onClick={() => onNext(inputValue)}
                  isDisabled={!parsedAddress}
                >
                  CONTINUER
                </NextButton>
              </>
            );
          })()}

        {onNext && displayOnNext && !DISPLAY_ONNEXT_INPUTS.includes(type) && (
          <NextButton onClick={() => onNext()}>CONTINUER</NextButton>
        )}
      </Box>
    </Flex>
  );
}

interface NextButtonProps extends ButtonProps {
  error?: string;
}

function NextButton(props: NextButtonProps) {
  const { error, ...rest } = props;
  return (
    <Center flexDir="column" my={{ base: 3, lg: 3 }}>
      {error && (
        <Text color="red" my={1} top={5}>
          {error}
        </Text>
      )}
      <Button {...rest}>CONTINUER</Button>
    </Center>
  );
}
