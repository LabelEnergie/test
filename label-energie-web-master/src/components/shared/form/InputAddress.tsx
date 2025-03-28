import { Box, InputProps, Spinner, Text, VStack } from "@chakra-ui/react";
import { Input } from "./Input";
import { forwardRef, useEffect, useState } from "react";
import { TAddress } from "@/types/auth.types";
import { useFormContext } from "react-hook-form";
import { reverseGeocode } from "@/services/tools.service";
import { TGeoJSONProperty } from "@/types/tools.type";
import { SHADOW } from "@/style/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { useFieldError } from "./form";

interface InputAddressProps extends Omit<InputProps, "value"> {
  label?: string;
  onChangeValue?(add: TAddress): void;
  value?: TAddress;
  name?: string;
}

export const InputAddress = forwardRef<HTMLInputElement, InputAddressProps>(
  (props, ref) => {
    const {
      onChangeValue,
      value: valueProps,
      name = "",
      onChange,
      ...rest
    } = props;

    const { setValue, watch } = useFormContext();

    const error = useFieldError(name);

    const [address, setAddress] = useState<TAddress>();

    const [text, setText] = useState("");
    const debouncedText = useDebounce(text, 300);

    const [proposals, setProposals] = useState<TGeoJSONProperty[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isFocus, setIsFocus] = useState(false);

    const value = name ? watch(name) : valueProps;

    useEffect(() => {
      if (value) {
        setAddress(value);
        setText(formatAddress(value.address, value.zipCode, value.city));
      }
    }, [value]);

    function formatAddress(name: string, zipCode: string, city: string) {
      return `${name} - ${zipCode} ${city}`;
    }

    function onProposalClick({
      city,
      name: address,
      postcode,
    }: TGeoJSONProperty) {
      setProposals([]);
      setText(formatAddress(address, postcode, city));

      const newAddress = {
        address: address,
        city,
        zipCode: postcode,
      };

      setAddress(newAddress);
      onChangeValue?.(newAddress);
      setValue(name, newAddress);
    }

    useEffect(() => {
      (async () => {
        if (address) return;

        if (debouncedText.length > 2) {
          const result = await reverseGeocode(debouncedText);
          setProposals(result?.features?.map((f) => f.properties) ?? []);
        } else {
          setProposals([]);
        }
        setIsLoading(false);
      })();
    }, [debouncedText, address]);

    return (
      <Box position="relative">
        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setAddress(undefined);
            setIsLoading(true);
            setValue(name, null);
            onChange?.(e);
            setIsFocus(true);
          }}
          rightIcon={isLoading && <Spinner />}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          error={error}
          {...rest}
        />
        {isFocus && proposals.length > 0 && (
          <VStack
            w="full"
            position="absolute"
            zIndex={1}
            bg="white"
            boxShadow={SHADOW}
            rounded="md"
            py={3}
            align="stretch"
            spacing={0}
            mt={2}
          >
            {proposals.map((p) => (
              <Text
                key={p.id}
                px={3}
                _hover={{ bg: "gray.100" }}
                fontWeight={600}
                textAlign="left"
                py={2}
                cursor="pointer"
                onMouseDown={() => {
                  onProposalClick(p);
                }}
              >
                {formatAddress(p.name, p.postcode, p.city)}
              </Text>
            ))}
          </VStack>
        )}
      </Box>
    );
  }
);
