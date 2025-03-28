import { TChatMessage, TChatMessageSection } from "@/types/chat.type";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { RefObject } from "react";
import { format } from "date-fns";

interface ChatBodyProps {
  messages: TChatMessageSection[];
  scrollRef: RefObject<HTMLDivElement>;
}

export default function ChatBody(props: ChatBodyProps) {
  const { messages, scrollRef } = props;

  return (
    <VStack
      ref={scrollRef}
      p={4}
      flex="1"
      overflowY="auto"
      spacing={4}
      w="full"
    >
      {messages.map((dateMessage, index) => (
        <Flex key={index} width="full" flexDir={"column"}>
          <Box textAlign="center" mb={4}>
            <Text fontSize="sm" color="gray.500">
              {dateMessage.date.label}
            </Text>
          </Box>
          {dateMessage.messages.map((msg) => (
            <Box
              key={msg.id}
              p={3}
              pb={1}
              rounded="lg"
              {...(msg.isOwner && {
                roundedTopRight: 0,
                alignSelf: "flex-end",
                bg: "primary",
              })}
              {...(!msg.isOwner && {
                roundedTopLeft: 0,
                alignSelf: "flex-start",
                bg: "gray.100",
              })}
              maxW="75%"
              my={1}
            >
              {msg.message.split("\n").map((text, i) => (
                <Text
                  key={i}
                  color={msg.isOwner ? "white" : "black"}
                  fontWeight={500}
                >
                  {text}
                </Text>
              ))}
              <Text
                fontSize="xs"
                color={msg.isOwner ? "white" : "gray.600"}
                textAlign="right"
                fontWeight={500}
              >
                {format(new Date(msg.date), "HH:mm")}
              </Text>
            </Box>
          ))}
        </Flex>
      ))}
    </VStack>
  );
}
