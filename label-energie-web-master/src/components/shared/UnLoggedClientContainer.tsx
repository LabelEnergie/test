"use client";

import { Center, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Header from "../Layout/Header";
import GradientDivider from "./GradientDivider";
import Button from "./Button";
import Card from "./Card";
import { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Heading from "./Heading";

interface UnLoggedClientContainerProps {
  children: ReactNode;
  title: string;
  perks?: string[];
  cardTitle: string;
  displaySignUp?: boolean;
  canGoBack?: boolean;
}

export default function UnLoggedClientContainer(
  props: UnLoggedClientContainerProps
) {
  const {
    children,
    cardTitle,
    perks = [
      "Retrouvez toutes les estimations de vos projets",
      "Téléchargez et déposez vos documents en toutes sécurité",
      "Suivez en détails l’avancée de vos projets",
    ],
    title,
    displaySignUp,
    canGoBack,
  } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <>
      <Header />

      <Flex
        h={{ lg: "calc(100vh - 100px)" }}
        flexDir={{ base: "column", lg: "row" }}
      >
        <Center position="relative" h="full" w="full">
          <Image
            zIndex={-1}
            src="/icons/rge_garant.png"
            w="100px"
            opacity={0.4}
            position="absolute"
            top={2}
            right={{ base: 2, md: 10 }}
          />
          <Image
            zIndex={-1}
            src="/icons/eoliennes.png"
            w="100px"
            position="absolute"
            bottom={0}
            right={0}
          />
          <Image
            zIndex={-1}
            src="/icons/panneaux_solaire.png"
            w="100px"
            position="absolute"
            top={0}
            left={0}
          />
          <Image
            zIndex={-1}
            src="/icons/plante.png"
            w="100px"
            position="absolute"
            bottom={0}
            left={{ base: 0, md: 10 }}
          />
          <Card
            px={10}
            py={10}
            w={{ lg: "350px", xl: "500px" }}
            my={20}
            position="relative"
          >
            {canGoBack && (
              <Image
                src="/icons/fleche.png"
                transform="rotate(180deg)"
                w="25px"
                position="absolute"
                top={5}
                left={5}
                cursor="pointer"
                onClick={() => {
                  router.back();
                }}
              />
            )}
            <Image src="/logo.jpg" h="40px" mx="auto" />
            <Text fontWeight={800} color="king" textAlign="center" my={10}>
              {cardTitle}
            </Text>
            {children}
          </Card>
        </Center>
        <Flex
          w={{ base: "full", lg: "500px", xl: "800px" }}
          bg="king"
          h={{ base: "800px", lg: "full" }}
          px={{ base: 5, lg: 20 }}
          py={6}
          align="stretch"
          flexDir={"column"}
          justifyContent="space-between"
          position="relative"
        >
          <Heading as="h1" color="white" textAlign="left" fontSize={30}>
            {title}
          </Heading>
          <GradientDivider ml={0} zoom={false} />
          {perks.map((perk, i) => (
            <HStack spacing={5} key={i}>
              <Image src="/icons/fleche.png" w="32px" />
              <Text color="white" fontWeight={800}>
                {perk}
              </Text>
            </HStack>
          ))}
          <Image src="/images/canape.png" w="300px" mx="auto" />
          <Center
            flexDir="column"
            visibility={displaySignUp ? "visible" : "hidden"}
          >
            <Text color="gray.400" fontWeight={600} textAlign="center">
              Je n'ai pas d'espace client
            </Text>
            <Button
              mt={2}
              px={20}
              fontSize={14}
              href={`/app/creer-un-compte${
                redirect ? `?redirect=${redirect}` : ""
              }`}
            >
              CREER MON ESPACE CLIENT
            </Button>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
