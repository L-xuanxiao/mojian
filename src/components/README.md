# 组件目录

按职责分类，新增组件对号入座。

## layout/ — 全站布局

- `SiteHeader.astro`：固定导航栏（线装书封版式），导航项读 `src/config/siteConfig.ts`
- `NavItems.astro`：导航链接列表（桌面/移动两模式），圈点与盖印样式所在
- `SiteFooter.astro`：页脚，文案读 `siteConfig.footer`
- `InkEffects.astro`：全站花叶与单画布动效；统一管理竹枝、花瓣、湿墨轨迹、轻烟与点击墨晕，随 `prefers-reduced-motion` 停启
- `PageTransition.astro`：全站墨纸遮幕换页；统一管理 Swup Hooks、WAAPI 动画、中止复位与减弱动态

## home/ — 首页专属

- `HeroSection.astro`：首屏水墨远山、题签文案与新札卡。props：`latestPost`（可空，空则新札卡不渲染）
- `StudyIndex.astro`：「书斋目录」分类索引。props：`categories`、`counts`（分类 key → 已发布篇数）
- `RecentNotes.astro`：「近来所记」手卷文章流。props：`posts`
- `ScrollPostCard.astro`：「近来所记」手卷卡片。props：`post`（blog 集合条目）、`index`（决定印章字与水墨变体，3 变体循环）
- `DeskNotes.astro`：「案头近况」深墨过渡区（此刻状态 + 一页小记）
- `AboutSection.astro`：「关于此间」文案与墨环竹影插画

## common/ — 跨页复用

（暂无；有被多个页面引用的组件时放这里）

## 分类规则

- 被多个页面引用 → `common/`
- 仅首页使用 → `home/`
- 全站框架级 → `layout/`
- 配置统一走 `src/config/siteConfig.ts`，不在组件内硬编码站名/导航/文案
