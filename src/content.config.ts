import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// 笺录：博客文章集合。schema 按规划 §17；draft 文章在所有页面与 RSS 中过滤
const journal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

// 器作：项目叙事与图集。图片由 schema 导入，交给 astro:assets 在构建期优化
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number().int(),
      status: z.string(),
      role: z.string(),
      stack: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .min(1),
      order: z.number().int(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

// 光影：独立影像条目，可关联器作；orientation 仅用于编排，不改变图片语义
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      alt: z.string(),
      year: z.number().int(),
      medium: z.string(),
      orientation: z.enum(['landscape', 'portrait', 'wide']),
      project: reference('projects').optional(),
      order: z.number().int(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

export const collections = { journal, projects, gallery };
