import type { Lang } from './ui';

const en = {
	meta: {
		title: 'Profile — uuta',
		description: 'Software engineer working on agentic workflows and security. Based in Japan, working remotely.',
	},
	kicker: 'Profile',
	lead: 'Software engineer working on agentic workflows and security. Based in Japan, working remotely.',
	background: '[TWO OR THREE LINES ON YOUR BACKGROUND: years in software, the kinds of products, past roles.]',
	resume: 'Résumé (PDF)',
	contact: 'Get in touch',
	photo: '[PHOTO]',
	experienceTitle: 'Experience',
	experience: [
		{
			years: '[YEAR]–now',
			role: 'Independent · SpeakGain',
			body: 'An English speaking app for iOS and Android. I build and run it with my own agent workflow.',
		},
		{ years: '[YEAR]–[YEAR]', role: '[ROLE] · [COMPANY]', body: '[WHAT YOU WORKED ON, ONE LINE]' },
		{ years: '[YEAR]–[YEAR]', role: '[ROLE] · [COMPANY]', body: '[WHAT YOU WORKED ON, ONE LINE]' },
	],
	skillsTitle: 'Skills',
	skills: [
		{ name: 'Agents', body: 'Claude Code, Codex, multi-agent pipelines, shared skills, review and CI gates' },
		{
			name: 'Security',
			body: 'Agent permissions and sandboxing, prompt injection, secrets handling, reverse engineering',
		},
		{ name: 'Build', body: 'Flutter, Go, Next.js, Astro, Cloudflare Workers' },
		{ name: 'Languages', body: 'Japanese (native), English ([LEVEL])' },
	],
};

const ja: typeof en = {
	meta: {
		title: 'プロフィール — uuta',
		description:
			'エージェント開発とセキュリティに取り組むソフトウェアエンジニアです。日本在住、フルリモートで働いています。',
	},
	kicker: 'プロフィール',
	lead: 'エージェント開発とセキュリティに取り組むソフトウェアエンジニアです。日本在住、フルリモートで働いています。',
	background: '[経歴を2〜3行で：ソフトウェア開発の年数、関わったプロダクトの種類、これまでの役割]',
	resume: '職務経歴書 (PDF)',
	contact: 'お問い合わせ',
	photo: '[写真]',
	experienceTitle: '経歴',
	experience: [
		{
			years: '[年]–現在',
			role: '個人開発 · SpeakGain',
			body: 'iOS・Android 向けの英語スピーキングアプリ。自分のエージェント開発フローで作り、運用しています。',
		},
		{ years: '[年]–[年]', role: '[役職] · [会社名]', body: '[担当したことを1行で]' },
		{ years: '[年]–[年]', role: '[役職] · [会社名]', body: '[担当したことを1行で]' },
	],
	skillsTitle: 'スキル',
	skills: [
		{ name: 'エージェント', body: 'Claude Code、Codex、マルチエージェント開発、skill の共有、レビューと CI のゲート' },
		{
			name: 'セキュリティ',
			body: 'エージェントの権限とサンドボックス、プロンプトインジェクション、シークレットの扱い、リバースエンジニアリング',
		},
		{ name: '開発', body: 'Flutter、Go、Next.js、Astro、Cloudflare Workers' },
		{ name: '言語', body: '日本語 (ネイティブ)、英語 ([レベル])' },
	],
};

export const profile: Record<Lang, typeof en> = { en, ja };
