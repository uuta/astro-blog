import { getCollection } from "astro:content";
import { fetchAllZennArticles, transformZennArticles } from "./zenn";
import type { UnifiedPost } from "../types/post";

export const getAllPosts = async (): Promise<UnifiedPost[]> => {
  const localPosts = await getCollection("blog");
  const localUnifiedPosts: UnifiedPost[] = localPosts.map(post => ({
    ...post,
    source: "local",
  }));

  const zennArticles = await fetchAllZennArticles();
  const zennPosts = transformZennArticles(zennArticles);

  return [...localUnifiedPosts, ...zennPosts];
};
