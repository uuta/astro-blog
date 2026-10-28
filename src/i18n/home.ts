import type { Lang } from "./ui";
import type { Tool } from "../lib/tools";

/** A row in the Writing list. `post` is the key of a writing post; rows without one stay placeholders. */
/** A Work card under the feature. A card with a live `site` links to it instead of showing a Result row. */
export interface CaseCard {
  title: string;
  body: string;
  resultLabel?: string;
  result?: string;
  site?: { label: string; href: string };
  tools: Tool[];
  draft: boolean;
}

export interface WritingRow {
  date: string;
  title: string;
  post?: string;
}

const en = {
  meta: {
    title: "uuta — Growth with agents · Security",
    description:
      "I run the whole loop on my own products: analyze the market, build with an agent pipeline, and reach users with content that agents make and post.",
  },
  hero: {
    title: "Grow a product with agents, from the market to its users.",
    lead: "I run the whole loop on my own products: analyze the market, build with an agent pipeline, and reach users with content that agents make and post. I can help you set up the same loop, with guardrails where agents need them.",
    primary: "Work with me",
    secondary: "Read the writing",
    art: {
      label:
        "Pipeline diagram: first an analysis of the market, the infrastructure the work touches and the expected cost. A manager agent then assigns the task to one engineer agent working in its own git worktree. Reviewers are picked by what the change touched. Work that fails review goes back to the engineer for a fix; clean work becomes a pull request whose checks must pass, and I merge it. Last, agents make and post content so the product reaches its users.",
      // Top row (Analysis, Manager, Engineer) is labelled above the cards, the bottom row below;
      // Merged is a small circle between cards, so its label sits above it.
      // On narrow screens a sub-label wraps; the no-break spaces keep each "·" at a line end.
      nodes: [
        {
          x: "21%",
          y: "18.5%",
          above: true,
          name: "Analysis",
          sub: "market\u00a0· infra\u00a0· cost",
        },
        {
          x: "50%",
          y: "18.5%",
          above: true,
          name: "Manager",
          sub: "assigns the task",
        },
        {
          x: "79%",
          y: "18.5%",
          above: true,
          name: "Engineer",
          sub: "one worktree",
        },
        {
          x: "79%",
          y: "79.25%",
          above: false,
          name: "Reviewers",
          sub: "picked by the change",
        },
        {
          x: "53%",
          y: "79.25%",
          above: false,
          name: "Pull request",
          sub: "checks pass",
        },
        { x: "36%", y: "63.1%", above: true, name: "Merged", sub: "by me" },
        {
          x: "18.5%",
          y: "79.25%",
          above: false,
          name: "Distribution",
          sub: "content agents post",
        },
      ],
      fixRequested: "fix requested",
    },
  },
  focus: {
    title:
      "One loop from the market to its users, and the guardrails around it.",
    cards: [
      {
        icon: "analysis",
        title: "Analysis",
        body: "Before any agent runs.",
        items: [
          "The market your users spend time in",
          "The infrastructure the work touches",
          "What it will cost to build and run",
        ],
      },
      {
        icon: "workflow",
        title: "Build",
        body: "A manager agent hands each task to an engineer agent.",
        items: [
          "Reviewers picked by what the change touched, then CI",
          "Run history: what each agent changed, and what got merged or sent back",
          "Skills and instructions shared across Claude Code and Codex",
        ],
      },
      {
        icon: "distribution",
        title: "Distribution",
        body: "Content agents make and post, so the product reaches people. An ongoing experiment on SpeakGain.",
        items: [
          "Short videos and photo carousels made with image and video models",
          "Posted as drafts through Zernio",
          "I make the final call before anything goes out",
        ],
      },
      {
        icon: "security",
        title: "Security",
        body: "An agent with write access and a shell is a new attack surface. I treat it like one.",
        items: [
          "Permission and sandbox design for agents",
          "Prompt injection through issues, docs and web pages",
          "Keeping secrets out of agent context",
        ],
      },
    ],
  },
  work: {
    title: "Systems I run every day, and what they produced.",
    caseStudy: "Read the case study",
    feature: {
      title: "SpeakGain, an English speaking app",
      body: "Flashcards built from the English you wanted to say, learned out loud, with native-speaker audio, AI explanations, and pronunciation scoring. I build and run all of it with my agent workflow: the Flutter app, the Cloudflare Workers backend, the site, and the TikTok content that brings users in.",
      tools: [
        "flutter",
        "cloudflareWorkers",
        "supabase",
        "astro",
        "claudeCode",
        "codex",
        "gemini",
        "qwen",
        "posthog",
        "tiktok",
      ] as Tool[],
      shotAlt:
        "SpeakGain home screen: today's review, a progress ring and a Practice now button",
    },
    cards: [
      {
        title: "One skill library for Claude Code and Codex",
        body: "Workflow rules used to live in prompts I retyped. Now both agents load the same model-neutral skills (how to split an issue, review a diff, set up a worktree), so fixing a rule once fixes it for both.",
        resultLabel: "Result",
        tools: ["claudeCode", "codex"] as Tool[],
        draft: false,
      },
      {
        title: "Issue-to-PR loop with a manager agent",
        body: "A manager agent hands each issue to an engineer agent in its own worktree. Reviewers are picked by the change: one for a small change, several for a risky one. Failures go back for a fix; clean work becomes a pull request I merge.",
        resultLabel: "Caught before merge",
        tools: ["github", "gitWorktree", "tmux"] as Tool[],
        draft: false,
      },
      {
        title: "RESORN, structured search for resort jobs",
        body: "Live-in resort jobs across Japan, searchable by area, job type and conditions like a free dorm or meals. A Go crawler collects the listings and pulls those conditions out of free text. Claude managed it and Codex built and reviewed it, from the plan to the live site.",
        site: { label: "resorn.net", href: "https://resorn.net/" },
        tools: ["go", "nextjs", "postgresql", "claudeCode", "codex"] as Tool[],
        draft: false,
      },
      {
        title: "Social media analytics for X and Instagram",
        body: "On a product team: the move to X API v2, a new Instagram analytics feature from table design to Go batches, a PHP backend rewritten in Go, and shared React components that made front-end work faster.",
        tools: [
          "go",
          "react",
          "storybook",
          "bigquery",
          "mysql",
          "googleCloud",
        ] as Tool[],
        draft: false,
      },
    ] as CaseCard[],
  },
  writing: {
    title: "Notes from running agents on real work.",
    all: "All writing",
    rows: [
      {
        date: "[DATE]",
        title: "Agents write my site. They can't publish it.",
        post: "agents-write-my-site",
      },
      {
        date: "[DATE]",
        title:
          "Leaving coding agents on full autonomy: what I contain, and how",
      },
      {
        date: "[DATE]",
        title:
          "Prompt injection through GitHub issues: a threat model for agent pipelines",
      },
      {
        date: "[DATE]",
        title:
          "One instruction set, two models: sharing skills across Claude Code and Codex",
      },
    ] as WritingRow[],
  },
  services: {
    title: "Let's work together, on your team or on a project.",
    columns: [
      {
        title: "Joining your team",
        body: "Full-time or contract, working alongside your team on agentic workflows, growth or security. Remote, with teams in Japan or abroad.",
      },
      {
        title: "Growing a product with agents",
        body: "Where agents fit in your product's growth, from market analysis to distribution: what it will cost, and how to set it up.",
      },
      {
        title: "Agent security review",
        body: "What can your agents read, write and run? I map it, find the risky paths, and hand you concrete fixes.",
      },
    ],
    strip: "Not sure which fits? Tell me what you're working on.",
    cta: "Get in touch",
  },
};

const ja: typeof en = {
  meta: {
    title: "uuta — エージェントでグロース · セキュリティ",
    description:
      "自分のプロダクトで、この流れを丸ごと回しています。市場を分析し、エージェントのパイプラインで作り、エージェントが作って投稿するコンテンツでユーザーに届けます。",
  },
  hero: {
    title: "市場からユーザーまで、エージェントでプロダクトを育てる。",
    lead: "自分のプロダクトで、この流れを丸ごと回しています。市場を分析し、エージェントのパイプラインで作り、エージェントが作って投稿するコンテンツでユーザーに届ける。同じ流れを、エージェントに必要な安全策とあわせて組むお手伝いをします。",
    primary: "相談する",
    secondary: "記事を読む",
    art: {
      label:
        "パイプラインの図：まず市場、作業が触れるインフラ、想定コストを分析します。次にマネージャーのエージェントが、専用の git worktree で作業するエンジニアのエージェント1つにタスクを割り当てます。レビュアーは変更が触れた範囲に応じて選ばれます。レビューを通らなければ修正のためエンジニアに戻り、通ったものだけがチェックを通過した Pull Request になって、自分がマージします。最後に、エージェントがコンテンツを作って投稿し、プロダクトをユーザーに届けます。",
      nodes: [
        {
          x: "21%",
          y: "18.5%",
          above: true,
          name: "分析",
          sub: "市場\u00a0· インフラ\u00a0· コスト",
        },
        {
          x: "50%",
          y: "18.5%",
          above: true,
          name: "マネージャー",
          sub: "タスクを割り当て",
        },
        {
          x: "79%",
          y: "18.5%",
          above: true,
          name: "エンジニア",
          sub: "専用の worktree",
        },
        {
          x: "79%",
          y: "79.25%",
          above: false,
          name: "レビュアー",
          sub: "変更に応じて選ぶ",
        },
        {
          x: "53%",
          y: "79.25%",
          above: false,
          name: "Pull Request",
          sub: "チェック通過",
        },
        {
          x: "36%",
          y: "63.1%",
          above: true,
          name: "マージ",
          sub: "自分が判断",
        },
        {
          x: "18.5%",
          y: "79.25%",
          above: false,
          name: "配信",
          sub: "エージェントが投稿",
        },
      ],
      fixRequested: "修正依頼",
    },
  },
  focus: {
    title: "市場からユーザーまでの一つの流れと、それを囲む安全策。",
    cards: [
      {
        icon: "analysis",
        title: "分析",
        body: "エージェントを動かす前に。",
        items: [
          "ユーザーが時間を使っている市場",
          "作業が触れるインフラ",
          "作って運用するのにかかるコスト",
        ],
      },
      {
        icon: "workflow",
        title: "開発",
        body: "マネージャーのエージェントが、各タスクをエンジニアのエージェントに渡す。",
        items: [
          "変更が触れた範囲に応じてレビュアーを選び、その後に CI",
          "実行の記録：各エージェントが何を変え、何がマージされ、何が差し戻されたか",
          "Claude Code と Codex で共有する skill と指示",
        ],
      },
      {
        icon: "distribution",
        title: "配信",
        body: "エージェントが作って投稿するコンテンツで、プロダクトを人に届ける。SpeakGain で続けている実験です。",
        items: [
          "画像・動画モデルで作るショート動画と写真カルーセル",
          "Zernio から下書きとして投稿",
          "公開前の最終判断は自分",
        ],
      },
      {
        icon: "security",
        title: "セキュリティ",
        body: "書き込み権限とシェルを持つエージェントは、新しい攻撃面です。そのように扱います。",
        items: [
          "エージェントの権限とサンドボックスの設計",
          "Issue・ドキュメント・Web 経由のプロンプトインジェクション",
          "シークレットをエージェントの文脈に入れない設計",
        ],
      },
    ],
  },
  work: {
    title: "毎日動かしている仕組みと、そこから生まれたもの。",
    caseStudy: "事例を読む",
    feature: {
      title: "SpeakGain — 英語スピーキングアプリ",
      body: "言いたかった英語を口で覚える、自分だけの暗記カードアプリです。ネイティブ音声・AI 解説・発音採点つき。Flutter のアプリ、Cloudflare Workers のバックエンド、サイト、そしてユーザーを呼び込む TikTok のコンテンツまで、自分のエージェント開発フローで作り、運用しています。",
      tools: [
        "flutter",
        "cloudflareWorkers",
        "supabase",
        "astro",
        "claudeCode",
        "codex",
        "gemini",
        "qwen",
        "posthog",
        "tiktok",
      ] as Tool[],
      shotAlt:
        "SpeakGain のホーム画面。今日の復習の進み具合と「今すぐ学習する」ボタン",
    },
    cards: [
      {
        title: "Claude Code と Codex で共有する skill ライブラリ",
        body: "以前はワークフローのルールを毎回プロンプトに書いていました。今は両方のエージェントが同じモデル非依存の skill（Issue の分割、差分レビュー、worktree の準備など）を読み込むので、ルールを一度直せば両方に効きます。",
        resultLabel: "成果",
        result: "[skill N 個 · N リポジトリで毎日利用]",
        tools: ["claudeCode", "codex"] as Tool[],
        draft: false,
      },
      {
        title: "マネージャーエージェントによる Issue → PR ループ",
        body: "マネージャーのエージェントが Issue をエンジニアのエージェントに渡し、専用の worktree で作業させます。レビュアーは変更に応じて選び、小さな変更なら1つ、リスクのある変更なら複数。指摘があれば修正に戻り、問題のないものだけが Pull Request になって、自分がマージします。",
        resultLabel: "マージ前に止めた例",
        result: "[レビューで止めたバグの例]",
        tools: ["github", "gitWorktree", "tmux"] as Tool[],
        draft: false,
      },
      {
        title: "RESORN — 条件で探せるリゾートバイト求人",
        body: "全国の住み込みリゾートバイトを、エリアや職種、寮費無料・食事付きといった条件で探せる求人検索サイトです。Go のクローラーが求人を集め、本文に埋もれた条件を取り出します。計画から公開まで、Claude がマネージャー、Codex が実装とレビューを担当しました。",
        site: { label: "resorn.net", href: "https://resorn.net/" },
        tools: ["go", "nextjs", "postgresql", "claudeCode", "codex"] as Tool[],
        draft: false,
      },
      {
        title: "X と Instagram の SNS 分析プロダクト",
        body: "プロダクトチームで、X API v2 への移行、Instagram 分析の新機能（テーブル設計から Go のバッチまで）、PHP から Go へのバックエンド移行、フロントエンドの組み込みを速くする React の共通コンポーネント作りを担当しました。",
        tools: [
          "go",
          "react",
          "storybook",
          "bigquery",
          "mysql",
          "googleCloud",
        ] as Tool[],
        draft: false,
      },
    ] as CaseCard[],
  },
  writing: {
    title: "実務でエージェントを動かして分かったこと。",
    all: "記事一覧",
    rows: [
      // Links to the English article until a Japanese translation with the same key exists.
      {
        date: "[日付]",
        title: "エージェントがこのサイトの記事を書く。でも公開はできない。",
        post: "agents-write-my-site",
      },
      {
        date: "[日付]",
        title:
          "コーディングエージェントをフル権限で回すとき、何をどう閉じ込めているか",
      },
      {
        date: "[日付]",
        title:
          "GitHub Issue 経由のプロンプトインジェクション：エージェント開発の脅威モデル",
      },
      {
        date: "[日付]",
        title:
          "1つの指示セットを2つのモデルで：Claude Code と Codex で skill を共有する",
      },
    ],
  },
  services: {
    title: "チームの一員としても、プロジェクト単位でも、一緒に進めます。",
    columns: [
      {
        title: "チームに加わる",
        body: "正社員でも業務委託でも、チームと一緒にエージェント開発、グロース、セキュリティに取り組みます。国内外のチームとフルリモートで。",
      },
      {
        title: "エージェントでプロダクトを育てる",
        body: "市場分析から配信まで、プロダクトの成長のどこにエージェントが合うか。かかるコストと、組み方まで。",
      },
      {
        title: "エージェントのセキュリティレビュー",
        body: "エージェントが何を読み、書き、実行できるのか。それを洗い出し、危険な経路を見つけ、具体的な対策をお渡しします。",
      },
    ],
    strip:
      "どれが合うか分からなくても大丈夫です。今取り組んでいることを教えてください。",
    cta: "お問い合わせ",
  },
};

export const home: Record<Lang, typeof en> = { en, ja };
