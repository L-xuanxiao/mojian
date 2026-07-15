// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const REPO_BASE = '/mojian';

// https://astro.build/config
export default defineConfig({
  site: 'https://l-xuanxiao.github.io',
  base: REPO_BASE,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  }
});
