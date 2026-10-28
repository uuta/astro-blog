import { getCollection, type CollectionEntry } from 'astro:content';
import { localeUrl, otherLang, type Lang } from '../i18n/ui';

export type Post = CollectionEntry<'writing'>;

export const postSlug = (post: Post): string => post.id.split('/').at(-1) ?? post.id;

export const postUrl = (post: Post): string => localeUrl(post.data.lang, `posts/${postSlug(post)}/`);

/** The page that lists every post. */
export const postsUrl = (lang: Lang): string => localeUrl(lang, 'posts/');

export const formatDate = (date: Post['data']['date']): string =>
	typeof date === 'string' ? date : date.toISOString().slice(0, 10);

export const getPosts = async (lang: Lang): Promise<Post[]> =>
	getCollection('writing', (post) => post.data.lang === lang);

/** Posts on a language's posts page: only that language, newest first, undated ones on top. */
export const getListedPosts = async (lang: Lang): Promise<Post[]> => {
	const time = ({ data }: Post) => (typeof data.date === 'string' ? Infinity : data.date.getTime());
	return (await getPosts(lang)).sort((a, b) => (time(a) === time(b) ? 0 : time(b) - time(a)));
};

/** The same article in the other language, if one shares its key. */
export const findTranslation = async (post: Post): Promise<Post | undefined> => {
	const { key } = post.data;
	if (!key) return undefined;
	const others = await getPosts(otherLang(post.data.lang));
	return others.find((other) => other.data.key === key);
};

/**
 * URL of the post with this key in `lang`, or undefined until that translation exists.
 * Fails the build if no post in either language has the key.
 */
export const keyedPostUrl = async (key: string, lang: Lang): Promise<string | undefined> => {
	const posts = await getCollection('writing', (post) => post.data.key === key);
	if (posts.length === 0) throw new Error(`Writing list links to a missing post key: ${key}`);
	const post = posts.find((p) => p.data.lang === lang);
	return post && postUrl(post);
};
