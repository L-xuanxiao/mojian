import type { APIRoute } from 'astro';
import { withBase } from '../site.config';

// 动态生成 robots.txt：Sitemap 指向 Astro.site，避免静态文件中域名过期
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
