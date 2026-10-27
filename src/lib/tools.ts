import {
	siAstro,
	siClaude,
	siCloudflareworkers,
	siFlutter,
	siGit,
	siGithub,
	siGo,
	siNextdotjs,
	siTmux,
	type SimpleIcon,
} from 'simple-icons';

/**
 * Tools shown as brand icons on Work cards (paths from simple-icons, CC0).
 * A tool without a simple-icons logo is left out rather than drawn by hand:
 * simple-icons has no OpenAI icon, so Codex is not listed.
 */
export const tools = {
	flutter: { name: 'Flutter', icon: siFlutter },
	cloudflareWorkers: { name: 'Cloudflare Workers', icon: siCloudflareworkers },
	astro: { name: 'Astro', icon: siAstro },
	claudeCode: { name: 'Claude Code', icon: siClaude },
	github: { name: 'GitHub', icon: siGithub },
	gitWorktree: { name: 'git worktree', icon: siGit },
	tmux: { name: 'tmux', icon: siTmux },
	go: { name: 'Go', icon: siGo },
	nextjs: { name: 'Next.js', icon: siNextdotjs },
} satisfies Record<string, { name: string; icon: SimpleIcon }>;

export type Tool = keyof typeof tools;
