---
title: 观山历
summary: 把节气与山色收进一页长卷的概念日历。
year: 2026
status: 概念作品
role: 视觉设计、交互原型
stack:
  - TypeScript
  - CSS
  - GSAP
cover: ../../assets/projects/guanshanli/mountain-calendar.webp
coverAlt: 晨雾在层叠群山之间流动，近处松林带着微弱秋色
gallery:
  - src: ../../assets/projects/guanshanli/mountain-calendar.webp
    alt: 晨雾在层叠群山之间流动，近处松林带着微弱秋色
    caption: 山脊的远近对应一年中光色与气候的变化。
  - src: ../../assets/projects/guanshanli/four-seasons-stream.webp
    alt: 溪水绕过黑色湿石，一束松针与一片锈红落叶停在水边
    caption: 松针、落叶与水势形成四时并置的微观注脚。
order: 3
draft: false
featured: true
---

观山历把公历、节气与个人记录叠在一幅可缓慢展开的山水长卷里。用户先看到季节气息，再在需要时读到具体日期。

长卷并不劫持滚动。桌面端用克制的视差表达山势远近，移动端回到清晰的纵向时间线，减少动态模式则直接展示最终构图。

## 交互边界

- 日期与事件始终可键盘访问，不把信息藏进纯悬停状态。
- 山水动效只移动 `transform` 与 `opacity`。
- 节气说明保持短小，让日历仍是主要任务。
