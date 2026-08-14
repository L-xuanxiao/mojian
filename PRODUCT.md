# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

双重受众，不区分主次：作者本人（持续写作与自我表达）与访客（读者/订阅者，以及潜在雇主或合作方）。访客的核心任务是在沉浸式阅读中理解作者其人、其文、其作。

## Product Purpose

mojian（墨笺）是作者的个人数字空间：以「笺录」（博客）、「器作」（项目）、「光影」（影像画廊）三条内容线承载写作、作品与影像，辅以「此间」（关于）与「留墨」（留言）。成功标准是：作者持续写作沉淀，访客愿意停留、阅读并记住这个空间。

## Positioning

差异化定位即「现代东方水墨书卷」沉浸世界本身——别的个人网站可以照抄内容类型，但抄不走这套以纸墨、题跋、钤印、暗室显影等原创视觉语言构成的整体体验。设计即定位。

## Operating Context

- 纯静态站点：Astro 7 构建，部署于 GitHub Pages 子路径 `/mojian`，无后端。
- 内容以 Markdown 内容集合（journal / projects / gallery）维护，经 pnpm 工作流构建发布。
- 当前站点文案与内容均为中文。

## Capabilities and Constraints

- 硬约束（用户确认）：必须保持纯静态、可部署到 GitHub Pages 子路径。
- 已有能力：三内容集合 + 搜索（pagefind）、RSS、sitemap、深浅双主题、reduced-motion 与无 JS 降级。
- 待定项：giscus 留言、Formspree 表单、联系邮箱、作者署名 displayName 均未配置，`src/site.config.ts` 留空待主人填写。

## Evidence on Hand

- 真实内容：`src/content/` 下 3 篇笺录、3 个器作、6 条光影条目；`src/assets/` 下原创水墨 webp 视觉资产。
- 无推荐信、客户、媒体报导等社会证明素材——未来工作不得虚构。

## Product Principles

1. 沉浸世界优先：视觉体验是定位本身，任何改动不得以"优化"为由削弱它。
2. 写作与作品双主线：内容结构与导航平等服务读者与机会型访客。
3. 静态优先：无后端、无运行时服务依赖；交互以 Island 与渐进增强实现。
4. 装饰必有出处：每个视觉元素对应意图，拒绝无意义堆砌。
5. 内容优先、层次清晰：版式服务阅读，不为形式牺牲可读性。
