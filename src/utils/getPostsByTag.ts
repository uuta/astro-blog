import { slugifyAll } from "./slugify";
import type { CollectionEntry } from "astro:content";

export const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  posts.filter(post => slugifyAll(post.data.tags).includes(tag));
