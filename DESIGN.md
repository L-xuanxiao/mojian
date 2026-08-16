---
name: 墨笺 mojian
description: 现代东方水墨书卷个人网站——纸、墨、朱砂三种材料构成的沉浸阅读世界
colors:
  xuan-paper: "#f4efe3"
  paper-deep: "#e4dac7"
  songyan-ink: "#252622"
  ink-soft: "#5e5e56"
  ink-line: "rgb(37 38 34 / 0.18)"
  cinnabar: "#a44736"
  pine: "#49574c"
  bronze: "#8b7355"
  paper-glass: "rgb(244 239 227 / 0.86)"
  darkroom-ink: "rgb(16 17 15)"
typography:
  display:
    fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif"
    fontSize: "clamp(6.5rem, 17vw, 14rem)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "'Noto Serif SC', serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "'Noto Serif SC', serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Noto Serif SC', serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "'Noto Sans SC', sans-serif"
    fontSize: "0.68rem"
    fontWeight: 500
    letterSpacing: "0.28em"
rounded:
  sm: "2px"
  md: "4px"
spacing:
  gutter: "1.25rem"
  gutter-lg: "2.5rem"
  section: "5rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.songyan-ink}"
    textColor: "{colors.xuan-paper}"
    rounded: "{rounded.sm}"
    padding: "0.5em 1.25em"
  button-primary-hover:
    backgroundColor: "{colors.cinnabar}"
    textColor: "{colors.xuan-paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.songyan-ink}"
    rounded: "{rounded.sm}"
    padding: "0.5em 1.25em"
  button-ghost-hover:
    backgroundColor: "{colors.songyan-ink}"
    textColor: "{colors.xuan-paper}"
  inscription-tooltip:
    backgroundColor: "{colors.xuan-paper}"
    textColor: "{colors.songyan-ink}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.85rem"
---

# Design System: 墨笺 mojian

## Overview

**Creative North Star: "墨笺书房 The Ink Study"**

访客如入主人的书房：四壁是宣纸，器物皆纸墨，朱砂印泥搁在案头，只在落款时落下。系统只有三种材料——纸（底色）、墨（文字与线条）、朱砂（唯一强调色），层级靠字号、字重、留白与 1px 墨线拉开，拒绝卡片盒与色彩噪音。气质是沉浸流动与精致工艺感的合体：页面过渡如墨晕染（旧页 150ms 淡去、新页以 400ms 自卷心 `clip-path: circle` 展开），昼夜切换如从印钮向整间书房扩开一张新纸，图像如装裱揭晓（深纸遮罩自右揭去），光影章节如入暗室显影——每一处动效都对应一个书房里的动作。

书房是活的：昼夜双主题共用一套令牌（`data-theme` 与 `prefers-color-scheme` 双通道，值必须保持一致），云气柔斑 72–96s 缓漂，毛笔尖光标随行，全站动效在 `prefers-reduced-motion` 下整体静止降级，无 JS 时内容完整直达。

**Key Characteristics:**
- 三材料纪律：纸、墨、朱砂；松绿与古铜仅服务代码高亮与小标签
- 无卡片盒：条目以 1px 墨线分隔，图像以深纸衬底"装裱"
- 一切位移/缩放类 hover 包在 `@media (hover: hover) and (pointer: fine)` 门控内
- 竖排题签（`writing-mode: vertical-rl`）与钤印是反复出现的书房记号
- 深浅双主题 + `.darkroom` 固定深墨作用域（不随昼夜翻转）

## Colors

材料色板：纸二色、墨二色、一线、一砂、二辅色、一暗室。

### Primary
- **朱砂**（昼 `#a44736` / 夜 `#cf7259`）：唯一强调色。链接文字、focus 环、当前页导航图标、印章、主按钮 hover 晕染、首字下沉、阅读进度墨条末端。夜间提亮一档以保证对比。

### Neutral
- **宣纸**：全站底色，附三层固定肌理（四角暗边 + 横向纤维 + 细噪点）。
- **深纸**：装裱衬底与遮罩——图像容器底色、`media-reveal` 揭示遮罩、代码块底（72% 混合）。
- **松烟墨**：正文与标题文字、主按钮底、墨线来源色。
- **淡墨**：次要文字、引文、meta、`::marker`。
- **墨线**：1px 结构分隔线的唯一材质（`rgb(37 38 34 / 0.18)`）。
- **纸玻璃**：页眉毛玻璃（滚动后全量 + `blur(18px) saturate(0.9)`）。
- **暗室墨**：`.darkroom` 固定深墨渐层（`rgb(16 17 15)`，0→0.96→0.985→0），不随昼夜翻转。

### 辅色（仅代码高亮与小标签）
- **苍松**：Shiki keyword。
- **古铜**：Shiki function/constant、`.folio-label` 标签、代码块左边线。

### Named Rules
**The 朱砂一点 Rule.** 朱砂在任意单屏的出现面积必须稀有——它是落款印泥，不是装饰色。新组件若想用朱砂，先回答"这里是不是一次落款"。

**The 双通道一致 Rule.** 深色令牌在 `:root[data-theme='dark']` 与 `prefers-color-scheme` 媒体查询中各有一份，修改深色值必须两处同步；`.darkroom` 作用域重映射墨色系令牌但刻意不动朱砂。

## Typography

**Display Font:** Ma Shan Zheng 马善政毛笔体（`--font-display`，配 Noto Serif SC 兜底）
**Body Font:** Noto Serif SC（衬线，正文与标题）
**Label Font:** Noto Sans SC（非衬线，标签、按钮、弹层、页眉导航）

**Character:** 书法体只题字、签名、钤印，绝不入正文；衬线承担全部阅读；非衬线以大字距小字号承担"标签"职能——三体各司其职，互不越界。

### Hierarchy
- **Display**（400, `clamp(6.5rem,17vw,14rem)` 卷首题名 / `clamp(3.4rem,8vw,6.8rem)` 页头, 行高 1）：Hero 题名、各页 PageIntro 题字、feature 条目序号、页脚「山高水长」、首字下沉（3.35em）。
- **Headline**（600, 2.25rem, 1.3）：文章与页面主标题。
- **Title**（600, 1.75rem, 1.3）：章节标题；prose 内 h2 配 3px 左侧墨线题签。
- **Body**（400, 1rem 浏览器基准, 1.8）：正文；阅读栏约 40 字/行（42rem）。
- **Label**（500, 0.68rem, 字距 0.28em, 大写, 古铜）：`.folio-label` 卷标。

### Named Rules
**The 三档小字 Rule.** 小字号只许三档：0.62rem（卷首卷尾 folio 行、图注）、0.68rem（标签、大写字距）、0.72rem（meta、题跋弹层）。不得另创第四档。

**The 题字不入文 Rule.** Ma Shan Zheng 只出现在题名、印章、首字下沉与诗句；正文、按钮、导航永远不用书法体。

## Layout

主轴是一只 84rem 的展台（`--container-stage`）：页眉、页脚与几乎全部页面区块都落在其上，左右页边距 `1.25rem → 2rem → 2.5rem`（sm/md/lg）。文章与项目正文收窄至 42rem 裸值（约 40 字/行）。首页章节垂直节奏 `py-20 md:py-32`，PageIntro 卷首上下 `clamp(4.5rem,9vw,8rem)` / `clamp(3rem,7vw,6rem)`。

无网格卡片墙：条目纵向排列，以 1px 墨线分隔；作品与画廊以不同宽高比（3/2、4/5、16/7、16/9）的图像块形成展墙节奏，移动端统一回落。光影章节整体进入 `.darkroom` 暗室渐层，上下各留 `clamp(7rem,16vh,12rem)` 的纸色过渡带。竖排题签（展品编号、页脚「墨笺藏本」、Hero 侧行）在横排版面上立起纵向参照。

## Elevation & Depth

阴影在这里不是结构，是氛围光：全站无卡片盒、无静态结构阴影，分层由 1px 墨线、留白与纸色深浅承担；三档极淡扩散阴影（`0 1px 2px` / `0 4px 16px` / `0 18px 48px`，8% 墨色，深色主题 32% 黑色）只落在图像与浮层上——图像装裱容器、卷首图、题跋弹层、灯箱。`shadow-sm` 目前全站零使用，保留不用。新增阴影须延续"淡墨环境光"气质，禁止生硬投影描边。

### Shadow Vocabulary
- **装裱**（`0 4px 16px`，8% 墨）：图像容器、弹层的静态氛围影。
- **卷首**（`0 18px 48px`）：卷首大图、作品 hover 抬升、灯箱。

### Named Rules
**The 阴影即氛围 Rule.** 阴影只服务图像与浮层的空气感，永不用来勾勒界面结构；需要分界时用 1px 墨线。

## Shapes

圆角刻意收敛为两档：2px（按钮、印章、弹层、行内码、正文图片）与 4px，实践中几乎只用 2px——纸是裁出来的，不是磨圆的。圆形（50%/9999px）只属于墨点、朱砂目、云气柔斑与光标。结构性边框一律 1px 墨线；加重仅见于题签 3px 左侧墨线、引文与代码块 2px 边线、印章 1px 朱砂描边、阅读条 2px。签名轮廓是方印：1.4–2.8rem 见方，描边派 rotate(-3deg) 或白文填色派朱砂底纸字。

## Components

### Buttons
纸墨器物，可触：按下 `scale(0.97)`，反馈如钤印。
- **Shape:** 微敛直角（2px 圆角）
- **Primary:** 墨底纸字 + 1px 墨边框（padding `0.5em 1.25em`）；hover 时朱砂椭圆自中心 `scale(0→1)` 晕开（400ms ease-ink），取印泥漫纸之意
- **Ghost:** 透明底墨字 + 1px 墨线边框；hover 晕墨反白（底转墨、字转纸）
- **Hover 门控:** 晕染仅在 `@media (hover: hover) and (pointer: fine)` 启用

### Links
- **正文链接:** 朱砂 + 1px 下划线（offset 0.2em），hover 线粗 1px→2px
- **墨线链接（ink-link）:** 默认无下划线，hover 时 1px 墨线自左向右"写出"（`scaleX(0→1)`，400ms ease-ink）
- **回卷链接（page-backlink）:** 淡墨小字 + 朱砂「←」，hover 左移 0.2rem

### Navigation
- 页眉毛玻璃：静止时 20% 纸玻璃 + `blur(10px)`；滚动 >24px 全量纸玻璃 + `blur(18px) saturate(0.9)`，底部 1px 墨线自左写出
- 当前页无下划线——导航图标落朱砂；hover 才出现 1px 朱砂短线
- 昼夜印钮：支持 View Transition 时，新主题从印钮中心以 400ms 圆形换纸铺满视口；reduced-motion、API 不支持或启动失败时立即切换
- 移动端单行横滑，两端 mask 渐隐提示
- 页尾 Colophon 四拍：「山高水长」题字收束 → 往来行 → 墨线写出 → 版权钤印行

### 印章 Seal（签名组件）
- **描边派:** 1px 朱砂边框方印（1.5rem 品牌印 rotate(-3deg)，hover 回正缩 0.96 / ease-seal 回弹；2.8rem 页脚印；1.9rem 昼夜印钮内嵌「昼/夜」旋转交叉淡入）
- **白文派:** 朱砂底纸字方印（章节序号「壹/贰/叁」、Hero 钤印）
- 印文一律 Ma Shan Zheng

### 题跋弹层 InscriptionTip
纸底墨线小笺（max-width 16rem、1px 墨线、2px 圆角、装裱影），非衬线 0.72rem、字距 0.1em；自触发点晕出（`scale(0.96→1)`，入场 160ms / 退场 110ms，延迟 350ms）；无 JS 时退回原生 `title`。

### 条目 Entry List
无盒条目：1px 墨线顶分隔；hover 时极淡深纸底色自左晕开（`scaleX(0.35→1)`），条目编号落朱砂；feature 条目改 2px 墨顶线 + 55% 淡朱砂编号 + 书法体大题。

### 图像装裱 Media Frame
容器即装裱：`overflow: hidden` + 深纸衬底 + 装裱影，无边框无圆角；揭示时深纸遮罩自右揭去（900ms）同时图像 `scale(1.035→1)`（1100ms）；右下角落半透明纸底小展签（0.62rem、字距 0.18em）。暗室内遮罩换 `#131412`，未揭示图像 `brightness(0.5) contrast(0.86)` 待显影。

### 阅读进度墨条
文章页顶 2px 墨至朱砂渐变条（`linear-gradient(90deg, ink, cinnabar)`），末端 4px 朱砂圆点，随滚动 scaleX 写出；reduced-motion 直接隐藏。

## Do's and Don'ts

### Do:
- **Do** 用 1px 墨线分界、用留白分章、用纸色深浅分层——这是本系统的"三件套"。
- **Do** 给每个新装饰一个书房出处（题跋、钤印、装裱、显影），并写进注释。
- **Do** 把位移/缩放/晕染类 hover 包进 `@media (hover: hover) and (pointer: fine)`。
- **Do** 同步维护深色令牌的两处定义（`data-theme='dark'` 与 `prefers-color-scheme`），并在 `.darkroom` 内只重映射墨色系。
- **Do** 高频反馈只用 150/250ms 可中断 transition，400ms 只留给页面换卷、主题换纸与一次性叙事；优先只动 `transform`/`opacity`，主题换纸可使用 `clip-path`，曲线用 `--ease-ink`（印章反馈才用 `--ease-seal`）。
- **Do** 为 reduced-motion 与无 JS 保留完整内容与静止降级。

### Don't:
- **Don't** 引入红金宫廷风、SaaS/Dashboard 骨架、默认 shadcn 视觉、重复圆角卡片墙。
- **Don't** 使用 AI 味蓝紫渐变、滥用玻璃拟态（全站仅页眉一处纸玻璃）。
- **Don't** 大面积纯黑纯白或高饱和多色并用——墨是 `#252622` 不是 `#000`，纸是 `#f4efe3` 不是 `#fff`。
- **Don't** 创造第四档小字号、第三档圆角或第二种强调色。
- **Don't** 用阴影勾勒界面结构，或给条目加卡片盒。
- **Don't** 让书法体进入正文、按钮或导航。
