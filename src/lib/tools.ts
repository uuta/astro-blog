import {
	siAstro,
	siClaude,
	siCloudflareworkers,
	siFlutter,
	siGit,
	siGithub,
	siGo,
	siNextdotjs,
	siTiktok,
	siTmux,
	type SimpleIcon,
} from 'simple-icons';

interface ToolEntry {
	name: string;
	icon: SimpleIcon;
	/** Near-black logos use the theme's text color so they stay visible in dark mode. */
	ink?: boolean;
	/** Same-hue shade for a theme where the brand color is under 3:1 against the card. */
	light?: string;
	dark?: string;
}

/**
 * Tools shown as brand icons on Work cards (paths and colors from simple-icons, CC0).
 * A tool without a simple-icons logo is left out rather than drawn by hand:
 * simple-icons has no OpenAI icon, so Codex is not listed.
 */
export const tools = {
	flutter: { name: 'Flutter', icon: siFlutter, dark: '#54C5F8' }, // Flutter's light blue
	cloudflareWorkers: { name: 'Cloudflare Workers', icon: siCloudflareworkers, light: '#E36E0C' },
	astro: { name: 'Astro', icon: siAstro },
	claudeCode: { name: 'Claude Code', icon: siClaude },
	github: { name: 'GitHub', icon: siGithub, ink: true },
	gitWorktree: { name: 'git worktree', icon: siGit },
	tmux: { name: 'tmux', icon: siTmux, light: '#18A51C' },
	go: { name: 'Go', icon: siGo, light: '#009BC1' },
	nextjs: { name: 'Next.js', icon: siNextdotjs, ink: true },
	tiktok: { name: 'TikTok', icon: siTiktok, ink: true },
} satisfies Record<string, ToolEntry>;

export type Tool = keyof typeof tools;

/** CSS color for a tool's icon; light-dark() follows the theme through color-scheme. */
export const toolColor = ({ icon, ink, light, dark }: ToolEntry): string => {
	if (ink) return 'var(--ink)';
	const brand = `#${icon.hex}`;
	return `light-dark(${light ?? brand}, ${dark ?? brand})`;
};
