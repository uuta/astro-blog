import { slugifyStr } from "./slugify";
import type { UnifiedPost } from "../types/post";

const getUniqueTags = (posts: UnifiedPost[]): string[] => {
  const filteredPosts = posts.filter(post => !post.data.draft);
  const tags: string[] = filteredPosts
    .flatMap(post => post.data.tags)
    .map(tag => slugifyStr(tag))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((tagA: string, tagB: string) => tagA.localeCompare(tagB));
  return tags;
};

export { getUniqueTags };
