"use client";

import LoadingPage from "@/components/shared/LoadingPage";
import { useArticle } from "@/services/blog.service";
import EditArticleForm from "./EditArticleForm";
import { redirect } from "next/navigation";

interface ArticleFormLoadingProps {
  code: string;
}

export default function ArticleFormLoading(props: ArticleFormLoadingProps) {
  const { code } = props;

  const { data: article, isLoading } = useArticle(code);

  if (isLoading) {
    return <LoadingPage h="full">Chargement de l'article</LoadingPage>;
  }

  if (!article) {
    redirect("/app/mon-compte/admin/articles");
  }

  return <EditArticleForm article={article} />;
}
