// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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
