import ArticleFormLoading from "@/components/Admin/AdminBlog/ArticleFormLoading";

export default async function ArticleUpdateFormPage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code;

  return <ArticleFormLoading code={code} />;
}
