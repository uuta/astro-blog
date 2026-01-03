import { describe, it, expect } from "vitest";
import { getSortedPosts } from "./getSortedPosts";
import type { UnifiedPost, ZennPost } from "../types/post";

// Helper to create mock ZennPost (simpler than LocalPost for testing)
const createMockPost = (overrides: {
  slug?: string;
  pubDatetime?: Date;
  draft?: boolean;
  source?: "local" | "zenn";
}): UnifiedPost => {
  const base: ZennPost = {
    source: "zenn",
    slug: overrides.slug ?? "test-post",
    data: {
      title: "Test Post",
      pubDatetime: overrides.pubDatetime ?? new Date("2024-01-15"),
      description: "Test description",
      author: "testuser",
      tags: ["test"],
      featured: false,
      draft: overrides.draft ?? false,
    },
    externalUrl: "https://zenn.dev/test",
    likedCount: 0,
  };

  if (overrides.source === "local") {
    return {
      ...base,
      source: "local",
      id: overrides.slug ?? "test-post",
      collection: "blog",
    } as UnifiedPost;
  }

  return base;
};

describe("getSortedPosts", () => {
  it("filters out draft posts", () => {
    const posts: UnifiedPost[] = [
      createMockPost({ slug: "published", draft: false }),
      createMockPost({ slug: "draft", draft: true }),
    ];

    const result = getSortedPosts(posts);

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("published");
  });

  it("sorts by pubDatetime descending (newest first)", () => {
    const posts: UnifiedPost[] = [
      createMockPost({ slug: "old", pubDatetime: new Date("2024-01-01") }),
      createMockPost({ slug: "newest", pubDatetime: new Date("2024-01-15") }),
      createMockPost({ slug: "middle", pubDatetime: new Date("2024-01-10") }),
    ];

    const result = getSortedPosts(posts);

    expect(result[0].slug).toBe("newest");
    expect(result[1].slug).toBe("middle");
    expect(result[2].slug).toBe("old");
  });

  it("handles mix of local and Zenn posts", () => {
    const posts: UnifiedPost[] = [
      createMockPost({
        slug: "local-old",
        pubDatetime: new Date("2024-01-01"),
        source: "local",
      }),
      createMockPost({
        slug: "zenn-new",
        pubDatetime: new Date("2024-01-15"),
        source: "zenn",
      }),
    ];

    const result = getSortedPosts(posts);

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe("zenn-new");
    expect(result[1].slug).toBe("local-old");
  });

  it("returns empty array for empty input", () => {
    const result = getSortedPosts([]);

    expect(result).toEqual([]);
  });

  it("returns empty array when all posts are drafts", () => {
    const posts: UnifiedPost[] = [
      createMockPost({ slug: "draft1", draft: true }),
      createMockPost({ slug: "draft2", draft: true }),
    ];

    const result = getSortedPosts(posts);

    expect(result).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original: UnifiedPost[] = [
      createMockPost({ slug: "b", pubDatetime: new Date("2024-01-01") }),
      createMockPost({ slug: "a", pubDatetime: new Date("2024-01-15") }),
    ];
    const originalOrder = original.map(p => p.slug);

    getSortedPosts(original);

    expect(original.map(p => p.slug)).toEqual(originalOrder);
  });
});
