import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { EMAIL, SOCIALS, TEL } from "@/constants/contacts";
import Button from "../shared/Button";
import {
  HELPS_SUBVENTIONS,
  SERVICES,
  SOLUTIONS,
} from "@/constants/headerItems";
import { colors } from "@/style/colors";

const LINKS = [
  {
    title: "Menu",
    items: [
      {
        title: "Accueil",
        href: "/",
      },
      HELPS_SUBVENTIONS,
      {
        title: "Nous contacter",
        href: "/contact",
      },
    ],
  },
  {
    title: "Nos Solutions",
    items: SOLUTIONS,
  },
  {
    title: "Nos Services",
    items: SERVICES,
  },
];

const CONTACTS = [
  {
    icon: "enveloppe.png",
    title: "Email :",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: "telephone.png",
    title: "Tél :",
    value: TEL,
    href: `tel:${TEL}`,
  },
];

const FOOTER_SOCIALS = [
  { href: SOCIALS.fb, icon: "facebook.png" },
  { href: SOCIALS.insta, icon: "instagram.png" },
];

export default function Footer() {
  return (
    <Box as="footer" bg="king" px={{ base: 5, md: 20 }} py={5}>
      <Image
        src="/logo.png"
        alt=""
        title=""
        h="40px"
        mt={10}
        mx={{ base: "auto", lg: "unset" }}
      />
      <Wrap mt={10} spacing={20} justify={"center"}>
        {LINKS.map((l, i) => (
          <WrapItem
            key={i}
            maxW={"300px"}
            w={{ base: "200px", md: "250px" }}
            flexDir="column"
          >
            <Text color="white" fontWeight={800} fontSize={25} mb={3} h="40px">
              {l.title}
            </Text>

            {l.items.map((item, j) => (
              <Text
                key={j}
                as={Link}
                href={item.href}
                color="gray.400"
                fontSize={18}
              >
                {item.title}
              </Text>
            ))}
          </WrapItem>
        ))}
        <WrapItem flexDir="column">
          {CONTACTS.map((contact, i) => (
            <HStack
              key={i}
              bg="white"
              px={5}
              py={5}
              w="full"
              my={4}
              rounded="md"
              spacing={7}
            >
              <Center
                rounded="md"
                boxShadow={`0px 0px 15px 5px ${colors.primary}`}
                bg={colors.primary + "40"}
                p={2}
              >
                <Image
                  src={`/icons/${contact.icon}`}
                  boxSize="32px"
                  minW="32px"
                />
              </Center>
              <Box>
                <Text color="gray.500">{contact.title}</Text>
                <Text as={Link} href={contact.href} fontWeight={800}>
                  {contact.value}
                </Text>
              </Box>
            </HStack>
          ))}
          <Button href="/simulateur" mt={10}>
            JE RÉALISE MES TRAVAUX
          </Button>
        </WrapItem>
      </Wrap>
      <Box w="full" h="2px" bg="white" mt={10} mb={4} />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", lg: "row" }}
      >
        <HStack ml={5} spacing={10}>
          {FOOTER_SOCIALS.map((s, i) => (
            <Link key={i} href={s.href} rel="nofollow" target="_blank">
              <Image
                src={`/icons/${s.icon}`}
                boxSize={{ base: "32px", lg: "50px" }}
              />
            </Link>
          ))}
        </HStack>
        <Text color="white">
          Label Energie © 2024 •{" "}
          <Link href="/mentions-legales">Mentions légales</Link>
        </Text>
      </Flex>
    </Box>
  );
}
