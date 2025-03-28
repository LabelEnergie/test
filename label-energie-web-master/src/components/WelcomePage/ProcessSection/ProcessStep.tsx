import { Fade } from "@/components/shared/ScrollAnimation";
import { Box, BoxProps, Text, VStack } from "@chakra-ui/react";

interface ProcessStepProps extends BoxProps {
  title: string;
  perks: string[];
  orientation: "left" | "right";
}

export default function ProcessStep(props: ProcessStepProps) {
  const { orientation, perks, title, ...rest } = props;

  return (
    <VStack
      position="absolute"
      as={Fade}
      left="50%"
      {...(orientation == "left"
        ? { transform: { base: "translateX(-120%)", md: "translateX(-115%)" } }
        : { transform: { base: "translateX(20%)", md: "translateX(15%)" } })}
      align={orientation == "left" ? "flex-end" : "flex-start"}
      spacing={{ base: 0, md: 5 }}
      textAlign={orientation == "left" ? "right" : "left"}
      w={{ base: "40%", md: "unset" }}
      wordBreak="break-word"
      {...rest}
    >
      <Text
        as="h3"
        fontSize={{ base: 16, md: 25 }}
        lineHeight="30px"
        fontWeight={800}
        color="secondary"
      >
        {title}
      </Text>
      <Box>
        {perks.map((perk, i) => (
          <Text
            key={i}
            my={{ base: 3, md: "unset" }}
            fontSize={{ base: 14, md: "unset" }}
          >
            {perk}
          </Text>
        ))}
      </Box>
    </VStack>
  );
}
