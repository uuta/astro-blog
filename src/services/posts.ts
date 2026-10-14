import { getCollection, type CollectionEntry } from "astro:content";
import { fetchAllZennArticles, transformZennArticles } from "./zenn";
import { getExcerpt } from "../utils/getExcerpt";
import type { LocalPost, UnifiedPost } from "../types/post";

export const toLocalPost = (post: CollectionEntry<"blog">): LocalPost => ({
  ...post,
  source: "local",
  data: { ...post.data, description: getExcerpt(post.body) },
});

export const getAllPosts = async (): Promise<UnifiedPost[]> => {
  const localPosts = await getCollection("blog");
  const localUnifiedPosts: UnifiedPost[] = localPosts.map(toLocalPost);

  const zennArticles = await fetchAllZennArticles();
  const zennPosts = transformZennArticles(zennArticles);

  return [...localUnifiedPosts, ...zennPosts];
};
