import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { UnifiedPost } from "../types/post";

type Props = {
  post: UnifiedPost;
  secHeading?: boolean;
};

export function Card({ post, secHeading = true }: Props) {
  const { title, pubDatetime, description } = post.data;
  const isZenn = post.source === "zenn";
  const href = isZenn ? post.externalUrl : `/posts/${post.slug}/`;
  const likedCount = isZenn ? post.likedCount : undefined;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  const titleContent = (
    <>
      {title}
      {isZenn && (
        <span className="ml-2 text-sm opacity-70">
          [Zenn] ❤️ {likedCount}
        </span>
      )}
    </>
  );

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        {...(isZenn ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {secHeading ? (
          <h2 {...headerProps}>{titleContent}</h2>
        ) : (
          <h3 {...headerProps}>{titleContent}</h3>
        )}
      </a>
      <Datetime datetime={pubDatetime} />
      <p>{description}</p>
    </li>
  );
}
