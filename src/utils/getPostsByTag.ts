import { slugifyAll } from "./slugify";
import type { UnifiedPost } from "../types/post";

const getPostsByTag = (posts: UnifiedPost[], tag: string): UnifiedPost[] =>
  posts.filter(post => slugifyAll(post.data.tags).includes(tag));

export { getPostsByTag };
