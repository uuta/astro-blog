import { promises as fs } from "node:fs";
import path from "node:path";
import type { ZennApiResponse, ZennArticle, CacheData } from "./types";

/**
 * 定数定義
 */
const ZENN_USERNAME = "yutti";
const ZENN_API_URL = `https://zenn.dev/api/articles?username=${ZENN_USERNAME}&order=latest`;
const TIMEOUT_MS = 10000; // 10秒
const MAX_RETRIES = 2; // リトライ2回
const RETRY_DELAY_MS = 1000; // 初回リトライまでの待機時間（1秒）
const CACHE_DIR = ".cache";
const CACHE_FILE = path.join(CACHE_DIR, "zenn-articles.json");
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24時間

/**
 * 指定ミリ秒待機する
 * @param ms 待機時間（ミリ秒）
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * タイムアウト付きfetch
 * @param url リクエストURL
 * @param timeoutMs タイムアウト時間（ミリ秒）
 * @returns Responseオブジェクト
 * @throws タイムアウトまたはネットワークエラー
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
 * キャッシュディレクトリを作成する
 */
const ensureCacheDir = async (): Promise<void> => {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    // ディレクトリが既に存在する場合はエラーを無視
  }
};

/**
 * キャッシュファイルから記事を読み込む
 * @returns キャッシュされた記事一覧。読み込み失敗時はnull
 */
const loadCachedArticles = async (): Promise<ZennArticle[] | null> => {
  try {
    const cacheContent = await fs.readFile(CACHE_FILE, "utf-8");
    const cacheData: CacheData = JSON.parse(cacheContent);

    // キャッシュの有効期限をチェック
    const now = Date.now();
    const age = now - cacheData.timestamp;

    if (age > CACHE_MAX_AGE_MS) {
      console.warn(
        `⚠️ キャッシュが古すぎます（${Math.floor(
          age / (60 * 60 * 1000)
        )}時間経過、24時間超過）`
      );
      return null;
    }

    console.log(
      `📦 キャッシュから${cacheData.articles.length}件の記事を読み込みました`
    );
    return cacheData.articles;
  } catch (error) {
    // キャッシュファイルが存在しない、または読み込みエラー
    return null;
  }
};

/**
 * 記事をキャッシュファイルに保存する
 * @param articles キャッシュする記事一覧
 */
const saveCacheArticles = async (articles: ZennArticle[]): Promise<void> => {
  try {
    await ensureCacheDir();

    const cacheData: CacheData = {
      timestamp: Date.now(),
      articles,
    };

    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2), "utf-8");
    console.log(`✅ キャッシュに${articles.length}件の記事を保存しました`);
  } catch (error) {
    console.warn("⚠️ キャッシュ保存に失敗しました:", error);
  }
};

/**
 * Zenn APIから記事を取得する
 *
 * タイムアウトとリトライ機能を備え、API失敗時はGraceful Degradationにより
 * 空配列を返してビルドを継続します。
 *
 * @returns Zenn記事の配列。取得失敗時は空配列を返す（Graceful Degradation）
 */
export const fetchZennArticles = async (): Promise<ZennArticle[]> => {
  let lastError: Error | null = null;

  // リトライループ（初回 + リトライ2回 = 最大3回試行）
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // リトライの場合は待機（指数バックオフ: 1秒 → 2秒 → 4秒）
      if (attempt > 0) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`⏳ ${delay}ms待機してリトライします...`);
        await sleep(delay);
      }

      // API呼び出し
      const response = await fetchWithTimeout(ZENN_API_URL, TIMEOUT_MS);

      // HTTPステータスチェック
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      // JSONパース
      const data: ZennApiResponse = await response.json();

      // 成功ログ
      console.log(`✅ Zenn API: ${data.articles.length}件の記事を取得しました`);

      // キャッシュに保存
      await saveCacheArticles(data.articles);

      return data.articles;
    } catch (error) {
      lastError = error as Error;

      // エラータイプの判定
      const isTimeout = error instanceof Error && error.name === "AbortError";
      const errorType = isTimeout ? "Timeout" : "Error";

      // 警告ログ出力
      console.warn(
        `⚠️ Zenn API ${errorType} (attempt ${attempt + 1}/${
          MAX_RETRIES + 1
        }): ${lastError.message}`
      );
    }
  }

  // 全リトライ失敗時の処理
  console.error(`❌ Zenn API: 全リトライ失敗。キャッシュを試みます。`);

  // キャッシュから読み込みを試みる
  const cachedArticles = await loadCachedArticles();
  if (cachedArticles) {
    console.log(
      `📦 フォールバック: キャッシュから${cachedArticles.length}件使用`
    );
    return cachedArticles;
  }

  // キャッシュも利用できない場合は空配列を返す（Graceful Degradation）
  console.error(
    `❌ Zenn API: 全リトライ失敗し、キャッシュも利用できません。空配列で継続します。`
  );
  return [];
};
