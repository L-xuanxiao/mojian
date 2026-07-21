# 墨笺项目约定

## 沟通

- 每次回复以 `喵内が` 开头。

## 技术与部署

- Node.js 要求 `>=22.12.0`。项目为 Astro 7 静态站，使用 TypeScript 严格模式、Tailwind CSS 4、`astro-icon` 与 Material Symbols 图标集。
- GitHub Pages 站点基路径为 `/mojian/`，路由使用尾斜杠。站内链接和静态资源路径需兼容 `import.meta.env.BASE_URL`。
- 推送到 `main` 后由 GitHub Actions 构建并部署 Pages。
- `npm run build` 会在 `astro build` 后自动执行 `pagefind --site dist` 生成搜索索引（`dist/pagefind/`）；`/search/` 寻墨页依赖该索引，仅构建后可用，dev 模式下搜索框不工作。
- 页面切换由 Swup 无刷新驱动，交换容器为 `#main-content` 与 `#siteHeader`。换页时被换容器内的 `<script>` 不会重跑：需要跨页生效的逻辑放 `BaseLayout` 持久脚本并监听 `swup:page:view` 重放；DOM 查询在回调内即时进行，监听器只挂 window/document。`BaseLayout` 持久脚本带 `data-swup-ignore-script`，阻止 Swup ScriptsPlugin 换页重放内联脚本（重放会重复注册监听器、顶层声明冲突）。入口链接加 `data-no-swup` 可退回整页加载（如寻墨页、留墨页）。
- 昼夜双主题：`localStorage("mj-theme")` 存偏好，`<head>` 内联脚本首绘前写入 `html[data-theme]` 避免闪烁；夜色变量集中在 `global.css` 的 `html[data-theme="night"]` 块，切换按钮经 document 级委托 `[data-theme-toggle]` 处理，支持 View Transitions 时新主题从按钮中心圆形扩散，`prefers-reduced-motion` 或不支持时回退瞬时切换。
- 首载 loader、`#fx` 全局画布动效（花瓣/鼠标墨点/点击墨晕）、滚动进度条、回顶按钮均在 `BaseLayout`；reveal 隐藏态由 `.js` 根类门控，`prefers-reduced-motion` 时画布动效不启动，无 JS 时内容直接可见。
- 字体由 `src/integrations/font-pipeline.mjs` 在最终 HTML 生成后按实际字符裁切：Fontsource 包仅作构建源，`subset-font` 输出哈希 WOFF2/CSS 并注入字体占位标记，禁止在组件或 `BaseLayout` 直接导入 Fontsource CSS。字体角色统一使用 `data-font-role="serif|cal|hand"`，分配规则只写在 `src/styles/typography.css`。
- `astro-icon` 的 Material Symbols 图标须在 `astro.config.mjs` 的 `icon({include})` 白名单登记，新增图标未登记会构建报 `Unable to locate`。

## 目录

- `src/pages/`：页面路由。首页、归档、关于、404 与文章详情均使用 `BaseLayout`；文章详情由 `posts/[slug].astro` 生成；分类文章列表由 `category/[category].astro` 生成（slug 映射见 `siteConfig.categories`）；留墨页 `guestbook.astro` 为 mailto 书信表单 + giscus 评论墙预留（`siteConfig.giscus` 配好 `repoId`/`categoryId` 后才渲染，收件邮箱为 `siteConfig.contactEmail`）。
- `src/content/blog/`：Markdown 文章；字段约束见 `src/content.config.ts`。
- `src/config/siteConfig.ts`：站点集中配置（站名、导航、页脚、分类、文章列表行为、页面开关），消费方不在组件内硬编码这些值。
- `src/components/`：按职责分目录，清单与分类规则见 `src/components/README.md`。`layout/` 全站框架、`home/` 首页专属、`common/` 跨页复用。
- `src/layouts/`：`BaseLayout`（导航+页脚+`<head>`）与 `ArticleLayout`（文章详情）。
- `src/plugins/`：remark 插件（自动摘要、字数与阅读时长），产出写入 `remarkPluginFrontmatter`。
- `src/integrations/font-pipeline.mjs`：生产环境从最终 HTML 提取各角色字符并生成字体资产；开发环境从源码生成内存子集，经 Vite middleware 提供。
- `src/lib/posts.ts`：已发布文章过滤、排序、日期格式化与摘要兜底 `getExcerpt()`。
- `src/styles/global.css`：全局主题变量、基础样式与 `.reveal` 滚动显现工具类；`src/styles/typography.css`：全站字体分配唯一出处（body 默认 serif、表单继承、文字角色）；`src/assets/`：源码资源。
- 视觉规则见 [docs/DESIGN.md](docs/DESIGN.md)。

## 提交规范

- 使用 Conventional Commits：`feat:` / `fix:` / `refactor:` / `style:` / `docs:` / `chore:`。
- 一个提交只做一件事；重构提交不夹带视觉改动。

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

- 字体管线使用 Node.js 内置 `node:test`，命令为 `npm run test:fonts`，并已纳入 `npm run check`；其余模块暂无自动化测试框架。
- 源码改动至少运行 `npm run check` 和 `npm run build`（`astro check` 已含类型诊断，无需另跑 tsc）。
- 界面改动还需用浏览器实测：断点 1440 / 820 / 620 / 390，检查横向溢出、hover 与键盘焦点、控制台零报错；截图随 PR 附。
- 本机可用 playwright-cli（须 `--browser=chrome`）做断点截图与交互回归；用后清理仓库内 `.playwright-cli/` 目录。

## 内容约定

- 新文章放入 `src/content/blog/`，frontmatter 遵循 `src/content.config.ts`；分类仅限其中定义的枚举值。
- `description` 可省略，摘要自动取首段（`remark-excerpt`），显式书写优先。
- 列表与静态文章路由复用 `getPublishedPosts()`，不展示 `draft: true` 的文章。

## Agent skills

### Issue tracker

Issues are tracked as GitHub issues on `L-xuanxiao/mojian` (via `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage` / `needs-info` / `ready-for-agent` / `ready-for-human` / `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`CONTEXT.md` + `docs/adr/` at repo root, created lazily). See `docs/agents/domain.md`.
