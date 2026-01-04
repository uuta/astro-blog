import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ZennPost } from "../types/post";

// Mock dependencies before imports
vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
}));

vi.mock("./zenn", () => ({
  fetchAllZennArticles: vi.fn(),
  transformZennArticles: vi.fn(),
}));

import { getCollection } from "astro:content";
import { fetchAllZennArticles, transformZennArticles } from "./zenn";
import { getAllPosts } from "./posts";

// Mock local post (mimics CollectionEntry<"blog">)
const createMockLocalPost = (slug: string) => ({
  id: slug,
  slug,
  collection: "blog" as const,
  data: {
    title: `Local Post: ${slug}`,
    pubDatetime: new Date("2024-01-10"),
    description: "A local post",
    author: "localauthor",
    tags: ["typescript", "astro"],
    featured: false,
    draft: false,
  },
});

// Mock Zenn post
const createMockZennPost = (slug: string): ZennPost => ({
  source: "zenn",
  slug,
  data: {
    title: `Zenn Post: ${slug}`,
    pubDatetime: new Date("2024-01-12"),
    description: "A Zenn post",
    author: "zennuser",
    tags: ["zenn"],
    featured: false,
    draft: false,
  },
  externalUrl: `https://zenn.dev/user/articles/${slug}`,
  likedCount: 10,
});

describe("getAllPosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns combined local and Zenn posts", async () => {
    const localPosts = [createMockLocalPost("local-1")];
    const zennPosts = [createMockZennPost("zenn-1")];

    vi.mocked(getCollection).mockResolvedValue(localPosts);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue(zennPosts);

    const result = await getAllPosts();

    expect(result).toHaveLength(2);
    expect(result.some(p => p.source === "local")).toBe(true);
    expect(result.some(p => p.source === "zenn")).toBe(true);
  });

  it("adds source: 'local' to local posts", async () => {
    const localPosts = [createMockLocalPost("local-1")];

    vi.mocked(getCollection).mockResolvedValue(localPosts);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue([]);

    const result = await getAllPosts();

    expect(result).toHaveLength(1);
    expect(result[0].source).toBe("local");
  });

  it("returns only local posts when Zenn returns empty", async () => {
    const localPosts = [
      createMockLocalPost("local-1"),
      createMockLocalPost("local-2"),
    ];

    vi.mocked(getCollection).mockResolvedValue(localPosts);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue([]);

    const result = await getAllPosts();

    expect(result).toHaveLength(2);
    expect(result.every(p => p.source === "local")).toBe(true);
  });

  it("returns only Zenn posts when no local posts", async () => {
    const zennPosts = [
      createMockZennPost("zenn-1"),
      createMockZennPost("zenn-2"),
    ];

    vi.mocked(getCollection).mockResolvedValue([]);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue(zennPosts);

    const result = await getAllPosts();

    expect(result).toHaveLength(2);
    expect(result.every(p => p.source === "zenn")).toBe(true);
  });

  it("returns empty array when both sources empty", async () => {
    vi.mocked(getCollection).mockResolvedValue([]);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue([]);

    const result = await getAllPosts();

    expect(result).toEqual([]);
  });

  it("local posts appear first, then Zenn posts", async () => {
    const localPosts = [createMockLocalPost("local-1")];
    const zennPosts = [createMockZennPost("zenn-1")];

    vi.mocked(getCollection).mockResolvedValue(localPosts);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue(zennPosts);

    const result = await getAllPosts();

    expect(result[0].source).toBe("local");
    expect(result[1].source).toBe("zenn");
  });

  it("calls getCollection with 'blog'", async () => {
    vi.mocked(getCollection).mockResolvedValue([]);
    vi.mocked(fetchAllZennArticles).mockResolvedValue([]);
    vi.mocked(transformZennArticles).mockReturnValue([]);

    await getAllPosts();

    expect(getCollection).toHaveBeenCalledWith("blog");
  });

  it("passes fetched articles to transformZennArticles", async () => {
    const mockArticles = [{ id: 1, title: "Test" }];

    vi.mocked(getCollection).mockResolvedValue([]);
    vi.mocked(fetchAllZennArticles).mockResolvedValue(mockArticles as any);
    vi.mocked(transformZennArticles).mockReturnValue([]);

    await getAllPosts();

    expect(transformZennArticles).toHaveBeenCalledWith(mockArticles);
  });
});
