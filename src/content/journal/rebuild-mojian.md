---
title: 重建墨笺：从零开始的数字空间
description: 推倒旧站，只留纸、墨与字。记录这次以 Astro 重建个人空间的起点。
pubDate: 2026-08-01
category: 营造
tags: [Astro, 建站, 设计]
---

旧站陪我走过几年，最终还是在某个深夜被整体归档。不是它不好，而是我想要的东西变了：少一些模板的痕迹，多一些手作的质感；少一些组件的堆砌，多一些纸墨的呼吸。

于是有了这次重建。目标很朴素——一个读起来舒服、看起来耐看、改起来顺手的数字空间。

## 为什么是 Astro

内容型站点的主流选择不少，但最后留下的理由只有一条：**默认零 JavaScript**。页面在构建时渲染为纯静态 HTML，只有真正需要交互的角落才以 Island 的形式按需注水。对以文字为主的站点来说，这是最克制也最有力的架构。

```ts
// src/content.config.ts
const journal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});
```

Content Collections 让文章有了类型安全的 schema，frontmatter 写错一个字段，构建期就会拦住你——这种「安静的可靠」正是我想要的工程手感。

## 纸、墨与字

设计上只留三样东西：纸的底色、墨的层次、字的姿态。朱砂只出现在印章与链接这样该被看见的地方，像画轴卷尾那一方小印，少而准。

接下来会慢慢把文章、作品与光影都安顿进来。重建不是搬家，而是重新想清楚每一样东西该不该留下。
