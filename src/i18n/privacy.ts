import type { Lang } from './ui';

const en = {
	meta: {
		title: 'Privacy policy — uuta',
		description:
			'This site has no contact form, no accounts and no comments. It never asks you for personal information.',
	},
	title: 'Privacy policy',
	updated: 'Last updated: [DATE]',
	intro: 'This site has no contact form, no accounts and no comments. It never asks you for personal information.',
	sections: [
		{
			title: 'Hosting',
			body: 'The site is static and served by [HOSTING PROVIDER]. Like any web host, it may keep standard access logs, such as IP address, browser and the pages requested, to keep the site running and secure.',
		},
		{ title: 'Analytics and cookies', body: '[NONE, or the name of the analytics tool and what it records.]' },
		{
			title: 'If you contact me',
			body: "You reach me through X, LinkedIn or GitHub. I use what you send only to reply. Those services' own privacy policies cover the messages themselves.",
		},
		{ title: 'Sharing', body: "I don't sell or share anything you send me, unless the law requires me to." },
		{
			title: 'Deleting what you sent',
			body: "Ask me through the same service and I'll delete our conversation on my side within [N] days.",
		},
		{ title: 'Changes', body: 'If this policy changes, I update the date at the top of this page.' },
	],
	operator: {
		title: 'Who runs this site',
		before: '[FULL NAME]. Reach me through the links on the ',
		link: 'home page',
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
	updated: '最終更新日：[日付]',
	intro:
		'このサイトにはお問い合わせフォームも会員登録もコメント欄もありません。個人情報の入力をお願いすることはありません。',
	sections: [
		{
			title: 'アクセスログ',
			body: 'このサイトは静的サイトで、[ホスティング事業者] から配信しています。サイトの運用と安全のため、事業者が IP アドレス、ブラウザの種類、閲覧したページなどのアクセスログを記録する場合があります。',
		},
		{ title: 'アクセス解析と Cookie', body: '[なし、または利用するツール名と記録する内容]' },
		{
			title: 'ご連絡いただいた場合',
			body: 'ご連絡は X、LinkedIn、GitHub からお願いしています。いただいた内容は返信のためだけに使います。メッセージそのものの扱いは、各サービスのプライバシーポリシーに従います。',
		},
		{
			title: '第三者への提供',
			body: '法令に基づく場合を除き、いただいた内容を第三者に提供・販売することはありません。',
		},
		{
			title: '削除のご請求',
			body: '送っていただいた内容の削除をご希望の場合は、同じサービスからご連絡ください。[N]日以内に、こちらの手元から削除します。',
		},
		{ title: '改定', body: '内容を変更した場合は、このページ上部の日付を更新します。' },
	],
	operator: {
		title: '運営者',
		before: '[氏名]。ご連絡は',
		link: 'トップページ',
		after: 'のリンクからお願いします。',
	},
};

export const privacy: Record<Lang, typeof en> = { en, ja };
