# Mojian

融合东方美学、个人内容与现代网页体验的数字空间。

[在线访问](https://l-xuanxiao.github.io/mojian/) · [内容与配置](#内容维护) · [组件说明](src/components/README.md) · [设计契约](DESIGN.md)

## 项目定位

墨笺（mojian）是一座部署在 GitHub Pages 上的个人数字书房。站点以「笺录」「器作」「光影」承载文章、项目与影像，以「此间」「留墨」补全个人介绍和访客交流；视觉语言围绕宣纸、松烟墨、朱砂、题跋与装裱建立，但内容、语义和可访问性始终优先。

项目保持纯静态架构：页面与内容在构建期生成，交互按需水合为 React Island，搜索索引由 Pagefind 在生产构建后生成。外部服务未配置时，联系表单和留言墙显示可理解的静态空态，不阻塞其他页面。

| 卷目 | 路由                 | 内容来源                                             |
| ---- | -------------------- | ---------------------------------------------------- |
| 卷首 | `/mojian/`           | 三个内容集合、站点配置与首页数据文件                 |
| 笺录 | `/mojian/journal/`   | `src/content/journal/`                               |
| 器作 | `/mojian/projects/`  | `src/content/projects/`                              |
| 光影 | `/mojian/gallery/`   | `src/content/gallery/`                               |
| 此间 | `/mojian/about/`     | `src/site.config.ts` 与 `src/components/about/` 数据 |
| 留墨 | `/mojian/guestbook/` | `src/site.config.ts` 中的 giscus 配置                |

## 当前技术基线

- Astro 7
- React 19（Island 按需 Hydrate：题跋提示、笺录检索、项目轮播、光影灯箱）
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

关键交互使用 Playwright 在生产构建上回归；GitHub Pages 部署必须等待格式、类型与浏览器测试全部通过。

## 快速开始

### 环境要求

- Node.js `>= 22.12.0`
- pnpm
- 首次运行浏览器回归时，需要安装 Playwright Chromium

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

开发服务器输出的本地地址即为入口。由于项目配置了 `base: '/mojian'`，页面路径带有 `/mojian/` 前缀。

本地开发完成的最低标准：页面能够打开，终端没有 Astro 或 TypeScript 错误；涉及搜索时，还需执行生产构建并使用 `pnpm preview`，因为 `pnpm dev` 不生成 Pagefind 索引。

## 常用命令

| 命令                | 说明                                   |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | 启动本地开发服务器（无 Pagefind 索引） |
| `pnpm check`        | 执行 Astro 与类型检查                  |
| `pnpm build`        | 构建生产版本并生成 Pagefind 索引       |
| `pnpm test`         | 构建站点并运行 Playwright 关键交互回归 |
| `pnpm format`       | 格式化项目文件                         |
| `pnpm format:check` | 检查项目文件格式                       |
| `pnpm preview`      | 本地预览生产构建（含检索索引）         |

册页素材发生变化时，额外运行：

```bash
node scripts/check-sketchbook-assets.mjs
```

该检查要求首页六张册页保持统一的透明画布、书本边界和无高亮白边。E2E 统一经 `scripts/run-e2e.mjs` 启动生产预览并在结束时清理服务，不要另外配置 Playwright `webServer`。

## 当前结构

```text
src/
├── assets/
│   ├── art/           # 原创纸墨山水视觉
│   └── projects/      # 器作与光影源图
├── components/
│   ├── README.md      # 组件分层、公开契约与新增组件流程
│   ├── Header.astro / Footer.astro / AmbientInkCanvas.astro / Seo.astro
│   ├── PageIntro.astro / SectionHeading.astro / InscriptionTip.tsx
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
├── scripts/           # 主题、页眉、滚动、显现、墨场与 Hero 交互
├── styles/
│   └── global.css
├── utils/
│   ├── date.ts        # 日期格式化
│   ├── journal.ts     # 笺录分类、标签与排序
│   └── reading.ts     # 阅读时间估算
├── site.config.ts     # 站点配置（联系邮箱、Formspree、giscus）
└── content.config.ts  # 内容集合 schema

scripts/
├── run-e2e.mjs                    # 生产预览 + Playwright + 可靠清理
├── check-sketchbook-assets.mjs    # Hero 册页几何与白边检查
└── setup-external-services.sh     # giscus / Formspree 人工开通向导

tests/e2e/                         # 用户可见关键交互回归
docs/                              # 规则、进度、路线图和任务记录
.github/workflows/deploy.yml       # quality → build → deploy
```

## 内容维护

内容集合由 [src/content.config.ts](src/content.config.ts) 定义。新增 `.md` 或 `.mdx` 后，Astro 会按文件名生成条目 ID；`draft: true` 的内容不会进入公开页面。所有图片字段都由 schema 的 `image()` 接管，并经 `astro:assets` 在构建期优化。

### 笺录 `journal`

| 字段                               | 要求                   |
| ---------------------------------- | ---------------------- |
| `title`, `description`, `category` | 必填字符串             |
| `pubDate`                          | 必填日期               |
| `updatedDate`                      | 可选日期               |
| `tags`                             | 字符串数组，默认空数组 |
| `draft`, `featured`                | 布尔值，默认 `false`   |

文章正文直接写在 frontmatter 之后。公开文章会进入总目、详情、分类、标签、归档、RSS 与 Pagefind 索引。

### 器作 `projects`

| 字段                                 | 要求                                            |
| ------------------------------------ | ----------------------------------------------- |
| `title`, `summary`, `status`, `role` | 必填字符串                                      |
| `year`, `order`                      | 必填整数                                        |
| `stack`                              | 技术栈字符串数组，默认空数组                    |
| `cover`, `coverAlt`                  | 必填封面与替代文本                              |
| `gallery`                            | 至少一项；每项包含 `src`、`alt`，可选 `caption` |
| `draft`, `featured`                  | 布尔值，默认 `false`                            |

### 光影 `gallery`

| 字段                                    | 要求                              |
| --------------------------------------- | --------------------------------- |
| `title`, `description`, `alt`, `medium` | 必填字符串                        |
| `image`                                 | 必填图片                          |
| `year`, `order`                         | 必填整数                          |
| `orientation`                           | `landscape`、`portrait` 或 `wide` |
| `project`                               | 可选的器作集合引用                |
| `draft`, `featured`                     | 布尔值，默认 `false`              |

新增或修改内容后的完成标准：`pnpm check` 能读取 schema，`pnpm build` 能生成全部路由和图片，公开内容可在对应列表与详情页访问。

## 站点配置

[src/site.config.ts](src/site.config.ts) 是导航、身份信息与外部服务的单一入口。

| 配置                      | 作用                     | 未配置时                   |
| ------------------------- | ------------------------ | -------------------------- |
| `navItems`                | 页眉主导航与图标         | 不应为空                   |
| `site.profile`            | 署名、身份短题与关注方向 | 使用真实内容统计和克制空态 |
| `site.email`              | 页脚与往来区联系方式     | 不显示邮箱入口             |
| `site.formspree.endpoint` | 往来表单提交地址         | 显示尚未开通信笺           |
| `site.giscus.*`           | 留言墙仓库与分类         | 显示「尚未开卷」空态       |
| `withBase(path)`          | 拼接 GitHub Pages 子路径 | 所有手写根路径均应调用     |

路径规则：`.astro`、端点和 React Island 中手写的站内根路径必须经过 `withBase()`；`Image`、`getImage()` 和字体等 Astro 资产 URL 已自动包含 base，不能再次拼接。

外部服务可参考 `scripts/setup-external-services.sh` 的人工向导。向导收集的值仍需人工核对并写入 `src/site.config.ts`；不得提交真实密钥或未经确认的个人资料。

## 渲染与交互边界

- Astro 负责路由、布局、SEO、内容查询与静态展示；纯展示组件保持 `.astro`。
- React 只承载搜索、轮播、灯箱和题跋 Tooltip 等状态驱动交互，水合策略见 [组件说明](src/components/README.md)。
- `BaseLayout.astro` 统一安装页眉、页脚、SEO、字体、全局样式以及 scroll / reveal / cursor / ambient-ink 脚本。
- CSS 负责普通状态、主题、简单过渡和降级；Motion 服务 React UI；GSAP 服务复杂时间线与滚动叙事；Lenis 只负责平滑滚动。
- 所有动效必须保留 `prefers-reduced-motion` 终态；无 JavaScript 时，内容和站内导航仍须可访问。
- 视觉令牌、排版、形状、动效语义和 Hero 册页几何以 [DESIGN.md](DESIGN.md) 为准，不在组件内部另建一套设计系统。

## 质量门禁

按改动风险选择验证范围：

1. 仅文档：回读内容，执行 `pnpm format:check` 与 `git diff --check`。
2. 代码、配置、路由或结构：至少执行 `pnpm check`、`pnpm build`。
3. 布局、交互、动画、导航、Storage 或响应式：再执行 `pnpm test`，并在真实桌面与移动视口检查受影响页面。
4. 提交前：确认工作区只包含当前目标，格式检查为绿。

浏览器回归只观察用户可见界面与最终 URL，不依赖组件私有状态。完整要求见 [验证流程](docs/agents/verification.md)。

## 部署

推送到 `main` 后，[GitHub Actions](.github/workflows/deploy.yml) 按以下顺序执行：

```text
quality（format + check + Playwright）
  └─ build（Astro + Pagefind）
      └─ deploy（GitHub Pages）
```

站点配置为 `site: https://l-xuanxiao.github.io`、`base: /mojian`。不要绕过 `quality` 依赖，也不要把部署路径改写为根站点路径。

## 文档索引

| 文档                                                       | 何时阅读                                       |
| ---------------------------------------------------------- | ---------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                     | 开始任何仓库任务前；项目事实、工作流与回复约定 |
| [PRODUCT.md](PRODUCT.md)                                   | 判断用户、产品定位、能力边界和内容真实性时     |
| [DESIGN.md](DESIGN.md)                                     | 修改视觉、组件状态、动效或响应式布局时         |
| [src/components/README.md](src/components/README.md)       | 新增、复用或修改组件及 Island 时               |
| [docs/agents/coding.md](docs/agents/coding.md)             | 决定 Astro / React / 动画职责或排错边界时      |
| [docs/agents/dependencies.md](docs/agents/dependencies.md) | 新增或升级依赖前                               |
| [docs/agents/verification.md](docs/agents/verification.md) | 确定验证范围和浏览器覆盖时                     |
| [docs/agents/git.md](docs/agents/git.md)                   | 提交、推送、分支或处理工作区前                 |
| [docs/progress.md](docs/progress.md)                       | 查看已完成能力和当前阶段时                     |
| [docs/mojian_plan.md](docs/mojian_plan.md)                 | 查看长期路线；其中规划不代表已实现能力         |

## License

本项目采用 [MIT License](LICENSE)。
