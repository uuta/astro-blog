import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { UnifiedPost } from "../types/post";

type Props = {
  post: UnifiedPost;
  secHeading?: boolean;
};

export function Card({ post }: Props) {
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
        <span className="ml-2 flex items-center gap-1 text-sm opacity-70">
          <svg viewBox="0 0 110 110" className="h-3.5 w-3.5 text-skin-like">
            <path
              d="M73,24a23.78,23.78,0,0,0-15.89,6.19,3.14,3.14,0,0,1-4.18,0A23.81,23.81,0,0,0,37,24a22,22,0,0,0-22,22c0,16.67,19.64,32.82,25.11,37.93,2.84,2.65,6.15,5.64,8.92,8.13a8.9,8.9,0,0,0,11.9,0c2.77-2.49,6.07-5.48,8.91-8.13C75.37,78.81,95,62.66,95,46A22,22,0,0,0,73,24Z"
              fill="currentColor"
            />
            <path
              d="M66.25,76.42c-.71.64-1.32,1.2-1.82,1.67-2.51,2.33-5.39,5-7.94,7.25a2.21,2.21,0,0,1-3,0C51,83,48.1,80.42,45.59,78.09c-.5-.47-1.12-1-1.82-1.67C38.09,71.29,23,57.67,23,46A14,14,0,0,1,37,32a15.92,15.92,0,0,1,11.65,5.23l4.73,5a2.2,2.2,0,0,0,3.23,0l4.72-5A16.06,16.06,0,0,1,73,32,14,14,0,0,1,87,46C87,57.67,71.93,71.29,66.25,76.42Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-white">{likedCount}</span>
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
        <h2 {...headerProps}>{titleContent}</h2>
      </a>
      {!isZenn && <p>{description}</p>}
      <Datetime datetime={pubDatetime} />
    </li>
  );
}
