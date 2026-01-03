import type { CollectionEntry } from "astro:content";

/**
 * 基本的な投稿データの共通インターフェース
 */
type BasePostData = {
  title: string;
  pubDatetime: Date;
  description: string;
  author: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
};

/**
 * ローカルの Markdown 記事を表すインターフェース
 * CollectionEntry<"blog"> を拡張して render() メソッドを含む
 */
type LocalPost = CollectionEntry<"blog"> & {
  source: "local";
};

/**
 * Zenn の記事を表すインターフェース
 */
type ZennPost = {
  source: "zenn";
  slug: string;
  data: BasePostData;
  externalUrl: string;
  likedCount: number;
};

/**
 * ローカル記事と Zenn 記事を統一的に扱うための Union 型
 */
type UnifiedPost = LocalPost | ZennPost;

export type { BasePostData, LocalPost, ZennPost, UnifiedPost };
