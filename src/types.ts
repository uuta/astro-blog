export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "Github"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Mail"
  | "Twitter"
  | "Twitch"
  | "YouTube"
  | "WhatsApp"
  | "Snapchat"
  | "Pinterest"
  | "TikTok"
  | "CodePen"
  | "Discord"
  | "GitLab"
  | "Reddit"
  | "Skype"
  | "Steam"
  | "Telegram"
  | "Mastodon"
  | "Zenn";

/**
 * ========================================
 * 統合記事型定義
 * ========================================
 */

import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "@/infrastructure/zenn/types";

/**
 * 記事ソース識別子
 */
export type ArticleSource = "blog" | "zenn";

/**
 * 統合記事の共通フィールド
 */
export interface UnifiedArticleCommon {
  /** 一意識別子（例: "blog:2025-11-21/my-post", "zenn:mcp-in-user-scope"） */
  id: string;
  /** 記事ソース */
  source: ArticleSource;
  /** 記事タイトル */
  title: string;
  /** 記事説明文 */
  description: string;
  /** 公開日時（正規化済み） */
  pubDatetime: Date;
  /** ソート用タイムスタンプ（キャッシュ済み） */
  timestamp: number;
  /** リンクURL（内部: /posts/..., 外部: https://zenn.dev/...） */
  href: string;
  /** 外部リンクかどうか */
  isExternal: boolean;
  /** タグ一覧 */
  tags: string[];
}

/**
 * 既存ブログ記事
 */
export interface BlogArticle extends UnifiedArticleCommon {
  /** 記事ソース（リテラル型） */
  source: "blog";
  /** 外部リンクフラグ（リテラル型） */
  isExternal: false;
  /** 元データへの参照 */
  _raw: CollectionEntry<"blog">;
}

/**
 * Zenn記事（統合型）
 */
export interface ZennArticleUnified extends UnifiedArticleCommon {
  /** 記事ソース（リテラル型） */
  source: "zenn";
  /** 外部リンクフラグ（リテラル型） */
  isExternal: true;
  /** Zenn固有: 絵文字アイコン */
  emoji: string;
  /** Zenn固有: 記事タイプ（tech: 技術記事、idea: アイデア記事） */
  articleType: "tech" | "idea";
  /** Zenn固有: いいね数 */
  likedCount: number;
  /** 元データへの参照 */
  _raw: ZennArticle;
}

/**
 * 統合記事型（Discriminated Union）
 */
export type UnifiedArticle = BlogArticle | ZennArticleUnified;

/**
 * 型ガード: 既存ブログ記事かどうかを判定
 * @param article 統合記事
 * @returns 既存ブログ記事の場合true
 */
export const isBlogArticle = (
  article: UnifiedArticle
): article is BlogArticle => {
  return article.source === "blog";
};

/**
 * 型ガード: Zenn記事かどうかを判定
 * @param article 統合記事
 * @returns Zenn記事の場合true
 */
export const isZennArticle = (
  article: UnifiedArticle
): article is ZennArticleUnified => {
  return article.source === "zenn";
};
