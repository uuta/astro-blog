import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
	// Files live in writing/<lang>/<slug>.md; the slug becomes the URL under /<lang>/posts/.
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// A real date, or a bracketed placeholder such as "[DATE]" until one is set.
		date: z.union([z.string().regex(/^\[.+\]$/), z.coerce.date()]),
		lang: z.enum(['en', 'ja']),
		// Shared by an article and its translation.
		key: z.string().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { writing };
