import Heading from "@/components/shared/Heading";
import { Box, Text } from "@chakra-ui/react";

interface ChatHeaderProps {
  receiverName: string;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { receiverName } = props;

  return (
    <Box>
      <Heading size="md">{receiverName}</Heading>
    </Box>
  );
}
