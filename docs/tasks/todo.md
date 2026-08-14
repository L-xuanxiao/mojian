# 当前任务：2.5D 水墨与全站粒子动效深化

目标：在不新增动画依赖、不改变内容模型和 URL 的前提下，以一个 Canvas 2D 环境层、Hero 三层景深与山水长卷三层景深，让动态效果达到“第一眼可见、持续观看不抢内容”。

- [x] 建立单例 Canvas 2D 水墨粒子引擎与场景观察机制
- [x] 为 Hero 制作并接入远、中、近三层山水，加入克制的指针与滚动视差
- [x] 为山水长卷制作并接入远、中、近三层长卷，补足中段连续视觉线索
- [x] 为 PageIntro 增加 reading / exhibition / darkroom / personal 场景语义与差异化节奏
- [x] 标记正文、检索和重要题名避让区，保证粒子不干扰阅读
- [x] 完成移动端、深浅主题、reduced-motion 与无 JS 降级
- [x] 执行 format:check / check / build，并完成桌面与移动端浏览器回归
- [x] 记录结果审查、性能边界与未覆盖项

## 计划确认

- 技术边界：Astro 静态优先；原生 Canvas 2D 负责环境粒子；GSAP 只负责已有的复杂叙事；不引入 Three.js、WebGL 或新依赖。
- 视觉边界：纸、墨、朱砂体系不变；粒子不使用朱砂；正文阅读栏保持安静；首页 Hero 与长卷是唯一一级动效高潮。
- 性能边界：全站仅一个 Canvas，DPR 桌面 1.5 / 移动 1.25，移动端 30fps，后台暂停；reduced-motion 只绘静态一帧。
- 兼容边界：原始完整山水作为静态兜底；无 JS 内容完整；现有 Carousel、Lightbox、Pagefind、View Transitions 与 URL 不变。

## 结果审查

- 环境层：`BaseLayout` 只挂载一个原生 Canvas 2D；按 `paper / hero / journey / darkroom / reading` 五种场景切换密度、配色与漂移，稳定路径种子保证截图可复现。粒子比例为干墨 50%、柔墨 35%、纤维 15%，桌面 / 移动数量按方案分别收敛。
- 景深素材：新增 Hero 与长卷各三张透明 WebP，原始完整山水继续承担无 JS 和加载失败兜底。Hero 题名改为遮罩落墨，三层按 2 / 5 / 9px 指针位移与 2 / 5 / 8% 滚动视差区分；长卷按 -12% / -20% / -28% 横移，诗句中段仍有连续山水与水路承接。
- 页面节奏：`PageIntro` 新增 reading / exhibition / darkroom / personal 语义；器作先揭展品，笺录先题名与墨线，光影在暗室作用域内完成色调与浅色颗粒过渡，此间与留墨保持安静。删除 Hero 原有 5 个 DOM 微尘，避免双粒子系统并存。
- 阅读避让：题名、正文、搜索、Carousel 与 Lightbox 等关键区域均加入避让标记；文章页 Canvas 像素抽样为正文中央 0、两侧 20，粒子不穿过阅读栏。
- 性能：Canvas DPR 上限为桌面 1.5、移动 1.25，移动端限 30fps，页面后台暂停；生产脚本 7,797B 原始 / 3,270B gzip。10 秒浏览器采样中页面全部 `requestAnimationFrame` 回调平均约 0.049ms、P95 约 0.2ms、最大约 0.9ms，无 long task。
- 降级：reduced-motion 下只绘一帧，800ms 前后像素数均为 975，运行中动画 0，长卷不再 sticky；无 JS 下 `html.js=false`、分层图隐藏、完整底图可见、Canvas 像素为 0、隐藏内容为 0。
- 回归：`pnpm format:check`、`pnpm check`（0 errors / 0 warnings / 0 hints）、`pnpm build`（24 页，Pagefind 3 页）全绿。浏览器覆盖首页、笺录总目 / 详情、器作总目 / 详情、光影、此间、留墨，1280×900 与 390×844 均无横向溢出，控制台 0 错误；Pagefind 中文检索、Carousel 键盘翻页、Lightbox 开关与焦点归还均通过。
- 验收留档：保留 Hero、长卷、暗室入口三段 WebM，以及首页桌面 / 移动、器作、长卷与深色暗室截图。当前实现未建立同机旧版 LCP 基线，因此不声称已量出“退化不超过 100ms”的差值；以响应式图片、明确尺寸、资源体积与无 long task 作为当前风险证据。

## 上一任务：排查 Chrome 证书数据库异常

目标：在 Edge 正常、Chrome 间歇失败的差分条件下，定位 Chrome 出现 `net::ERR_CERT_DATABASE_CHANGED` 的范围；站点配置、远程版本和系统 TLS 策略保持不动，除非新证据证明相关。

- [x] 建立跨多个 HTTPS 域名的 Schannel 红绿反馈，确认 curl/PowerShell 另有 Schannel 异常
- [x] 由用户在同一环境确认 Edge 正常、Chrome 失败，建立浏览器差分
- [x] 核对 Chrome 版本、签名、策略与错误资源范围
- [x] 区分 Chrome 证书库通知、扩展/配置、第三方证书写入与站点资源故障假设
- [x] 故障自行恢复，因此不实施清缓存、重置配置或改证书库等破坏性修复
- [x] 用户复测 Chrome 已恢复；单独保留命令行 Schannel 异常记录
- [x] 记录结果、复发路径与剩余风险

## 结果审查

- 差分结论：同一线上站点 Edge 始终正常，Chrome 曾对字体、图片、CSS 与 JS 统一报 `net::ERR_CERT_DATABASE_CHANGED`，随后自行恢复；这不是 Astro `base`、GitHub Pages 或单个静态资源配置错误。
- Chrome 侧核对：Chrome `151.0.7922.109`，主程序与 `chrome.dll` 的 Google 签名有效；未发现相关 Chrome 企业策略。该错误表示浏览器在证书数据库变化时主动废弃现有 TLS 连接，页面内大量报错是同一底层事件的连锁反应。
- 处置：未修改站点代码、Chrome 配置、Windows 证书库或网络策略；故障恢复后不再执行清缓存、重置 Profile、禁用安全能力等高影响操作。
- 复测边界：用户当前 Chrome 实测已正常；自动化复载时 Chrome 控制连接已断开，未形成第二份自动化证据。若复发，优先用无痕窗口区分扩展/Profile，再记录发生时间并检查同期 VPN、杀软或 HTTPS 扫描软件是否触发证书库更新。
- 独立遗留：本机会话中的 `curl.exe` / PowerShell Schannel 仍曾报 `SEC_E_NO_CREDENTIALS`，但 Edge 正常且 Chrome 事件未出现在同期 Schannel 日志中，不能把它当作本次 Chrome 独有故障的已确认根因。

## 上一任务：回退 `130b132` 并复核部署配置

目标：本地 `main` 精确恢复到 `130b132`，重新检查 Astro base、站内链接、Pagefind、GitHub Pages workflow 与 pnpm/CI 配置，判断线上持续加载是否由部署配置造成；未经要求不推送。

- [x] 核对目标提交、当前改动与回退影响
- [x] 本地 `main` 回退到 `130b132`
- [x] 使用 `--force-with-lease` 将 `origin/main` 精确回退到 `130b132`，并核对远程 SHA
- [x] 静态审查部署、base、资源路径与包管理配置
- [x] 运行格式、类型、生产构建及产物路径检查
- [x] 用独立网络与浏览器复核线上加载，区分站点问题与本机 TLS/浏览器问题
- [x] 记录根因、修改建议与结果审查

## 结果审查

- 本地与远程 `main` 均已精确回退到 `130b132905727e7449779ef128709f63275aed0a`；远程使用 `--force-with-lease`，Pages 运行 `31370396483` 构建与部署成功。
- 配置审查：`site`、`base: '/mojian'`、`withBase()`、RSS、robots、SEO、manifest 与 Pages workflow 相互一致；dist HTML 未发现遗漏 `/mojian` 的站内根路径，两份首页 CSS 哈希与线上一致且产物存在。
- 验证：`pnpm format:check` 通过；`pnpm check` 为 0 errors / 0 warnings / 0 hints；`pnpm build` 生成 24 页，Pagefind 索引 3 页。
- 线上独立网络验证：Node/OpenSSL 请求首页、两份 CSS、Pagefind、RSS、robots、sitemap、manifest 全部 200；说明 GitHub Pages 与静态资源可用。
- 环境差分：`curl.exe` 报 `SEC_E_NO_CREDENTIALS`，PowerShell HTTPS 报认证失败；系统日志在复测时记录 Schannel 事件 36871、内部状态 10013。后来用户确认独立 Edge 正常、Chrome 间歇失败，因此这些 Schannel 现象只作为并存的本机环境线索，不能认定为 Chrome 故障根因；可以确认的仍是 Astro/base 配置无误。
- 回退影响：`packageManager: pnpm@11.0.9` 固定项已按要求移除；本次 Pages workflow 仍构建成功，但包管理器版本可复现性低于回退前。

## 上一任务：全站视觉 QA 与比例精修（设计收口）

目标：先审查再修改，只处理 Hero 比例 / Typography 层级 / 留白节奏 / 微动画一致性四类；有明确问题才改。

## 问题清单（审查产出 → 判定）

- [x] ① CurrentFolio 移动端题字与 note 正文交叠且折成两行（390 实测）→ **改**：portrait padding 5→6.5rem，题字 2.25→1.6rem + nowrap
- [x] ② Header 窄屏「留墨」被 nav-rail 裁切不可见（390 溢 75px，hitTest 实锤）→ **改**：ul gap 0.8→0.55rem、nav-link gap/字距收窄、mask 渐隐 1→0.5rem；430 完整、390 半隐可滑、360 横滑兜底
- [x] ③ 首页年谱「未完待续」移动端先于唯一条目出现（叙事倒置）→ **改**：<768 隐藏 intro 闲笔（桌面保留）
- [x] ④ 小字号 6 档 33 处无层级语义 → **收敛**：folio 档归 0.62（Footer×2、PageIntro），标签/控件档归 0.68（projects dt、journal aside dt、ScrollJourney 卷尾、Lightbox 按钮、Hero scroll）
- [x] ⑤ 1920 Hero 题字与纸山相切（重叠减少）→ **保持**：构图稳定非失衡
- [x] ⑥ 暗室出口「展开全部光影」孤悬 → **保持**：深底朱砂可读，属暗室收尾语义
- [x] ⑦ 1920 年谱单条留白大 → **保持**：内容量问题（待主人补记），非间距 bug
- [x] ⑧ 朱砂密度（index-seal/展签题名/active 图标/印钮）→ **保持**：展签体系内强调色，未成第二正文色
- [x] ⑨ 首页高潮分布（Hero/长卷一级，器作/暗室二级，其余安静）→ **保持**：无连续太满/太空
- [x] ⑩ easing/时长（--ease-ink/seal + GSAP expo.out 同族）→ **保持**：已统一
- [x] ⑪ 性能（云气/微尘/暗室滤镜/光标并存）→ **保持**：滚动未见明显卡顿

## 结果审查

### 视觉 QA 与比例精修

- 审查方式：生产构建 + playwright 分段滚动截图，首页 390/430/768/1280/1440/1920 × 浅 + 1280/390 深，一级页面 1280/390 × 浅深，逐张目检；reduced-motion 断言 Hero 无 opacity:0 残留、暗室图清晰；无 JS 此前已验证 SSR 完整。
- 已修改（4 项 10 文件，全部数值/断点级）：① CurrentFolio 移动端题字重叠折行；② Header 窄屏末项裁切（修复后 430 全显、390 露「留」字半隐可滑）；③ 年谱闲笔移动端叙事倒置；④ 小字号收敛为 0.62（folio 装饰）/ 0.68（标签控件）/ 0.72（表单 label）语义三档，视觉无感、消除随意性。
- 审查后保持：1920 Hero 相切构图、暗室出口链接、年谱留白、朱砂密度、高潮分布、easing 体系、现有视觉效果（未因「可能影响性能」删减）。
- 验证：`format:check` / `check`（0 errors）/ `build`（24 页）通过；五路由控制台零错误；1280 深色复截 CurrentFolio/Footer 无破坏；390 修复点复截确认。
- 排错记录：getBoundingClientRect 给的是布局坐标，overflow 裁切下不可见元素 rect 仍正常——验证裁切须用 elementFromPoint hitTest；后台 preview 默认 600s 超时，长跑审查需 disable_timeout。

## 上一任务：个人身份内容层（数据入口与空态）

目标：占位/演示个人信息收敛为「数据入口 + 空状态 / 明确 TODO」，不编造真实信息；首页与 About 年谱职责切分。只搭结构，内容待主人自填。

- [x] `site.config.ts` 加轻量 `profile.displayName`（仅复用型身份锚点入配置）
- [x] CurrentFolio：「最近更新」自动取笺录最新文章月份；案头三事（演示，用户确认暂留）与季节标记加注维护说明
- [x] SelfIntro：自述改数据入口（lead/paragraphs 空时渲染空态），落款接 `profile.displayName`
- [x] AboutTimeline：条目独立 `about-timeline.data.ts`（空数组），删 5 条 20XX，空态「行年待记」
- [x] 首页 Timeline：独立 `site-timeline.data.ts` 站点史（仅留 2026 真实条目），删 3 条演示年份
- [x] 验证：format/check/build + 浏览器 / 与 /about/ 三视口 × 深浅主题 × reduced-motion/无 JS/控制台

## 结果审查

### 个人身份内容层

- 占位判定：SelfIntro「此处留作长文自叙」、AboutTimeline 5 条 20XX、首页年谱 2018/2020/2023 三条为用户确认的演示数据，已全部移除；案头三事用户确认暂留（加注「演示数据，待主人更新」）。
- 自动真实数据：CurrentFolio「最近更新」改由 `getCollection('journal')` 最新 pubDate 生成（实测「2026 年 8 月」= rebuild-mojian.md），无文章时不渲染该行；首页卷尾年谱仅保留可验证的「2026 Astro 重写」一条。
- 数据入口：自述在 `SelfIntro.astro` frontmatter（lead + paragraphs，注释说明承担内容）；行年在 `about-timeline.data.ts`（空数组 + 填写示例）；站点史在 `site-timeline.data.ts`；署名在 `site.config.ts` `profile.displayName`（空时落款保持「待主人自题」）。
- 空态：自叙空时渲染「主人尚未落笔自叙……三卷即其作答」（陈述站点状态，非虚构人）；行年空时渲染闲笔「行年待记」（复用「未完待续」题字样），墨线列表与 GSAP 动画不渲染（脚本对空列表天然安全）。
- 职责切分：CurrentFolio=近况（短、会更新）；SelfIntro=长期自述（待填）；About 行年=人的纵深（待填）；首页卷尾年谱=Mojian 站点史。
- 未做：未填任何真实姓名/经历（用户未提供）；未改 Contact/RSS/视觉/Token/动画；未新增依赖。
- 验证：`pnpm format`/`check`（0 errors）/`build`（24 页）通过；生产预览实测——/ 与 /about/ 在 390/768/1440 无横向溢出；深浅主题（印钮切换 dark 正常、空态可见）；reduced-motion 空态直出 opacity 1；无 JS（curl HTML）全部空态与数据 SSR 完整；控制台零错误零警告。

## 上一任务：Header / Footer 精修（刊物页眉 × 卷尾 Colophon）

目标：页眉刊物化（导航图标 + 品牌 masthead + 昼夜印钮），页尾重组为 Colophon 四拍；不改全局 Token、不新增依赖。

- [x] 批次一：Header——Lucide 静态 SVG 导航图标（当前页图标落朱砂）、品牌 MOJIAN 拉丁小字、卷头细线滚动写出、昼夜印钮
- [x] 批次二：Footer——「山高水长」收束 + 往来行（GitHub/RSS/回卷首）+ 墨线写出 + 版权钤印行
- [x] 验证：format/check/build + 浏览器五路由 × 双视口 × 双主题 × reduced-motion/无 JS/键盘

## 结果审查

### Header / Footer 精修

- 图标库决策：联网调研后确认项目已有 `lucide-react`（三处 React 岛屿在用），按「同一职责一套方案」不引入第二图标库；`lucide-astro` 有官方构建性能 issue（withastro/astro#12793）亦排除。最终取 Lucide 图标（scroll/drafting-compass/aperture/mountain/feather）以静态 SVG 内联进 Header——同一视觉源、零新依赖、零客户端 JS，遵守「不为纯展示引入 React」。
- 页眉：导航图标 stroke-width 1.5 贴全站 1px 墨线；active 改为「图标落朱砂 + 字色墨」、取消常驻下划线，与 hover 墨线写出明确分层；品牌右侧细线 + MOJIAN 拉丁小字（呼应 Hero folio 与卷尾）；卷头底线由淡入改为 scaleX 自左写出；主题切换由日/月 SVG 改为「昼/夜」单字小印（马善政体 + 1px 方框），切换节奏沿用 ease-seal 交叉淡入。
- 页尾：按「folio 行 → 山高水长大字收束 → 往来行 → 墨线 + 版权钤印」四拍重组；移除幽灵水印「墨笺」与「篇目」六链列（sticky 页眉已承担导航）；GitHub 改读 `site.config.ts`，email 非空自动追加；「回卷首」为 `#main-content` 锚链接（原生平滑滚动、无 JS 可用）；卷尾墨线复用 `data-reveal-line`、大字复用 `data-reveal-title`，无新增脚本。
- 保留：页眉玻璃背与 GSAP 入场、页尾云气/竹影/钤印 ring 动画/InscriptionTip、全部深浅主题 token 与 reduced-motion 降级；全局设计 Token 零改动。
- 验证：format/check/build 通过（24 页）；生产构建实测——五路由当前页图标落朱砂与 aria-current 一致；1280/390 无横向溢出；浅/深主题（昼/夜印钮）正常；「回卷首」回顶（scrollY→78）；reduced-motion 终态（opacity 1、无 transform）；无 JS 下页眉图标与页尾全部内容完整；键盘 Tab 焦点可见；控制台零错误。

## 上一任务：强化「器作 / 笺录 / 光影 / 此间」四章视觉节奏

目标：四章共享设计系统，但以排版密度、明暗、交互语义拉开节奏——器作景深展签、笺录刊物目录、光影暗室显影、此间档案闲笔。首页与 `/gallery/` 均入暗室（用户已选）。

- [x] 批次一：器作展签 + 景深 hover（`15086ec`）
- [x] 批次二：笺录目录化（阅读时长 + 行 hover + 期次行，`b22d653`）
- [x] 批次三：光影暗室（`.darkroom` + 首页 Gallery + `/gallery/` 显影，`82e4ea3`）
- [x] 批次四：此间起笔朱砂 + 云气（`a7cb6be`）
- [x] 全量验证：format/check/build + 浏览器五路由 × 双视口 × 双主题 + 控制台

## 结果审查

### 四章视觉节奏（`15086ec` / `b22d653` / `82e4ea3` / `a7cb6be`）

- 器作（景深展签）：`/projects/` 展签化——题名摘要之下细线铭牌（年份│状态细栅相隔 + 「技法」行），hover/focus-within 时展品浮起（translateY -4px + 加深投影）、大编号落朱砂、铭牌朱砂复笔自左写出；首页预览竖签同步落色、状态改描边小签。
- 笺录（刊物目录）：`EntryList` kicker 加「约 N 分钟」（复用 `readingStats(post.body)`，feature/catalog 两变体）；行 hover/focus-within 自左晕开极淡纸色、编号落朱砂（主稿大编号调淡至 55%）；首页同卷篇目头部加「近更新 YYYY 年 M 月」期次行。
- 光影（暗室显影）：`global.css` 新增 `.darkroom`——fixed 深墨渐变（纸→暗→纸出口）+ 作用域墨色 token 重映射（内部标题签条自动转浅墨，朱砂不变），昼夜皆「入暗」；首页光影区与 `/gallery/` 均入暗室。显影：首页走 `.media-reveal` 扩展（`:not(.is-revealed)` 预置 brightness/contrast 暗态），`/gallery/` 走组件 IntersectionObserver 加 `.is-developed`；两处均 html.js + no-preference 门控，无 JS / reduced-motion 直达清晰。暗室内装裱绫边固定宣纸色（昼夜一致），桌面端说明小字 hover/focus 显现、触屏常显；首页暗室添一枚云气微光。
- 此间（档案闲笔）：自叙首字起笔朱砂 + 一团结岚云气（复用全局 mist）。行年、往来、首页 CurrentFolio/Timeline 均保留未动。
- 验证：format/check/build 通过；生产构建（astro preview）浏览器实测——五路由 1280/390 无横向溢出，浅/深主题（暗室昼为入暗、夜为更暗一层）成立；器作悬停景深、笺录行晕染、光影显影、灯箱开合/Escape/焦点恢复、Pagefind 检索 3 结果；控制台五路由零错误。
- 排错记录：`.darkroom .media-reveal` 显影若用 `.is-revealed` 设 `filter:none` 会与 hover 提亮发生优先级冲突，改用 `:not(.is-revealed)` 只定义前态；playwright-cli 的 `.playwright-cli/` 产物曾被 `git add -A` 误提交，已 `--amend` 移除并加入 `.gitignore`。
- 已知取舍：笺录不做图片预览（schema 无 cover，不动内容模型）；此间不加「正在做的事」（与首页案头三事重复）；dev server 下 JournalSearch 偶发一次性水合告警（生产构建零错误，未复现，记为观察项）。

## 上一任务：全站设计深化四批次（`4c521d4` / `07df689` / `9a8021e` / `53acffb`）

- [x] 批次 A：笺录阅读体验（续卷 / 跋文字数分钟 / h2·h3 题签 / 墨条进度）
- [x] 批次 B：此间年谱叙事（墨线生长 + 节点落墨）
- [x] 批次 C：光影装裱与暗室（绫边 / 题跋竖行 / Lightbox 过渡）
- [x] 批次 D：全站收尾（404 / 外部服务指引 / 夜读检查）

## 结果审查

### 批次 D（提交 `feat: 补全 404 与全站细节收尾`）

- 404：`src/pages/404.astro`「此处无卷」——folio-label + 大题字 + 装裱山水（复用 hero-paper-mountains）+ 返回卷首/往笺录双出口；桌面深/浅、移动 390 实测无溢出。
- 外部服务：`scripts/setup-external-services.sh` 向导（5 阶段：开 Discussions → 装 giscus app → giscus.app 取四值 → Formspree 取 endpoint → 汇总交回）；`bash -n` 通过。值到手后填入 `src/site.config.ts` 即生效。
- 降级链路实测：填入假 giscus 值 → 留墨页渲染正式 stage 分支（pending 消失、data-repo 正确）；改回空值 → 占位分支恢复，`git status` 无残留。
- 夜读检查：批次 A–D 新样式均已过深色主题（文章页/年谱/光影网格/灯箱/404）。

### 批次 C（提交 `feat: 光影装裱与暗室过渡`）

- 装裱绫边：`.gallery-entry__image` 加外缘淡墨线 + `var(--paper)` 内衬，竖幅天头窄地头宽；hover 揭帘加 brightness(1.04)。
- 题跋竖行：`.gallery-entry__meta` 桌面 `writing-mode: vertical-rl`，窄屏回退横排。
- 暗室：`.ink-lightbox` 叠白纸纹噪声（复用全局 feTurbulence data-uri）；caption 增补「年份 · 媒材」款识。
- 验证：format/check/build 通过；桌面浅/深、移动 390 实测装裱与竖排；灯箱开合、Escape 关闭、焦点恢复触发按钮；控制台零错误。
- 排错记录：dev server 长跑后 Vite 依赖缓存过期报 504 Outdated Optimize Dep，`astro dev stop` 重启即恢复。

### 批次 B（`07df689`）

- 墨线：`::before` 改独立 `li.about-timeline__line`（ol 内合法元素），GSAP scrub scaleY 0→1；`html.js`+no-preference 才预置 0，无 JS/reduced-motion 完整静态呈现。
- 节点：条目加 `.about-timeline__item`，ScrollTrigger once 入视口加 `.is-inked`；CSS 负责填墨过渡 + 朱砂 halo 晕开（node-halo 700ms）。
- 验证：format/check/build 通过；桌面深/浅、移动 390 实测墨线随滚动生长、节点依次落墨、无溢出；控制台零错误。
- 排错记录：Lenis 接管滚动时 `scrollIntoView`/`scrollBy` 会被回弹，playwright 验证须用 `window.scrollTo` 后等待再断言。

### 批次 A（`4c521d4`）

- 续卷：`getStaticPaths` 按同分类 2 分 + 共享标签各 1 分取前三，文末卷签卡片；无相关文章不渲染。
- 跋文区：新增 `src/utils/reading.ts`（CJK + 英文单词计字，400 字/分钟），显示「全篇约 N 字 · 可读 M 分钟」；「终」印包 InscriptionTip。
- 题签：`.prose-ink` h2 左起墨线 + 字距，h3 朱砂圆点。
- 墨条：进度条改 ink→cinnabar 渐变，末端垂墨滴。
- 验证：format/check/build 通过；浏览器桌面浅/深、移动 390（无溢出）实测，控制台零错误。
- 注意：Windows 上 rebase 后 `git status` 出现全仓幻影 modified（autocrlf 行尾），`git add` 后自动归位，实际 diff 仅目标文件。

### 上一任务：全站视觉沉浸深化（`8c989a8`，已推送为 `ed9fd10`）

- [x] Hero 沉浸化：题字浮现、钤印落定、山水视差、云气流岚
- [x] 墨迹页面过渡（替换 fade 式 view-transition）
- [x] 环境氛围：Footer 竹影 + 云气、Hero 墨渖微尘
- [x] 毛笔尖光标（桌面端，GSAP quickTo）
- [x] 滚动揭示升级（题名墨浮）
- [x] 微交互抛光 + Base UI 题跋 Tooltip
- [x] 验证：format/check/build + 浏览器（双主题/移动/reduced-motion/无 JS/键盘/控制台）
- [x] 文档同步 + 提交 `feat: 全站视觉沉浸深化`

## 结果审查

**交付清单**

- 墨迹页面过渡：page-out 模糊收束、page-in `clip-path` 墨圈晕开（`src/styles/global.css`）。
- Hero 沉浸化：题字自墨中浮出（blur→0）、钤印落定回弹 + 朱砂墨晕、山水视差 scrub、两团云气流岚、五粒墨渖微尘（`src/components/home/Hero.astro`）。
- 环境氛围：Footer 竹影摇曳（SVG mask，移动端隐藏）+ 卷尾云气（`src/components/Footer.astro`）。
- 毛笔尖光标：GSAP quickTo 弹性随行，悬停可交互元素晕开；仅细指针 + 非 reduced-motion（`src/scripts/cursor.ts`）。
- 滚动揭示升级：题名加 `filter: blur(7px→0)`（`src/scripts/reveal.ts`）。
- 题跋 Tooltip：Base UI Tooltip 封装 `InscriptionTip`，用于卷首/卷尾钤印、PageIntro 藏本、自述签名四处；无 JS 退化为原生 `title`（`src/components/InscriptionTip.tsx`，新依赖 `@base-ui-components/react`）。
- 微抛光：全站 transform hover 统一加 `@media (hover:hover) and (pointer:fine)` 门控，按钮 :active 按压反馈。

**验证结果**

- `pnpm format:check` / `pnpm check`（0 errors）/ `pnpm build` 全部通过。
- 浏览器实测：桌面浅色/深色、移动 390×844（无横向溢出、竹影隐藏）、墨点光标跟随、印章 hover/focus 均出 Tooltip、导航页面过渡无闪烁，控制台零错误。
- 降级：reduced-motion 下云气/微尘/墨晕/竹影静止、光标不创建；无 JS 内容直出完整、Tooltip 退化为 `title`。

**遗留说明**

- 墨渖微尘为氛围试验项，若实机观感显廉价可整段删除（`Hero.astro` 中 `.hero__motes`）。
- 按用户要求：本次只提交，不推送。
