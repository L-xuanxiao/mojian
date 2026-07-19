# 墨笺项目约定

## 沟通

- 每次回复以 `喵内が` 开头。

## 技术与部署

- Node.js 要求 `>=22.12.0`。项目为 Astro 7 静态站，使用 TypeScript 严格模式、Tailwind CSS 4、`astro-icon` 与 Material Symbols 图标集。
- GitHub Pages 站点基路径为 `/mojian/`，路由使用尾斜杠。站内链接和静态资源路径需兼容 `import.meta.env.BASE_URL`。
- 推送到 `main` 后由 GitHub Actions 构建并部署 Pages。

## 目录

- `src/pages/`：页面路由。首页、归档、关于、404 与文章详情均使用 `BaseLayout`；文章详情由 `posts/[slug].astro` 生成。
- `src/content/blog/`：Markdown 文章；字段约束见 `src/content.config.ts`。
- `src/components/`、`src/layouts/`：共享导航、页脚、文章组件与全站布局。
- `src/lib/posts.ts`：已发布文章过滤、排序和日期格式化。
- `src/styles/global.css`：全局主题变量与基础样式；`src/assets/`：源码资源。
- 视觉规则见 [docs/DESIGN.md](docs/DESIGN.md)。

## 命令

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

需要长期启动开发服务时使用 `astro dev --background`；通过 `astro dev status`、`astro dev logs`、`astro dev stop` 管理。

## 验证

- 项目当前没有自动化测试命令或测试框架。
- 源码改动至少运行 `npm run check` 和 `npm run build`。
- 界面改动还需优先使用内置浏览器检查桌面端、移动端、控制台和站内链接。

## 内容约定

- 新文章放入 `src/content/blog/`，frontmatter 遵循 `src/content.config.ts`；分类仅限其中定义的枚举值。
- 列表与静态文章路由复用 `getPublishedPosts()`，不展示 `draft: true` 的文章。
