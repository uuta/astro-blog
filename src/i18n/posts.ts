import type { Lang } from './ui';

/** The posts page; its kicker and heading come from the home page's Writing section. */
const en = {
	metaTitle: 'Writing — uuta',
	// Marks a post that only exists in the other language.
	otherLang: 'In Japanese',
	empty: 'Nothing published yet.',
};

const ja: typeof en = {
	metaTitle: '記事 — uuta',
	otherLang: '英語',
	empty: 'まだ記事はありません。',
};

export const posts: Record<Lang, typeof en> = { en, ja };
