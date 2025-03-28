"use client";

import AppPage from "@/components/shared/AppPage";
import MiniArticleCard from "@/components/shared/Blog/MiniArticleCard";
import Button from "@/components/shared/Button";
import { useArticles } from "@/services/blog.service";
import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function AdminBlog() {
  const { data: articles } = useArticles();

  const router = useRouter();

  return (
    <AppPage
      title="Articles de Blog"
      headerRight={<Button href="articles/creer">Nouvel article</Button>}
    >
      <VStack align="stretch">
        {articles?.map((article) => (
          <MiniArticleCard
            key={article.id}
            {...article}
            onClick={() => router.push(`articles/${article.code}`)}
          />
        ))}
      </VStack>
    </AppPage>
  );
}
