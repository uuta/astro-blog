import type { Lang } from './ui';

const en = {
	allWriting: 'All writing',
	allJournal: 'Journal',
	// {n} is replaced with the estimated minutes.
	readingTime: '{n} min read',
	readInOther: '日本語で読む',
	howTitle: 'How this was written',
	howBody:
		'Drafted by an agent from my notes and commit history. Every claim, number and command checked and rewritten by me before merge.',
	next: 'Next',
	cta: 'Setting up something similar for your team?',
	ctaButton: 'Get in touch',
};

const ja: typeof en = {
	allWriting: '記事一覧',
	allJournal: '雑記一覧',
	readingTime: '{n}分で読めます',
	readInOther: 'Read in English',
	howTitle: 'この記事の書き方',
	howBody:
		'自分のメモとコミット履歴から、エージェントが下書きしました。主張・数字・コマンドはすべて、マージ前に自分が確認して書き直しています。',
	next: '次の記事',
	cta: 'チームで同じような仕組みを作ろうとしていますか？',
	ctaButton: 'お問い合わせ',
};

export const article: Record<Lang, typeof en> = { en, ja };
