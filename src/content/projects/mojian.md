---
title: 墨笺
summary: 一处以内容为骨、水墨书卷为气质的个人数字空间。
year: 2026
status: 持续营造
role: 设计、前端、内容系统
stack:
  - Astro
  - React
  - Tailwind CSS
cover: ../../assets/projects/mojian/ink-awakening.webp
coverAlt: 晨光窗前，空白宣纸、毛笔与砚台静置在深色木案上
gallery:
  - src: ../../assets/projects/mojian/ink-awakening.webp
    alt: 晨光窗前，空白宣纸、毛笔与砚台静置在深色木案上
    caption: 纸、墨与留白构成全站的视觉原点。
  - src: ../../assets/projects/mojian/rain-window.webp
    alt: 雨滴附在深色木窗上，窗外群山隐入雾中
    caption: 深浅主题共享同一组山水与纸墨语义。
order: 1
draft: false
featured: true
---

墨笺不是给传统元素换一层网页皮肤，而是把书卷的阅读秩序翻译到现代浏览器：留白负责停顿，墨色建立层级，朱砂只在需要确认与落款时出现。

页面主体由 Astro 静态生成，交互保留为按需加载的 React Island。动画只承担叙事、反馈与状态转换，并为深色主题、移动视口和减少动态偏好保留完整路径。

## 营造重点

- 让首页、笺录与作品保持同一套内容层级和视觉令牌。
- 使用 Content Collections 组织长期内容，而非把数据散落在页面组件内。
- 控制客户端 JavaScript 的职责，让静态内容在无脚本环境仍可直接阅读。
