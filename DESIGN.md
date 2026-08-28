---
name: 墨笺 mojian
description: 现代东方水墨书卷个人网站——巨字入画、纸层接棒与安静阅读共同构成的数字手卷
colors:
  xuan-paper: '#f4efe3'
  paper-deep: '#e4dac7'
  songyan-ink: '#252622'
  ink-soft: '#5e5e56'
  ink-line: 'rgb(37 38 34 / 0.18)'
  cinnabar: '#a44736'
  pine: '#49574c'
  bronze: '#7d6549'
  paper-glass: 'rgb(244 239 227 / 0.86)'
  darkroom-ink: 'rgb(16 17 15)'
typography:
  display:
    fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif"
    fontSize: 'clamp(2.75rem, 4.75vw, 5rem)'
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "'Noto Serif SC', serif"
    fontSize: '2.25rem'
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "'Noto Serif SC', serif"
    fontSize: '1.75rem'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Noto Serif SC', serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "'Noto Sans SC', sans-serif"
    fontSize: '0.68rem'
    fontWeight: 500
    letterSpacing: '0.28em'
rounded:
  sm: '2px'
  md: '4px'
spacing:
  gutter: '1.25rem'
  gutter-lg: '2.5rem'
  section: '5rem'
  section-lg: '8rem'
components:
  button-primary:
    backgroundColor: '{colors.songyan-ink}'
    textColor: '{colors.xuan-paper}'
    rounded: '{rounded.sm}'
    padding: '0.5em 1.25em'
  button-primary-hover:
    backgroundColor: '{colors.cinnabar}'
    textColor: '{colors.xuan-paper}'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.songyan-ink}'
    rounded: '{rounded.sm}'
    padding: '0.5em 1.25em'
  button-ghost-hover:
    backgroundColor: '{colors.songyan-ink}'
    textColor: '{colors.xuan-paper}'
  inscription-tooltip:
    backgroundColor: '{colors.xuan-paper}'
    textColor: '{colors.songyan-ink}'
    rounded: '{rounded.sm}'
    padding: '0.45rem 0.85rem'
---

# Design System: 墨笺 mojian

## Overview

**Creative North Star: "墨笺书房 The Ink Study"**

访客如入主人的书房，又亲手夺住一轴正在展开的长卷：四壁是宣纸，器物皆纸墨，朱砂印泥搁在案头，只在落款时落下。系统只有三种材料——纸（底色）、墨（文字与线条）、朱砂（唯一强调色），层级靠字号、字重、留白与 1px 墨线拉开，拒绝卡片盒与色彩噪音。巨幅汉字可以越出视口、承载真实图像，纸层可以跨栏覆压，入口先夺屏、正文再安静。页面切换遵循横向拉卷（旧页 150ms 退入左侧，新页 250ms 从右侧卷边展开），昼夜切换仍从印钮向整间书房扩开一张新纸；图像如装裱揭晓，光影章节如入暗室显影——每一处动效都对应一个书房里的动作。

书房是活的：昼夜双主题共用一套令牌（`data-theme` 与 `prefers-color-scheme` 双通道，值必须保持一致），云气柔斑 72–96s 缓漂，毛笔尖光标随行；`prefers-reduced-motion` 下关闭位移、缩放、裁切与滚动叙事，只保留至多 160ms 的颜色、边框或透明度反馈，无 JS 时内容完整直达。

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

- **Hero 册页题字**（400）：卷名 `clamp(1.65rem,3.15vw,2.85rem)`，章名 `clamp(1.2rem,1.8vw,1.65rem)`；文字作为真实 DOM 覆盖在册页上，不烘焙进图像。
- **装饰主字**（400，`aria-hidden`）：页面卷首 `clamp(10rem,22vw,20rem)`，强调场景最高 `clamp(10rem,24vw,22rem)`，首页章号 `clamp(6rem,11vw,10rem)`；移动端分别收敛到约 8–12rem 与 5–7rem。装饰字可以裁切，但不得挤压真实内容。
- **页面题名**（400）：普通与文章题名 `clamp(2.75rem,4.75vw,5rem)`，强调场景同样以 5rem 封顶；移动端普通题名最高 3.25rem、强调题名最高 3.5rem。
- **章节题名**（400）：chapter `clamp(2.5rem,4.25vw,4rem)`，普通 section `clamp(2.25rem,3.25vw,2.75rem)`，条目题名最高 `clamp(1.75rem,2.75vw,2.5rem)`；移动端依次封顶 2.5rem / 2.5rem / 2.25rem。
- **Headline**（600, 2.25rem, 1.3）：正文内部主标题。
- **Title**（600, 1.75rem, 1.3）：正文小节标题；prose 内 h2 配 3px 左侧墨线题签。
- **Body**（400, 1rem 浏览器基准, 1.8）：正文；阅读栏约 40 字/行（42rem）。
- **Label**（500, 0.68rem, 字距 0.28em, 大写, 古铜）：`.folio-label` 卷标。

### Named Rules

**The 三档小字 Rule.** 小字号只许三档：0.62rem（卷首卷尾 folio 行、图注）、0.68rem（标签、大写字距）、0.72rem（meta、题跋弹层）。不得另创第四档。

**The 题字不入文 Rule.** Ma Shan Zheng 只出现在题名、印章、首字下沉与诗句；正文、按钮、导航永远不用书法体。

**The 题字双轨 Rule.** 装饰字与真实标题必须使用不同字号角色：前者允许越界裁切，后者除 Hero 外桌面不得超过 5rem、移动端不得超过 3.5rem。不得为了“大胆”同步放大两者；超宽窗口必须按画面占比复核，不能只看 clamp 上限。

## Layout

主轴是一只 84rem 的展台（`--container-stage`）：页眉、页脚与几乎全部页面区块都落在其上，左右页边距 `1.25rem → 2rem → 2.5rem`（sm/md/lg）。文章与项目正文收窄至 42rem 裸值（约 40 字/行）。普通章节采用半屏编辑流，通常落在 `py-12 md:py-16`，桌面目标约 55–75svh；Hero 桌面约七成半屏（75svh 封顶，首屏底部露出近况章头），移动端保持近满屏，只有桌面长卷可以跨越多个视口。大胆来自同屏叠放、尺度冲突、跨栏和纸层错位，不来自无内容的长空段。

### 夺卷入画

全站入口共享“主字 → 图像 → 纸层”的接棒关系，但不共享同一网格模板。主字允许以接近视口的尺度被裁切；真实图片既是可访问内容，也可在 `aria-hidden` 视觉副本中通过 `background-clip: text` 进入字形。装饰主字必须绝对定位在裁切容器内，不得参与网格轨道或父级高度计算。纸层必须与下一段内容建立空间方向，不能只是背景矩形。首页页眉以卷尺墨线显示当前章号与滚动进度；内页卷首与 compact 档桌面统一控制在约 45–55svh，首屏底部必须露出列表或正文入口。

### 四类卷首

- **Reading / Folio：** 以“录／年／签／类”等裁切主字建立横向刊头，题名、简介与窄幅纸本图同屏；正文入口在首屏露出。
- **Exhibition：** “器”字与横向装裱画幅相互侵入，题名和展签覆盖在画面左下，不再把文图拆成上下两行。
- **Darkroom：** “影”字从横向接触印样中显出，主影像压成暗室画带，不使用高耸竖图制造停顿。
- **Personal：** “间／留”作为裁切手记主字，短手札压住局部图像，保持同屏而非上下堆叠。

### 高潮预算与两阶段动效契约

展览级动效采用“集中式高潮”：同一页面只允许一个主记忆场景，其他导航、主题和高频反馈仍遵守 150/160/250ms。第一阶段由首页开卷与内页卷首交棒承担；方向确认后，第二阶段仅在器作索引加入装裱回正、在暗室灯箱加入翻底片，不能把这两种峰值扩散到普通列表或相邻切换。

- **会话级开场：** 首页六卷完整翻过一轮后回到卷首，每个标签会话只播放一次，以 `sessionStorage['mojian:hero-intro:v1']` 记录；存储不可用或低动态时直接显示稳定卷首，开场不锁滚动。素材预载或开场翻动期间，方向键与外侧箭头会先终止开场、结算当前自动页并执行用户翻页，此后本会话不恢复开场；拖页热区仍在自动开场期间门控。
- **可翻页册页：** 六张图像统一为 `1760×1240` RGBA 透明画布，使用同一张书体母版、同一书脊与纸张纹理；可见书本边界固定在约 `(89,270)–(1671,966)`，四周是真透明并以暖灰纸纤维收边，不得出现矩形白底或高亮白边。卷首以细墨淡彩山水定调，其余五卷分别使用文房静物、纸模型、相纸、茶盏花枝与花鸟留言笺，统一材质但不重复题材。Hero 画布保持上游 `1760 / 1240` 比例，沟槽、动态明暗与阴影只覆盖可见纸页带；18 段曲面由 CSS / 原生脚本生成。章节名、摘要、统计与入口印章保持真实 DOM，翻页前后交叉淡入。
- **卷首交棒：** 桌面四类 `PageIntro` 为 45–55svh、无 pin、`scrub: 0.5`，从卷首顶部抵达页眉到卷首底部离开页眉完成主字、纸本、画框或手记交棒；滚动帧只写 `transform`、`opacity`、`clip-path`。
- **移动同构版：** 移动端沿用同一 18 段曲面、弹簧、阴影与首次开场，只关闭指针视差；内页不创建 ScrollTrigger 交棒。`prefers-reduced-motion` 跳过开场与视差，拖拽仍跟手，松手立即结算。
- **器作装裱：** 器作索引的三类展品以约 `-0.8deg / +0.7deg / -0.35deg` 静置；桌面细指针 hover 与键盘 `focus-visible` 在 250ms 内回正并上移 6px。触摸不挂载位移反馈，低动态取消角度与位移，只保留 150ms 的编号颜色、展签墨线和阴影变化。
- **暗室底片：** 灯箱每次打开只播放一次 520ms 翻底片，底片框从 `rotate(-1.2deg) scale(.96)` 回正；纸白曝光层最高 0.18、360ms 消退。入场身份绑定首次打开图片的 `src`，不得依赖会随切换移动的“当前页”类；齿孔与曝光只由必要包装层的伪元素绘制，图片始终 `filter: none`。相邻切换统一 250ms 且不重复曝光，关闭沿用 250ms 共享图像回卷。

`SectionHeading` 分为 `chapter` 与 `quiet`：chapter 是首页紧凑章标，高度约 7–9rem（移动端 5.5–7rem），以裁切巨号、跨栏题字、方印与卷边展签形成尺度冲突；quiet 服务正文小节。首页六段各有节拍，但仅桌面长卷承担长时间线；移动端、无 JS 与低动态始终呈现完整静态终态。

### Named Rules

**The 紧卷成册 Rule.** Hero 桌面约七成半屏（75svh 封顶，首屏露出近况章头），移动端近满屏；桌面长卷是唯一多屏叙事；普通章节桌面目标 55–75svh，内页卷首目标 45–55svh。若首屏只能看到卷首而看不到后续内容入口，必须先检查网格自动换行、媒体高度和冗余留白。

**The 显式叠放 Rule.** 需要相互侵入的 Grid 项必须显式声明同一 `grid-row`；不得依赖列区重叠推断叠放，否则浏览器会自动新增网格行并把设计错误伪装成长留白。

全局 Footer 保留题字、往来、版权与钤印四拍，但桌面高度控制在约 360–420px，不再以半屏以上的空白收束每个页面。

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
- **Primary:** 墨底纸字 + 1px 墨边框（padding `0.5em 1.25em`）；hover 时朱砂椭圆从 `scale(.95) + opacity: 0` 至 `scale(1) + opacity: 1` 轻落（160ms ease-ink），取印泥漫纸之意
- **Ghost:** 透明底墨字 + 1px 墨线边框；hover 晕墨反白（底转墨、字转纸）
- **Hover 门控:** 晕染仅在 `@media (hover: hover) and (pointer: fine)` 启用

### Links

- **正文链接:** 朱砂 + 1px 下划线（offset 0.2em），hover 线粗 1px→2px
- **墨线链接（ink-link）:** 默认无下划线，hover 时 1px 墨线自左向右"写出"（`scaleX(0→1)`，250ms ease-ink）
- **回卷链接（page-backlink）:** 淡墨小字 + 朱砂「←」，hover 左移 0.2rem

### Navigation

- 页眉毛玻璃：静止时 20% 纸玻璃 + `blur(10px)`；滚动 >24px 全量纸玻璃 + `blur(18px) saturate(0.9)`，底部 1px 墨线自左写出
- 导航墨线是一把卷尺：非首页以图标落朱砂标记当前路由且刊号固定占位；首页滚动时刊名切换为当前章号与章名，朱砂圆目以自身 `translate3d` 沿墨线连续移动
- 昼夜印钮：指针触发且支持 View Transition 时，新主题从印钮中心以 250ms 圆形换纸铺满视口；键盘/辅助技术、reduced-motion、API 不支持或启动失败时立即切换
- 移动端以当前栏目 `<summary>` 收起导航，点击后在页眉下悬浮展开 3 列 × 2 行卷目纸笺；原生 `<details>` 保证键盘与无 JS 可用，增强脚本只补外部点击、Escape 回焦与桌面断点清理。展开 160ms、收起 110ms，低动态取消位移并即时收口
- 页尾 Colophon 四拍：「山高水长」题字收束 → 往来行 → 墨线写出 → 版权钤印行

### 印章 Seal（签名组件）

- **描边派:** 1px 朱砂边框方印（1.5rem 品牌印 rotate(-3deg)，hover 回正缩 0.96 / ease-seal 回弹；2.8rem 页脚印；1.9rem 昼夜印钮内嵌「昼/夜」旋转交叉淡入）
- **白文派:** 朱砂底纸字方印（章节序号「壹/贰/叁」、Hero 钤印）；白文共性已收敛为 `.seal-block` 全局原语，尺寸/旋转/横竖排由各印章变体补齐
- 印文一律 Ma Shan Zheng

### 题跋弹层 InscriptionTip

纸底墨线小笺（max-width 16rem、1px 墨线、2px 圆角、装裱影），非衬线 0.72rem、字距 0.1em；自触发点晕出（`scale(0.96→1)`，入场 160ms / 退场 110ms，延迟 350ms）；无 JS 时退回原生 `title`。

### 条目 Entry List

无盒条目：1px 墨线顶分隔；hover 时极淡深纸底色自左晕开（`scaleX(0.35→1)`），条目编号落朱砂；feature 条目改 2px 墨顶线 + 55% 淡朱砂编号 + 书法体大题。

### 图像装裱 Media Frame

容器即装裱：`overflow: hidden` + 深纸衬底 + 装裱影，无边框无圆角；揭示时深纸遮罩自右揭去（900ms）同时图像 `scale(1.035→1)`（1100ms）；右下角落半透明纸底小展签（0.62rem、字距 0.18em）。器作索引允许三档不足一度的静态装裱角，并在 hover / 键盘聚焦时回正。暗室显影由 `#131412` 独立暗层在 250ms 内淡出；灯箱底片框只用伪元素加齿孔与纸白曝光，图像始终保持 `filter: none`。

### 阅读进度墨条

文章页顶 2px 墨至朱砂渐变条（`linear-gradient(90deg, ink, cinnabar)`），末端 4px 朱砂圆点，随滚动 scaleX 写出；reduced-motion 直接隐藏。

### Reveal 契约

`data-reveal-variant` 只是一份内部 DOM / CSS 动效契约，不是公开组件 API。可用值为 `intro-reading`、`intro-exhibition`、`intro-darkroom`、`intro-personal`、`folio`、`folio-turn`、`spread`、`exhibit`、`contact-sheet` 与 `stagger`：分别表达主字入画、纸层揭开、章节墨线、册页自上缘翻起（接缝处首个纸层，需在组件内声明初态以压过 scoped transform）、跨页错峰、展签错峰、暗室显影与普通列表揭示。`data-home-chapter` 只供页眉读取首页章号与进度；Hero 的 `data-hero-intro="riffle"` 只标记会话首次开场；`PageIntro` 的 `glyph` / `artTreatment` 和 `SectionHeading` 的 `mode` 也只属于内部展示契约。CSS 负责普通揭示、静止终态、hover、按压、遮罩与细线；Hero 使用原生 `requestAnimationFrame`，GSAP 只承担桌面长卷、暗室和有限视差。所有普通前置隐藏仅在 `:where(html.js.reveal-ready)`、非低动态条件下成立；`:where()` 刻意把门控权重归零，使后置 `.is-revealed` 终态始终可以覆盖初态。无 JS、低动态、不支持观察器或初始化异常时直接显示完整内容。

## Do's and Don'ts

### Do:

- **Do** 用 1px 墨线分界、用留白分章、用纸色深浅分层——这是本系统的"三件套"。
- **Do** 给每个新装饰一个书房出处（题跋、钤印、装裱、显影），并写进注释。
- **Do** 把位移/缩放/晕染类 hover 包进 `@media (hover: hover) and (pointer: fine)`。
- **Do** 同步维护深色令牌的两处定义（`data-theme='dark'` 与 `prefers-color-scheme`），并在 `.darkroom` 内只重映射墨色系。
- **Do** 高频反馈只用 150/160/250ms 可中断 transition，页面换卷与主题换纸也不得超过 250ms；400ms 以上只留给一次性叙事。优先只动 `transform`/`opacity`，主题换纸可使用 `clip-path`，曲线用 `--ease-ink`（印章反馈才用 `--ease-seal`）。
- **Do** 让入口用一个主字、一幅真实图像和一张纸完成夺屏；删去文案后，版面骨架仍应能说明这一章是什么。
- **Do** 为 reduced-motion 与无 JS 保留完整内容；低动态关闭空间移动但可保留至多 160ms 的颜色、边框与透明度反馈。

### Don't:

- **Don't** 引入红金宫廷风、SaaS/Dashboard 骨架、默认 shadcn 视觉、重复圆角卡片墙。
- **Don't** 使用 AI 味蓝紫渐变、滥用玻璃拟态（全站仅页眉一处纸玻璃）。
- **Don't** 大面积纯黑纯白或高饱和多色并用——墨是 `#252622` 不是 `#000`，纸是 `#f4efe3` 不是 `#fff`。
- **Don't** 创造第四档小字号、第三档圆角或第二种强调色。
- **Don't** 用阴影勾勒界面结构，或给条目加卡片盒。
- **Don't** 让书法体进入正文、按钮或导航。
- **Don't** 用“字号更大 + 轻微旋转 + 多一个 hover”冒充大胆设计；若观看方式没有改变，就应重做结构而不是继续加码。
