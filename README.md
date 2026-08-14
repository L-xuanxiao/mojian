# Mojian

融合东方美学、个人内容与现代网页体验的数字空间。

## 当前技术基线

- Astro 7
- React 19（Island 按需 Hydrate：笺录检索、项目轮播、光影灯箱）
- TypeScript（严格模式）
- Tailwind CSS 4 + 原生 CSS
- 设计令牌与昼夜主题：`src/styles/global.css`（CSS Variables + Tailwind `@theme`）
- 字体：Astro Fonts 自托管（Noto Serif SC / Noto Sans SC / Ma Shan Zheng）
- 动画：GSAP + ScrollTrigger + Lenis；Motion 仅用于 React Island
- 内容：Content Collections（`journal` / `projects` / `gallery`），Markdown 优先、MDX 按需
- 图片：`astro:assets` + Sharp（构建期响应式优化与尺寸推断）
- 作品交互：Embla Carousel + Yet Another React Lightbox
- 搜索：Pagefind（构建期索引，`pnpm build` 自动执行）
- RSS：`/rss.xml`（@astrojs/rss）
- SEO：canonical / Open Graph / Twitter Card / JSON-LD（`src/components/Seo.astro`）+ @astrojs/sitemap + 动态 `/robots.txt`
- 图标：Lucide（功能图标）+ 自定义 SVG（古风装饰）
- pnpm

测试能力按开发阶段逐项引入，不批量提前安装。

## 常用命令

| 命令                | 说明                                   |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | 启动本地开发服务器（无 Pagefind 索引） |
| `pnpm check`        | 执行 Astro 与类型检查                  |
| `pnpm build`        | 构建生产版本并生成 Pagefind 索引       |
| `pnpm format`       | 格式化项目文件                         |
| `pnpm format:check` | 检查项目文件格式                       |
| `pnpm preview`      | 本地预览生产构建（含检索索引）         |

## 当前结构

```text
src/
├── assets/
│   ├── art/           # 原创纸墨山水视觉
│   └── projects/      # 器作与光影源图
├── components/
│   ├── Header.astro / Footer.astro / PageIntro.astro / SectionHeading.astro / Seo.astro
│   ├── home/          # 首页区块
│   ├── journal/       # 笺录组件（EntryList、JournalSearch 检索岛）
│   ├── projects/      # ProjectCarousel 轮播岛
│   ├── gallery/       # GalleryLightbox 灯箱岛
│   ├── about/         # 此间区块（自述、行年年谱、往来表单）
│   └── guestbook/     # GiscusWall 留言墙（giscus 配置化嵌入）
├── content/
│   ├── journal/       # 文章（.md / .mdx）
│   ├── projects/      # 器作叙事与图集
│   └── gallery/       # 光影条目
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro    # 此间（其人、行年、往来）
│   ├── guestbook.astro # 留墨（留言墙）
│   ├── rss.xml.ts
│   ├── robots.txt.ts  # 动态 robots（Sitemap 指向 Astro.site）
│   ├── journal/       # 总目、详情、年谱归档、分类、标签
│   ├── projects/      # 器作总览与详情
│   └── gallery/       # 光影总览与灯箱
├── scripts/           # 客户端脚本（scroll / reveal）
├── styles/
│   └── global.css
├── utils/
│   └── date.ts
├── site.config.ts     # 站点配置（联系邮箱、Formspree、giscus）
└── content.config.ts  # 内容集合 schema
```

项目定位、技术选型与开发阶段参见 [`docs/mojian_plan.md`](docs/mojian_plan.md)。
