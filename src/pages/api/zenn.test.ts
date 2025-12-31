import { describe, it, expect, vi, beforeEach } from "vitest";
import { getZennArticles } from "./zenn";

vi.mock("@/lib/apiClient", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

import { apiClient } from "@/lib/apiClient";

const mockResponseData = {
  articles: [
    {
      id: 1,
      post_type: "Article" as const,
      title: "Test Article",
      slug: "test-article",
      published: true,
      comments_count: 0,
      liked_count: 10,
      body_letters_count: 1000,
      article_type: "tech" as const,
      emoji: "🚀",
      is_suspending_private: false,
      published_at: "2024-01-01T00:00:00Z",
      body_updated_at: "2024-01-01T00:00:00Z",
      source_repo_updated_at: "2024-01-01T00:00:00Z",
      path: "/username/articles/test-article",
      user: {
        id: 1,
        username: "testuser",
        name: "Test User",
        avatar_small_url: "https://example.com/avatar.png",
      },
      publication: null,
    },
  ],
  next_page: null,
};

describe("getZennArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      data: mockResponseData,
    });
  });

  it("calls apiClient.get with correct endpoint", async () => {
    await getZennArticles({});

    expect(apiClient.get).toHaveBeenCalledWith(
      "https://zenn.dev/api/articles",
      expect.any(Object)
    );
  });

  it("passes searchParams correctly", async () => {
    await getZennArticles({ username: "testuser", order: "latest", page: 1 });

    expect(apiClient.get).toHaveBeenCalledWith("https://zenn.dev/api/articles", {
      searchParams: { username: "testuser", order: "latest", page: 1 },
    });
  });

  it("returns success result with data", async () => {
    const result = await getZennArticles({});

    expect(result).toEqual({ success: true, data: mockResponseData });
  });

  it("returns error result on API failure", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: false,
      error: { status: 403, message: "Forbidden" },
    });

    const result = await getZennArticles({});

    expect(result).toEqual({
      success: false,
      error: { status: 403, message: "Forbidden" },
    });
  });
});
