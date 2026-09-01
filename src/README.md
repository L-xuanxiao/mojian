# `src` 源码目录

这里承载墨笺的页面、组件、内容、交互与本地资产。项目使用 Astro 7 输出静态页面，仅在需要客户端状态或复杂交互时使用 React Island。

安装、开发和部署命令见[项目 README](../README.md)；视觉、响应式与动效契约见 [DESIGN.md](../DESIGN.md)。

## 目录地图

| 路径                | 职责                                                                          |
| ------------------- | ----------------------------------------------------------------------------- |
| `assets/`           | 由 Astro 资产管线处理的插画、册页和项目图片                                   |
| `components/`       | 全站组件、页面区块与 React Island；细分规则见[组件说明](components/README.md) |
| `content/`          | `journal`、`projects`、`gallery` 三类 Markdown 内容                           |
| `layouts/`          | 页面外壳；`BaseLayout.astro` 统一装配 SEO、页眉、页尾、主题与全局脚本         |
| `pages/`            | Astro 文件路由、动态详情页、RSS 与 robots 端点                                |
| `scripts/`          | 页眉、主题、揭示、滚动、Hero、光标和环境墨场等全局客户端行为                  |
| `styles/`           | 全局设计令牌、基础样式、响应式与跨页动效                                      |
| `utils/`            | 日期、笺录查询和阅读时长等无界面工具                                          |
| `content.config.ts` | 三类内容集合的 loader 与 frontmatter schema                                   |
| `site.config.ts`    | 导航、站点资料、外部服务配置及 `withBase()`                                   |

## 常用修改入口

| 需求                     | 首选入口                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| 新增或调整路由           | `pages/`                                                          |
| 修改全站页面壳           | `layouts/BaseLayout.astro`                                        |
| 修改导航、联系资料或服务 | `site.config.ts`                                                  |
| 新增笺录、器作或光影     | `content/<collection>/`，字段必须符合 `content.config.ts`         |
| 修改首页区块             | `components/home/`                                                |
| 修改页面专属展示         | `components/about/`、`journal/`、`projects/`、`gallery/` 等子目录 |
| 修改全局交互             | `scripts/`；同时检查组件中的 class、语义元素与 `data-*` 挂载契约  |
| 修改全局视觉令牌         | `styles/global.css` 与 `DESIGN.md`                                |
| 替换构建期图片           | `assets/` 及对应内容或组件的静态导入                              |

## 核心约定

- **渲染层：** 静态展示和构建期数据优先 Astro；只有状态驱动交互、焦点管理或第三方交互库才使用 React。
- **水合：** 按实际时机选择 `client:load`、`client:visible` 或 `client:idle`，不要为静态内容增加客户端 JavaScript。
- **路由：** `pages/` 采用 Astro 文件路由；详情页使用 `[...id].astro`，不要另建并行路由配置。
- **内容：** frontmatter 由 `content.config.ts` 校验；页面和集合工具负责过滤草稿、排序及选择 featured 条目。
- **站内路径：** 手写的根路径链接必须经 `withBase()` 拼接部署 base `/mojian`。
- **资产路径：** `Image`、`getImage()`、静态图片导入和字体已由 Astro 自动携带 base，不要再次调用 `withBase()`。
- **组件边界：** 两个以上页面共享且语义一致的组件放在 `components/` 根级；页面或功能专属组件放对应子目录。
- **脚本边界：** 全局行为放入 `scripts/` 的职责模块，组件只提供稳定的语义结构与挂载点。
- **可访问性：** 所有交互必须保留键盘、焦点、可访问名称、低动态和无 JavaScript 终态。
- **数据真实性：** 身份、项目、时间线和统计只读取已确认的配置、内容集合或同目录数据文件，不在组件中虚构。

## 修改后的最低验证

在项目根目录按改动风险执行：

```powershell
pnpm format:check
pnpm check
pnpm build
pnpm test
```

纯文档修改至少运行 `pnpm format:check`。涉及页面布局、交互、路由或内容 schema 时，应继续执行对应构建和浏览器回归。

## 相关文档

- [组件边界与调用契约](components/README.md)
- [代码组织与排错](../docs/agents/coding.md)
- [验证流程](../docs/agents/verification.md)
- [依赖管理](../docs/agents/dependencies.md)
- [项目开发进度](../docs/progress.md)
