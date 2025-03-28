import BlogHome from "@/components/Blog";
import { getArticles } from "@/services/blog.service";

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <main>
      <BlogHome articles={articles} />
    </main>
  );
}
