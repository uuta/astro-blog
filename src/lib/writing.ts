import { getCollection, type CollectionEntry } from 'astro:content';
import { localeUrl, otherLang, type Lang } from '../i18n/ui';
import { getZennArticles } from './zenn';

export type Post = CollectionEntry<'writing'>;
export type Section = Post['data']['section'];

const sectionPath = { writing: 'posts', journal: 'journal' } satisfies Record<Section, string>;

export const postSlug = (post: Post): string => post.id.split('/').at(-1) ?? post.id;

export const postUrl = (post: Post): string =>
	localeUrl(post.data.lang, `${sectionPath[post.data.section]}/${postSlug(post)}/`);

/** The page that lists a section's articles. */
export const sectionUrl = (lang: Lang, section: Section): string => localeUrl(lang, `${sectionPath[section]}/`);

/** The Writing list, which the header links to. */
export const postsUrl = (lang: Lang): string => sectionUrl(lang, 'writing');

/** One row of a list: an article on this site, or one on Zenn. */
export interface ListItem {
	title: string;
	href: string;
	date: Post['data']['date'] | Date;
	description?: string;
	external?: 'zenn';
	/** What the posts page's search matches, normalized like the query in the browser. */
	searchText: string;
}

export const formatDate = (date: ListItem['date']): string =>
	typeof date === 'string' ? date : date.toISOString().slice(0, 10);

export const getPosts = async (lang: Lang, section: Section = 'writing'): Promise<Post[]> =>
	getCollection('writing', (post) => post.data.lang === lang && post.data.section === section);

// NFKC folds full-width and half-width forms, so 'ＧＯ' finds 'Go'.
const normalize = (text: string) => text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');

/** Markdown reduced to its prose, for summaries, reading time and search. */
const plainText = (markdown: string) =>
	markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^\s*(#{1,6}|[-*+]|>|\d+\.)\s+/gm, '')
		.replace(/[*_`~]+/g, '')
		.replace(/\s+/g, ' ')
		.trim();

/** The post's summary, or its opening when it has none. */
export const postDescription = (post: Post): string => {
	if (post.data.description) return post.data.description;
	const text = plainText(post.body ?? '');
	const max = post.data.lang === 'ja' ? 90 : 160;
	return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};

/** Minutes to read, at about 500 characters a minute in Japanese and 220 words in English. */
export const readingMinutes = (post: Post): number => {
	const text = plainText(post.body ?? '');
	const units = post.data.lang === 'ja' ? text.replace(/\s/g, '').length / 500 : text.split(' ').length / 220;
	return Math.max(1, Math.round(units));
};

// Newest first; undated drafts ("[DATE]") sort to the top.
const time = (date: ListItem['date']) => (typeof date === 'string' ? Infinity : date.getTime());
const newestFirst = (a: { date: ListItem['date'] }, b: { date: ListItem['date'] }) =>
	time(a.date) === time(b.date) ? 0 : time(b.date) - time(a.date);

const listItem = (post: Post): ListItem => {
	const description = postDescription(post);
	const { title, date, tags } = post.data;
	return {
		title,
		href: postUrl(post),
		date,
		description,
		searchText: normalize([title, description, ...tags, plainText(post.body ?? '')].join(' ')),
	};
};

/** A section's list, newest first. Zenn articles are Japanese, so they join Writing in Japanese. */
export const getList = async (lang: Lang, section: Section): Promise<ListItem[]> => {
	const items = (await getPosts(lang, section)).map(listItem);
	if (section === 'writing' && lang === 'ja') {
		for (const article of await getZennArticles()) {
			const { title, url, date } = article;
			items.push({ title, href: url, date, external: 'zenn', searchText: normalize(`${title} zenn`) });
		}
	}
	return items.sort(newestFirst);
};

/** The next older article on this site in the same language and section. */
export const nextPost = async (post: Post): Promise<Post | undefined> => {
	const posts = (await getPosts(post.data.lang, post.data.section)).sort((a, b) => newestFirst(a.data, b.data));
	return posts[posts.findIndex((p) => p.id === post.id) + 1];
};

/** The same article in the other language, if one shares its key. */
export const findTranslation = async (post: Post): Promise<Post | undefined> => {
	const { key } = post.data;
	if (!key) return undefined;
	const others = await getPosts(otherLang(post.data.lang), post.data.section);
	return others.find((other) => other.data.key === key);
};
