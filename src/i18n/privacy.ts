import type { Lang } from './ui';

const en = {
	meta: {
		title: 'Privacy policy — uuta',
		description:
			'This site has no contact form, no accounts and no comments. It never asks you for personal information.',
	},
	title: 'Privacy policy',
	updated: 'Last updated: 2026-10-28',
	intro: 'This site has no contact form, no accounts and no comments. It never asks you for personal information.',
	sections: [
		{
			title: 'Hosting',
			body: 'The site is static and served by Netlify. Like any web host, it may keep standard access logs, such as IP address, browser and the pages requested, to keep the site running and secure.',
		},
		{
			title: 'Analytics and cookies',
			body: 'This site uses PostHog to see how pages are used: which pages are viewed, the site you came from, your browser and device, and an approximate location derived from your IP address. PostHog keeps a random ID in a cookie and local storage so that a repeat visit is recognized.',
		},
		{
			title: 'If you contact me',
			body: "You reach me through the services linked at the bottom of every page. I use what you send only to reply. Those services' own privacy policies cover the messages themselves.",
		},
		{ title: 'Sharing', body: "I don't sell or share anything you send me, unless the law requires me to." },
		{ title: 'Changes', body: 'If this policy changes, I update the date at the top of this page.' },
	],
	operator: {
		title: 'Who runs this site',
		before: 'Yuta Aoki. Reach me through the ',
		link: 'links at the bottom of this page',
		after: '.',
	},
};

const ja: typeof en = {
	meta: {
		title: 'プライバシーポリシー — uuta',
		description:
			'このサイトにはお問い合わせフォームも会員登録もコメント欄もありません。個人情報の入力をお願いすることはありません。',
	},
	title: 'プライバシーポリシー',
	updated: '最終更新日：2026年10月28日',
	intro:
		'このサイトにはお問い合わせフォームも会員登録もコメント欄もありません。個人情報の入力をお願いすることはありません。',
	sections: [
		{
			title: 'アクセスログ',
			body: 'このサイトは静的サイトで、Netlify から配信しています。サイトの運用と安全のため、事業者が IP アドレス、ブラウザの種類、閲覧したページなどのアクセスログを記録する場合があります。',
		},
		{
			title: 'アクセス解析と Cookie',
			body: 'ページがどのように見られているかを知るため、PostHog を使っています。記録するのは、閲覧したページ、どのサイトから来たか、ブラウザと端末の種類、IP アドレスから推定したおおよその地域です。再訪を見分けるため、PostHog はランダムな ID を Cookie とローカルストレージに保存します。',
		},
		{
			title: 'ご連絡いただいた場合',
			body: 'ご連絡は、各ページ下部のリンク先のサービスからお願いしています。いただいた内容は返信のためだけに使います。メッセージそのものの扱いは、各サービスのプライバシーポリシーに従います。',
		},
		{
			title: '第三者への提供',
			body: '法令に基づく場合を除き、いただいた内容を第三者に提供・販売することはありません。',
		},
		{ title: '改定', body: '内容を変更した場合は、このページ上部の日付を更新します。' },
	],
	operator: {
		title: '運営者',
		before: 'Yuta Aoki。ご連絡は',
		link: 'このページ下部のリンク',
		after: 'からお願いします。',
	},
};

export const privacy: Record<Lang, typeof en> = { en, ja };
