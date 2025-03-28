import { TArticle } from "@/types/article.type";
import Container from "../shared/Container";
import { mdxComponents } from "./MdxComponents";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import Heading from "../shared/Heading";
import { formatDate } from "@/utils/date";
import Button from "../shared/Button";

interface ArticleProps extends TArticle {
  mdText: string;
}

export default function Article(props: ArticleProps) {
  const { code, id, image, lastDate, mdText, title } = props;

  return (
    <Container
      sx={{
        img: {
          maxW: "700px",
          w: "full",
          h: "auto",
          mx: "auto",
          rounded: "md",
          my: 10,
        },
        "h2,h3,h4,h5,h6": {
          textAlign: "center",
        },
        h2: {
          fontSize: { base: 25, lg: 35 },
          fontWeight: 700,
          color: "primary",
        },
        h3: {
          fontSize: { base: 23, lg: 33 },
          fontWeight: 600,
          color: "secondary",
        },
        h4: {
          fontSize: { base: 21, lg: 31 },
          fontWeight: 500,
          color: "primaryDark",
        },
        "h5, h6": {
          fontSize: { base: 18, lg: 28 },
          fontWeight: 400,
          color: "primarySemiDark",
        },
      }}
    >
      <Heading as="h1" mt={10}>
        {title}
      </Heading>
      <Text textAlign="center" color="gray.400" fontWeight={600} mt={3}>
        Publié le {formatDate(lastDate)}
      </Text>
      <Image
        src={image.src}
        h="400px"
        alt={image.legend}
        title={image.legend}
        boxShadow="none !important"
      />
      <Box sx={{}}>
        <Markdown
          options={{
            overrides: {
              ...mdxComponents,
            },
          }}
        >
          {mdText}
        </Markdown>
      </Box>
      <Center my={10}>
        <Button href="/simulation">Je réalise mon devis</Button>
      </Center>
    </Container>
  );
}
