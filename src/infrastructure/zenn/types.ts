/**
 * Zenn API Response and Article Types
 *
 * Based on Zenn API specification:
 * https://zenn-dev.github.io/zenn-docs-for-developers/basics/overview
 */

/**
 * Zenn User Type
 */
export interface ZennUser {
  /** User ID */
  id: number;
  /** Username (e.g., "yutti") */
  username: string;
  /** Display name (e.g., "uuta") */
  name: string;
  /** Avatar image URL (70px) */
  avatar_small_url: string;
}

/**
 * Zenn Publication Type (for company tech blogs, etc.)
 */
export interface ZennPublication {
  /** Publication ID */
  id: number;
  /** Name (e.g., "socialdog") */
  name: string;
  /** Display name (e.g., "SocialDog TechBlog") */
  display_name: string;
  /** Avatar image URL (80px) */
  avatar_small_url: string;
  /** Avatar image URL (full size) */
  avatar_url: string;
  /** Pro plan flag */
  pro: boolean;
  /** Avatar registered flag */
  avatar_registered: boolean;
}

/**
 * Zenn Article Type
 */
export interface ZennArticle {
  // === Basic Info ===
  /** Article ID */
  id: number;
  /** Post type (always "Article") */
  post_type: "Article";
  /** Article title */
  title: string;
  /** URL slug (e.g., "mcp-in-user-scope") */
  slug: string;
  /** Article path (e.g., "/yutti/articles/mcp-in-user-scope") */
  path: string;
  /** Emoji icon (e.g., "🪷") */
  emoji: string;
  /** Article category */
  article_type: "tech" | "idea";

  // === Datetime Info ===
  /** Published datetime (ISO 8601 format) */
  published_at: string;
  /** Body updated datetime (ISO 8601 format) */
  body_updated_at: string;
  /** Source repository updated datetime */
  source_repo_updated_at: string | null;

  // === Statistics ===
  /** Number of comments */
  comments_count: number;
  /** Number of likes */
  liked_count: number;
  /** Number of bookmarks */
  bookmarked_count: number;
  /** Number of body letters */
  body_letters_count: number;

  // === Status Flags ===
  /** Pinned flag */
  pinned: boolean;
  /** Private suspension flag */
  is_suspending_private: boolean;

  // === Author Info ===
  /** Principal type */
  principal_type: "User" | "Publication";
  /** User information */
  user: ZennUser;

  // === Publication Info (if belongs to one) ===
  /** Publication information */
  publication: ZennPublication | null;
  /** Publication article override */
  publication_article_override: unknown | null;
}

/**
 * Zenn API Response Type
 */
export interface ZennApiResponse {
  /** Articles array */
  articles: ZennArticle[];
  /** Next page number (for pagination) */
  next_page: number | null;
}
