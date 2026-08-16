# 当前任务：全站「六章墨场」大胆化重设计

目标：沿用「墨笺书房」既有纸、墨、朱砂与字体资产，把全站升级为“章节戏剧化、阅读区安静”的体验；压缩无叙事作用的长空段，只在 Hero、桌面长卷与暗室保留大尺度停顿。

- [x] 重塑页眉、四类 PageIntro、章节标题与全局版式节奏
- [x] 完成首页 Hero、近况、器作、长卷、笺录、光影与卷尾的差异化章法
- [x] 深化笺录、器作、光影、此间、留墨、404 与详情页组件样式
- [x] 建立 `data-reveal-variant` 内部动效契约并完成低动态 / 无 JS 降级
- [x] 同步 `DESIGN.md` 与本地 Impeccable 设计侧车
- [x] 执行格式、类型、构建与三视口浏览器验证
- [x] 记录结果审查、视觉证据与已知边界

## 计划确认

- 视觉方向：采用用户确认的“章节戏剧化 + 峰值留白”；大胆来自构图、尺度、错位装裱和章节节拍，不新增无出处特效。
- 内容边界：保留首页章节顺序、现有事实文案、URL、内容集合与配置 schema；不虚构个人身份或社会证明。
- 材料边界：只使用既有纸、墨、朱砂、字体、圆角、阴影和真实内容资产；不新增颜色、字体、远程素材或依赖。
- 动效边界：高频反馈固定 150 / 250ms；页面换卷与主题换纸保持 150 / 400ms；GSAP 只承担 Hero、桌面长卷、章节一次性揭示与有限视差。
- 降级边界：触屏不执行位移类 hover；`prefers-reduced-motion` 与无 JS 直接显示完整终态；移动长卷继续保持静态完整终态。
- 工作区边界：保护现有 `public/favicon.svg`、`public/favicon.ico` 与本任务前已有的任务记录改动；本轮不提交、不推送。

## 结果审查

### 设计与实现

- 全局章法：Header 强化刊头滚动态与当前章标记；`PageIntro` 落成 reading / exhibition / darkroom / personal 四种构图，普通卷首取消视口级强制高度；`SectionHeading` 统一大题字、方印编号、竖排侧注和墨线的尺度冲突。
- 首页六段：Hero 题字与山水进一步交叠；近况改为作者手记跨页；器作形成错位展墙；桌面长卷保留唯一长时间线且移动端静态完整；笺录形成主稿 / 目录跨页；暗室以主影像带动接触印样，年谱与 Footer 主动降噪收束。
- 内容页面：笺录目录、归档、标签、分类与文章卷首共享新骨架；器作列表 / 详情强化跨栏装裱与事实栏；光影网格与灯箱统一暗室层级；此间、留墨和 404 分别采用手记、投书纸面与断卷构图。原文案、章节顺序、URL、集合 schema 与产品事实未变。
- 动效契约：新增 `intro-*`、`folio`、`spread`、`exhibit`、`contact-sheet`、`stagger` 内部变体；移动端 `spread` 改用纵向揭示，避免未入场横移造成页面溢出。CSS 管高频反馈，GSAP 只管 Hero、桌面长卷、章节一次性揭示和有限视差。
- 交互补强：JournalSearch 与 GalleryLightbox 改为核心交互随页面加载水合，消除首个输入 / 点击竞态；器作轮播增加画布左右方向键和可见焦点，保留点击、拖拽与按钮入口。

### 验证证据

- 静态：本轮变更文件定向 Prettier 已执行；`git diff --check` 通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页，Pagefind 索引 3 页。
- 格式基线：全仓 `pnpm format:check` 仍命中 33 个既有、未触及文件，未批量改写无关基线；本轮触及文件均已定向格式化。
- 路由与视口：生产预览覆盖首页、笺录列表 / 正文 / 归档 / 标签 / 分类、器作列表 / 详情、光影、此间、留墨和 404；1440×1000、768×1024、390×844 均完成巡检。最终定向复核中器作桌面、首页移动、笺录移动与此间平板的 `scrollWidth === clientWidth`。
- 交互：主题 light → dark → light 双向切换后无过渡类残留；连续检索「留白」→「Astro」即时替换为不同结果；轮播方向键与拖拽状态为 `01 → 02 → 01 → 02`；灯箱打开、下一幅、Escape 与焦点归还均通过。
- 降级：390×844 触屏媒体查询不命中细指针 hover，器作 transform 为 `none`；reduced-motion 与无 JS 下 reveal 隐藏数为 0，移动长卷题跋 / 诗句 / 卷尾 opacity 均为 1；正常路由控制台 warning / error 为 0，404 文档按语义返回 404。
- 视觉证据：截图保存在本次 Codex visualizations 目录，包含 `six-ink-home-desktop.png`、`six-ink-confirm-projects-desktop.png`、`six-ink-confirm-home-mobile.png`、`six-ink-journey-mobile.png`、`six-ink-darkroom-desktop.png`、`six-ink-confirm-about-tablet.png` 与 `six-ink-404-mobile.png`。
- Detector：按要求在全部 UI 完成后对变更目标仅运行一次。可见 warning 为设计契约中的 `--ease-seal` 印章回弹与 prose h2 3px 墨线题签；字号 / 色值 advisory 多为已文档化档位、流体端点或既有全局值，未据此破坏设计系统。

### 已知边界

- 浏览器覆盖为 Chromium 桌面 / 平板 / 移动仿真，未覆盖真实 iOS / Android 硬件；自定义 404 的网络状态码为预期的 404。
- `.impeccable/design.json` 已同步四类卷首、章节密度与 reveal 变体，但继续由 `.gitignore` 作为本地侧车忽略。
- 既有 favicon SVG / ICO 改动完整保留；本轮未新增依赖，未提交、未推送。

# 当前任务：刷新 Impeccable 设计侧车

目标：执行 `$impeccable document` 的侧车刷新路径，使 `.impeccable/design.json` 与当前 `DESIGN.md` 及已实现组件保持一致，同时不覆盖已定稿的根设计文档。

- [x] 确认命令意图与现有未提交改动边界
- [x] 提取当前设计扩展、组件样张与叙事映射
- [x] 重写 `.impeccable/design.json` 并校验 schema
- [x] 核对 `DESIGN.md` 保持不变且 favicon 改动未受影响
- [x] 记录结果审查

## 计划确认

- 文档边界：依据上一轮明确的 sidecar stale 提示，本次只刷新 `.impeccable/design.json`，不覆盖或改写 `DESIGN.md`。
- 提取边界：frontmatter 已承担颜色、字体、圆角、间距和基础组件令牌；sidecar 只承载 tonal ramp、阴影、动效、断点、代表性组件样张与设计叙事，不重复原始令牌。
- 事实边界：全部值来自当前 `DESIGN.md`、全局令牌与已实现组件；不新增视觉规则，不虚构组件。
- Git 边界：`.impeccable/design.json` 继续作为本地忽略文件；保留上一任务未提交的 favicon 与任务文档改动，本轮不提交、不推送。

## 结果审查

- 刷新范围：按 stale-hint 的专用路径只重写 `.impeccable/design.json`；`DESIGN.md` 无 diff，既有产品事实、根设计令牌与视觉规则均未被覆盖。
- 扩展内容：sidecar 保持 schemaVersion 2，现含 10 个颜色 metadata、5 个字体角色、2 个阴影、5 个动效、3 个断点和 10 个代表组件；新增页面换卷 `150ms out / 400ms in` 与主题换纸 `400ms clip-path: circle()`，高频反馈明确收敛到 150 / 250ms。
- 组件同步：按钮、墨线链接、描边印章、导航与墨线条目的样张已对齐当前实现；补入细指针 hover 门控，导航更新为 1.5 stroke 图标与 150 / 250ms 节拍，条目移除旧 550 / 400ms 迟滞并改为 250ms。
- 叙事同步：North Star、两段 Overview、5 条 Key Characteristics、5 条 Named Rules、6 条 Do 与 6 条 Don't 均以脚本和 `DESIGN.md` 逐字比对通过，保留代码标记与精确时长，不再使用旧版转述。
- 验证结果：JSON 解析、generatedAt ISO 时间、组件数量与 kind 枚举、5–10 个组件边界均通过；sidecar 的定向 Prettier 检查通过，文件写入时间晚于 `DESIGN.md`，且继续由 `.gitignore` 本地忽略。
- 工作区边界：上一任务的 `public/favicon.svg`、`public/favicon.ico` 与本任务单改动均保留；本轮没有修改运行时代码、依赖或 URL，按纯设计文档任务未重复执行项目构建，未提交、未推送。

# 当前任务：重绘「笺」字印章网站图标

目标：将 Astro 默认图标替换为与「墨笺书房」一致的朱砂白文「笺」字 SVG 方印，并确保浏览器小尺寸与旧格式回退保持一致。

- [x] 核对现有 favicon、manifest 与 `/mojian` 子路径接线
- [x] 绘制不依赖外部字体的「笺」字朱砂白文 SVG
- [x] 同步 `.ico` 回退并检查多尺寸辨识度
- [x] 执行格式、构建、产物与浏览器验证
- [x] 记录结果审查与已知边界

## 计划确认

- 视觉方向：采用朱砂底、宣纸字的白文方印，保留手工钤印的不齐边与少量缺口；细节以 16–32px 仍能辨认「笺」为上限，不做噪点堆叠。
- 技术方向：印文全部转为 SVG 几何路径，不使用 `<text>` 或外部字体，避免 favicon 独立加载时字形漂移；保留透明外缘以适配浏览器标签页与桌面快捷方式。
- 接线方向：沿用现有 `withBase('/favicon.svg')` 与 manifest，不改 URL；由同一 SVG 生成 `.ico` 兼容回退，不新增依赖。
- 验证方向：检查 SVG/XML 与构建产物，分别以 16、32、64、128px 目检，并验证首页实际 favicon 请求、控制台和 `/mojian` 路径。
- Git 边界：本轮不提交、不推送。

## 结果审查

- 视觉结果：`public/favicon.svg` 已由 Astro 默认标记改为朱砂 `#a44736`、宣纸 `#f4efe3` 的白文「笺」字方印；印面、边款与印文均为手写 SVG 路径，未使用 `<text>`、滤镜、外部字体或脚本。
- 小尺寸结果：浏览器按 16 / 32 / 64 / 128px 在浅灰纸面与深墨背景分别渲染检查；16px 保留完整方印轮廓，32px 起「笺」字与边款清晰，未继续叠加只在大尺寸可见的纹理。
- 回退一致：`public/favicon.ico` 由同一 SVG 渲染源生成，`ffprobe` 确认内含 RGBA PNG 的 16 / 32 / 48 / 64px 四档，不再回退到旧 Astro 图标。
- 接线验证：首页继续使用 `withBase('/favicon.svg')` 与 `/favicon.ico`，manifest 继续指向 `./favicon.svg`；本地浏览器实测三者在 `/mojian` 子路径下均返回 200，首页控制台 0 error / 0 warning。
- 静态验证：SVG 以 Prettier HTML parser、任务文档以 Markdown parser 定向检查通过；`git diff --check` 通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页，Pagefind 索引 3 页；Impeccable detector 返回空数组。
- 已知边界：全仓 `pnpm format:check` 仍只命中既有 55 文件格式基线，未批量改写无关文件；浏览器可能缓存 favicon，部署后如未立即更新需强制刷新或重新打开标签页。本轮未新增依赖、未改 URL，未提交、未推送。

# 当前任务：GitHub Pages 首次部署

目标：将已推送到 `L-xuanxiao/mojian` 的 Astro 静态站接入 GitHub Actions，在 `main` 更新时自动构建并发布到 `/mojian/`。

- [x] 核对 `origin/main`、GitHub CLI 认证、公开仓库与 Pages Actions 来源
- [x] 添加与 Node 22、pnpm 11 和现有 `pnpm build` 对齐的 Pages 工作流
- [x] 校验工作流格式与本地生产构建
- [x] 提交部署配置并推送到 `origin/main`
- [x] 监看首次 Actions 部署并验证线上地址
- [x] 记录部署结果与后续更新方式

## 计划确认

- 仓库与路径：仓库固定为 `L-xuanxiao/mojian`，沿用 `site: https://l-xuanxiao.github.io` 与 `base: /mojian`，不改 URL。
- 发布方式：使用 Astro 官方 Pages Action 构建现有 `pnpm build`，由 GitHub Pages 官方 Action 发布构建产物；不提交 `dist/`。
- 分支策略：首次部署需由 `main` 触发，按用户明确授权直接提交并推送 `main`，本轮不创建 PR。
- 验证方式：本地检查工作流与生产构建，推送后等待 Actions 完成，再访问线上首页确认 HTTP 与页面标题。

## 结果审查

- GitHub：公开仓库 `L-xuanxiao/mojian` 以 `main` 为默认分支，Pages 发布源为 GitHub Actions，HTTPS 强制开启；本地 `origin/main` 已对齐。
- 工作流：新增 `.github/workflows/deploy.yml`，使用 `actions/checkout@v7`、`withastro/action@v6` 与 `actions/deploy-pages@v5`；固定 Node 22、pnpm 11.21.0，并复用 `pnpm build` 产出 Astro 静态页与 Pagefind 索引。
- 本地验证：工作流通过定向 Prettier 检查与 `git diff --check`；`pnpm build` 成功生成 24 页，Pagefind 索引 3 页、431 词。
- 首次部署：提交 `aabd848` 已推送到 `origin/main`；GitHub Actions 运行 `31936097255` 成功，build 用时 1分23秒，deploy 用时 8秒。
- 线上验证：`https://l-xuanxiao.github.io/mojian/` 返回 HTTP 200，标题为「墨笺」，canonical 与静态资源均携带 `/mojian/`；`/mojian/pagefind/pagefind.js` 返回 HTTP 200。
- 后续更新：以后在 `main` 完成提交并执行 `git push` 即会自动重新构建和发布；也可从 Actions 页手动运行 `workflow_dispatch`。

# 当前任务：全站动效体系「平衡工艺版」

目标：以“高频反馈迅捷、低频叙事精致”为原则重整全站动效；适度删除重复与迟滞动画，同时保留 Hero、桌面长卷、暗室显影、云气粒子和页面墨晕等招牌体验。

- [x] 让笺录检索结果随数据即时更新，移除键盘输入触发的列表退场与逐项入场
- [x] 收敛页面换卷与 Header 入场，避免站内导航叠加两套全局动画
- [x] 实现由昼夜印钮向全屏扩散的主题换纸，并提供低动态与不支持 API 的即时降级
- [x] 统一页眉、笺录、器作与画廊的高频 hover / press 节拍和细指针门控
- [x] 优化 Gallery、ProjectCarousel 与灯箱的 React 交互动画
- [x] 补足身份锚点两拍揭示与 Hero 卷轴提示线的连续呼吸
- [x] 更新 DESIGN.md 动效约束并执行格式、类型、构建与双视口浏览器验证
- [x] 记录结果审查、feel-check 证据与验证边界

## 计划确认

- 频率门槛：键盘检索结果不动画；导航、列表和 hover 只使用 150–250ms 可中断反馈；400ms 只服务页面换卷、主题换纸和一次性叙事。
- 工具边界：CSS transition 负责 hover / press；View Transition API 负责主题换纸；Motion 只保留 React 状态动画；GSAP 继续负责既有滚动叙事。不新增依赖。
- 视觉边界：保留 Hero、桌面长卷、暗室显影、云气粒子与页面墨晕；移动长卷继续保持静态完整终态；不改内容模型、URL、颜色或字体。
- 降级边界：主题换纸在 reduced-motion、API 不支持或过渡启动失败时立即切换；触屏不触发位移类伪 hover；无 JS 内容仍完整。
- Git 边界：保留上一任务尚未提交的三个 P1 改动；本轮不提交、不推送。

## 结果审查

- 检索与换卷：`JournalSearch` 已移除 AnimatePresence、查询词重挂载、逐项位移和 Motion hover，结果列表为普通 DOM，实测结果项无运行中动画、无行内 transform，仅保留 150ms 纸色反馈。跨页旧页 150ms、新页 400ms；连续站内导航只出现页面墨晕，Header 不再重复执行 GSAP 下落。
- 主题换纸：View Transition 支持环境下，从印钮中心按最远视口角计算半径，以 400ms 圆形铺开；字形 250ms、按压 160ms / `scale(0.97)`。桌面与移动实测中帧均只有 root 换纸动画；连续三次快速点击后以最后一次请求为准，过渡类和三个 CSS 变量全部清除。reduced-motion 为即时切换；同步启动异常和异步过渡失败均已注入验证，主题正确落定且无残留。
- 高频反馈：页眉、笺录、器作和画廊统一到 150 / 250ms；位移与缩放 hover 均受细指针媒体查询约束。画廊从 Motion `y` 改为 CSS 4px / 250ms 抬升，稳定态 hover 前后滤镜均为 `none`，一次性暗室显影仍保留 500ms。触屏模拟中点击作品前后条目 transform 均为 `none`，灯箱仍能打开。
- React 交互：器作轮播选中态使用完整 `transform: scale(...)` 和 250ms，实测按钮按压约为 `scale(0.97)`、进度条 250ms；点击、键盘和拖拽均能切换。灯箱统一为 fade / navigation 250ms、swipe 400ms；前后翻页、手势、Escape 与焦点归还均通过，低动态沿用零时长降级。
- 叙事细节：首页身份与事实复用既有 reveal group，以 70ms 错峰；Hero 提示线保留 2.4s 周期并改为 `ease-in-out`。390×844 下长卷题跋、诗句、卷尾均为 `opacity: 1` 的静态终态；Hero 与五个页眉导航入口实测均为 44px 触控高度。
- 视觉复核：生产预览覆盖首页、笺录、器作详情、光影与此间；1280×900 和 390×844 全部无页面级横向溢出，路由巡检 console warning / error 均为 0。另通过 Chrome DevTools Protocol 将全局动画降至 10% 播放速度，检查主题圆形边缘、页面换卷和画廊抬升中帧，未见跳帧或双重曝光；截图留存于本次 Codex visualizations 目录。
- 静态验证：15 个变更源码文件定向 Prettier 检查通过；`git diff --check` 通过（仅 Git 的 LF → CRLF 提示）；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页，Pagefind 索引 3 页。全仓 `pnpm format:check` 仍因 55 个既有基线文件失败（原 70 个中，本轮定向格式化的变更源码自然消减），未批量改写其余文件。
- 设计与边界：`DESIGN.md` 已补充页面换卷、主题换纸及高频反馈时长契约；未新增依赖，未改内容模型、URL 或公开接口，未提交、未推送。浏览器验证使用桌面与移动设备仿真，未覆盖真实 iOS / Android 硬件。

## 上一任务：Live 模式处理首页三个 P1

目标：先启动 Impeccable live，在保持「墨笺书房」身份与纯静态约束的前提下，只处理 Critique 的三个 P1：移动端长卷内容完整、移动端触控热区、作者身份与能力锚点；不处理光影深链与单条年谱两个 P2。

- [x] 启动 Astro dev server 与 Impeccable live，打开首页并保持 poll 服务
- [x] 按 A 方向让移动端长卷采用静态完整终态，桌面长卷机制保持不变
- [x] 扩大移动端 Header 与 Hero 入口的真实触控热区，不放大视觉噪音
- [x] 为作者身份与能力锚点建立真实数据入口及克制呈现，不虚构事实
- [x] 对接受的 live 结果执行 carbonize 清理并完成会话
- [x] 运行 detector、format/check/build 与桌面/移动浏览器验证
- [x] 记录结果审查、验证证据和未填身份资料边界

## 计划确认

- 范围确认：仅三个 P1；`Gallery.astro` 与 `Timeline.astro` 本轮不改。
- A 方向确认：移动端长卷不移植桌面 `260svh` 机制，改为可读、完整、静态终态；桌面动画与 reduced-motion 既有语义不变。
- 内容确认：作者姓名、职业和履历必须来自配置；现有空值不得被臆造。代码只提供可维护入口，未提供资料时使用不冒充身份事实的短句。
- 视觉确认：沿用纸/墨/朱砂、三档小字、1px 墨线与克制动效，不新增颜色、字体、卡片或依赖。
- 验证确认：live 仅用于选择与预览；接受后统一执行一次有界桌面/移动检查，再完成静态质量命令。

## 结果审查

- Live：已启动 Astro dev server 与 Impeccable live，并通过首页 overlay 提交 A 方向与三个 P1 的范围；事件 `b1b398e7` 已完成。收尾时关闭 overlay、完成 live 会话、停止 helper 与 dev server；`src/` 内无 live 注入、variant / carbonize 标记残留。
- 移动长卷：透明初态限定为 `min-width: 768px`，与既有 GSAP 初始化断点一致；390×844 实测题跋、诗句、卷尾均为 `opacity: 1`，完整静态可读。桌面仍保持 `260svh` sticky 长卷与原动画。
- 触控热区：390×844 实测五个 Header 导航项与昼夜按钮高度均为 44px，Hero「读笺录 / 看器作」均为 44px；仅扩大可点击纸面，字号、墨色与构图不变。
- 身份与能力锚点：`site.profile` 新增 `role` / `focus` 真实数据入口；未填写时首页不臆造职业与履历，显示「墨笺作者」及构建期真实内容数量（当前为 3 篇笺录、3 件器作、6 帧光影）。姓名、短题与关注方向仍待主人填写。
- 范围：只修改三个 P1；未改 `Gallery.astro` 与 `Timeline.astro`，两个 P2 保持待办。
- 浏览器：390×844 与 1280×900 均无页面级横向溢出；移动端三个修复点和桌面 Hero / CurrentFolio / 长卷均完成截图目检。
- 检测：Impeccable detector 对四个界面组件仅运行一次，得到 21 条 `design-system-font-size` advisory，0 warning / 0 error；均为既有字号体系提示，无本轮阻断项。
- 静态验证：五个本轮源码文件定向 Prettier 检查通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页，Pagefind 索引 3 页。全仓 `pnpm format:check` 仍因 70 个既有文件的格式 / 行尾基线失败，为避免无关的大范围重写，本轮未执行全仓自动格式化。
- 验证边界：移动端为 390×844 浏览器视口仿真，未覆盖真实 iPhone / Android 设备；未填任何未经主人确认的个人资料。

## 上一任务：Impeccable 首页设计 Critique

目标：以首页源码 `src/pages/index.astro`（运行路由 `/mojian/`）为稳定目标，完成一次独立设计评审与确定性检测/浏览器证据评审；只产出诊断、评分和后续建议，不修改界面代码。

- [x] 解析目标 slug，并读取 critique 忽略清单
- [x] 由独立子代理完成 Assessment A：不受检测器锚定的设计评审
- [x] 由独立子代理完成 Assessment B：检测器与桌面/移动浏览器证据
- [x] 综合 Nielsen 评分、认知负荷、设计特异性、优先问题与人物视角
- [x] 持久化 critique 快照、读取趋势并清理临时资源
- [x] 在本节记录结果审查与验证边界

## 计划确认

- 评审范围：首页整体体验；其他路由只在首页导航或跨页一致性必须核实时作为旁证。
- 独立性：Assessment A 与 B 并行、互不可见；父上下文仅在两者完成后综合。
- 证据：源码与既有 PRODUCT/DESIGN 为基线；运行页至少覆盖桌面和移动视口，并明确记录无法完成的浏览器步骤。
- 变更边界：本轮不修复代码、不改设计令牌、不新增依赖；仅写任务记录和 `.impeccable/critique/` 快照。
- 清理边界：为评审启动的服务器必须停止，临时报告文件必须删除，工作区残留须明确列出。

## 结果审查

- 方法：双代理独立评估（A 仅做设计总监评审，B 仅做 detector / 浏览器证据），两者完成后再综合；目标 slug 为 `src-pages-index-astro`，无 ignore 清单。
- 设计健康分：Nielsen `22/28`（78.6%，Good；7/9/10 不适用）。设计特异性判为「高度特异」；桌面长卷与暗室是两处主要体验峰值。
- 最高优先级：① 移动端长卷题跋/诗句/卷尾永久 `opacity: 0`（CSS 预置透明，但动画只在 `min-width: 768px` 初始化）；② 移动端 Header 与 Hero 入口触控高度不足；③ 首页缺少作者身份与可验证能力锚点。
- 次优先级：光影缩略图均进入同一总览，和器作深链模式不一致；只有一条数据仍采用双列年谱，削弱暗室之后的 Peak-End。
- 浏览器证据：独立标签页覆盖桌面 1440×900/1000 与移动 390×844 的首屏、中段、长卷、暗室和卷尾；两视口无页面级横向溢出，console warning/error 为 0，图片均有 alt，标题层级连续。
- Detector 边界：`detect.mjs --json src/pages/index.astro` 仅运行一次，入口文件 0 findings；它不展开导入组件，不能据此判定整页无问题。可变注入预检失败，因此未启动 overlay live server、未声称存在 Human overlay；以截图、DOM/计算样式、布局指标、console 与 CLI 作为证据。
- 快照：`.impeccable/critique/2026-08-15T04-18-23Z__src-pages-index-astro.md`；首次评审，无历史趋势。临时报告已删除，本轮启动的 Astro dev server 已停止；未修改 UI 源码、设计令牌或依赖。

## 上一任务：2.5D 水墨与全站粒子动效深化

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
