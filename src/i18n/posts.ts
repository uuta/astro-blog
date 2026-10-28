import type { Lang } from './ui';

/** The posts page; its heading comes from the home page's Writing section. */
const en = {
	metaTitle: 'Writing — uuta',
	// Marks a post that only exists in the other language.
	otherLang: 'In Japanese',
	empty: 'Nothing published yet.',
	searchLabel: 'Search posts',
	searchPlaceholder: 'Search by keyword',
	// {n} is replaced with the number of matching posts.
	countOne: '1 post',
	countMany: '{n} posts',
	noMatch: 'No posts match your search.',
};

const ja: typeof en = {
	metaTitle: '記事 — uuta',
	otherLang: '英語',
	empty: 'まだ記事はありません。',
	searchLabel: '記事を検索',
	searchPlaceholder: 'キーワードで検索',
	countOne: '1件',
	countMany: '{n}件',
	noMatch: '該当する記事はありません。',
};

export const posts: Record<Lang, typeof en> = { en, ja };
