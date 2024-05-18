import type { CollectionEntry } from "astro:content";

const getDate = (s: string) => {
  return s.slice(0, 8);
};

const getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
  posts
    .filter(({ data, slug }) => {
      if (data.draft) {
        return false;
      }
      const re = new RegExp(/^([0-9]|-)*/);
      const date = re.exec(slug);
      return date ? !isNaN(new Date(date[0]).getTime()) : false;
    })
    .sort(
      (a, b) =>
        Math.floor(new Date(getDate(b.slug)).getTime() / 1000) -
        Math.floor(new Date(getDate(a.slug)).getTime() / 1000)
    );

export default getSortedPosts;
