import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      // 可省略：由 remark-excerpt 自动取首段兜底（见 lib/posts.ts getExcerpt）
      description: z.string().min(1).optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      category: z.enum(['日常', '行旅', '读书', '摄影']),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

// 「此刻」集合(术语见 CONTEXT.md):首页案头近况的状态条目,正文为一页小记
const now = defineCollection({
  loader: glob({ base: './src/content/now', pattern: '**/*.md' }),
  schema: z.object({
    date: z.coerce.date(),
    items: z.array(
      z.object({
        label: z.string().min(1),
        text: z.string().min(1),
        state: z.string().min(1),
      }),
    ),
  }),
});

export const collections = { blog, now };
