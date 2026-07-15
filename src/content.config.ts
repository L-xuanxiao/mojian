import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      category: z.enum(['日常', '行旅', '读书', '摄影']),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
