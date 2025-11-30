import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  isExternal?: boolean;
  showZennIcon?: boolean;
}

// Zenn brand icon SVG component
const ZennIcon = () => (
  <svg
    className="inline-block h-5 w-5"
    style={{ fill: "rgb(62, 168, 255)" }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Zenn"
  >
    <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
  </svg>
);

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  isExternal = false,
  showZennIcon = false,
}: Props) {
  const { title, pubDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  // External link attributes for Zenn articles
  const linkAttributes = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        {...linkAttributes}
      >
        {secHeading ? (
          <h2 {...headerProps} className="flex items-center gap-2">
            {showZennIcon && <ZennIcon />}
            {title}
          </h2>
        ) : (
          <h3 {...headerProps} className="flex items-center gap-2">
            {showZennIcon && <ZennIcon />}
            {title}
          </h3>
        )}
      </a>
      <Datetime datetime={pubDatetime} />
      <p>{description}</p>
    </li>
  );
}
