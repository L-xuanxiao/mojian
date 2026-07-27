import { render } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { siteConfig } from '../config/siteConfig';
import { getExcerpt, getPublishedPosts } from '../lib/posts';

// RSS 订阅源：已发布文章按时间倒序；site 带上 base，channel 链接与 item 绝对链接才指向 /mojian/ 下
export async function GET(context: APIContext) {
  if (!context.site) throw new Error('rss.xml: astro.config.mjs 未配置 site');
  const site = new URL(import.meta.env.BASE_URL, context.site);

  const posts = await getPublishedPosts();
  const items = await Promise.all(
    posts.map(async (post) => {
      const { remarkPluginFrontmatter } = await render(post);
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: getExcerpt(post, remarkPluginFrontmatter),
        link: `posts/${post.id}/`,
      };
    }),
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site,
    items,
    customData: '<language>zh-cn</language>',
  });
}
