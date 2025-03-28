"use client";

import { ReactNode } from "react";
import Heading from "./Heading";
import { Box, BoxProps, Flex, HStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface AppPageProps extends BoxProps {
  title: string;
  headerRight?: ReactNode;
  canGoBack?: boolean;
}

export default function AppPage(props: AppPageProps) {
  const { children, title, headerRight, canGoBack = false, ...rest } = props;

  const router = useRouter();

  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ md: "center" }}
        justifyContent="space-between"
        px={{ base: 5, lg: 20 }}
        py={{ base: 5, md: "70px" }}
      >
        <HStack mb={{ base: 5, md: 0 }} spacing={3}>
          {canGoBack && (
            <Image
              src="/icons/fleche.png"
              h="16px"
              transform="rotate(180deg)"
              cursor="pointer"
              onClick={() => {
                router.back();
              }}
            />
          )}
          <Heading as="h1" textAlign="left">
            {title}
          </Heading>
        </HStack>
        <Box>{headerRight}</Box>
      </Flex>
      <Box px={{ base: 5, lg: 20 }} pb={{ base: 5, md: "70px" }} {...rest}>
        {children}
      </Box>
    </>
  );
}
