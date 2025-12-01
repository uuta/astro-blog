/**
 * Zenn API型定義
 * @see https://zenn-dev.github.io/zenn-docs-for-developers/basics/overview
 */

/**
 * Zennユーザー情報
 */
export interface ZennUser {
  /** ユーザーID */
  id: number;
  /** ユーザー名 */
  username: string;
  /** 表示名 */
  name: string;
  /** アバター画像URL（小） */
  avatar_small_url: string;
}

/**
 * Zenn Publication情報（企業テックブログ等）
 */
export interface ZennPublication {
  id: number;
  name: string;
  display_name: string;
  avatar_small_url: string;
  pro: boolean;
}

/**
 * Publication記事の上書き設定
 */
export interface PublicationArticleOverride {
  display_name: string;
  avatar_small_url: string;
}

/**
 * Zenn記事の完全な型定義
 */
export interface ZennArticle {
  // 基本情報
  /** 記事ID */
  id: number;
  /** 投稿タイプ（Article固定） */
  post_type: string;
  /** 記事タイトル */
  title: string;
  /** 記事スラッグ */
  slug: string;
  /** 記事パス（例: /yutti/articles/mcp-in-user-scope） */
  path: string;
  /** 絵文字アイコン */
  emoji: string;
  /** 記事タイプ（tech: 技術記事、idea: アイデア記事） */
  article_type: "tech" | "idea";

  // 日時情報
  /** 公開日時（ISO 8601形式） */
  published_at: string;
  /** 本文更新日時（ISO 8601形式） */
  body_updated_at: string;
  /** ソースリポジトリ更新日時（ISO 8601形式、nullの場合あり） */
  source_repo_updated_at: string | null;

  // 統計情報
  /** コメント数 */
  comments_count: number;
  /** いいね数 */
  liked_count: number;
  /** ブックマーク数 */
  bookmarked_count: number;
  /** 本文文字数 */
  body_letters_count: number;

  // 状態フラグ
  /** ピン留めフラグ */
  pinned: boolean;
  /** 一時的に非公開かどうか */
  is_suspending_private: boolean;

  // 著者情報
  /** プリンシパルタイプ */
  principal_type: string;
  /** ユーザー情報 */
  user: ZennUser;

  // Publication情報
  /** Publication情報（企業テックブログ等、nullの場合あり） */
  publication: ZennPublication | null;
  /** Publication記事の上書き設定（nullの場合あり） */
  publication_article_override: PublicationArticleOverride | null;
}

/**
 * Zenn API全体のレスポンス型
 */
export interface ZennApiResponse {
  /** 記事一覧 */
  articles: ZennArticle[];
  /** 次のページ番号（nullの場合あり） */
  next_page: number | null;
}

/**
 * キャッシュデータ構造
 */
export interface CacheData {
  /** キャッシュ作成時刻（ミリ秒） */
  timestamp: number;
  /** キャッシュされた記事一覧 */
  articles: ZennArticle[];
}
