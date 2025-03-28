import { useAppContext } from "@/app/providers";
import ProfileImage from "@/components/shared/ProfileImage";
import { EMAIL, TEL } from "@/constants/contacts";
import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Image,
  Text,
  TextProps,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import router from "next/router";

const BUTTONS = [
  {
    title: "Nous écrire",
    href: `mailto:${EMAIL}`,
    icon: "enveloppe.png",
  },
  {
    title: "Nous appeler",
    href: `tel:${TEL}`,
    icon: "telephone.png",
  },
];

const BASIC_ROUTES = [
  {
    name: "Mes informations",
    href: "/app/mon-compte/mes-informations",
  },
  {
    name: "Mes dossiers",
    href: "/app/mon-compte/mes-dossiers",
  },
];

const ADMIN_ROUTES = [
  {
    name: "Blog",
    href: "/app/mon-compte/admin/articles",
  },
  {
    name: "Dossiers",
    href: "/app/mon-compte/admin/dossiers",
  },
];

interface LinkHeaderProps extends TextProps {
  href: string;
}
interface AppHeaderProps extends BoxProps {
  onClick?(): void;
}

export default function AppHeader(props: AppHeaderProps) {
  const { onClick, ...rest } = props;
  const { user, logOut } = useAppContext();
  const pathname = usePathname();
  const toast = useToast();

  if (!user) {
    return null;
  }

  function LinkHeader({ href, ...rest }: LinkHeaderProps) {
    return (
      <Text
        as={Link}
        href={href}
        color="gray.400"
        fontWeight="800"
        {...(pathname && pathname.includes(href) && {
          color: "white",
        })}
        onClick={onClick}
        {...rest}
      />
    );
  }

  return (
    <Flex flexDir="column" bg="king" w="full" p={{ base: 3, md: 5 }} {...rest}>
      <HStack display={{ base: "none", md: "flex" }}>
        <ProfileImage src={user.photo} />
        <Box ml={3}>
          <Text color="gray.400" fontSize={13}>
            Bonjour
          </Text>
          <Text
            color="white"
            fontWeight={800}
            fontSize={18}
            wordBreak="break-all"
          >
            {user.firstName}
          </Text>
        </Box>
      </HStack>
      <VStack mt={{ base: 10, md: 20 }} align="stretch" flex={1}>
        {(user.isAdmin ? ADMIN_ROUTES : BASIC_ROUTES).map((route, i) => (
          <LinkHeader key={i} href={route.href}>
            {route.name}
          </LinkHeader>
        ))}
      </VStack>
      <VStack>
        {BUTTONS.map((button, i) => (
          <Flex
            as={Link}
            key={i}
            bg="white"
            href={button.href}
            w="full"
            rounded="md"
            px={3}
            py={3}
            alignItems="center"
            onClick={onClick}
          >
            <Image src={`/icons/${button.icon}`} h="25px" mx={5} />
            <Text w="full" fontWeight={500}>
              {button.title}
            </Text>
          </Flex>
        ))}
      </VStack>
      <Link href="/" onClick={onClick}>
        <Image src="/logo_blanc.png" w="200px" mx="auto" mt={20} />
      </Link>
      <Text
        textDecorationLine="underline"
        textAlign="center"
        mt={10}
        color="gray.300"
        onClick={() => {
          onClick?.();
          logOut();
          

          toast({
            title: "Vous avez été déconnecté avec succès",
            status: "success",
            position: "top",
          });
        }}
        cursor="pointer"
      >
        Se déconnecter
      </Text>
    </Flex>
  );
}