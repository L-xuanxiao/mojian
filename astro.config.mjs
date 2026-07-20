// @ts-check
import swup from '@swup/astro';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';
import { remarkExcerpt } from './src/plugins/remark-excerpt.mjs';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

const REPO_BASE = '/mojian';

// https://astro.build/config
export default defineConfig({
  site: 'https://l-xuanxiao.github.io',
  base: REPO_BASE,
  trailingSlash: 'always',
  integrations: [
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      containers: ['#main-content', '#siteHeader'],
      smoothScrolling: false,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      // 换页时同步 body 类名（home-page / inner-page 决定顶部间距）
      updateBodyClass: true,
      globalInstance: true,
      // 锚点链接交给浏览器原生处理。
      // @ts-expect-error 选项透传给 swup 核心，@swup/astro 包装层类型未收录
      skipPopStateHandling: (/** @type {{ state?: { url?: string } | null }} */ event) =>
        event.state?.url?.includes('#'),
    }),
    icon({
      include: {
        'material-symbols': [
          'home-outline-rounded',
          'article-outline-rounded',
          'archive-outline-rounded',
          'person-outline-rounded',
          'menu-rounded'
        ]
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkExcerpt, remarkReadingTime]
  }
});
