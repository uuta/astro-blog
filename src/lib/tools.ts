import {
	siAstro,
	siClaude,
	siCloudflareworkers,
	siFlutter,
	siGit,
	siGithub,
	siGo,
	siGooglegemini,
	siNextdotjs,
	siPosthog,
	siQwen,
	siSupabase,
	siTiktok,
	siTmux,
	type SimpleIcon,
} from 'simple-icons';

export interface ToolEntry {
	name: string;
	icon: Pick<SimpleIcon, 'path' | 'hex'>;
	/** The path relies on the even-odd fill rule for its cut-outs. */
	evenodd?: boolean;
	/** Near-black logos use the theme's text color so they stay visible in dark mode. */
	ink?: boolean;
	/** Same-hue shade for a theme where the brand color is under 3:1 against the card. */
	light?: string;
	dark?: string;
}

/**
 * Codex's mark: simple-icons has no OpenAI or Codex logo, so this is the mono Codex icon
 * from @lobehub/icons-static-svg 1.101.0 (MIT). Its hex is the dark end of Codex's gradient.
 */
const siCodex = {
	hex: '3941FF',
	path: 'M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z',
};

/**
 * Tools shown as brand icons on Work cards (paths and colors from simple-icons, CC0, except Codex).
 * A tool without a published logo is left out rather than drawn by hand.
 */
export const tools = {
	flutter: { name: 'Flutter', icon: siFlutter, dark: '#54C5F8' }, // Flutter's light blue
	cloudflareWorkers: { name: 'Cloudflare Workers', icon: siCloudflareworkers, light: '#E36E0C' },
	astro: { name: 'Astro', icon: siAstro },
	claudeCode: { name: 'Claude Code', icon: siClaude },
	codex: { name: 'Codex', icon: siCodex, evenodd: true, dark: '#7A9DFF' }, // the light middle of Codex's gradient
	github: { name: 'GitHub', icon: siGithub, ink: true },
	gitWorktree: { name: 'git worktree', icon: siGit },
	tmux: { name: 'tmux', icon: siTmux, light: '#18A51C' },
	go: { name: 'Go', icon: siGo, light: '#009BC1' },
	nextjs: { name: 'Next.js', icon: siNextdotjs, ink: true },
	tiktok: { name: 'TikTok', icon: siTiktok, ink: true },
	supabase: { name: 'Supabase', icon: siSupabase, light: '#249361' }, // the darker green in Supabase's logo
	gemini: { name: 'Gemini', icon: siGooglegemini },
	qwen: { name: 'Qwen', icon: siQwen },
	posthog: { name: 'PostHog', icon: siPosthog, ink: true },
} satisfies Record<string, ToolEntry>;

export type Tool = keyof typeof tools;

/** CSS color for a tool's icon; light-dark() follows the theme through color-scheme. */
export const toolColor = ({ icon, ink, light, dark }: ToolEntry): string => {
	if (ink) return 'var(--ink)';
	const brand = `#${icon.hex}`;
	return `light-dark(${light ?? brand}, ${dark ?? brand})`;
};
