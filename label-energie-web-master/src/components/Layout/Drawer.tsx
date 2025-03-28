import {
  SOLUTIONS,
  SERVICES,
  HELPS_SUBVENTIONS,
} from "@/constants/headerItems";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Image,
  useDisclosure,
  Text,
  VStack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import AccountButton from "../shared/AccountButton";
import Button from "../shared/Button";
import { sleep } from "@/utils/promise";
import Link from "next/link";

interface LinkItemProps {
  children: ReactNode;
  items?: { title: string; href: string }[];
  id: string;
  href?: string;
}

export function DrawerCustom() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeMenu, setActiveMenu] = useState<
    { title: string; href: string }[]
  >([]);

  function LinkItem({ children, items, href, id }: LinkItemProps) {
    return (
      <Flex
        justifyContent="space-between"
        bg="white"
        _active={{
          bg: "gray.100",
        }}
        py={4}
        px={4}
        transition="all .2s"
        onClick={items ? () => setActiveMenu(items) : onClose}
        cursor="pointer"
        {...(href && { as: Link, href, cursor: "pointer" })}
      >
        <Text fontWeight={800}>{children}</Text>
        {items && (
          <Image src="/icons/fleche_droite.svg" boxSize="15px" mt={1} />
        )}
      </Flex>
    );
  }

  return (
    <>
      <Box
        as={Image}
        src="/icons/menu.svg"
        boxSize="40px"
        alt=""
        title=""
        onClick={() => {
          setActiveMenu([]);
          onOpen();
        }}
        display={{ lg: "none" }}
        cursor="pointer"
        my="auto"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent pt={"40px"} position="relative">
          <DrawerCloseButton />

          <DrawerBody as={VStack} spacing={0} align="stretch" px={0}>
            <LinkItem items={SOLUTIONS} id="solutions">
              Nos Solutions
            </LinkItem>
            <LinkItem items={SERVICES} id="services">
              Nos Services
            </LinkItem>
            <LinkItem href={HELPS_SUBVENTIONS.href} id="helps">
              {HELPS_SUBVENTIONS.title}
            </LinkItem>
          </DrawerBody>

          <DrawerFooter flexDir="column">
            <AccountButton />
            <Button mt={5} href="/simulateur" onClick={() => onClose()}>
              JE RÉALISE MES TRAVAUX
            </Button>
          </DrawerFooter>
          {activeMenu.length > 0 && (
            <Page2
              onBack={() => {
                onClose();
                setActiveMenu([]);
              }}
              items={activeMenu}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

interface Page2Props {
  onBack(): void;
  items: { title: string; href: string }[];
}

function Page2({ onBack, items }: Page2Props) {
  const [isBack, setIsBack] = useState(false);

  async function onGoBack() {
    setIsBack(true);
    await sleep(500);
    onBack();
    setIsBack(false);
  }

  return (
    <Box
      mt={3}
      position="absolute"
      left={0}
      right={0}
      top="47px"
      bottom={0}
      className={`animate__animated ${
        isBack ? "animate__fadeOutRight" : "animate__fadeInRight"
      }`}
      sx={{ "--animate-duration": ".4s" }}
      bg="white"
    >
      <Flex onClick={onGoBack} alignItems="center" px={3} cursor="pointer">
        <Image
          src="/icons/fleche_droite.svg"
          boxSize="15px"
          transform="rotate(180deg)"
        />
        <Text mt={1} ml={2} fontWeight={800}>
          Retour
        </Text>
      </Flex>
      <VStack align="stretch" mt={3}>
        {items.map((item, i) => (
          <Text
            as={Link}
            key={i}
            href={item.href}
            px={5}
            py={3}
            rounded="md"
            onClick={() => onBack()}
            fontWeight={800}
          >
            {item.title}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}
