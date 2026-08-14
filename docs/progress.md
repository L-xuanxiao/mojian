# 当前进度

> 每完成一个开发阶段、里程碑或影响后续阶段的决策后，立即更新本文件，不积压到下次会话。
> 架构决策变化时同步相关文档；本文件只记阶段状态，详细说明放入对应文档。

- 第一阶段 项目初始化：✅ 完成（`fe00fef`）
- 第二阶段 设计系统：✅ 完成（`0c239d0`）
- 第三阶段 首页骨架：✅ 完成（`5f0786b`）
- 第四阶段 首页动画与视觉精致化：✅ 完成（`72aaede`）
- 第五阶段 博客：✅ 完成（`6af130a`）
- 第六阶段 作品系统：✅ 完成（Projects、Project Detail、Gallery、Embla Carousel、Yet Another React Lightbox，`5c72752`）
- 全站视觉重构：✅ 完成（书卷展览版式、原创纸墨视觉、显式动效语义与原生 View Transitions，`5c72752` + `0c385c2`）
- 第七阶段 个人页面：🔶 第一批完成（About 此间、Guestbook 留墨页面与版式，`5b8ab6e`；giscus、Formspree 待外部服务开通后填入 `src/site.config.ts` 即生效）+ 个人身份层（自述 / 行年 / 站点史 / 署名改为数据入口与空态，占位演示文案已清除，待主人填写真实内容）
- 第八阶段 SEO：✅ 基础设施完成（Seo 组件、canonical/OG/Twitter Card、WebSite+Article JSON-LD、@astrojs/sitemap、动态 robots.txt、site.webmanifest，`8d0c5d7`；`site` 指向 `https://l-xuanxiao.github.io`，`base: '/mojian'` 已在 `astro.config.mjs` 配置）
- 全站视觉沉浸深化：✅ 完成（墨迹页面过渡、Hero 题字/钤印/视差/云气微尘、Footer 竹影云气、毛笔尖光标、题跋 Tooltip（@base-ui-components/react）、hover 门控统一；reduced-motion 静止降级与无 JS 兜底保留）
- 全站设计深化四批次：✅ 完成（笺录续卷/跋文/题签/墨条进度、年谱墨线生长与节点落墨、光影装裱绫边/题跋竖行/暗室灯箱、404「此处无卷」与外部服务向导 `scripts/setup-external-services.sh`）
- 四章视觉节奏差异化：✅ 完成（器作展签景深、笺录刊物目录与阅读时长、光影暗室显影（`.darkroom` 固定深墨 + 作用域 token 重映射，首页与 `/gallery/` 均入暗）、此间起笔朱砂与云气，`15086ec`–`a7cb6be`）
- Header/Footer 精修：✅ 完成（页眉刊物化——Lucide 静态 SVG 导航图标（当前页图标落朱砂）、品牌 MOJIAN 拉丁小字、卷头细线滚动写出、昼夜印钮；页尾 Colophon 四拍——「山高水长」收束、往来行（GitHub/RSS/回卷首）、墨线写出、版权钤印行）
- 全站视觉 QA 收口：✅ 完成（修复移动端 CurrentFolio 题字重叠折行、窄屏导航末项裁切、年谱闲笔移动端叙事倒置；小字号收敛为 0.62/0.68/0.72 语义三档；Hero 比例、朱砂密度、高潮分布、easing 体系审查后确认保持）
- 全站 2.5D 水墨动效深化：✅ 完成（单例 Canvas 2D 水墨粒子、Hero / 长卷三层景深、PageIntro 四场景节奏、阅读避让，以及低动态 / 无 JS 降级）
