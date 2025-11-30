/**
 * Date Utilities for Unified Articles
 *
 * Handles safe date extraction and normalization across different sources:
 * - Existing blog: pubDatetime field or slug-based extraction
 * - Zenn articles: published_at field (ISO 8601)
 */

import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "../infrastructure/zenn/types";

/**
 * Regular expression for extracting YYYY-MM-DD from slug
 */
const DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})/;

/**
 * Get article date from blog post
 *
 * Priority:
 * 1. frontmatter.pubDatetime (most reliable)
 * 2. Extract from slug (fallback)
 * 3. null (failure)
 *
 * @param post - Blog post from Content Collection
 * @returns Date object or null if extraction fails
 */
export const getArticleDate = (post: CollectionEntry<"blog">): Date | null => {
  // 1. Prefer frontmatter pubDatetime (most reliable)
  if (
    post.data.pubDatetime instanceof Date &&
    !isNaN(post.data.pubDatetime.getTime())
  ) {
    return post.data.pubDatetime;
  }

  // 2. Extract from slug (fallback)
  const dateMatch = post.slug.match(DATE_PATTERN);
  if (dateMatch) {
    const date = new Date(dateMatch[1]);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // 3. Date extraction failed
  console.warn(`⚠️ 日付取得失敗: ${post.slug}`);
  return null;
};

/**
 * Get article date from Zenn article
 *
 * @param article - Zenn article
 * @returns Date object
 */
export const getZennArticleDate = (article: ZennArticle): Date => {
  return new Date(article.published_at);
};

/**
 * Normalize date to UTC midnight and return timestamp
 *
 * This ensures fair comparison between:
 * - Blog posts (date only, e.g., "2025-11-21")
 * - Zenn articles (datetime with timezone, e.g., "2025-07-20T15:37:51.576+09:00")
 *
 * By normalizing to UTC midnight (00:00:00), we compare only dates, not times.
 *
 * @param date - Date object to normalize
 * @returns Timestamp (milliseconds since epoch) at UTC midnight
 */
export const getNormalizedTimestamp = (date: Date): number => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};
