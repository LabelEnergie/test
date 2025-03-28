import {
  Box,
  BoxProps,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AppHeader from "./AppHeader";
import ProfileImage from "@/components/shared/ProfileImage";
import { useAppContext } from "@/app/providers";

interface AppHeaderMobileProps extends BoxProps {}

export default function AppHeaderMobile(props: AppHeaderMobileProps) {
  const { ...rest } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppContext();

  if (!user) {
    return null;
  }

  return (
    <>
      <Flex
        as="header"
        position="sticky"
        top={0}
        w="full"
        justifyContent="space-between"
        alignItems="center"
        px={5}
        py={2}
        bg="white"
        zIndex={999}
        {...rest}
      >
        <HStack w="fit-content">
          <ProfileImage src={user?.photo} size={60} />
          <Box ml={3}>
            <Text color="gray.500" fontSize={13}>
              Bonjour
            </Text>
            <Text
              color="king"
              fontWeight={800}
              fontSize={18}
              wordBreak="break-all"
            >
              {user.firstName}
            </Text>
          </Box>
        </HStack>
        <Image
          src="/icons/menu.svg"
          boxSize="55px"
          p={3}
          mr={-3}
          cursor="pointer"
          onClick={onOpen}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="300px">
          <DrawerCloseButton color="white" />
          <AppHeader flex={1} onClick={() => onClose()} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
