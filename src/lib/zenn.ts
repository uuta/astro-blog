import { apiClient, type ApiResult } from "@lib/apiClient";

type RequestParam = {
  username?: string;
  order?: "latest" | "daily" | "weekly" | "monthly" | "all_time";
  page?: number;
};

type User = {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
};

type Publication = {
  id: number;
  name: string;
  avatar_small_url: string;
  display_name: string;
  beta_stats: boolean;
  avatar_registered: boolean;
};

export type Article = {
  id: number;
  post_type: "Article";
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  bookmarked_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string | null;
  pinned: boolean;
  path: string;
  principal_type: "User" | "Publication";
  user: User;
  publication: Publication | null;
};

type ResponseParam = {
  articles: Article[];
  next_page: number | null;
};

const ENDPOINT = "https://zenn.dev/api/articles";

/**
 * Fetch articles from Zenn API.
 */
export const getZennArticles = async (
  searchParams: RequestParam
): Promise<ApiResult<ResponseParam>> => {
  return apiClient.get<ResponseParam>(ENDPOINT, { searchParams });
};
