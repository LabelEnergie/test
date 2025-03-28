/*
 * Usage:
 *   const { alert, confirm, prompt } = useModals()
 *   alert("Hey!") // awaitable too
 *   if (await confirm("Are you sure?")) ...
 *   const result = await prompt("Enter a URL", "http://")
 *
 *   source: https://gist.github.com/statico/c385705ce14106cd013d413560d98622
 */

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Box,
  ModalProps,
  ModalContentProps,
  ModalCloseButton,
} from "@chakra-ui/react";

enum ModalType {
  Alert,
  Confirm,
  Deletion,
}

export interface Modals {
  alert: (title: string, message: string, confirmText?: string) => Promise<any>;
  confirm: (
    title: string,
    message: string,
    confirmText?: string,
    cancelText?: string,
    options?: {
      container?: Omit<ModalProps, "isOpen" | "onClose" | "children">;
      content?: ModalContentProps;
    },
    cancellable?: boolean
  ) => Promise<any>;
  deletion: (
    title: string,
    message: string,
    confirmText?: string,
    cancelText?: string,
    options?: {
      container?: Omit<ModalProps, "isOpen" | "onClose" | "children">;
      content?: ModalContentProps;
    },
    cancellable?: boolean
  ) => Promise<any>;
}

const defaultContext: Modals = {
  alert() {
    throw new Error("<ModalProvider> is missing");
  },
  confirm() {
    throw new Error("<ModalProvider> is missing");
  },
  deletion() {
    throw new Error("<ModalProvider> is missing");
  },
};

const Context = createContext<Modals>(defaultContext);

interface AnyEvent {
  preventDefault(): void;
  stopPropagation(): void;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const ok = useRef<HTMLButtonElement>(null);

  const createOpener = useCallback(
    (type: ModalType) =>
      (
        title: string,
        message: string,
        confirmText?: string,
        cancelText?: string,
        options?: {
          container?: Omit<ModalProps, "isOpen" | "onClose" | "children">;
          content?: ModalContentProps;
        },
        cancellable?: boolean
      ) =>
        new Promise((resolve) => {
          const handleClose = (e?: AnyEvent) => {
            e?.preventDefault();
            e?.stopPropagation();
            setModal(null);
            resolve(null);
          };

          const handleCancel = (e?: AnyEvent) => {
            e?.preventDefault();
            e?.stopPropagation();
            setModal(null);
            resolve(false);
          };

          const handleOK = (e?: AnyEvent) => {
            e?.preventDefault();
            e?.stopPropagation();
            setModal(null);
            resolve(true);
          };

          setModal(
            <Modal
              isOpen={true}
              onClose={handleClose}
              initialFocusRef={ok}
              isCentered
              {...options?.container}
            >
              <ModalOverlay />
              <ModalContent p={6} rounded="2xl" {...options?.content}>
                {cancellable && <ModalCloseButton />}
                <ModalBody p={0}>
                  <Stack spacing={1}>
                    <Box fontSize="lg" fontWeight="700">
                      {title}
                    </Box>
                    <Box
                      color="gray.500"
                      fontWeight={400}
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                  </Stack>
                </ModalBody>
                <ModalFooter p={0} mt={3}>
                  {type !== ModalType.Alert && (
                    <Button
                      mr={1}
                      variant="ghost"
                      colorScheme="gray"
                      color="gray.400"
                      onClick={handleCancel}
                    >
                      {cancelText ?? "Annuler"}
                    </Button>
                  )}
                  <Button
                    onClick={handleOK}
                    colorScheme={
                      type === ModalType.Deletion ? "red" : "primary"
                    }
                    variant={
                      type === ModalType.Deletion ? "solid" : "alternative"
                    }
                    ref={ok}
                  >
                    {confirmText ?? "Oui"}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          );
        }),
    [children]
  );

  return (
    <Context.Provider
      value={{
        alert: createOpener(ModalType.Alert),
        confirm: createOpener(ModalType.Confirm),
        deletion: createOpener(ModalType.Deletion),
      }}
    >
      {children}
      {modal}
    </Context.Provider>
  );
};

export const useModals = () => useContext(Context);
