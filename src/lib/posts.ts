import { getCollection } from 'astro:content';
import { siteConfig } from '../config/siteConfig';

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// 窄栏场景（手卷卡片元信息列）的短日期：2026.07.15，避免长格式折行出孤儿字
export function formatDateShort(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

// 摘要：显式 description 优先，否则用 remark-excerpt 提取的首段文本并按配置截断
export function getExcerpt(
  post: { data: { description?: string } },
  remarkPluginFrontmatter?: Record<string, unknown>,
) {
  if (post.data.description) return post.data.description;
  const excerpt = String(remarkPluginFrontmatter?.excerpt ?? '');
  const max = siteConfig.postList.excerptLength;
  return excerpt.length > max ? `${excerpt.slice(0, max)}…` : excerpt;
}
