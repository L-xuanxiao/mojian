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
- 笺字印章网站图标：✅ 完成（朱砂白文「笺」字方印，SVG 手绘路径不依赖字体 + 同源 ico 回退，`fe860d4`）
- 全站六章墨场重设计：✅ 完成（章节戏剧化 + 阅读区安静；Header 刊头滚动态、四类卷首、首页六段差异化章法、`data-reveal-variant` 内部动效契约，`d6461fc`）
- 展览级数字长卷动效升级 Phase 1：✅ 完成（首页会话级墨滴开卷、手工 SVG “墨/笺”笔路、约 450ms 回访短版、移动 750ms 内轻量版；四类桌面卷首 45–55svh 无 pin 滚动交棒）
- 展览级数字长卷动效升级 Phase 2：✅ 完成（器作索引三档装裱角与 hover / 键盘回正；暗室灯箱 520ms 翻底片、360ms 纸白曝光、伪元素齿孔框；相邻切换 250ms，不动画图片 filter，触摸 / 低动态 / 无 JS 降级完整）
- 移动端卷目二级菜单：✅ 完成（主导航由横滑改为当前栏目 `<details>`；页眉下悬浮 3×2 纸笺菜单，原生键盘 / 无 JS 可用，外部点击、Escape 回焦、断点与低动态清理完整）
- 全项目代码质量五项修复：✅ 完成（灯箱一次性 `src` 入场身份、Header / Hero 内部脚本模块化、Storage 安全边界、React 岛 reveal hydration 竞态修复、Playwright 关键回归与 GitHub Pages `quality` 部署门禁）
- 首页可翻页素描本 Hero：✅ 完成（六张样图式纸本质感的全幅水墨山水册页——细钢笔线、暖赭灰墨、左侧叠页与中央书脊；Astro 真实内容、原生 18 段 CSS 3D 曲面与弹簧、会话级六卷开场、拖拽 / 键盘 / 缩放 / 朱砂入口、移动同构与低动态 / 无 JS 终态）
- Hero 册页题材多样化：✅ 完成（卷首保留山水；笺录 / 器作 / 光影 / 此间 / 留墨改为砚台纸笺、纸模型、相纸、茶盏花枝与花鸟留言笺；五张旧山水按 `*-landscape-backup.png` 保留；翻页内核与尺寸不变）
- Hero 上游素材几何对齐：✅ 完成（六张重制为同构 `1760×1240` RGBA 透明册页，统一书体、书脊、纸纹、边界与暖灰收边；清除黑底可见的矩形白边，瑕疵备份已按后续确认清理；画布比例、纸页遮罩和预载解码对齐上游，18 段几何与弹簧不变）
- Hero 开场竞态修复：✅ 完成（按上游 `spring / tick`、`startTurn / step` 与 `endIntro / riffleStep` 恢复单一翻页动画所有权；方向键 / 外侧箭头可在预载或开场期间接管，旧开场不再续播；几何、弹簧、阴影、素材与正常缓动保持不变）

以下工作已于 2026-08-23 合并至 `main` 并推送部署（原 `tight-volumes`）：

- 仓库 LF 行尾基线：✅ 完成（`.gitattributes` 统一 eol=lf + 二进制豁免，全仓 Prettier 格式化基线清零，`9e60c2d`，在 `main`）
- 全站紧卷成册布局重构：✅ 完成（网格叠放根因修复、内页卷首 45–55svh、普通章 55–75svh、Footer 收束，`a32186a`）
- critique 五项修复：✅ 完成（768 断点 resize 时间线重建、昼间 bronze 提亮过 4.5:1、章高达标、三档小字收敛、卷尾「展毕」印章跳章肆 + Lenis `anchors: true`，`0af7ddf`）
- 评审后三项打磨：✅ 完成（Hero CTA 常驻墨线、题跋弹层首开后即时态、长卷无字空窗消除，`96b0054`）
- 展墙贴边与 Hero 宽视口修复：✅ 完成（用户真实视口 1707×735 复现定位：展墙 82rem 对齐裁切边界、Hero `min(75svh, 46rem)` + 山水图固定高度防 3:2 自然比撑高，DESIGN.md 契约同步，`4a882e9`）
- 三项动效落地：✅ 完成（合卷收束 mount clip-path、`folio-turn` 翻页接棒变体、印泥磁吸 quickTo ±3px、移动端 statement 卡角钤印，`5739089`）
- code-review 八项修复：✅ 完成（三档小字定向回归、journal / 日期 / 主题 / 断点 / 磁吸共享、navItems 集中、白文方印原语，`43f34d8`）
- 全项目代码续审：✅ 完成（Standards 5 项、Spec 4 项；本轮仅报告未修复，详见 `docs/tasks/todo.md`）
- 动效专项九项修复：✅ 完成（轮播/主题键盘即时响应，页面与主题换纸 ≤250ms，页眉仅写标记 `translate3d`，按钮 160ms 轻落，图片遮罩显影替代 filter，全站 reduced-motion 逐项温和降级；设计契约与本地 sidecar 已同步）
