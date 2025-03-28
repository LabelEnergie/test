import {
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
  ModalProps as ChakraModalProps,
  Box,
  ModalContentProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import FAQCollapseButton from "./Sections/FAQSection/FAQColapseButton";

interface ModalProps extends ChakraModalProps {
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
  contentStyle?: ModalContentProps;
}

export default function Modal(props: ModalProps) {
  const { isOpen, onClose, children, contentStyle, ...rest } = props;

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent mx={3} pb={10} pt={10} px={4} {...contentStyle}>
        <FAQCollapseButton
          isExpanded={false}
          transform="rotate(45deg)"
          size={32}
          position="absolute"
          right={5}
          top={2}
          cursor="pointer"
          onClick={onClose}
        />
        <Box maxH="calc(100vh - 100px)" overflowY="auto" px={3}>
          {children}
        </Box>
      </ModalContent>
    </ChakraModal>
  );
}
