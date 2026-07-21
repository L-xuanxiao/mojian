# 组件目录

按职责分类，新增组件对号入座。

## layout/ — 全站布局

- `SiteHeader.astro`：固定导航栏，导航项读 `src/config/siteConfig.ts`
- `SiteFooter.astro`：页脚，文案读 `siteConfig.footer`
- `InkEffects.astro`：全站单画布动效；统一管理花瓣、湿墨轨迹、轻烟与点击墨晕，随 `prefers-reduced-motion` 停启

## home/ — 首页专属

- `ScrollPostCard.astro`：「近来所记」手卷卡片。props：`post`（blog 集合条目）、`index`（决定印章字与水墨变体，3 变体循环）
- `InkHero.astro`：（当前未被引用，待清理或复用）

## common/ — 跨页复用

- `PostCard.astro`：通用文章卡片（当前未被引用，待清理或复用）

## 分类规则

- 被多个页面引用 → `common/`
- 仅首页使用 → `home/`
- 全站框架级 → `layout/`
- 配置统一走 `src/config/siteConfig.ts`，不在组件内硬编码站名/导航/文案
