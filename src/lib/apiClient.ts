import ky, { HTTPError } from "ky";

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: { status: number; message: string } };

/**
 * A simple API client using ky for making HTTP GET requests.
 * This client handles errors without considering retries.
 * If a client that supports retries is needed, consider using ky directly.
 *
 * @see
 * https://github.com/sindresorhus/ky?tab=readme-ov-file#api
 */
export const apiClient = {
  get: async <T>(
    url: string,
    options?: Parameters<typeof ky.get>[1]
  ): Promise<ApiResult<T>> => {
    try {
      const data = await ky.get(url, options).json<T>();
      return { success: true, data };
    } catch (error) {
      if (error instanceof HTTPError) {
        return {
          success: false,
          error: { status: error.response.status, message: error.message },
        };
      }
      throw error;
    }
  },
};
