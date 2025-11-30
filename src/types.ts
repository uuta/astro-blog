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

// === Unified Article Types ===

import type { CollectionEntry } from "astro:content";
import type { ZennArticle } from "./infrastructure/zenn/types";

/**
 * Article source identifier
 */
export type ArticleSource = "blog" | "zenn";

/**
 * Common fields for unified articles (directly usable in components)
 */
export interface UnifiedArticleCommon {
  /** Unique identifier (source + original ID for uniqueness) */
  id: string; // e.g., "blog:2025-11-21/my-post" or "zenn:mcp-in-user-scope"

  /** Article source */
  source: ArticleSource;

  /** Article title */
  title: string;

  /** Article description */
  description: string;

  /** Publication datetime (normalized) */
  pubDatetime: Date;

  /** Sort timestamp (cached) */
  timestamp: number;

  /** Link URL */
  href: string; // Internal: "/posts/2025-11-21/my-post", External: "https://zenn.dev/yutti/articles/xxx"

  /** Whether this is an external link */
  isExternal: boolean;

  /** Tags list */
  tags: string[];
}

/**
 * Blog article (existing blog posts)
 */
export interface BlogArticle extends UnifiedArticleCommon {
  source: "blog";
  isExternal: false;
  /** Reference to raw data (use only when needed) */
  _raw: CollectionEntry<"blog">;
}

/**
 * Zenn article
 */
export interface ZennArticleUnified extends UnifiedArticleCommon {
  source: "zenn";
  isExternal: true;
  /** Zenn-specific: emoji icon */
  emoji: string;
  /** Zenn-specific: article type */
  articleType: "tech" | "idea";
  /** Zenn-specific: like count */
  likedCount: number;
  /** Reference to raw data (use only when needed) */
  _raw: ZennArticle;
}

/**
 * Unified article type (Discriminated Union)
 */
export type UnifiedArticle = BlogArticle | ZennArticleUnified;

/**
 * Type guard for BlogArticle
 */
export const isBlogArticle = (
  article: UnifiedArticle
): article is BlogArticle => article.source === "blog";

/**
 * Type guard for ZennArticleUnified
 */
export const isZennArticle = (
  article: UnifiedArticle
): article is ZennArticleUnified => article.source === "zenn";
