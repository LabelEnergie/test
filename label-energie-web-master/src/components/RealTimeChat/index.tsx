"use client";

import { useMessages, useSendMessage } from "@/services/chat.service";
import { VStack } from "@chakra-ui/react";
import ChatHeader from "./Chat/ChatHeader";
import ChatBody from "./Chat/ChatBody";
import ChatInput from "./Chat/ChatInput";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { chatMessageKeys } from "@/services/keys.service";
import { TChatNotificationType } from "@/types/chat.type";
import { useAppContext } from "@/app/providers";

interface RealTimeChatProps {
  receiver: {
    id: string;
    name: string;
  };
  hideHeader?: boolean;
}

export default function RealTimeChat(props: RealTimeChatProps) {
  const { receiver, hideHeader } = props;

  const queryClient = useQueryClient();

  const { user } = useAppContext();

  const { data: messagesSections } = useMessages({ userId: receiver.id });
  const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessage({
    userId: receiver.id,
  });

  const scrollBodyRef = useRef<HTMLDivElement>(null);

  const mercureEndpoint =
    "https://mercure.labelenergie.fr.labelenergie.fr/.well-known/mercure";

  useEffect(() => {
    if (!user) return; // Early return if no user

    const url = new URL(mercureEndpoint);
    url.searchParams.append(
      "topic",
      `/chat/sender/${receiver.id}/receiver/${user.id}`
    );

    const eventSource = new EventSource(url);

    eventSource.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data?.type == TChatNotificationType.NEW_MESSAGE) {
        queryClient.invalidateQueries({
          queryKey: chatMessageKeys.list(receiver.id),
        });
      }
    });

    return () => eventSource.close();
  }, [receiver.id, queryClient, user]);

  useEffect(() => {
    if (messagesSections) {
      scrollToBotttom();
    }
  }, [messagesSections]);

  function onSend(message: string) {
    sendMessage({ message });
  }

  function scrollToBotttom() {
    scrollBodyRef.current?.scrollTo({
      top: scrollBodyRef.current.scrollHeight,
    });
  }

  return (
    <VStack h="full" spacing={0}>
      {!hideHeader && <ChatHeader receiverName={receiver.name} />}
      <ChatBody scrollRef={scrollBodyRef} messages={messagesSections ?? []} />
      <ChatInput onSend={onSend} isLoading={isSendingMessage} />
    </VStack>
  );
}
