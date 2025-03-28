"use client";

import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Button from "../shared/Button";
import { useState } from "react";
import {
  HELPS_SUBVENTIONS,
  SERVICES,
  SOLUTIONS,
} from "@/constants/headerItems";
import Link from "next/link";
import { DrawerCustom } from "./Drawer";
import AccountButton from "../shared/AccountButton";
import { usePathname } from "next/navigation";

interface LinkHeaderProps extends BoxProps {
  items?: { title: string; href: string }[];
  id: string;
  href?: string;
}

export default function Header() {
  const [headerOpen, setHeaderOpen] = useState("");

  const pathname = usePathname();

  function LinkHeader({ children, items, id, href, ...rest }: LinkHeaderProps) {
    const isOpen = id == headerOpen;

    const [selected, setSelected] = useState(0);

    return (
      <Box
        position="relative"
        onMouseOver={() => setHeaderOpen(id)}
        onMouseLeave={() => setHeaderOpen("")}
        {...rest}
      >
        <Text
          color="king"
          fontWeight={isOpen ? 600 : 400}
          cursor="default"
          px={3}
          py={5}
          textAlign="center"
          {...(href && { as: Link, href, cursor: "pointer" })}
        >
          {children}
        </Text>
        {isOpen && items && (
          <VStack
            position="absolute"
            top="40px"
            w="350px"
            align="stretch"
            bg="white"
            rounded="md"
            py={3}
            spacing={0}
            onMouseLeave={() => setHeaderOpen("")}
          >
            {items?.map((item, i) => (
              <Text
                as={Link}
                key={i}
                href={item.href}
                px={5}
                py={3}
                rounded="md"
                {...(selected == i && {
                  bg: "gray.200",
                  fontWeight: 600,
                })}
                onClick={() => {
                  setSelected(-1);
                  setHeaderOpen("");
                }}
                onMouseEnter={() => setSelected(i)}
              >
                {item.title}
              </Text>
            ))}
          </VStack>
        )}
      </Box>
    );
  }

  function Links(props: BoxProps) {
    return (
      <HStack spacing={0} {...props}>
        <LinkHeader
          items={SOLUTIONS}
          id="solutions"
          w={{ lg: "140px", xl: "180px" }}
        >
          Nos Solutions
        </LinkHeader>
        <LinkHeader
          items={SERVICES}
          id="services"
          w={{ lg: "140px", xl: "180px" }}
        >
          Nos Services
        </LinkHeader>
        <LinkHeader href={HELPS_SUBVENTIONS.href} id="helps" w="230px">
          {HELPS_SUBVENTIONS.title}
        </LinkHeader>
      </HStack>
    );
  }

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      h={{ base: "60px", lg: "100px" }}
      px={{ base: 3, xl: 10 }}
      zIndex={998}
      bg="white"
      position="relative" // Changed from "sticky"
    >
      <Box
        as={Link}
        href="/"
        height={{ base: "50%", lg: "30%", xl: "40%" }}
        marginTop="auto"
        marginBottom="auto"
      >
        <Image src="/logo.jpg" alt="" title="" h={"full"} my="auto" />
      </Box>
      <HStack
        spacing={{ lg: 3, xl: 10 }}
        display={{ base: "none", lg: "flex" }}
      >
        <Links />
        <Button
          href="/simulateur"
          opacity={pathname.includes("/simulateur") ? 0 : 1}
          fontSize={{ base: 14, xl: "unset" }}
          // pt={{ lg: 3, xl: 2 }}
        >
          JE RÉALISE MES TRAVAUX
        </Button>
        <AccountButton />
      </HStack>
      <DrawerCustom />
    </Flex>
  );
}
