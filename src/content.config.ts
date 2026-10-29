import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
	// Files live in writing/<lang>/<slug>.md; the slug becomes the URL under /<lang>/posts/
	// or, for the Journal, /<lang>/journal/.
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		// Shown in lists and meta tags. Without one, the opening of the article stands in.
		description: z.string().optional(),
		// A real date, or a bracketed placeholder such as "[DATE]" until one is set.
		date: z.union([z.string().regex(/^\[.+\]$/), z.coerce.date()]),
		lang: z.enum(['en', 'ja']),
		// Writing is the professional list; the Journal keeps personal essays and travel apart.
		section: z.enum(['writing', 'journal']).default('writing'),
		// Shared by an article and its translation.
		key: z.string().optional(),
		// Marks this file as the translation, not the original, of the article that shares its key.
		translated: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { writing };
