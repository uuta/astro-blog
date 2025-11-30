/**
 * Merge and Sort Articles
 *
 * Combines blog posts and Zenn articles into a unified list, sorted by date descending
 */

import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "../infrastructure/zenn/types";
import type { UnifiedArticle } from "../types";
import { toBlogArticle, toZennArticle } from "./articleConverters";

/**
 * Merge blog posts and Zenn articles into a unified, sorted list
 *
 * Process:
 * 1. Convert blog posts to BlogArticle
 * 2. Convert Zenn articles to ZennArticleUnified
 * 3. Combine both arrays
 * 4. Sort by timestamp descending (newest first)
 * 5. Filter out draft articles
 *
 * @param blogPosts - Blog posts from Content Collection
 * @param zennArticles - Zenn articles from API
 * @returns Unified article list sorted by date descending
 */
export const getMergedArticles = (
  blogPosts: CollectionEntry<"blog">[],
  zennArticles: ZennArticle[]
): UnifiedArticle[] => {
  // 1. Convert blog posts to BlogArticle
  const blogArticles = blogPosts
    .map(toBlogArticle)
    .filter(
      (article): article is NonNullable<typeof article> => article !== null
    );

  // 2. Convert Zenn articles to ZennArticleUnified
  const zennArticlesUnified = zennArticles.map(toZennArticle);

  // 3. Combine both arrays
  const combined = [...blogArticles, ...zennArticlesUnified];

  // 4. Sort by timestamp descending (newest first)
  // Note: timestamp is pre-calculated in converters, so no Date generation here
  const sorted = combined.sort((a, b) => b.timestamp - a.timestamp);

  // 5. Filter out draft articles (only for blog posts)
  const filtered = sorted.filter(article => {
    if (article.source === "blog") {
      return !article._raw.data.draft;
    }
    return true; // Zenn articles are always published
  });

  return filtered;
};
