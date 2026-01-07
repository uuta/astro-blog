import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Article } from "@lib/zenn";

// Mock dependencies before imports
vi.mock("@lib/zenn", () => ({
  getZennArticles: vi.fn(),
}));

vi.mock("@config", () => ({
  SITE: {
    zennUsername: "testuser",
  },
}));

import { getZennArticles } from "@lib/zenn";
import {
  transformZennArticle,
  transformZennArticles,
  fetchAllZennArticles,
} from "./zenn";

// Mock article data
const createMockArticle = (overrides: Partial<Article> = {}): Article => ({
  id: 1,
  post_type: "Article",
  title: "Test Article",
  slug: "test-article",
  comments_count: 5,
  liked_count: 42,
  bookmarked_count: 10,
  body_letters_count: 1000,
  article_type: "tech",
  emoji: "🚀",
  is_suspending_private: false,
  published_at: "2024-01-15T10:30:00Z",
  body_updated_at: "2024-01-15T10:30:00Z",
  source_repo_updated_at: null,
  pinned: false,
  path: "/testuser/articles/test-article",
  principal_type: "User",
  user: {
    id: 1,
    username: "testuser",
    name: "Test User",
    avatar_small_url: "https://example.com/avatar.png",
  },
  publication: null,
  ...overrides,
});

describe("transformZennArticle", () => {
  it("transforms Zenn article to ZennPost format correctly", () => {
    const article = createMockArticle();

    const result = transformZennArticle(article);

    expect(result.source).toBe("zenn");
    expect(result.slug).toBe("test-article");
    expect(result.data.title).toBe("Test Article");
    expect(result.data.author).toBe("testuser");
    expect(result.likedCount).toBe(42);
  });

  it("sets source to 'zenn'", () => {
    const article = createMockArticle();

    const result = transformZennArticle(article);

    expect(result.source).toBe("zenn");
  });

  it("converts published_at string to Date object", () => {
    const article = createMockArticle({
      published_at: "2024-01-15T10:30:00Z",
    });

    const result = transformZennArticle(article);

    expect(result.data.pubDatetime).toBeInstanceOf(Date);
    expect(result.data.pubDatetime).toEqual(new Date("2024-01-15T10:30:00Z"));
  });

  it("generates correct externalUrl", () => {
    const article = createMockArticle({
      path: "/myuser/articles/my-article",
    });

    const result = transformZennArticle(article);

    expect(result.externalUrl).toBe(
      "https://zenn.dev/myuser/articles/my-article"
    );
  });

  it("sets tags to ['zenn']", () => {
    const article = createMockArticle();

    const result = transformZennArticle(article);

    expect(result.data.tags).toEqual(["zenn"]);
  });

  it("sets featured to false", () => {
    const article = createMockArticle();

    const result = transformZennArticle(article);

    expect(result.data.featured).toBe(false);
  });

  it("sets draft to false", () => {
    const article = createMockArticle();

    const result = transformZennArticle(article);

    expect(result.data.draft).toBe(false);
  });

  it("uses article.title as description", () => {
    const article = createMockArticle({ title: "My Article Title" });

    const result = transformZennArticle(article);

    expect(result.data.description).toBe("My Article Title");
  });

  it("maps liked_count to likedCount", () => {
    const article = createMockArticle({ liked_count: 123 });

    const result = transformZennArticle(article);

    expect(result.likedCount).toBe(123);
  });
});

describe("transformZennArticles", () => {
  it("transforms multiple articles", () => {
    const articles = [
      createMockArticle({ slug: "article-1" }),
      createMockArticle({ slug: "article-2" }),
      createMockArticle({ slug: "article-3" }),
    ];

    const result = transformZennArticles(articles);

    expect(result).toHaveLength(3);
    expect(result[0].slug).toBe("article-1");
    expect(result[1].slug).toBe("article-2");
    expect(result[2].slug).toBe("article-3");
  });

  it("returns empty array for empty input", () => {
    const result = transformZennArticles([]);

    expect(result).toEqual([]);
  });
});

describe("fetchAllZennArticles", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it("fetches articles with correct parameters", async () => {
    vi.mocked(getZennArticles).mockResolvedValue({
      success: true,
      data: {
        articles: [createMockArticle()],
        next_page: null,
      },
    });

    await fetchAllZennArticles();

    expect(getZennArticles).toHaveBeenCalledWith({
      username: "testuser",
      order: "latest",
      page: 1,
    });
  });

  it("handles single page response (next_page: null)", async () => {
    vi.mocked(getZennArticles).mockResolvedValue({
      success: true,
      data: {
        articles: [createMockArticle()],
        next_page: null,
      },
    });

    const result = await fetchAllZennArticles();

    expect(getZennArticles).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
  });

  it("handles pagination (multiple pages)", async () => {
    vi.mocked(getZennArticles)
      .mockResolvedValueOnce({
        success: true,
        data: {
          articles: [createMockArticle({ slug: "page1-article" })],
          next_page: 2,
        },
      })
      .mockResolvedValueOnce({
        success: true,
        data: {
          articles: [createMockArticle({ slug: "page2-article" })],
          next_page: null,
        },
      });

    const result = await fetchAllZennArticles();

    expect(getZennArticles).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe("page1-article");
    expect(result[1].slug).toBe("page2-article");
  });

  it("returns empty array on API error", async () => {
    vi.mocked(getZennArticles).mockResolvedValue({
      success: false,
      error: { status: 500, message: "Internal Server Error" },
    });

    const result = await fetchAllZennArticles();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("handles unexpected errors gracefully", async () => {
    vi.mocked(getZennArticles).mockRejectedValue(new Error("Network error"));

    const result = await fetchAllZennArticles();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Unexpected error fetching Zenn articles:",
      expect.any(Error)
    );
  });

  it("logs success message with article count", async () => {
    vi.mocked(getZennArticles).mockResolvedValue({
      success: true,
      data: {
        articles: [createMockArticle(), createMockArticle()],
        next_page: null,
      },
    });

    await fetchAllZennArticles();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Successfully fetched 2 Zenn articles"
    );
  });
});

describe("fetchAllZennArticles without username config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the module to apply new mock
    vi.resetModules();
  });

  it("returns empty array when zennUsername not configured", async () => {
    // Re-mock with empty username
    vi.doMock("@config", () => ({
      SITE: {
        zennUsername: "",
      },
    }));

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    // Re-import with new mock
    const { fetchAllZennArticles: fetchWithoutUsername } =
      await import("./zenn");

    const result = await fetchWithoutUsername();

    expect(result).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalledWith("Zenn username not configured");

    consoleWarnSpy.mockRestore();
  });
});
