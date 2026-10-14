import { describe, it, expect } from "vitest";
import { getExcerpt } from "./getExcerpt";

describe("getExcerpt", () => {
  it("returns short text as is", () => {
    expect(getExcerpt("短い本文。")).toBe("短い本文。");
  });

  it("truncates long text with an ellipsis", () => {
    expect(getExcerpt("あいうえおかきくけこ", 5)).toBe("あいうえお…");
  });

  it("does not split emoji when truncating", () => {
    expect(getExcerpt("👍👍👍", 2)).toBe("👍👍…");
  });

  it("drops headings, images, HTML and code blocks", () => {
    const markdown = [
      "## 見出し",
      "",
      "![alt](assets/images/a.jpg)",
      '<iframe src="https://example.com"></iframe>',
      "",
      "```json",
      '{ "a": 1 }',
      "```",
      "",
      "本文。",
    ].join("\n");
    expect(getExcerpt(markdown)).toBe("本文。");
  });

  it("keeps link text and strips list markers and emphasis", () => {
    const markdown = [
      "- **太字**と[リンク](https://example.com)",
      "  1. `code`",
    ].join("\n");
    expect(getExcerpt(markdown)).toBe("太字とリンク code");
  });

  it("joins Japanese paragraphs without a space but keeps English spacing", () => {
    expect(getExcerpt("最初の段落。\n\n次の段落。")).toBe(
      "最初の段落。次の段落。"
    );
    expect(getExcerpt("First paragraph.\n\nSecond one.")).toBe(
      "First paragraph. Second one."
    );
  });

  it("keeps underscores inside words", () => {
    expect(getExcerpt("snake_case と __typename")).toBe(
      "snake_case と __typename"
    );
  });
});
