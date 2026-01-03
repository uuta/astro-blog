import { getZennArticles } from "@lib/zenn";
import { SITE } from "@config";
import type { Article } from "@lib/zenn";
import type { ZennPost } from "../types/post";

/**
 * Zenn 記事を UnifiedPost 形式に変換
 */
export const transformZennArticle = (article: Article): ZennPost => {
  return {
    source: "zenn",
    slug: article.slug,
    data: {
      title: article.title,
      pubDatetime: new Date(article.published_at),
      description: article.title,
      author: article.user.username,
      tags: ["zenn"],
      featured: false,
      draft: false,
    },
    externalUrl: `https://zenn.dev${article.path}`,
    likedCount: article.liked_count,
  };
};

/**
 * 複数の Zenn 記事を変換
 */
export const transformZennArticles = (articles: Article[]): ZennPost[] => {
  return articles.map(transformZennArticle);
};

/**
 * Zenn から全記事を取得（ページネーション対応）
 */
export const fetchAllZennArticles = async (): Promise<Article[]> => {
  if (!SITE.zennUsername) {
    console.warn("Zenn username not configured");
    return [];
  }

  const allArticles: Article[] = [];
  let currentPage = 1;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const result = await getZennArticles({
        username: SITE.zennUsername,
        order: "latest",
        page: currentPage,
      });

      if (!result.success) {
        console.error(
          `Failed to fetch Zenn articles (page ${currentPage}):`,
          result.error
        );
        break;
      }

      const publishedArticles = result.data.articles.filter(
        article => article.published
      );

      allArticles.push(...publishedArticles);

      hasNextPage = result.data.next_page !== null;
      currentPage = result.data.next_page ?? currentPage + 1;
    }

    console.log(`Successfully fetched ${allArticles.length} Zenn articles`);
    return allArticles;
  } catch (error) {
    console.error("Unexpected error fetching Zenn articles:", error);
    return [];
  }
};
