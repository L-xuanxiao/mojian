// RSS 订阅源：/rss.xml，文章发布后自动进入
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { withBase } from '../site.config';

export async function GET(context: APIContext) {
  const posts = (await getCollection('journal', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: '墨笺 · 笺录',
    description: '文章与随笔：设计、营造与阅读的记录。',
    // astro.config.mjs 已配置 site；补上 base，频道 link 才指向站点首页而非域名根
    site: new URL(withBase('/'), context.site!),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/journal/${post.id}/`),
    })),
  });
}
