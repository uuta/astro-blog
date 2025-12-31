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

type Article = {
  id: number;
  post_type: "Article";
  title: string;
  slug: string;
  published: boolean;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string;
  path: string;
  user: User;
  publication: Publication | null;
};

type ResponseParam = {
  articles: Article[];
  next_page: number | null;
};

const ENDPOINT = "https://zenn.dev/api/articles";

export const getZennArticles = async (
  params: RequestParam
): Promise<ResponseParam> => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString();

  const res = await fetch(`${ENDPOINT}?${query}`);
  return res.json();
};
