import type { Lang } from './ui';

/** A row in the Writing list. `post` is the key of a writing post; rows without one stay placeholders. */
export interface WritingRow {
	date: string;
	title: string;
	post?: string;
}

const en = {
	meta: {
		title: 'uuta — Agentic workflows · Security',
		description:
			"You can't know which agent workflow fits your team until it runs. Once it does, I make every run visible: what it changed, what it read and ran, and whether it got merged or sent back.",
	},
	hero: {
		kicker: 'Agentic workflows · Security',
		title: 'See what your agents actually do.',
		lead: "You can't know which agent workflow fits your team until it runs. Once it does, I make every run visible: what it changed, what it read and ran, and whether it got merged or sent back. Then you keep what works.",
		primary: 'Work with me',
		secondary: 'Read the writing',
		art: {
			label:
				'Pipeline diagram: GitHub issues flow to three agents, each working in its own git worktree. One writes code, one runs tests, one reads the codebase. A second model reviews the diff. Work that fails review goes back to its agent for a fix; clean work becomes a pull request whose checks must pass, and I merge it.',
			nodes: [
				{ x: '10%', y: '60.5%', name: 'Issues', sub: 'GitHub' },
				{ x: '32.5%', y: '30.4%', name: 'Agent 1', sub: 'worktree 1' },
				{ x: '32.5%', y: '56.6%', name: 'Agent 2', sub: 'worktree 2' },
				{ x: '32.5%', y: '82.9%', name: 'Agent 3', sub: 'worktree 3' },
				{ x: '56.5%', y: '60.5%', name: 'Review', sub: '2nd model' },
				{ x: '76.5%', y: '58%', name: 'Pull request', sub: 'checks pass' },
				{ x: '92.5%', y: '54%', name: 'Merged', sub: 'by me' },
			],
			fixRequested: 'fix requested',
			legend: {
				forward: 'work moving forward',
				back: 'sent back for a fix',
				note: 'My own pipeline. Every run, fix and merge stays visible.',
			},
		},
	},
	focus: {
		kicker: 'Focus',
		title: 'Two areas, one question: what did your agents do, and what could they have done?',
		cards: [
			{
				icon: 'workflow',
				title: 'Agentic workflow',
				body: 'Issue, plan, implement, review, pull request. Agents do the work; people own the decisions.',
				items: [
					'Run history: what each agent changed, and what got merged or sent back',
					'Multi-agent pipelines on Claude Code and Codex',
					'Skills and instructions shared across models',
					'Review and CI gates before anything merges',
				],
			},
			{
				icon: 'security',
				title: 'Security',
				body: 'An agent with write access and a shell is a new attack surface. I treat it like one.',
				items: [
					'A log of what each agent read, wrote and ran',
					'Permission and sandbox design for agents',
					'Prompt injection through issues, docs and web pages',
					'Keeping secrets out of agent context',
				],
			},
		],
	},
	work: {
		kicker: 'Work',
		title: 'Systems I run every day, and what they produced.',
		caseStudy: 'Read the case study',
		feature: {
			meta: 'Product · Shipped',
			title: 'SpeakGain, an English speaking app',
			body: 'Flashcards built from the English you wanted to say, learned out loud, with native-speaker audio, AI explanations, and pronunciation scoring. I build and run all of it with my agent workflow: the Flutter app, the Cloudflare Workers backend, and the site.',
			facts: [
				{ label: 'Platforms', value: 'iOS · Android' },
				{ label: 'Pronunciation', value: 'Scored word by word' },
				{ label: 'UI languages', value: '12' },
			],
			tags: ['Flutter', 'Cloudflare Workers', 'Astro', 'Claude Code', 'Codex'],
			shotAlt: "SpeakGain home screen: today's review, a progress ring and a Practice now button",
		},
		cards: [
			{
				meta: 'Agentic workflow · Tooling',
				title: 'One skill library for Claude Code and Codex',
				body: 'Workflow rules used to live in prompts I retyped. Now both agents load the same model-neutral skills (how to split an issue, review a diff, set up a worktree), so fixing a rule once fixes it for both.',
				resultLabel: 'Result',
				result: '[N skills, in daily use across N repos]',
				tags: ['Claude Code', 'Codex', 'Skills'],
				draft: false,
			},
			{
				meta: 'Agentic workflow · Pipeline',
				title: 'Issue-to-PR loop with parallel agents',
				body: 'Agents pick up ready GitHub issues, each in its own git worktree. A second model reviews the diff, failures loop back for a fix, and only clean work becomes a pull request. I review and merge.',
				resultLabel: 'Caught before merge',
				result: '[A BUG THE REVIEW STEP STOPPED]',
				tags: ['GitHub', 'git worktree', 'tmux', 'Code review'],
				draft: false,
			},
			{
				meta: 'Agentic workflow · Product',
				title: 'A resort-job aggregator, built by agents',
				body: 'A real product built end to end with Claude as the manager and Codex as implementer and reviewer, from the plan to a running web app. A test of how far the workflow holds up outside of tooling.',
				resultLabel: 'Result',
				result: '[WHAT SHIPPED · LINK]',
				tags: ['Go', 'Next.js', 'Claude Code', 'Codex'],
				draft: false,
			},
			{
				meta: 'Security · Case study',
				title: '[SECURITY CASE STUDY TITLE]',
				body: '[e.g. an audit of what a coding agent could read, write and run on a real repo, the risky paths found, and what changed]',
				resultLabel: 'Result',
				result: '[FINDINGS · FIXES]',
				tags: ['Threat model', 'Sandboxing'],
				draft: true,
			},
		],
	},
	writing: {
		kicker: 'Writing',
		title: 'Notes from running agents on real work.',
		rows: [
			{ date: '[DATE]', title: "Agents write my site. They can't publish it.", post: 'agents-write-my-site' },
			{ date: '[DATE]', title: 'Leaving coding agents on full autonomy: what I contain, and how' },
			{ date: '[DATE]', title: 'Prompt injection through GitHub issues: a threat model for agent pipelines' },
			{ date: '[DATE]', title: 'One instruction set, two models: sharing skills across Claude Code and Codex' },
		] as WritingRow[],
	},
	services: {
		kicker: 'Work with me',
		title: 'Hire me, or bring me in for a project.',
		columns: [
			{
				title: 'Hiring',
				body: 'Full-time or contract roles in agentic workflow or security engineering. Remote, with teams in Japan or abroad.',
			},
			{
				title: 'Teams already using agents',
				body: 'For companies and indie developers. Once agents work in your repos, I make every run visible: what it changed, what it touched, and whether it got merged or sent back. Then you can see which workflow actually works for you.',
			},
			{
				title: 'Agent security review',
				body: 'What can your agents read, write and run? I map it, find the risky paths, and hand you concrete fixes.',
			},
		],
		strip: "Not sure which fits? Tell me what you're working on.",
		cta: 'Get in touch',
	},
	about: {
		kicker: 'About',
		lead: "I'm uuta, a software engineer based in Japan. [ONE LINE ON BACKGROUND: years, stack, past roles.]",
		body: 'These days most of my code is written by agents I direct. Most of my engineering time goes into the system around them: how work is split, how it gets reviewed, how the agents stay inside safe bounds, and how to see what they actually did.',
		profileLink: 'Full profile',
		contact: 'Contact',
	},
};

const ja: typeof en = {
	meta: {
		title: 'uuta — エージェント開発 · セキュリティ',
		description:
			'どのエージェント開発がチームに合うかは、動かしてみるまで分かりません。動き始めたら、実行ごとに、何を変えたか、何を読んで実行したか、マージされたか差し戻されたかを見えるようにします。',
	},
	hero: {
		kicker: 'エージェント開発 · セキュリティ',
		title: 'エージェントが何をしているか、見えるように。',
		lead: 'どのエージェント開発がチームに合うかは、動かしてみるまで分かりません。動き始めたら、実行ごとに、何を変えたか、何を読んで実行したか、マージされたか差し戻されたかを見えるようにします。合うものは残し、合わないものはやめられます。',
		primary: '相談する',
		secondary: '記事を読む',
		art: {
			label:
				'パイプラインの図：GitHub の Issue が3つのエージェントに渡り、それぞれ専用の git worktree で作業します。1つはコードを書き、1つはテストを回し、1つはコードベースを読みます。差分は別のモデルがレビューし、通らなければ修正のためエージェントに戻り、通ったものだけがチェックを通過した Pull Request になって、自分がマージします。',
			nodes: [
				{ x: '10%', y: '60.5%', name: 'Issue', sub: 'GitHub' },
				{ x: '32.5%', y: '30.4%', name: 'エージェント 1', sub: 'worktree 1' },
				{ x: '32.5%', y: '56.6%', name: 'エージェント 2', sub: 'worktree 2' },
				{ x: '32.5%', y: '82.9%', name: 'エージェント 3', sub: 'worktree 3' },
				{ x: '56.5%', y: '60.5%', name: 'レビュー', sub: '別のモデル' },
				{ x: '76.5%', y: '58%', name: 'Pull Request', sub: 'チェック通過' },
				{ x: '92.5%', y: '54%', name: 'マージ', sub: '自分が判断' },
			],
			fixRequested: '修正依頼',
			legend: {
				forward: '進んでいる作業',
				back: '修正のため差し戻し',
				note: '自分のパイプラインです。実行・修正・マージがすべて見えます。',
			},
		},
	},
	focus: {
		kicker: '領域',
		title: '2つの領域、1つの問い。エージェントは何をして、何ができてしまうのか。',
		cards: [
			{
				icon: 'workflow',
				title: 'エージェント開発ワークフロー',
				body: 'Issue → 計画 → 実装 → レビュー → PR。作業はエージェントが、判断は人が持つ。',
				items: [
					'実行の記録：各エージェントが何を変え、何がマージされ、何が差し戻されたか',
					'Claude Code / Codex によるマルチエージェント開発',
					'モデルをまたいで共有する skill と指示',
					'マージ前のレビューと CI のゲート',
				],
			},
			{
				icon: 'security',
				title: 'セキュリティ',
				body: '書き込み権限とシェルを持つエージェントは、新しい攻撃面です。そのように扱います。',
				items: [
					'各エージェントが何を読み、書き、実行したかのログ',
					'エージェントの権限とサンドボックスの設計',
					'Issue・ドキュメント・Web 経由のプロンプトインジェクション',
					'シークレットをエージェントの文脈に入れない設計',
				],
			},
		],
	},
	work: {
		kicker: '実績',
		title: '毎日動かしている仕組みと、そこから生まれたもの。',
		caseStudy: '事例を読む',
		feature: {
			meta: 'プロダクト · リリース済み',
			title: 'SpeakGain — 英語スピーキングアプリ',
			body: '言いたかった英語を口で覚える、自分だけの暗記カードアプリです。ネイティブ音声・AI 解説・発音採点つき。Flutter のアプリ、Cloudflare Workers のバックエンド、サイトまで、自分のエージェント開発フローで作り、運用しています。',
			facts: [
				{ label: '対応', value: 'iOS · Android' },
				{ label: '発音採点', value: '単語ごとに採点' },
				{ label: '表示言語', value: '12 言語' },
			],
			tags: ['Flutter', 'Cloudflare Workers', 'Astro', 'Claude Code', 'Codex'],
			shotAlt: 'SpeakGain のホーム画面。今日の復習の進み具合と「今すぐ学習する」ボタン',
		},
		cards: [
			{
				meta: 'エージェント開発 · ツール',
				title: 'Claude Code と Codex で共有する skill ライブラリ',
				body: '以前はワークフローのルールを毎回プロンプトに書いていました。今は両方のエージェントが同じモデル非依存の skill（Issue の分割、差分レビュー、worktree の準備など）を読み込むので、ルールを一度直せば両方に効きます。',
				resultLabel: '成果',
				result: '[skill N 個 · N リポジトリで毎日利用]',
				tags: ['Claude Code', 'Codex', 'Skills'],
				draft: false,
			},
			{
				meta: 'エージェント開発 · パイプライン',
				title: '並列エージェントによる Issue → PR ループ',
				body: '準備のできた GitHub Issue をエージェントが拾い、それぞれ専用の git worktree で作業します。別のモデルが差分をレビューし、指摘があれば修正に戻り、問題のないものだけが Pull Request になります。マージは自分が判断します。',
				resultLabel: 'マージ前に止めた例',
				result: '[レビューで止めたバグの例]',
				tags: ['GitHub', 'git worktree', 'tmux', 'コードレビュー'],
				draft: false,
			},
			{
				meta: 'エージェント開発 · プロダクト',
				title: 'エージェントで開発したリゾートバイト求人アグリゲーター',
				body: 'Claude をマネージャー、Codex を実装とレビュー担当にして、計画から動く Web アプリまで一通り作ったプロダクトです。ツールづくりの外で、このワークフローがどこまで通用するかの検証でもあります。',
				resultLabel: '成果',
				result: '[リリースした内容 · リンク]',
				tags: ['Go', 'Next.js', 'Claude Code', 'Codex'],
				draft: false,
			},
			{
				meta: 'セキュリティ · 事例',
				title: '[セキュリティ事例のタイトル]',
				body: '[例：実際のリポジトリでコーディングエージェントが読み書き・実行できる範囲を監査し、見つけた危険な経路と変更内容]',
				resultLabel: '成果',
				result: '[発見 · 対策]',
				tags: ['脅威モデル', 'サンドボックス'],
				draft: true,
			},
		],
	},
	writing: {
		kicker: '記事',
		title: '実務でエージェントを動かして分かったこと。',
		rows: [
			// Links to the English article until a Japanese translation with the same key exists.
			{ date: '[日付]', title: 'エージェントがこのサイトの記事を書く。でも公開はできない。', post: 'agents-write-my-site' },
			{ date: '[日付]', title: 'コーディングエージェントをフル権限で回すとき、何をどう閉じ込めているか' },
			{ date: '[日付]', title: 'GitHub Issue 経由のプロンプトインジェクション：エージェント開発の脅威モデル' },
			{ date: '[日付]', title: '1つの指示セットを2つのモデルで：Claude Code と Codex で skill を共有する' },
		],
	},
	services: {
		kicker: 'ご相談',
		title: '採用でも、プロジェクト単位のご依頼でも。',
		columns: [
			{
				title: '採用のご相談',
				body: 'エージェント開発やセキュリティ領域の、正社員・業務委託のポジション。国内外のチームとフルリモートで。',
			},
			{
				title: 'エージェントを使っているチーム',
				body: '企業にも個人開発者にも。エージェントがリポジトリで動き始めたら、実行ごとに、何を変えたか、どこに触れたか、マージされたか差し戻されたかを見えるようにします。そこから、本当に合うワークフローが分かります。',
			},
			{
				title: 'エージェントのセキュリティレビュー',
				body: 'エージェントが何を読み、書き、実行できるのか。それを洗い出し、危険な経路を見つけ、具体的な対策をお渡しします。',
			},
		],
		strip: 'どれが合うか分からなくても大丈夫です。今取り組んでいることを教えてください。',
		cta: 'お問い合わせ',
	},
	about: {
		kicker: '自己紹介',
		lead: 'uuta です。日本在住のソフトウェアエンジニアです。[経歴を1行で：年数・技術スタック・これまでの役割]',
		body: '今はコードの大半を、自分が指示するエージェントが書いています。エンジニアとしての時間の多くは、その周りの仕組みに使っています。作業の分け方、レビューの通し方、エージェントを安全な範囲に留める方法、そして実際に何をしたかを見えるようにする方法です。',
		profileLink: 'プロフィールを見る',
		contact: '連絡先',
	},
};

export const home: Record<Lang, typeof en> = { en, ja };
