import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "@/infrastructure/zenn/types";

/**
 * 日付パターン（YYYY-MM-DD形式）
 */
const DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})/;

/**
 * 既存ブログ記事から日付を取得する
 *
 * 優先順位:
 * 1. post.data.pubDatetime（最も信頼性が高い）
 * 2. slugから日付を抽出（フォールバック）
 * 3. どちらも失敗した場合はnullを返す
 *
 * @param post 既存ブログ記事
 * @returns 公開日時（Date）、取得失敗時はnull
 */
export const getArticleDate = (post: CollectionEntry<"blog">): Date | null => {
  // 優先順位1: pubDatetimeフィールドがある場合
  if (post.data.pubDatetime instanceof Date) {
    return post.data.pubDatetime;
  }

  // 優先順位2: slugから日付を抽出
  const match = post.slug.match(DATE_PATTERN);
  if (match) {
    const dateStr = match[1]; // YYYY-MM-DD部分
    const date = new Date(dateStr);

    // 日付の妥当性を検証
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // 取得失敗
  console.warn(`⚠️ 日付取得失敗: ${post.slug}`);
  return null;
};

/**
 * Zenn記事から日付を取得する
 *
 * published_at（ISO 8601形式）から日付を生成します。
 * Zenn APIのpublished_atは常に有効な日付文字列なので、
 * エラーハンドリングは不要です。
 *
 * @param article Zenn記事
 * @returns 公開日時（Date）
 */
export const getZennArticleDate = (article: ZennArticle): Date => {
  return new Date(article.published_at);
};

/**
 * 日付を正規化したタイムスタンプに変換する
 *
 * 時刻部分（時:分:秒）を00:00:00に正規化し、UTCタイムスタンプを返します。
 * これにより、既存ブログ（日付のみ）とZenn記事（日時込み）を
 * 公平に比較できるようになります。
 *
 * @param date 日付オブジェクト
 * @returns 正規化されたタイムスタンプ（ミリ秒）
 */
export const getNormalizedTimestamp = (date: Date): number => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};
