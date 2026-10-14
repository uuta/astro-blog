const EXCERPT_LENGTH = 45;

/**
 * Markdown 本文から記事一覧・meta description 用のプレーンテキスト抜粋を作る
 */
export const getExcerpt = (
  markdown: string,
  length: number = EXCERPT_LENGTH
): string => {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s.*$/gm, " ")
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\*\*|`/g, "")
    .replace(/\s+/g, " ")
    .replace(/([。、！？」』）]) /g, "$1")
    .trim();

  const chars = Array.from(text);
  return chars.length > length ? `${chars.slice(0, length).join("")}…` : text;
};
