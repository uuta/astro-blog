import { getRelativeLocaleUrl } from "astro:i18n";

export type Lang = "en" | "ja";

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "ja" : "en");

/** URL of a page in the given locale; `path` is locale-free, e.g. 'privacy/'. */
export const localeUrl = (lang: Lang, path = ""): string =>
  getRelativeLocaleUrl(lang, path);

/** Labels shared by the header and footer. */
export const ui = {
  en: {
    mainNav: "Main",
    footerNav: "Footer",
    work: "Work",
    writing: "Writing",
    contact: "Contact",
    newTab: "opens in a new tab",
    journal: "Journal",
    privacy: "Privacy policy",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  ja: {
    mainNav: "メイン",
    footerNav: "フッター",
    work: "実績",
    writing: "記事",
    contact: "お問い合わせ",
    newTab: "新しいタブで開きます",
    journal: "日常",
    privacy: "プライバシーポリシー",
    toLight: "ライトモードに切り替え",
    toDark: "ダークモードに切り替え",
  },
} satisfies Record<Lang, Record<string, string>>;
