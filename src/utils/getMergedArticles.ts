import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "@/infrastructure/zenn/types";
import type { UnifiedArticle } from "@/types";
import { isBlogArticle } from "@/types";
import { toBlogArticle, toZennArticle } from "./articleConverters";

/**
 * 既存ブログ記事とZenn記事を統合してソートする
 *
 * 処理フロー:
 * 1. 既存ブログ記事をBlogArticleに変換（日付取得失敗時はnullを除外）
 * 2. Zenn記事をZennArticleUnifiedに変換
 * 3. 両配列を結合
 * 4. draft記事を除外（既存ブログのみ）
 * 5. タイムスタンプ降順でソート
 *
 * パフォーマンス最適化:
 * - 日付変換は1回のみ（timestampフィールドにキャッシュ）
 * - ソートは数値比較のみ（高速）
 *
 * @param blogPosts 既存ブログ記事一覧
 * @param zennArticles Zenn記事一覧
 * @returns 統合・ソート済み記事一覧（日付降順）
 */
export const getMergedArticles = (
  blogPosts: CollectionEntry<"blog">[],
  zennArticles: ZennArticle[]
): UnifiedArticle[] => {
  // 1. 既存ブログ記事を変換（nullを除外）
  const blogArticles = blogPosts
    .map(toBlogArticle)
    .filter(
      (article): article is NonNullable<typeof article> => article !== null
    );

  // 2. Zenn記事を変換
  const zennArticlesUnified = zennArticles.map(toZennArticle);

  // 3. 両配列を結合
  const mergedArticles = [...blogArticles, ...zennArticlesUnified];

  // 4. draft記事を除外（既存ブログのみ）
  const filteredArticles = mergedArticles.filter(article =>
    isBlogArticle(article) ? !article._raw.data.draft : true
  );

  // 5. タイムスタンプ降順でソート（最新が上）
  const sortedArticles = filteredArticles.sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return sortedArticles;
};
