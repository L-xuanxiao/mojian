# Mojian 新版个人网站技术规划

> 项目名称：`mojian`  
> 项目类型：个人数字空间 / 博客 / 作品集  
> 技术方向：Astro + React  
> 规划时间：2026-08-08

---

## 1. 项目定位

新版 `mojian` 不再只是传统的“中国古风博客”。

项目定位调整为：

> **融合东方美学、个人博客、项目作品、摄影画廊与个人经历的数字空间。**

网站需要同时承担以下功能：

- 个人主页
- 博客文章
- 项目作品集
- 摄影与画廊
- 个人经历
- 当前状态
- 标签与归档
- 站内搜索
- 评论与留言
- RSS
- SEO
- 响应式布局
- 昼夜主题
- 高质量动画
- GitHub Pages 静态部署

设计上继续保留“墨笺”的东方视觉特色。

主要视觉元素可以包括：

- 水墨
- 宣纸
- 朱砂
- 山水
- 竹影
- 长卷
- 书页
- 印章
- 毛笔笔触
- 古籍装帧

但整体需要结合现代网页设计。

避免把网站做成单纯的“古风模板”。

---

# 2. 核心技术栈

新版项目采用：

```text
Astro
React
TypeScript
Tailwind CSS

Motion
GSAP
Lenis

Astro Content Collections
Markdown / MDX

Pagefind
Astro Image
Astro Fonts

shadcn/ui
Base UI
Lucide

giscus
Formspree
Umami

Vitest
Playwright

GitHub Pages
pnpm
Node.js LTS
```

整体架构：

```text
mojian
│
├── Astro
│   ├── 页面路由
│   ├── Layout
│   ├── SEO
│   ├── Markdown
│   ├── Content Collections
│   ├── RSS
│   ├── Sitemap
│   ├── Fonts
│   └── Images
│
├── React Islands
│   ├── Hero
│   ├── Projects
│   ├── Gallery
│   ├── Timeline
│   ├── Lightbox
│   └── Interactive UI
│
├── Motion
│   └── React 组件动画
│
├── GSAP
│   └── 大型滚动动画
│
├── Lenis
│   └── 平滑滚动
│
├── Tailwind CSS
│   └── 布局与设计系统
│
└── Base UI / shadcn
    └── 无障碍交互组件
```

---

# 3. 框架

## 3.1 可选方案

主要候选：

- Astro
- Next.js
- React Router Framework
- SvelteKit
- Nuxt

## 3.2 最终选择

> **Astro**

Astro 负责：

- 页面路由
- 静态生成
- SEO
- Markdown
- 博客
- Content Collections
- RSS
- Sitemap
- 图片优化
- 字体
- 页面 Layout

React 不负责整站。

React 只负责真正需要客户端交互的部分。

这样可以避免把整个网站变成大型 SPA。

---

# 4. React

## 最终选择

> **React 19**

React 主要用于：

```text
复杂 Hero
项目展示
Gallery
Lightbox
Timeline
筛选器
弹窗
拖拽
交互动画
复杂 Hover
动态状态
```

普通静态区域优先使用 Astro：

```text
Header
Footer
文章正文
文章目录
文章列表
分类页
归档页
SEO
静态介绍
```

原则：

> 能使用 Astro 完成，就不要无意义地创建 React Island。

---

# 5. TypeScript

项目统一使用：

> **TypeScript**

文件类型主要为：

```text
.astro
.ts
.tsx
.md
.mdx
.css
```

不开 JavaScript 和 TypeScript 两套写法。

配置建议保持严格类型检查。

---

# 6. 包管理器

主要候选：

- npm
- pnpm
- Yarn
- Bun

最终选择：

> **pnpm**

项目只保留：

```text
pnpm-lock.yaml
```

不要同时存在：

```text
package-lock.json
yarn.lock
bun.lock
```

---

# 7. Node.js

推荐：

> **Node.js LTS**

新项目优先使用当前稳定 LTS，而不是 Current 实验主线。

项目可以在 `package.json` 中声明最低版本。

例如：

```json
{
  "engines": {
    "node": ">=24"
  }
}
```

---

# 8. CSS 与设计系统

## 8.1 可选方案

- 原生 CSS
- Tailwind CSS
- CSS Modules
- UnoCSS
- styled-components

## 8.2 最终选择

> **Tailwind CSS 4 + 原生 CSS + CSS Variables**

Tailwind 负责：

- Grid
- Flex
- 间距
- 响应式
- 常见布局
- 状态
- 基础排版

原生 CSS 负责：

- 水墨效果
- 宣纸纹理
- 高级动画
- 特殊伪元素
- View Transition
- CSS Mask
- Blend Mode
- Filter
- 特殊组件视觉

设计变量统一定义。

例如：

```css
@theme {
  --color-paper: #f4efe3;
  --color-paper-deep: #e4dac7;

  --color-ink: #252622;
  --color-ink-soft: #69685f;

  --color-cinnabar: #a44736;
  --color-pine: #49574c;
  --color-bronze: #8b7355;
}
```

不要让网站变成默认 Tailwind 风格。

---

# 9. 动画系统

新版动画分成三层。

---

## 9.1 CSS Animation

适合：

- 云雾
- 竹叶
- 墨粒
- 灯笼
- 印章
- 按钮笔触
- 小幅 Hover
- 光影
- 呼吸动画

简单动画优先使用 CSS。

不要为了一个 `opacity + translateY` 引入大型 JavaScript 动画。

---

# 10. Motion

主要候选：

- Motion
- React Spring
- Anime.js
- GSAP

React 局部动画最终选择：

> **Motion**

安装：

```bash
pnpm add motion
```

React 中使用：

```tsx
import { motion } from "motion/react";
```

主要负责：

- 卡片动画
- Hover
- Modal
- Lightbox
- AnimatePresence
- Layout Animation
- 图片切换
- 项目展开
- 按钮反馈
- React 组件进入动画

---

# 11. GSAP

复杂动画最终选择：

> **GSAP + ScrollTrigger**

安装：

```bash
pnpm add gsap @gsap/react
```

GSAP 主要负责：

- 山水长卷
- Scroll Storytelling
- 横向滚动
- ScrollTrigger
- Pin
- Scrub
- Snap
- SVG 动画
- 大型 Timeline
- 多层视差
- 场景切换

例如首页可以设计：

```text
进入首页

↓

水墨标题出现

↓

人物 / 简介

↓

项目展示

↓

山水长卷开始

↓

滚动驱动画卷展开

↓

文章出现

↓

摄影画廊

↓

个人时间线

↓

印章 Footer
```

不要使用 GSAP 实现所有微动画。

---

# 12. 平滑滚动

候选：

- 浏览器原生滚动
- Lenis
- GSAP ScrollSmoother
- Locomotive Scroll

最终选择：

> **Lenis**

安装：

```bash
pnpm add lenis
```

架构：

```text
Lenis
  ↓
统一页面滚动
  ↓
GSAP ScrollTrigger
```

不要同时引入两个平滑滚动库。

必须支持：

```css
@media (prefers-reduced-motion: reduce)
```

用户关闭动画时，应退回较简单的动画或原生滚动。

---

# 13. 页面切换

候选：

- Astro View Transitions
- Astro ClientRouter
- Swup
- Barba.js
- React Router

最终选择：

> **Astro 原生 View Transitions**

新版项目不再默认使用 Swup。

优先使用 Astro 自己的页面过渡能力。

可以实现：

- 淡入
- 墨迹覆盖
- 宣纸展开
- 山水遮罩
- 页面元素持续存在

初期不要加入复杂 Client Router。

只有以后确实需要更完整的客户端页面导航时，再考虑启用。

---

# 14. UI Primitive

候选：

- Base UI
- Radix UI
- React Aria
- Headless UI
- shadcn/ui

最终选择：

> **shadcn/ui + Base UI**

shadcn 主要提供可维护的组件代码。

Base UI 提供底层可访问交互能力。

初始化：

```bash
pnpm dlx shadcn@latest init -t astro
```

不要一次安装整套组件。

推荐按需增加：

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add sheet
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add tooltip
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add accordion
```

然后重新设计样式。

不要保留默认的：

- SaaS 卡片风格
- 大圆角
- 灰色 Border
- 默认 Button
- Dashboard 风格

---

# 15. 图标系统

候选：

- Lucide
- Iconify
- Phosphor
- Heroicons
- 自定义 SVG

最终组合：

> **Lucide + 自定义 SVG**

Lucide 用于功能图标：

```text
Menu
Search
Close
GitHub
Mail
Arrow
External Link
Download
Fullscreen
Theme
```

自定义 SVG 用于：

```text
印章
祥云
竹叶
山水
书卷
毛笔
砚台
品牌 Logo
```

不要使用普通 UI 图标代替古风装饰。

---

# 16. 字体系统

候选中文字体：

### 正文

- Noto Serif SC
- Source Han Serif
- LXGW WenKai

### UI

- Noto Sans SC
- MiSans
- HarmonyOS Sans SC

### 展示字体

- Ma Shan Zheng
- Long Cang
- 自定义书法 SVG

最终建议：

```text
正文
Noto Serif SC

UI
Noto Sans SC / MiSans

大型章题
Ma Shan Zheng

少量手写
LXGW WenKai / Long Cang
```

字体使用比例建议：

```text
约 80% 正文宋体
约 15% UI 字体
约 5% 展示字体
```

避免整页使用书法字体。

优先使用 Astro Fonts 管理和自托管字体。

---

# 17. 内容系统

最终选择：

> **Astro Content Collections**

内容目录建议：

```text
src/content/
├── journal/
│   ├── 2026/
│   └── ...
│
├── projects/
│
└── gallery/
```

Content Schema 统一放入：

```text
src/content.config.ts
```

文章字段可以包括：

```text
title
description
pubDate
updatedDate
category
tags
cover
draft
featured
```

---

# 18. Markdown 与 MDX

普通文章：

```text
.md
```

包含高级组件的文章：

```text
.mdx
```

安装：

```bash
pnpm astro add mdx
```

不要所有文章全部改成 MDX。

普通文章继续使用 Markdown。

---

# 19. 代码高亮

候选：

- Shiki
- Prism
- highlight.js
- Expressive Code

基础方案：

> **Astro 自带 Shiki**

如果以后技术文章很多，再加入：

> **Expressive Code**

用于：

- 文件名
- 行号
- Diff
- 高亮行
- 复制按钮
- 多语言代码块

初期不必安装。

---

# 20. 搜索系统

候选：

- Pagefind
- Fuse.js
- Algolia
- Orama

最终选择：

> **Pagefind**

安装：

```bash
pnpm add -D pagefind
```

构建脚本：

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

特点：

- 完全静态
- 无后端
- 中文支持
- 索引构建在编译阶段完成
- 非常适合博客

---

# 21. 图片系统

主要使用：

> **Astro `astro:assets`**

推荐：

```text
src/assets/
```

而不是把所有图片放进：

```text
public/
```

Astro 负责：

- WebP
- AVIF
- Responsive Images
- Width
- Height
- 图片优化
- 防止 CLS

使用：

```astro
<Image />
<Picture />
```

如果 pnpm 环境下需要 Sharp：

```bash
pnpm add sharp
```

---

# 22. Carousel

候选：

- Embla Carousel
- Swiper
- Keen Slider
- Motion 自己实现

最终选择：

> **Embla Carousel**

安装：

```bash
pnpm add embla-carousel-react
```

主要用于：

- 摄影画廊
- 项目图片
- 图片集
- 横向作品展示

不要用于文章主体导航。

---

# 23. Lightbox

候选：

- Yet Another React Lightbox
- PhotoSwipe
- Fancybox
- Motion 自制

推荐：

> **Yet Another React Lightbox**

安装：

```bash
pnpm add yet-another-react-lightbox
```

如果后期要求极强的视觉统一，可以基于 Motion 自己实现 UI。

---

# 24. 评论系统

候选：

- giscus
- utterances
- 自建评论
- 第三方评论 SaaS

最终选择：

> **giscus**

基于 GitHub Discussions。

适合：

- 文章评论
- 留言墙
- 无数据库静态站

优点：

- 无广告
- GitHub 登录
- 不需要后端
- 支持主题
- 易于静态部署

---

# 25. 联系表单

候选：

- Formspree
- Web3Forms
- mailto
- 自建 API

最终选择：

> **Formspree**

负责私人联系表单。

分工：

```text
文章评论
→ giscus

公开留言
→ giscus

私人联系
→ Formspree
```

---

# 26. 网站统计

候选：

- Umami
- Plausible
- Google Analytics
- Cloudflare Web Analytics

推荐：

> **Umami**

适合个人网站。

主要用于：

- PV
- UV
- 来源
- 页面访问
- 设备
- 国家/地区
- 自定义事件
- Core Web Vitals

不需要给 Astro 安装专用包。

---

# 27. SEO

不安装额外大型 SEO 库。

自己创建：

```text
src/components/Seo.astro
```

统一处理：

```text
title
description
canonical
Open Graph
Twitter Card
JSON-LD
article metadata
robots
```

---

# 28. Sitemap

使用 Astro 官方集成：

```bash
pnpm astro add sitemap
```

---

# 29. RSS

安装：

```bash
pnpm add @astrojs/rss
```

提供：

```text
/rss.xml
```

文章发布后自动进入 RSS。

---

# 30. 格式化

候选：

- Prettier
- Biome
- dprint

最终选择：

> **Prettier + Astro Plugin**

安装：

```bash
pnpm add -D prettier prettier-plugin-astro
```

Prettier 负责：

```text
.astro
.ts
.tsx
.css
.md
.mdx
.json
```

---

# 31. 类型检查

安装：

```bash
pnpm add -D @astrojs/check typescript
```

建议添加：

```json
{
  "scripts": {
    "check": "astro check"
  }
}
```

---

# 32. 单元测试

候选：

- Vitest
- Jest
- Node Test Runner

最终选择：

> **Vitest**

安装：

```bash
pnpm add -D vitest
```

用于：

- 数据处理
- Content 工具函数
- slug
- 日期
- 配置
- 数据转换
- React 逻辑

不需要给所有静态 Astro 页面写单元测试。

---

# 33. E2E 测试

候选：

- Playwright
- Cypress
- WebdriverIO

最终选择：

> **Playwright**

安装：

```bash
pnpm create playwright
```

主要测试：

```text
首页加载
导航
文章页面
搜索
画廊
主题切换
Lightbox
项目页面
移动端导航
404
```

---

# 34. 部署

候选：

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify

初期最终选择：

> **GitHub Pages**

因为项目主要是静态网站。

如果以后增加：

- API
- Server Functions
- 后台
- 数据库

再迁移到：

```text
Cloudflare
Vercel
```

---

# 35. 页面规划

主要页面建议控制在六个一级入口。

```text
/
├── /journal/
├── /projects/
├── /gallery/
├── /about/
└── /guestbook/
```

对应中文：

```text
首页
墨庐

文章
笺录

项目
器作

画廊
光影

关于
此间

留言
留墨
```

文章二级页面：

```text
/journal/archive/
/journal/tags/
/journal/category/[category]/
```

---

# 36. 首页规划

首页不再只是文章列表。

推荐结构：

```text
第一幕
Hero / 水墨山水

↓

此间主人
个人介绍

↓

正在做什么
近期状态

↓

器作
代表项目

↓

山水长卷
GSAP Scroll Storytelling

↓

近来所记
最新文章

↓

光影集
摄影 / 画廊

↓

我的路
个人时间线

↓

联系入口

↓

Footer / 印章收尾
```

---

# 37. 动画规划

动画分成三个等级。

## 环境动画

低强度长期存在：

```text
云
雾
墨点
竹叶
光影
纸张纹理
```

主要使用：

```text
CSS：云、雾、竹影与纸张纹理
单例 Canvas 2D：低密度水墨粒子与纸纤维
GSAP：Hero 与山水长卷的 2.5D 分层叙事
```

全站只保留一个 Canvas 绘制上下文；按纸面、Hero、长卷、暗室与阅读场景切换密度。`prefers-reduced-motion` 仅绘静态一帧，无 JS 时显示完整静态山水与全部文字。

---

## 交互动画

用户操作时出现：

```text
Hover
项目展开
卷轴展开
Lightbox
Modal
图片切换
按钮墨迹
印章
```

主要使用：

```text
Motion
```

---

## 叙事动画

页面重点场景：

```text
Hero
山水长卷
项目章节
个人 Timeline
大型页面章节切换
```

主要使用：

```text
GSAP + ScrollTrigger
```

---

# 38. 推荐目录结构

```text
mojian/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── ink/
│   │   ├── landscape/
│   │   ├── gallery/
│   │   ├── projects/
│   │   └── svg/
│   │
│   ├── components/
│   │   │
│   │   ├── astro/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Seo.astro
│   │   │   └── ArticleCard.astro
│   │   │
│   │   └── react/
│   │       ├── home/
│   │       ├── projects/
│   │       ├── gallery/
│   │       ├── about/
│   │       └── ui/
│   │
│   ├── content/
│   │   ├── journal/
│   │   ├── projects/
│   │   └── gallery/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   │
│   ├── lib/
│   │   ├── content/
│   │   ├── animation/
│   │   └── utils/
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── journal/
│   │   ├── projects/
│   │   ├── gallery/
│   │   ├── about.astro
│   │   └── guestbook.astro
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── themes.css
│   │
│   └── content.config.ts
│
├── tests/
│
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

# 39. 创建项目

创建：

```bash
pnpm create astro@latest mojian
```

进入目录：

```bash
cd mojian
```

---

# 40. Astro 核心集成

安装 React：

```bash
pnpm astro add react
```

安装 Tailwind：

```bash
pnpm astro add tailwind
```

安装 MDX：

```bash
pnpm astro add mdx
```

安装 Sitemap：

```bash
pnpm astro add sitemap
```

---

# 41. 动画依赖

安装：

```bash
pnpm add motion gsap @gsap/react lenis
```

职责：

```text
Motion
→ React UI 动画

GSAP
→ 大型 Timeline

ScrollTrigger
→ 滚动驱动

Lenis
→ 平滑滚动
```

---

# 42. 内容与网站功能依赖

安装：

```bash
pnpm add @astrojs/rss
```

图片：

```bash
pnpm add sharp
```

Carousel：

```bash
pnpm add embla-carousel-react
```

Lightbox：

```bash
pnpm add yet-another-react-lightbox
```

---

# 43. 开发依赖

安装：

```bash
pnpm add -D \
  pagefind \
  @astrojs/check \
  typescript \
  prettier \
  prettier-plugin-astro \
  vitest \
  @playwright/test
```

---

# 44. shadcn

初始化：

```bash
pnpm dlx shadcn@latest init -t astro
```

按需安装：

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add sheet
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add tooltip
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add accordion
```

不要一次安装整个组件库。

---

# 45. 最终主要依赖

## 核心

```text
astro
react
react-dom
typescript
tailwindcss
```

## Astro

```text
@astrojs/react
@astrojs/mdx
@astrojs/sitemap
@astrojs/rss
```

## 动画

```text
motion
gsap
@gsap/react
lenis
```

## UI

```text
shadcn/ui
Base UI
Lucide
```

## 图片

```text
sharp
```

## Gallery

```text
embla-carousel-react
yet-another-react-lightbox
```

## 搜索

```text
pagefind
```

## 开发工具

```text
@astrojs/check
prettier
prettier-plugin-astro
vitest
@playwright/test
```

---

# 46. 不建议加入的依赖

新版默认不要加入：

```text
React Router
Swup
Barba.js
Anime.js
Bootstrap
MUI
Ant Design
styled-components
Locomotive Scroll
第二套 Smooth Scroll
第二套大型动画库
Google Analytics
外链 Google Fonts
```

也不要再使用旧的 Tailwind 3 配置覆盖 Tailwind 4。

---

# 47. React Island 使用规则

React 组件按照需求选择加载方式。

首屏核心交互：

```astro
<Hero client:load />
```

进入视口再执行：

```astro
<ProjectShowcase client:visible />
```

浏览器空闲执行：

```astro
<Gallery client:idle />
```

纯展示 React 组件如果不需要客户端状态，可以不添加 `client:*`。

原则：

> 不需要 JavaScript 的地方不要 Hydrate。

---

# 48. 性能原则

即使网站强调视觉和动画，也需要控制性能。

重点：

- 图片全部优化
- 大图使用 AVIF/WebP
- GSAP 按页面加载
- React Island 按需 Hydrate
- 不加载无用 UI 组件
- 不加载整套 Icon Library
- 动画尽量使用 transform / opacity
- 避免持续修改 layout 属性
- 避免过度 Canvas
- 避免大量实时 Blur
- 支持 reduced-motion
- 移动端降低动画强度

目标不是做“最轻的网站”。

目标是：

> 在保持高级视觉体验的同时，避免无意义的性能浪费。

---

# 49. 响应式原则

至少考虑：

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

设计不能只做：

```text
1920 × 1080
```

尤其需要重点测试：

```text
390px
430px
768px
1024px
1440px
1920px
```

移动端动画需要单独设计。

不能简单把桌面动画缩小。

---

# 50. 无障碍原则

所有动画必须考虑：

```text
prefers-reduced-motion
```

所有交互元素需要：

- Keyboard
- Focus
- aria-label
- Semantic HTML
- 足够颜色对比度

Dialog、Tabs、Tooltip 等优先使用 Base UI / shadcn 底层能力。

---

# 51. 旧项目迁移原则

旧版 `mojian` 不直接升级。

新版重新创建。

旧项目只迁移真正有价值的内容：

```text
文章 Markdown
真实项目资料
摄影作品
个人信息
Logo
部分图片
部分成熟文案
SEO 信息
域名和部署配置
```

不默认迁移：

```text
旧组件
旧 CSS
旧动画
旧 Layout
Swup
旧 Tailwind 配置
旧字体 Pipeline
旧首页结构
```

需要时再参考。

---

# 52. React 古风原型利用方式

之前的 React 网站定位为：

> **视觉参考与交互原型库**

可以参考或重新实现：

```text
Hero
InkParticles
ScrollJourney
FanCard
Gallery
Lightbox
Timeline
页面构图
动画设计
插画素材
```

不要直接迁移：

```text
main.tsx
App.tsx
BrowserRouter
React Router
假文章
假项目
假 Gallery 数据
旧 Layout
旧 Tailwind 配置
package-lock.json
大量未使用 shadcn 组件
```

新版应该按照当前架构重新实现。

---

# 53. 开发阶段

## 第一阶段：项目初始化

完成：

```text
Astro
React
TypeScript
Tailwind
目录结构
Git
基础配置
Formatter
Type Check
```

---

## 第二阶段：设计系统

先完成：

```text
颜色
字体
间距
布局
断点
按钮
链接
纸张
墨色
阴影
Border
动画曲线
昼夜主题
```

这一阶段不要急着写完整首页。

---

## 第三阶段：首页骨架

创建：

```text
Hero
Profile
Current Status
Projects
Scroll Journey
Journal
Gallery
Timeline
Footer
```

先做布局。

---

## 第四阶段：首页动画

加入：

```text
Motion
GSAP
ScrollTrigger
Lenis
CSS Animation
```

逐区块调试。

---

## 第五阶段：博客

完成：

```text
Content Collections
Markdown
MDX
文章详情
分类
标签
归档
RSS
Pagefind
```

---

## 第六阶段：作品系统

完成：

```text
Projects
Project Detail
Gallery
Lightbox
Carousel
```

---

## 第七阶段：个人页面

完成：

```text
About
Timeline
Contact
Guestbook
giscus
Formspree
```

---

## 第八阶段：SEO

完成：

```text
Seo.astro
Open Graph
JSON-LD
Sitemap
RSS
robots.txt
favicon
manifest
```

---

## 第九阶段：质量检查

执行：

```text
astro check
Vitest
Playwright
Responsive Test
Keyboard Test
Reduced Motion Test
Lighthouse
```

---

## 第十阶段：部署

部署：

```text
GitHub Pages
```

验证：

```text
base path
404
静态资源
Pagefind
RSS
Sitemap
图片
字体
动画
移动端
```

---

# 54. 最终技术方案

新版 `mojian` 最终采用：

```text
Framework
Astro

UI
React

Language
TypeScript

Styling
Tailwind CSS 4
CSS Variables
Native CSS

Animation
Motion
GSAP
ScrollTrigger
Lenis
CSS Animation

Page Transition
Astro View Transitions

UI Primitive
shadcn/ui
Base UI

Icons
Lucide
Custom SVG

Content
Astro Content Collections
Markdown
MDX

Search
Pagefind

Images
astro:assets
Sharp

Fonts
Astro Fonts

Gallery
Embla Carousel
Yet Another React Lightbox

Comments
giscus

Contact
Formspree

Analytics
Umami

SEO
Custom Seo.astro
@astrojs/sitemap
@astrojs/rss

Testing
Vitest
Playwright

Formatting
Prettier

Deployment
GitHub Pages

Package Manager
pnpm

Runtime
Node.js LTS
```

---

# 55. 核心原则

新版 `mojian` 的开发需要始终遵守以下原则：

1. **这是一个个人数字空间，不只是博客。**
2. **Astro 管内容，React 管交互。**
3. **React Island 按需加载。**
4. **Motion 做组件动画。**
5. **GSAP 做大型滚动叙事。**
6. **CSS 做简单和环境动画。**
7. **Lenis 只负责统一平滑滚动。**
8. **不要同时堆多套相同功能的库。**
9. **不要为了性能过度牺牲视觉效果。**
10. **也不要为了动画加入没有意义的 JavaScript。**
11. **视觉风格必须有明显的个人识别度。**
12. **避免通用博客模板感。**
13. **避免标准 shadcn / SaaS 风格。**
14. **移动端需要单独设计。**
15. **所有复杂动画需要考虑 reduced-motion。**
16. **先建立设计系统，再写页面。**
17. **先完成结构，再加入高级动画。**
18. **旧项目只作为内容与经验来源。**
19. **React 古风原型只作为视觉和交互参考。**
20. **新版从零建立干净、长期可维护的架构。**

---

# 56. 最终目标

新版 `mojian` 最终应该呈现为：

> **一个融合中国传统视觉语言和现代网页交互技术的个人数字空间。**

网站不应该只是展示“古风元素”。

它需要通过：

```text
内容
排版
动画
摄影
项目
文章
个人经历
山水场景
交互方式
```

共同形成属于 `mojian` 的视觉语言。

最终体验应该同时具备：

```text
东方感
现代感
个人感
沉浸感
内容感
技术感
生命力
```

而不是简单地给普通博客套上一层水墨皮肤。
