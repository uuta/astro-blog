import type { Lang } from './ui';

const en = {
	allWriting: 'All writing',
	allJournal: 'Journal',
	// {n} is replaced with the estimated minutes.
	readingTime: '{n} min read',
	readInOther: '日本語で読む',
	// {link} is replaced with a link to the original, labeled originalLink.
	translatedFrom: 'Translated from the {link}.',
	originalLink: 'Japanese original',
	next: 'Next',
	cta: 'Setting up something similar for your team?',
	ctaButton: 'Get in touch',
};

const ja: typeof en = {
	allWriting: '記事一覧',
	allJournal: '日常の記事一覧',
	readingTime: '{n}分で読めます',
	readInOther: 'Read in English',
	translatedFrom: '{link}から翻訳しました。',
	originalLink: '英語の原文',
	next: '次の記事',
	cta: 'チームで同じような仕組みを作ろうとしていますか？',
	ctaButton: 'お問い合わせ',
};

export const article: Record<Lang, typeof en> = { en, ja };
