# 墨笺

基于 Astro 7、Tailwind CSS 4 与 Markdown 的水墨书卷风个人博客。宣纸、墨色、朱砂与山水长卷构成统一视觉，支持昼夜双主题。

在线访问：[l-xuanxiao.github.io/mojian](https://l-xuanxiao.github.io/mojian/)

## 功能

- 首页水墨首屏 + 三栏书斋布局，文章以手卷卡片呈现
- 昼夜双主题，偏好本地记忆，首绘前应用无闪烁
- 首载墨笺动画；花瓣飘落、鼠标墨点、点击墨晕等全局画布动效（尊重 `prefers-reduced-motion`）
- 归档页为年谱时间线：干支圆章纪年，条目左右交替
- 分类静态页、寻墨搜索页（Pagefind）、留墨页（mailto 书信 + giscus 评论墙预留）
- Swup 无刷新页面切换；无 JavaScript 时核心内容完整可见
- 文章自动摘要、字数与阅读时长（remark 插件写入 frontmatter）

## 技术栈

- Astro 7 静态站点与严格模式 TypeScript
- Tailwind CSS 4
- Swup（`@swup/astro`）页面过渡
- Pagefind 静态搜索索引（构建时生成）
- `astro-icon` 与 Material Symbols
- `@fontsource/noto-serif-sc`、`@fontsource/ma-shan-zheng`、`@fontsource/long-cang` 自托管字体
- Astro Content Collections 管理 Markdown 文章

## 本地开发

需要 Node.js `>=22.12.0`。

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:4321/mojian/`。

搜索索引仅在构建后生成，dev 模式下寻墨页搜索框不工作；验证搜索请用 `npm run build` 后 `npm run preview`。

## 写一篇文章

在 `src/content/blog/` 新建 `.md` 文件，并按 `src/content.config.ts` 填写 Frontmatter：

```yaml
---
title: 文章标题
pubDate: 2026-07-18
category: 日常
tags:
  - 随记
draft: false
---
```

分类仅支持 `日常`、`行旅`、`读书`、`摄影`；`description`、`updatedDate` 与 `cover` 可选，摘要缺省自动取首段。草稿不会出现在列表或静态文章路由中。

## 检查与构建

```bash
npm run check
npm run build
npm run preview
```

`npm run build` 在 `astro build` 后自动执行 `pagefind --site dist` 生成搜索索引。生产文件生成到 `dist/`，该目录不会提交到 Git。

## 目录

- `src/pages/`：首页、归档、分类、寻墨、留墨、关于、404 与文章路由
- `src/content/blog/`：Markdown 文章
- `src/config/siteConfig.ts`：站点集中配置（导航、页脚、分类、页面开关、giscus）
- `src/components/`、`src/layouts/`：共享导航、页脚与布局
- `src/plugins/`：remark 插件（自动摘要、字数与阅读时长）
- `src/styles/global.css`：全站主题变量（含夜色）、基础样式
- `src/assets/`：源码图片资源
- `docs/DESIGN.md`：全站视觉与响应式规范

## 部署

站点基路径为 `/mojian/`。推送到 `main` 后，[GitHub Actions](.github/workflows/deploy.yml) 会自动构建并部署到 GitHub Pages。
