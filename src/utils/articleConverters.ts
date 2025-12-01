import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "@/infrastructure/zenn/types";
import type { BlogArticle, ZennArticleUnified } from "@/types";
import {
  getArticleDate,
  getZennArticleDate,
  getNormalizedTimestamp,
} from "./dateUtils";
import slugify from "./slugify";

/**
 * 既存ブログ記事を統合型に変換する
 *
 * 日付が取得できない場合はnullを返します（変換失敗）。
 * この記事は一覧から除外されます。
 *
 * @param post 既存ブログ記事
 * @returns 統合型の記事。変換失敗時はnull
 */
export const toBlogArticle = (
  post: CollectionEntry<"blog">
): BlogArticle | null => {
  // 日付取得
  const pubDatetime = getArticleDate(post);
  if (!pubDatetime) {
    return null; // 変換失敗
  }

  // タイムスタンプ生成
  const timestamp = getNormalizedTimestamp(pubDatetime);

  // BlogArticleオブジェクトを構築
  return {
    id: `blog:${post.slug}`,
    source: "blog",
    title: post.data.title,
    description: post.data.description,
    pubDatetime,
    timestamp,
    href: `/posts/${slugify(post.slug)}`,
    isExternal: false,
    tags: post.data.tags,
    _raw: post,
  };
};

/**
 * Zenn記事を統合型に変換する
 *
 * @param article Zenn記事
 * @returns 統合型の記事
 */
export const toZennArticle = (article: ZennArticle): ZennArticleUnified => {
  // 日付取得
  const pubDatetime = getZennArticleDate(article);

  // タイムスタンプ生成
  const timestamp = getNormalizedTimestamp(pubDatetime);

  // ZennArticleUnifiedオブジェクトを構築
  return {
    id: `zenn:${article.slug}`,
    source: "zenn",
    title: article.title,
    description: "", // Zenn APIには説明文なし
    pubDatetime,
    timestamp,
    href: `https://zenn.dev${article.path}`,
    isExternal: true,
    tags: [], // Zenn APIにはタグ情報なし
    emoji: article.emoji,
    articleType: article.article_type,
    likedCount: article.liked_count,
    _raw: article,
  };
};
