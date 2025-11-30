/**
 * Article Converters
 *
 * Convert different article sources to UnifiedArticle format
 */

import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "../infrastructure/zenn/types";
import type { BlogArticle, ZennArticleUnified } from "../types";
import {
  getArticleDate,
  getZennArticleDate,
  getNormalizedTimestamp,
} from "./dateUtils";

/**
 * Convert existing blog post to BlogArticle
 *
 * @param post - Blog post from Content Collection
 * @returns BlogArticle or null if date extraction fails
 */
export const toBlogArticle = (
  post: CollectionEntry<"blog">
): BlogArticle | null => {
  const pubDatetime = getArticleDate(post);

  if (!pubDatetime) {
    console.warn(`⚠️ ブログ記事の日付取得失敗、スキップ: ${post.slug}`);
    return null;
  }

  return {
    id: `blog:${post.slug}`,
    source: "blog",
    title: post.data.title,
    description: post.data.description,
    pubDatetime,
    timestamp: getNormalizedTimestamp(pubDatetime),
    href: `/posts/${post.slug}`,
    isExternal: false,
    tags: post.data.tags || [],
    _raw: post,
  };
};

/**
 * Convert Zenn article to ZennArticleUnified
 *
 * @param article - Zenn article from API
 * @returns ZennArticleUnified
 */
export const toZennArticle = (article: ZennArticle): ZennArticleUnified => {
  const pubDatetime = getZennArticleDate(article);

  return {
    id: `zenn:${article.slug}`,
    source: "zenn",
    title: article.title,
    description: "", // Zenn API doesn't provide description (could extract from body if needed)
    pubDatetime,
    timestamp: getNormalizedTimestamp(pubDatetime),
    href: `https://zenn.dev${article.path}`,
    isExternal: true,
    tags: [], // Zenn API doesn't provide tag information
    emoji: article.emoji,
    articleType: article.article_type,
    likedCount: article.liked_count,
    _raw: article,
  };
};
