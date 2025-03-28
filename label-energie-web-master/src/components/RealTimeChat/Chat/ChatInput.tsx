import Button from "@/components/shared/Button";
import { sleep } from "@/utils/promise";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
  onSend(m: string): void;
  isLoading?: boolean;
}

export default function ChatInput(props: ChatInputProps) {
  const { onSend, isLoading } = props;

  const ref = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState("");
  const [lastKeyPressIsEnter, setLastKeyPressIsEnter] = useState(false);

  function handleSend() {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  }

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Flex p={4} alignItems="center" w="full">
      <Textarea
        ref={ref}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            // Need to press on enter 2 in a row to send msg
            if (lastKeyPressIsEnter) {
              handleSend();
              setLastKeyPressIsEnter(false);
              sleep(0).then(() => ref.current?.setSelectionRange(0, 0));
            } else {
              setLastKeyPressIsEnter(true);
            }
          } else {
            setLastKeyPressIsEnter(false);
          }
        }}
        placeholder="Entrer un message..."
        resize="none"
      />
      <Box w="100px">
        <Button onClick={handleSend} ml={4} isLoading={isLoading}>
          Envoyer
        </Button>
      </Box>
    </Flex>
  );
}
