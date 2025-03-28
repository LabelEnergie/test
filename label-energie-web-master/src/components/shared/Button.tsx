"use client";

import { Button as ChakraButton, ButtonProps, Spinner } from "@chakra-ui/react";
import Link from "next/link";

interface Props extends ButtonProps {
  href?: string;
  target?: "_blank";
}

export default function Button(props: Props) {
  const {
    variant,
    href,
    target,
    children,
    isDisabled,
    isLoading,
    onClick,
    ...rest
  } = props;

  const style: ButtonProps =
    variant == "outline"
      ? {
          borderWidth: 1,
          borderColor: "primary",
          color: "primary",
          bg: "white",
          ...(!isDisabled && {
            _hover: {
              bg: "primary",
              color: "white",
            },
            _active: {
              bg: "primarySemiDark",
              color: "white",
            },
          }),
        }
      : variant == "delete"
      ? {
          bg: "red.500",
          ...(!isDisabled && {
            _hover: { bg: "red.600" },
            _active: { bg: "red.700" },
          }),
          color: "white",
        }
      : {
          bg: "primary",
          color: "white",
          ...(!isDisabled && {
            _hover: {
              bg: "primarySemiDark",
              color: "white",
            },
            _active: {
              bg: "primaryDark",
              color: "white",
            },
          }),
        };

  return (
    <ChakraButton
      variant="unstyled"
      display="flex"
      w="fit-content"
      fontWeight="500"
      px={{ base: 6, lg: 9 }}
      h={{ base: "40px", lg: "50px" }}
      rounded="full"
      boxShadow="md"
      {...style}
      {...(isDisabled && {
        bg: "gray.400",
        cursor: "not-allowed",
        onClick: () => {},
      })}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      {...(href && {
        as: Link,
        href: href,
        target: target,
      })}
      {...(isLoading && { onClick: () => {} })}
      onClick={(e) => {
        if (isDisabled) return;
        onClick?.(e);
      }}
      fontSize={{ base: 18, lg: 22 }}
      {...rest}
    >
      {isLoading ? <Spinner color="theme.50" /> : children}
    </ChakraButton>
  );
}
