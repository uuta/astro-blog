import { getCollection, type CollectionEntry } from 'astro:content';
import { localeUrl, otherLang, type Lang } from '../i18n/ui';

export type Post = CollectionEntry<'writing'>;

export const postSlug = (post: Post): string => post.id.split('/').at(-1) ?? post.id;

export const postUrl = (post: Post): string => localeUrl(post.data.lang, `writing/${postSlug(post)}/`);

export const formatDate = (date: Post['data']['date']): string =>
	typeof date === 'string' ? date : date.toISOString().slice(0, 10);

export const getPosts = async (lang: Lang): Promise<Post[]> =>
	getCollection('writing', (post) => post.data.lang === lang);

/** The same article in the other language, if one shares its key. */
export const findTranslation = async (post: Post): Promise<Post | undefined> => {
	const { key } = post.data;
	if (!key) return undefined;
	const others = await getPosts(otherLang(post.data.lang));
	return others.find((other) => other.data.key === key);
};

/**
 * URL of the post with this key, in `lang` when that translation exists, otherwise
 * in the other language. Fails the build if no post has the key.
 */
export const keyedPostUrl = async (key: string, lang: Lang): Promise<string> => {
	const posts = await getCollection('writing', (post) => post.data.key === key);
	const post = posts.find((p) => p.data.lang === lang) ?? posts[0];
	if (!post) throw new Error(`Writing list links to a missing post key: ${key}`);
	return postUrl(post);
};
