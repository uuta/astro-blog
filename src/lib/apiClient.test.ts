import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "./apiClient";

vi.mock("ky", () => {
  class MockHTTPError extends Error {
    response: { status: number };
    constructor(status: number) {
      super(`Request failed with status code ${status}`);
      this.name = "HTTPError";
      this.response = { status };
    }
  }
  return {
    default: {
      get: vi.fn(),
    },
    HTTPError: MockHTTPError,
  };
});

import ky, { HTTPError } from "ky";

describe("apiClient.get", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success result on 2xx response", async () => {
    const mockData = { message: "ok" };
    vi.mocked(ky.get).mockReturnValue({
      json: vi.fn().mockResolvedValue(mockData),
    } as unknown as ReturnType<typeof ky.get>);

    const result = await apiClient.get<{ message: string }>("https://api.example.com");

    expect(result).toEqual({ success: true, data: mockData });
  });

  it("returns error result on 403 response", async () => {
    const httpError = new (HTTPError as unknown as new (status: number) => Error & { response: { status: number } })(403);
    vi.mocked(ky.get).mockReturnValue({
      json: vi.fn().mockRejectedValue(httpError),
    } as unknown as ReturnType<typeof ky.get>);

    const result = await apiClient.get("https://api.example.com");

    expect(result).toEqual({
      success: false,
      error: { status: 403, message: expect.stringContaining("403") },
    });
  });

  it("returns error result on 500 response", async () => {
    const httpError = new (HTTPError as unknown as new (status: number) => Error & { response: { status: number } })(500);
    vi.mocked(ky.get).mockReturnValue({
      json: vi.fn().mockRejectedValue(httpError),
    } as unknown as ReturnType<typeof ky.get>);

    const result = await apiClient.get("https://api.example.com");

    expect(result).toEqual({
      success: false,
      error: { status: 500, message: expect.stringContaining("500") },
    });
  });

  it("throws non-HTTPError errors", async () => {
    const networkError = new Error("Network error");
    vi.mocked(ky.get).mockReturnValue({
      json: vi.fn().mockRejectedValue(networkError),
    } as unknown as ReturnType<typeof ky.get>);

    await expect(apiClient.get("https://api.example.com")).rejects.toThrow("Network error");
  });
});
