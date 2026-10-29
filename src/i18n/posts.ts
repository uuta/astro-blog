import type { Lang } from './ui';

/** The list pages. Writing takes its heading from the home page's Writing section. */
const en = {
	writing: { metaTitle: 'Writing — uuta' },
	journal: {
		metaTitle: 'Journal — uuta',
		title: 'Journal',
		description: 'Personal essays and travel notes.',
	},
	empty: 'Nothing published yet.',
	searchLabel: 'Search posts',
	searchPlaceholder: 'Search…',
	// {n} is replaced with the number of matching posts.
	countOne: '1 post',
	countMany: '{n} posts',
	noMatch: 'No posts match your search.',
	// Read after the title of an article hosted on Zenn.
	onZenn: 'on Zenn',
};

const ja: typeof en = {
	writing: { metaTitle: '記事 — uuta' },
	journal: {
		metaTitle: '日常 — uuta',
		title: '日常',
		description: '旅や日々のことを書いた個人的な文章です。',
	},
	empty: 'まだ記事はありません。',
	searchLabel: '記事を検索',
	searchPlaceholder: '検索…',
	countOne: '1件',
	countMany: '{n}件',
	noMatch: '該当する記事はありません。',
	onZenn: '（Zenn）',
};

export const posts: Record<Lang, typeof en> = { en, ja };
