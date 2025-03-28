import NotFoundPage from "@/app/not-found";
import Article from "@/components/Blog/Article";
import { getArticles, getArticle } from "@/services/blog.service";

import { TArticle } from "@/types/article.type";
import { Metadata } from "next";
import Head from "next/head";

export let metadata: Metadata = {};

export default async function ArticlePage({
  params,
}: {
  params: { code: string };
}) {
  try {
    const article = await getArticle(params.code);

    if (!article) {
      return <NotFoundPage />;
    }

    metadata = article.seo;

    const mdData = await fetch(article.mdFileUrl);
    let mdText = await mdData.text();

    if (!mdText) {
      return <NotFoundPage />;
    }

    mdText = replaceObsidianSnippets(mdText, article);

    return (
      <main>
        <Article {...article} mdText={mdText} />
      </main>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    return <NotFoundPage />;
  }
}

function replaceObsidianSnippets(
  markdownText: string,
  article: TArticle
): string {
  // High
  const regEx1 = /==([^=]+)==/g;
  let result = markdownText.replace(regEx1, "<High>$1</High>");

  // Images
  if (article.images?.length) {
    const regEx2 = /!\[\[(.*?)\]\]/g;
    let index = 0;

    result = result.replace(regEx2, (match: string, p1: string): string => {
      if (index < article.images!.length) {
        const replacement = article.images![index];
        index++;
        return `![${replacement.legend}](${replacement.src})`;
      } else {
        return match;
      }
    });
  }

  // Callout
  // const regEx2 = /> \[\!(\w+)\] ([^\n]+)\n>([^\n]+)/;

  // let match = result.match(regEx2);
  // while (match) {
  //   const type = match[1];
  //   const title = match[2];
  //   const description = match[3];
  //   result = result.replace(
  //     regEx2,
  //     `<Callout type="${type}" title="${title}" description="${description}"/>`
  //   );

  //   match = result.match(regEx2);
  // }

  return result;
}
