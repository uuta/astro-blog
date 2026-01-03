import type { UnifiedPost } from "../types/post";

const getSortedPosts = (posts: UnifiedPost[]): UnifiedPost[] =>
  posts
    .filter(post => !post.data.draft)
    .sort(
      (a, b) =>
        b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
    );

export { getSortedPosts };
