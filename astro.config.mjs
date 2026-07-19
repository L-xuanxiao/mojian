// @ts-check
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
