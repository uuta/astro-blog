import type { Lang } from './ui';
import type { Tool } from '../lib/tools';

/** A row in the Writing list. `post` is the key of a writing post; rows without one stay placeholders. */
export interface WritingRow {
	date: string;
	title: string;
	post?: string;
}

const en = {
	meta: {
		title: 'uuta — Growth with agents · Security',
		description:
			'I run the whole loop on my own app: analyze the market, build with an agent pipeline, and reach users with content that agents make and post.',
	},
	hero: {
		kicker: 'Growth with agents · Security',
		title: 'Grow an app with agents, from the market to its users.',
		lead: 'I run the whole loop on my own app: analyze the market, build with an agent pipeline, and reach users with content that agents make and post. I can help you set up the same loop, with guardrails where agents need them.',
		primary: 'Work with me',
		secondary: 'Read the writing',
		art: {
			label:
				'Pipeline diagram: first an analysis of the market, the infrastructure the work touches and the expected cost. A manager agent then assigns the task to one engineer agent working in its own git worktree. Reviewers are picked by what the change touched. Work that fails review goes back to the engineer for a fix; clean work becomes a pull request whose checks must pass, and I merge it. Last, agents make and post content so the app reaches its users.',
			// Top row (Analysis, Manager, Engineer) is labelled above the cards, the bottom row below;
			// Merged is a small circle between cards, so its label sits above it.
			// On narrow screens a sub-label wraps; the no-break spaces keep each "·" at a line end.
			nodes: [
				{ x: '21%', y: '18.5%', above: true, name: 'Analysis', sub: 'market\u00a0· infra\u00a0· cost' },
				{ x: '50%', y: '18.5%', above: true, name: 'Manager', sub: 'assigns the task' },
				{ x: '79%', y: '18.5%', above: true, name: 'Engineer', sub: 'one worktree' },
				{ x: '79%', y: '79.25%', above: false, name: 'Reviewers', sub: 'picked by the change' },
				{ x: '53%', y: '79.25%', above: false, name: 'Pull request', sub: 'checks pass' },
				{ x: '36%', y: '63.1%', above: true, name: 'Merged', sub: 'by me' },
				{ x: '18.5%', y: '79.25%', above: false, name: 'Distribution', sub: 'content agents post' },
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
		title: 'One loop from the market to its users, and the guardrails around it.',
		cards: [
			{
				icon: 'analysis',
				title: 'Analysis',
				body: 'Before any agent runs.',
				items: [
					'The market your users spend time in',
					'The infrastructure the work touches',
					'What it will cost to build and run',
				],
			},
			{
				icon: 'workflow',
				title: 'Build',
				body: 'A manager agent hands each task to an engineer agent.',
				items: [
					'Reviewers picked by what the change touched, then CI',
					'Run history: what each agent changed, and what got merged or sent back',
					'Skills and instructions shared across Claude Code and Codex',
				],
			},
			{
				icon: 'distribution',
				title: 'Distribution',
				body: 'Content agents make and post, so the app reaches people. An ongoing experiment on SpeakGain.',
				items: [
					'Short videos and photo carousels made with image and video models',
					'Posted as drafts through Zernio',
					'I make the final call before anything goes out',
				],
			},
			{
				icon: 'security',
				title: 'Security',
				body: 'An agent with write access and a shell is a new attack surface. I treat it like one.',
				items: [
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
			title: 'SpeakGain, an English speaking app',
			body: 'Flashcards built from the English you wanted to say, learned out loud, with native-speaker audio, AI explanations, and pronunciation scoring. I build and run all of it with my agent workflow: the Flutter app, the Cloudflare Workers backend, the site, and the TikTok content that brings users in.',
			tools: ['flutter', 'cloudflareWorkers', 'astro', 'claudeCode', 'tiktok'] as Tool[],
			shotAlt: "SpeakGain home screen: today's review, a progress ring and a Practice now button",
		},
		cards: [
			{
				title: 'One skill library for Claude Code and Codex',
				body: 'Workflow rules used to live in prompts I retyped. Now both agents load the same model-neutral skills (how to split an issue, review a diff, set up a worktree), so fixing a rule once fixes it for both.',
				resultLabel: 'Result',
				result: '[N skills, in daily use across N repos]',
				tools: ['claudeCode'] as Tool[],
				draft: false,
			},
			{
				title: 'Issue-to-PR loop with a manager agent',
				body: 'A manager agent hands each issue to an engineer agent in its own worktree. Reviewers are picked by the change: one for a small change, several for a risky one. Failures go back for a fix; clean work becomes a pull request I merge.',
				resultLabel: 'Caught before merge',
				result: '[A BUG THE REVIEW STEP STOPPED]',
				tools: ['github', 'gitWorktree', 'tmux'] as Tool[],
				draft: false,
			},
			{
				title: 'A resort-job aggregator, built by agents',
				body: 'A real product built end to end with Claude as the manager and Codex as implementer and reviewer, from the plan to a running web app. A test of how far the workflow holds up outside of tooling.',
				resultLabel: 'Result',
				result: '[WHAT SHIPPED · LINK]',
				tools: ['go', 'nextjs', 'claudeCode'] as Tool[],
				draft: false,
			},
			{
				title: '[SECURITY CASE STUDY TITLE]',
				body: '[e.g. an audit of what a coding agent could read, write and run on a real repo, the risky paths found, and what changed]',
				resultLabel: 'Result',
				result: '[FINDINGS · FIXES]',
				tools: [] as Tool[],
				draft: true,
			},
		],
	},
	writing: {
		kicker: 'Writing',
		title: 'Notes from running agents on real work.',
		all: 'All writing',
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
				body: 'Full-time or contract roles in agentic workflow, growth or security engineering. Remote, with teams in Japan or abroad.',
			},
			{
				title: 'Growing an app with agents',
				body: "Where agents fit in your product's growth, from market analysis to distribution: what it will cost, and how to set it up.",
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
		body: 'Agents I direct write most of my code. Most of my time goes into the system around them: how work is split and reviewed, how they stay inside safe bounds, and how to see what they actually did.',
		callsTitle: 'Three calls I keep',
		calls: [
			{ title: 'What to build', sub: 'after looking at the market, infrastructure and cost', handoff: 'agents build it' },
			{ title: 'What merges', sub: 'after the reviewers and CI', handoff: 'agents make the content' },
			{ title: 'What gets posted', sub: 'before anything goes out' },
		] as { title: string; sub: string; handoff?: string }[],
	},
};

const ja: typeof en = {
	meta: {
		title: 'uuta — エージェントでグロース · セキュリティ',
		description:
			'自分のアプリで、この流れを丸ごと回しています。市場を分析し、エージェントのパイプラインで作り、エージェントが作って投稿するコンテンツでユーザーに届けます。',
	},
	hero: {
		kicker: 'エージェントでグロース · セキュリティ',
		title: '市場からユーザーまで、エージェントでアプリを育てる。',
		lead: '自分のアプリで、この流れを丸ごと回しています。市場を分析し、エージェントのパイプラインで作り、エージェントが作って投稿するコンテンツでユーザーに届ける。同じ流れを、エージェントに必要な安全策とあわせて組むお手伝いをします。',
		primary: '相談する',
		secondary: '記事を読む',
		art: {
			label:
				'パイプラインの図：まず市場、作業が触れるインフラ、想定コストを分析します。次にマネージャーのエージェントが、専用の git worktree で作業するエンジニアのエージェント1つにタスクを割り当てます。レビュアーは変更が触れた範囲に応じて選ばれます。レビューを通らなければ修正のためエンジニアに戻り、通ったものだけがチェックを通過した Pull Request になって、自分がマージします。最後に、エージェントがコンテンツを作って投稿し、アプリをユーザーに届けます。',
			nodes: [
				{ x: '21%', y: '18.5%', above: true, name: '分析', sub: '市場\u00a0· インフラ\u00a0· コスト' },
				{ x: '50%', y: '18.5%', above: true, name: 'マネージャー', sub: 'タスクを割り当て' },
				{ x: '79%', y: '18.5%', above: true, name: 'エンジニア', sub: '専用の worktree' },
				{ x: '79%', y: '79.25%', above: false, name: 'レビュアー', sub: '変更に応じて選ぶ' },
				{ x: '53%', y: '79.25%', above: false, name: 'Pull Request', sub: 'チェック通過' },
				{ x: '36%', y: '63.1%', above: true, name: 'マージ', sub: '自分が判断' },
				{ x: '18.5%', y: '79.25%', above: false, name: '配信', sub: 'エージェントが投稿' },
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
		title: '市場からユーザーまでの一つの流れと、それを囲む安全策。',
		cards: [
			{
				icon: 'analysis',
				title: '分析',
				body: 'エージェントを動かす前に。',
				items: [
					'ユーザーが時間を使っている市場',
					'作業が触れるインフラ',
					'作って運用するのにかかるコスト',
				],
			},
			{
				icon: 'workflow',
				title: '開発',
				body: 'マネージャーのエージェントが、各タスクをエンジニアのエージェントに渡す。',
				items: [
					'変更が触れた範囲に応じてレビュアーを選び、その後に CI',
					'実行の記録：各エージェントが何を変え、何がマージされ、何が差し戻されたか',
					'Claude Code と Codex で共有する skill と指示',
				],
			},
			{
				icon: 'distribution',
				title: '配信',
				body: 'エージェントが作って投稿するコンテンツで、アプリを人に届ける。SpeakGain で続けている実験です。',
				items: [
					'画像・動画モデルで作るショート動画と写真カルーセル',
					'Zernio から下書きとして投稿',
					'公開前の最終判断は自分',
				],
			},
			{
				icon: 'security',
				title: 'セキュリティ',
				body: '書き込み権限とシェルを持つエージェントは、新しい攻撃面です。そのように扱います。',
				items: [
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
			title: 'SpeakGain — 英語スピーキングアプリ',
			body: '言いたかった英語を口で覚える、自分だけの暗記カードアプリです。ネイティブ音声・AI 解説・発音採点つき。Flutter のアプリ、Cloudflare Workers のバックエンド、サイト、そしてユーザーを呼び込む TikTok のコンテンツまで、自分のエージェント開発フローで作り、運用しています。',
			tools: ['flutter', 'cloudflareWorkers', 'astro', 'claudeCode', 'tiktok'] as Tool[],
			shotAlt: 'SpeakGain のホーム画面。今日の復習の進み具合と「今すぐ学習する」ボタン',
		},
		cards: [
			{
				title: 'Claude Code と Codex で共有する skill ライブラリ',
				body: '以前はワークフローのルールを毎回プロンプトに書いていました。今は両方のエージェントが同じモデル非依存の skill（Issue の分割、差分レビュー、worktree の準備など）を読み込むので、ルールを一度直せば両方に効きます。',
				resultLabel: '成果',
				result: '[skill N 個 · N リポジトリで毎日利用]',
				tools: ['claudeCode'] as Tool[],
				draft: false,
			},
			{
				title: 'マネージャーエージェントによる Issue → PR ループ',
				body: 'マネージャーのエージェントが Issue をエンジニアのエージェントに渡し、専用の worktree で作業させます。レビュアーは変更に応じて選び、小さな変更なら1つ、リスクのある変更なら複数。指摘があれば修正に戻り、問題のないものだけが Pull Request になって、自分がマージします。',
				resultLabel: 'マージ前に止めた例',
				result: '[レビューで止めたバグの例]',
				tools: ['github', 'gitWorktree', 'tmux'] as Tool[],
				draft: false,
			},
			{
				title: 'エージェントで開発したリゾートバイト求人アグリゲーター',
				body: 'Claude をマネージャー、Codex を実装とレビュー担当にして、計画から動く Web アプリまで一通り作ったプロダクトです。ツールづくりの外で、このワークフローがどこまで通用するかの検証でもあります。',
				resultLabel: '成果',
				result: '[リリースした内容 · リンク]',
				tools: ['go', 'nextjs', 'claudeCode'] as Tool[],
				draft: false,
			},
			{
				title: '[セキュリティ事例のタイトル]',
				body: '[例：実際のリポジトリでコーディングエージェントが読み書き・実行できる範囲を監査し、見つけた危険な経路と変更内容]',
				resultLabel: '成果',
				result: '[発見 · 対策]',
				tools: [] as Tool[],
				draft: true,
			},
		],
	},
	writing: {
		kicker: '記事',
		title: '実務でエージェントを動かして分かったこと。',
		all: '記事一覧',
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
				body: 'エージェント開発、グロース、セキュリティ領域の、正社員・業務委託のポジション。国内外のチームとフルリモートで。',
			},
			{
				title: 'エージェントでアプリを育てる',
				body: '市場分析から配信まで、プロダクトの成長のどこにエージェントが合うか。かかるコストと、組み方まで。',
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
		body: '今はコードの大半を、自分が指示するエージェントが書いています。時間の多くは、その周りの仕組みに使っています。作業の分け方とレビューの通し方、エージェントを安全な範囲に留める方法、そして実際に何をしたかを見えるようにする方法です。',
		callsTitle: '自分で持つ3つの判断',
		calls: [
			{ title: '何を作るか', sub: '市場・インフラ・コストを見てから', handoff: 'エージェントが作る' },
			{ title: '何をマージするか', sub: 'レビューと CI を通ったあとで', handoff: 'エージェントがコンテンツを作る' },
			{ title: '何を投稿するか', sub: '公開する前に' },
		],
	},
};

export const home: Record<Lang, typeof en> = { en, ja };
