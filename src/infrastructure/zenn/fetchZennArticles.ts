/**
 * Zenn API Fetcher with Timeout and Retry Strategy
 *
 * Design Principles:
 * - Graceful Degradation: Continue build even if API fails
 * - Timeout: Prevent infinite waiting (10s)
 * - Retry: Handle temporary network errors (2 retries with exponential backoff)
 */

import type { ZennApiResponse, ZennArticle } from "./types";

// === Constants ===

/** Zenn API endpoint URL */
const ZENN_API_URL =
  "https://zenn.dev/api/articles?username=yutti&order=latest";

/** Timeout duration in milliseconds (10 seconds) */
const TIMEOUT_MS = 10_000;

/** Maximum number of retries */
const MAX_RETRIES = 2;

/** Base retry delay in milliseconds (1 second) */
const RETRY_DELAY_MS = 1_000;

// === Helper Functions ===

/**
 * Fetch with timeout using AbortController
 *
 * @param url - URL to fetch
 * @param timeoutMs - Timeout duration in milliseconds
 * @returns Response object
 * @throws Error if timeout occurs or fetch fails
 */
const fetchWithTimeout = async (
  url: string,
  timeoutMs: number
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Sleep for specified milliseconds
 *
 * @param ms - Milliseconds to sleep
 */
const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// === Main Function ===

/**
 * Fetch Zenn articles with retry logic
 *
 * Error Handling (Graceful Degradation):
 * - Timeout (10s+): Retry, then return empty array
 * - HTTP 4xx/5xx: Retry, then return empty array
 * - Network error: Retry, then return empty array
 * - JSON parse error: Retry, then return empty array
 * - All retries failed: Log warning, return empty array
 *
 * @returns Array of Zenn articles (empty if all retries fail)
 */
export const fetchZennArticles = async (): Promise<ZennArticle[]> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(ZENN_API_URL, TIMEOUT_MS);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ZennApiResponse = await response.json();
      console.log(`✅ Zenn API: ${data.articles.length}件の記事を取得`);
      return data.articles;
    } catch (error) {
      lastError = error as Error;
      const isTimeout = error instanceof Error && error.name === "AbortError";
      const errorType = isTimeout ? "Timeout" : "Error";

      console.warn(
        `⚠️ Zenn API ${errorType} (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`,
        error instanceof Error ? error.message : error
      );

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt); // Exponential backoff
        console.log(`   リトライまで ${delay}ms 待機中...`);
        await sleep(delay);
      }
    }
  }

  console.error(`❌ Zenn API: 全リトライ失敗。空配列で継続します`, lastError);
  return []; // Graceful degradation
};
