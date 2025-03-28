"use client";

import { useArticles } from "@/services/blog.service";
import { TMiniArticle } from "@/types/article.type";
import { Box, Text } from "@chakra-ui/react";
import MiniArticleCard from "../shared/Blog/MiniArticleCard";
import Link from "next/link";

interface BlogHomeProps {
  articles: TMiniArticle[];
}

export default function BlogHome(props: BlogHomeProps) {
  const { articles } = props;

  return (
    <Box>
      {articles.map((a) => (
        <MiniArticleCard
          key={a.id}
          {...a}
          as={Link}
          href={`/blog/articles/${a.code}`}
        />
      ))}
    </Box>
  );
}
