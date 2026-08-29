# 组件目录

本目录承载墨笺的可复用展示组件、页面专属区块和 React Island。修改组件前先确定使用范围与交互性质：全站共享组件放在根级，页面或功能专属组件放在对应子目录；纯展示优先 Astro，只有状态驱动交互才使用 React。

设计数值与视觉语义以 [DESIGN.md](../../DESIGN.md) 为准，代码组织以 [docs/agents/coding.md](../../docs/agents/coding.md) 为准。本文件只说明组件边界、调用契约和完成标准。

## 选择流程

1. **确认范围。** 两个以上页面共同使用且语义一致，放根级；只服务一个页面或功能，放对应子目录。
2. **选择渲染层。** 构建期数据与静态 HTML 使用 Astro；需要客户端状态、焦点管理或第三方交互库时使用 React Island。
3. **选择水合时机。** 首屏立即交互用 `client:load`，进入视口才需要用 `client:visible`，非关键增强用 `client:idle`。
4. **定义契约。** Props 使用明确类型；内容集合条目保持 `CollectionEntry` 类型；图片携带尺寸与真实 `alt`；可选能力必须有稳定默认值。
5. **完成降级。** reduced-motion 保留状态变化，无 JavaScript 保留内容、链接和可理解空态。

完成标准：组件位于正确目录，只使用必要的运行时，公开 Props 与调用方一致，并通过对应风险等级的验证。

## 组件关系

```text
BaseLayout.astro
├── Header.astro
├── AmbientInkCanvas.astro
├── Seo.astro
├── 页面内容
│   ├── PageIntro.astro / SectionHeading.astro
│   ├── home/* / about/* / journal/EntryList.astro
│   └── React Islands
│       ├── JournalSearch.tsx
│       ├── ProjectCarousel.tsx
│       ├── GalleryLightbox.tsx
│       └── InscriptionTip.tsx
└── Footer.astro
```

全局客户端行为不塞入组件内联脚本：页眉、主题、揭示、滚动、光标、墨场和翻页分别由 `src/scripts/` 中的职责模块管理。组件通过语义元素、class 和 `data-*` 契约提供挂载点。

## 根级组件

| 文件                     | 职责                                           | 关键边界                                                                    |
| ------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------- |
| `Header.astro`           | 品牌、六卷导航、移动卷目、首页章节轨和昼夜印钮 | 导航数据来自 `navItems`；交互由 `header-interactions.ts` 与 `theme.ts` 管理 |
| `Footer.astro`           | 卷尾题字、GitHub / RSS / 回卷首、版权与钤印    | 联系入口读取 `site`；题跋使用 `InscriptionTip client:idle`                  |
| `AmbientInkCanvas.astro` | 全站固定水墨 Canvas 壳                         | `aria-hidden`、不接收指针；绘制由 `ambient-ink.ts` 单例负责                 |
| `PageIntro.astro`        | 内容页四类卷首与图文接棒                       | 公开 Props 见下文；动效通过 `data-page-intro-*` 和全局 reveal 消费          |
| `SectionHeading.astro`   | 首页章标与正文小节标题                         | `mode='chapter'` 用于首页，默认 `quiet` 用于内容页                          |
| `Seo.astro`              | canonical、Open Graph、Twitter Card 和 JSON-LD | 由 `BaseLayout` 统一调用；文章页传入 `type='article'`                       |
| `InscriptionTip.tsx`     | 印章、题跋等饰件的可访问释义                   | React Island；无 JS 使用原生 `title`，通常 `client:idle`                    |

### `PageIntro.astro`

| Prop                                          | 类型                                                | 说明                                      |
| --------------------------------------------- | --------------------------------------------------- | ----------------------------------------- |
| `id`, `title`, `note`, `description`, `glyph` | `string`                                            | 必填；标题 ID、题名、卷记、简介与装饰主字 |
| `variant`                                     | `default \| compact \| folio`                       | 尺寸与版式档，默认 `default`              |
| `scene`                                       | `reading \| exhibition \| darkroom \| personal`     | 场景语义，默认 `reading`                  |
| `artTreatment`                                | `ink-glyph \| mounted \| contact-sheet \| handnote` | 图像处理；缺省时由 `scene` 推导           |
| `artwork`                                     | `ImageMetadata`                                     | 可选，经 `getImage()` 构建期优化          |
| `artworkAlt`                                  | `string`                                            | 真实内容图必须填写；装饰图可留空          |
| `meta` slot                                   | Astro slot                                          | 可选卷首元数据                            |

`scene` 与 `artTreatment` 是语义组合，不是任意皮肤。新增组合前先在 `DESIGN.md` 定义其观看机制与降级终态。

### `SectionHeading.astro`

```ts
interface Props {
  id: string;
  title: string;
  index?: string;
  note?: string;
  mode?: 'chapter' | 'quiet';
}
```

`index` 同时驱动装饰主字和小印；`note` 是辅助侧注。两者均不得替代真实标题语义。

### `Seo.astro`

接收 `title`、`description`，以及可选的 `image`、`type`、`pubDate`、`tags`、`noindex`。默认 OG 图由组件通过 `astro:assets` 生成；canonical 使用当前路径与 `Astro.site` 组合。页面应通过 `BaseLayout` 传递这些值，不直接重复输出 SEO 标签。

## 首页组件 `home/`

首页组件均为无公开 Props 的 Astro 区块，在构建期读取内容集合、站点配置或同目录数据。

| 文件                    | 职责                    | 数据或交互                                                |
| ----------------------- | ----------------------- | --------------------------------------------------------- |
| `Hero.astro`            | 六卷可翻页素描本 Hero   | 读取三集合与 `site.profile`；翻页由 `hero-motion.ts` 管理 |
| `CurrentFolio.astro`    | 最新内容与站点身份锚点  | 读取公开内容数量、最新笺录和 profile 空态                 |
| `Projects.astro`        | featured 器作展墙       | 读取 `projects`，经 `Image` 优化封面                      |
| `Journal.astro`         | featured / 最新笺录段落 | 复用 `EntryList` 与 journal 工具函数                      |
| `Gallery.astro`         | featured 光影暗室段落   | 读取 `gallery` 并生成站内链接                             |
| `ScrollJourney.astro`   | 桌面长卷水墨叙事        | 多层图片与 GSAP 时间线；移动端呈现完整静态终态            |
| `Timeline.astro`        | 站点里程碑              | 读取 `site-timeline.data.ts`                              |
| `site-timeline.data.ts` | 首页站点史数据          | 导出 `SiteMilestone[]`，只存事实数据                      |

修改 Hero 时同时检查 `Hero.astro`、`src/scripts/hero-motion.ts`、册页素材检查脚本和 E2E；几何与动效契约见 `DESIGN.md`。

## 此间组件 `about/`

| 文件                     | 职责                               | 数据或降级                                        |
| ------------------------ | ---------------------------------- | ------------------------------------------------- |
| `SelfIntro.astro`        | 个人自述、署名和关注方向           | 读取 `site.profile`；空值显示克制占位，不虚构身份 |
| `AboutTimeline.astro`    | 个人行年时间线                     | 读取 `about-timeline.data.ts`                     |
| `Contact.astro`          | 邮箱、GitHub 与 Formspree 往来入口 | 未配置邮箱或 endpoint 时显示静态说明              |
| `about-timeline.data.ts` | 行年数据入口                       | 导出 `AboutMilestone[]`，只填写已确认事实         |

## 笺录组件 `journal/`

### `EntryList.astro`

```ts
interface Props {
  posts: CollectionEntry<'journal'>[];
  variant?: 'feature' | 'catalog' | 'compact';
  startIndex?: number;
}
```

`feature` 用于重点条目，`catalog` 用于完整目录，`compact` 用于紧凑列表。组件负责日期、分类、阅读时长和 base 路径；调用方负责过滤 draft、排序与决定条目集合。

### `JournalSearch.tsx`

Pagefind 检索 Island，无 Props，使用 `client:load`。它只在生产构建中拥有真实索引；开发模式下必须显示可理解的不可用状态。搜索请求具备初始化等待、旧响应失效和异常降级，修改时通过用户可见输入与结果列表验证，不断言内部状态。

## 器作组件 `projects/`

`ProjectCarousel.tsx` 接收 `title` 与 `ProjectSlide[]`：每张 slide 必须包含 `src`、`alt`、`width`、`height`，可选 `caption`。组件使用 Embla、Motion 和 Lucide，支持按钮、方向键、循环、焦点与 reduced-motion；详情页采用 `client:visible`，避免在画廊尚未入视口时提前水合。

`project-carousel.css` 只服务该 Island。结构或类名变化时同步修改 TSX 与 CSS，不复制为第二套轮播样式。

## 光影组件 `gallery/`

`GalleryLightbox.tsx` 接收 `GalleryItem[]`。每项包含：

- 身份与文案：`id`、`title`、`description`、`alt`；
- 图片：`thumb`、`src`、`width`、`height`；
- 展签：`year`、`medium`、`orientation`；
- 可选关联：`projectHref`。

组件使用 `client:load`，负责展墙、灯箱、键盘导航、焦点回归、View Transition 和一次性翻底片入场。`openingSlideSrc` 是首次打开图片的稳定身份；相邻切换不得重复曝光。`gallery-lightbox.css` 与 TSX 共同构成组件，不单独复用其中的类。

## 留墨组件 `guestbook/`

`GiscusWall.astro` 无 Props，读取 `site.giscus`。四项配置齐全时创建 giscus 挂载点；缺少任一项时显示「尚未开卷」空态。无 JavaScript 时保留说明文字，页面明确告知留言公开性和第三方资源来源。

## React Island 水合表

| Island            | 调用位置                   | 指令             | 原因                                |
| ----------------- | -------------------------- | ---------------- | ----------------------------------- |
| `JournalSearch`   | 笺录总目                   | `client:load`    | 输入框首屏即可操作                  |
| `GalleryLightbox` | 光影总览                   | `client:load`    | 展墙按钮和灯箱立即可用              |
| `ProjectCarousel` | 器作详情                   | `client:visible` | 进入视口后才需要轮播状态            |
| `InscriptionTip`  | 卷首、页尾、文章收笔、自述 | `client:idle`    | 非关键渐进增强，原生 `title` 可兜底 |

新增 Island 只有在现有四类无法承载职责时才成立；先复用已有交互和依赖，不为静态展示增加客户端 JavaScript。

## 组件调用示例

Astro 展示组件：

```astro
<PageIntro
  id="gallery-title"
  title="光影"
  note="暗室卷"
  description="以影像记录纸外的光。"
  glyph="影"
  scene="darkroom"
  artwork={cover}
  artworkAlt="窗边的一组接触印样"
>
  <Fragment slot="meta">共 {items.length} 帧</Fragment>
</PageIntro>
```

React Island：

```astro
<JournalSearch client:load />
<ProjectCarousel title={project.data.title} slides={slides} client:visible />
<InscriptionTip text="卷尾钤印 · 墨笺" client:idle>
  <span class="footer-seal">墨笺</span>
</InscriptionTip>
```

## 共享契约

- **路径：** 手写站内根路径使用 `withBase()`；Astro 资产 URL 不重复拼接 base。
- **图片：** 构建期图片优先 `Image` / `getImage()`；真实图片必须提供具体 `alt` 和尺寸。
- **内容：** 组件不自行发明身份、作品或统计；数据来自内容集合、配置或同目录数据文件。
- **样式：** 使用 `global.css` 与 `DESIGN.md` 中的令牌；根级共享原语才进入全局样式，组件私有样式就地维护。
- **动效：** `data-reveal-variant`、`data-home-chapter`、`data-page-intro-*` 是内部展示契约；改名时同时追踪 `src/scripts/` 消费方和 E2E。
- **可访问性：** 交互使用原生语义元素，保留键盘、焦点、可访问名称、reduced-motion 和无 JS 终态。
- **外部服务：** 配置缺失时显示明确空态；组件不得假定 giscus、Formspree 或个人资料一定存在。

## 新增或修改组件

1. 在页面调用处确认组件是否已有等价实现，记录真实复用边界。
2. 根据选择流程确定目录、Astro / React 和水合指令。
3. 定义最小 Props 与内容来源；同一概念只保留一个数据入口。
4. 使用设计令牌完成默认、hover、focus、disabled、空态与低动态状态。
5. 检查手写路径、图片 `alt`、键盘操作、无 JS 与窄屏终态。
6. 按 [验证流程](../../docs/agents/verification.md) 执行检查；涉及布局或交互时补充真实浏览器和 Playwright 回归。

完成标准：调用方无需了解组件私有状态，所有公开参数都有类型与默认语义，错误或缺失配置有可理解终态，相关源码、样式、脚本和测试同步通过。

## 相关文档

- [项目 README](../../README.md)：安装、内容、配置、验证和部署。
- [DESIGN.md](../../DESIGN.md)：视觉系统、组件状态、动效与响应式契约。
- [代码组织与排错](../../docs/agents/coding.md)：Astro / React / 动画职责。
- [依赖管理](../../docs/agents/dependencies.md)：引入第三方组件或库之前。
- [验证流程](../../docs/agents/verification.md)：按风险选择静态、构建、E2E 和浏览器检查。
