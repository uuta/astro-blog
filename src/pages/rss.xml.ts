import rss from "@astrojs/rss";
import { getAllPosts } from "@services/posts";
import { getSortedPosts } from "@utils/getSortedPosts";
import slugify from "@utils/slugify";
import { SITE } from "@config";

export async function GET() {
  const allPosts = await getAllPosts();
  const sortedPosts = getSortedPosts(allPosts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `posts/${slugify(slug)}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime),
    })),
  });
}
