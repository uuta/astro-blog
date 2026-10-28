import type { Lang } from './ui';

/** The posts page; its heading comes from the home page's Writing section. */
const en = {
	metaTitle: 'Writing — uuta',
	empty: 'Nothing published yet.',
	searchLabel: 'Search posts',
	searchPlaceholder: 'Search…',
	// {n} is replaced with the number of matching posts.
	countOne: '1 post',
	countMany: '{n} posts',
	noMatch: 'No posts match your search.',
};

const ja: typeof en = {
	metaTitle: '記事 — uuta',
	empty: 'まだ記事はありません。',
	searchLabel: '記事を検索',
	searchPlaceholder: '検索…',
	countOne: '1件',
	countMany: '{n}件',
	noMatch: '該当する記事はありません。',
};

export const posts: Record<Lang, typeof en> = { en, ja };
