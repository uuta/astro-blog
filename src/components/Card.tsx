import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  /** リンクURL（必須） */
  href: string;
  /** 既存ブログ用のfrontmatter（互換性維持のため残す） */
  frontmatter?: CollectionEntry<"blog">["data"];
  /** セクション見出しとして表示するか */
  secHeading?: boolean;
  /** 記事タイトル（frontmatterがない場合に使用） */
  title?: string;
  /** 記事説明文 */
  description?: string;
  /** 公開日時 */
  pubDatetime?: Date;
  /** 外部リンクフラグ（デフォルト: false） */
  isExternal?: boolean;
  /** Zennアイコン表示フラグ */
  showZennIcon?: boolean;
}

/**
 * Zennブランドアイコン（SVG）
 * カラー: Zennブランドカラー rgb(62, 168, 255)
 * @see https://simpleicons.org/?q=zenn
 */
const ZennBrandIcon = () => (
  <svg
    className="inline-block h-5 w-5"
    viewBox="0 0 24 24"
    style={{ fill: "rgb(62, 168, 255)" }}
    aria-label="Zenn"
  >
    <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
  </svg>
);

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  title: titleProp,
  description: descriptionProp,
  pubDatetime: pubDatetimeProp,
  isExternal = false,
  showZennIcon = false,
}: Props) {
  // Props処理: frontmatterがあれば従来通り、なければ新規Propsを使用
  const title = frontmatter?.title ?? titleProp ?? "";
  const description = frontmatter?.description ?? descriptionProp ?? "";
  const pubDatetime = frontmatter?.pubDatetime ?? pubDatetimeProp;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  // 外部リンクの場合の追加属性
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        {...linkProps}
      >
        <div className="flex items-center gap-2">
          {/* Zennブランドアイコンを表示 */}
          {showZennIcon && <ZennBrandIcon />}
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </div>
      </a>
      {pubDatetime && <Datetime datetime={pubDatetime} />}
      <p>{description}</p>
    </li>
  );
}
