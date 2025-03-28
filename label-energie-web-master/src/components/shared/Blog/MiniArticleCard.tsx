import { TMiniArticle } from "@/types/article.type";
import { BoxProps, Center, Image, Text } from "@chakra-ui/react";

export default function MiniArticleCard(
  props: BoxProps & TMiniArticle & { href?: string }
) {
  const { image, title, ...rest } = props;

  return (
    <Center
      bg="gray.50"
      flexDir={{ base: "column" }}
      px={10}
      py={5}
      rounded="md"
      maxW="250px"
      cursor="pointer"
      {...rest}
    >
      <Text fontSize={20} textAlign="center">
        {title}
      </Text>
      <Image
        w="150px"
        src={image.src}
        alt={image.legend}
        title={image.legend}
      />
    </Center>
  );
}
