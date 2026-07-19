# 墨笺

基于 Astro 7、Tailwind CSS 4 与 Markdown 的水墨书卷风个人博客。

在线访问：[l-xuanxiao.github.io/mojian](https://l-xuanxiao.github.io/mojian/)

## 技术栈

- Astro 7 静态站点与严格模式 TypeScript
- Tailwind CSS 4
- `astro-icon` 与 Material Symbols
- Astro Content Collections 管理 Markdown 文章

## 本地开发

需要 Node.js `>=22.12.0`。

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:4321/mojian/`。

## 写一篇文章

在 `src/content/blog/` 新建 `.md` 文件，并按 `src/content.config.ts` 填写 Frontmatter：

```yaml
---
title: 文章标题
description: 文章摘要
pubDate: 2026-07-18
category: 日常
tags:
  - 随记
draft: false
---
```

分类仅支持 `日常`、`行旅`、`读书`、`摄影`；`updatedDate` 与 `cover` 可选。草稿不会出现在列表或静态文章路由中。

## 检查与构建

```bash
npm run check
npm run build
npm run preview
```

生产文件会生成到 `dist/`，该目录不会提交到 Git。

## 目录

- `src/pages/`：首页、归档、关于、404 与文章路由
- `src/content/blog/`：Markdown 文章
- `src/components/`、`src/layouts/`：共享导航、页脚与布局
- `src/styles/global.css`：全站主题与基础样式
- `src/assets/`：源码图片资源
- `docs/DESIGN.md`：全站视觉与响应式规范

## 部署

站点基路径为 `/mojian/`。推送到 `main` 后，[GitHub Actions](.github/workflows/deploy.yml) 会自动构建并部署到 GitHub Pages。
