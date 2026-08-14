// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 站点域名：RSS / sitemap / canonical / OG 需要绝对 URL
  site: 'https://l-xuanxiao.github.io',
  // 部署在 GitHub Pages 项目页子路径下；站内手写的根路径链接须经 site.config 的 withBase 拼接
  base: '/mojian',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // css-variables 主题：高亮颜色全部走 --shiki-token-* 变量（见 global.css），昼夜随站点令牌切换
      theme: 'css-variables',
    },
  },
  // 字体经 Astro Fonts 自托管：构建期下载并生成优化 fallback，页面不直连第三方字体服务
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Noto Serif SC',
      cssVariable: '--font-noto-serif',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['chinese-simplified', 'latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Noto Sans SC',
      cssVariable: '--font-noto-sans',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['chinese-simplified', 'latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Ma Shan Zheng',
      cssVariable: '--font-ma-shan-zheng',
      weights: [400],
      styles: ['normal'],
      subsets: ['chinese-simplified', 'latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
