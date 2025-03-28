"use client";

import Button from "@/components/shared/Button";
import { High } from "@/components/shared/High";
import { Center, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

function NotFoundPage() {
  const router = useRouter();
  return (
    <Center mx="20px" minH="80vh">
      <VStack my="100px" textAlign="center">
        <Heading as="h1">
          <High>Oups, vous êtes perdu ?</High>
        </Heading>
        <Button
          mt={10}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          Retourner sur la page d&apos;accueil
        </Button>
      </VStack>
    </Center>
  );
}

export default NotFoundPage;
