"use client";

import { Box, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface DownloadButtonProps {
  type: "apple" | "google";
}

export default function DownloadButton(props: DownloadButtonProps) {
  const { type } = props;

  return (
    <HStack
      as={Link}
      target="_blank"
      rel="nofollow"
      //   href={
      //     type == "apple"
      //       ? "https://apps.apple.com/fr/app/cookeasy/id6474663216?platform=iphone"
      //       : "https://play.google.com/store/apps/details?id=com.gireaud.luc.cookbook"
      //   }
      href=""
      bg="black"
      px={3}
      py={2}
      rounded="lg"
      borderWidth={1}
      borderColor="gray.500"
    >
      <Image
        src={`/icons/${
          type == "apple" ? "icon_app_store" : "icon_play_store"
        }.png`}
        alt=""
        title=""
        w={{ base: "25px", lg: "32px" }}
        h={{ base: "25px", lg: "32px" }}
      />
      <Box ml={2}>
        <Text color="white" fontSize={{ base: 9, xl: 12 }}>
          Disponible sur
        </Text>
        <Text color="white" fontSize={{ base: 15, xl: 22 }} fontWeight={800}>
          {type == "google" ? "Google Play" : "App Store"}
        </Text>
      </Box>
    </HStack>
  );
}
