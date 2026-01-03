import type { ImageMetadata } from "astro";

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
 */
type LocalPost = {
  source: "local";
  slug: string;
  data: BasePostData & {
    postSlug?: string;
    ogImage?: string | ImageMetadata;
    canonicalURL?: string;
  };
  body: string;
  collection: "blog";
};

/**
 * Zenn の記事を表すインターフェース
 */
type ZennPost = {
  source: "zenn";
  slug: string;
  data: BasePostData;
  externalUrl: string;
  emoji: string;
};

/**
 * ローカル記事と Zenn 記事を統一的に扱うための Union 型
 */
type UnifiedPost = LocalPost | ZennPost;

export type { BasePostData, LocalPost, ZennPost, UnifiedPost };
