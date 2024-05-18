import { slug as slugger } from "github-slugger";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slugger(str);

const formatSlug = (slug: CollectionEntry<"blog">["slug"]) => {
  const re = new RegExp(/^([0-9]|-)*\/(.*)/);
  return re.exec(slug);
};

const slugify = (slug: CollectionEntry<"blog">["slug"]) => {
  const fs = formatSlug(slug);
  return fs ? fs[2] : slug;
};

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
