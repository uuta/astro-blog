import type { Lang } from './ui';

const en = {
	title: 'Page not found.',
	lead: "The page you're looking for doesn't exist or has moved.",
	home: 'Go to the home page',
	writing: 'Read the writing',
};

const ja: typeof en = {
	title: 'ページが見つかりません。',
	lead: 'お探しのページは存在しないか、移動した可能性があります。',
	home: 'トップページへ',
	writing: '記事を読む',
};

export const notFound: Record<Lang, typeof en> = { en, ja };
