# 当前任务：首页可翻页素描本 Hero

目标：仅替换首页 Hero，以原仓库 `index.html` 的 18 段 CSS 3D 曲面、弹簧和阴影算法为保真基准，迁入六卷东方册页；保留 Header、首页后续章节、路由与内容页，不新增依赖，不提交、不推送。

- [x] 记录可验证计划、公共测试缝与本次用户纠正经验
- [x] 生成六张纸纹、书脊与照明同构的无外框全幅横向册页素材
- [x] 先写公共交互回归，锁定长拖、短拖、反向、键盘、循环、缩放与朱砂入口
- [x] 迁移原始 18 段翻页内核并接入 Astro 构建期真实内容
- [x] 覆盖首访开场、同会话回访、Storage 异常、低动态、移动端与无 JavaScript 终态
- [x] 同步 `DESIGN.md`、`docs/progress.md` 与任务结果审查
- [x] 完成格式、类型、构建、E2E、布局扫描、真实浏览器与差异验证

## 计划确认

- 范围：首页仍依次渲染 Hero 与既有六个后续章节；只替换 `Hero.astro` 的内部结构和 `hero-motion.ts` 的交互实现，不创建路由、不改 Header 或其他首页组件。
- 测试缝：浏览器测试只观察可见卷名、拖拽、箭头、键盘、缩放读数、朱砂入口可用性、会话开场与最终 URL，不断言客户端私有状态。
- 内核：保留 18 段曲面、`SPAN=.449`、`BETA=.60`、`.42 / 1.1` 提交阈值、`170/26` 与 `150/24` 弹簧及动态明暗；仅机械适配作用域、六卷数据、循环、开场和可访问交互。一次几何校准后仍不保真时，停止 TypeScript 重构并在 Hero 内嵌原始 JavaScript。
- 资产：六张素材使用相同的全幅宣纸画布、中央书脊和照明，不在图片中烘焙硬封底、外框、透明棋盘或动态文字；圆角与外部阴影由 CSS 负责。空集合使用克制空态，不虚构人物、作品或统计。
- 验证：覆盖 `1707×735 @ DPR1.5`、1440px、390×844、320px、明暗主题、翻页中间帧、触控命中、横向溢出、控制台、reduced-motion 与无 JavaScript；最终运行全部项目门禁和布局扫描。

## 当前修订：样图式纸本质感

- [x] 以用户批准样稿为唯一母版，锁定 `2.2:1` 画幅、宣纸纤维、左侧叠页、中央书脊、细钢笔线与暖赭灰墨
- [x] 生成六张同构水墨山水册页，只更换山水场景，不加入文字、印章、黑底或透明棋盘
- [x] 校验六张素材的实际像素、画幅与边角颜色后覆盖现有 Hero 素材，不修改翻页内核和页面结构
- [x] 完成格式、类型、构建、Hero 回归、真实桌面 / 移动浏览器与差异验证
- [x] 更新设计契约、进度与本节结果审查

## 结果审查

- 首页 Hero 现由六张 `1851–1855×848–849` 的 RGB 全幅水墨山水册页组成；全部沿用批准母版的可见宣纸纤维、左侧叠页、中央书脊、细钢笔线与暖赭灰墨，只更换山水场景。六张画幅均为 `2.18–2.19:1`，边角是实体暖白纸色，不含透明棋盘、黑底、硬封底、外框、文字或印章。
- 本次只覆盖 `src/assets/art/sketchbook/` 的六张图像并同步设计记录，未改 `Hero.astro`、`hero-motion.ts`、路由、首页后续章节或依赖。卷首、笺录、器作、光影、此间与留墨依次使用山河桥亭、雨谷书亭、峡谷木桥、湖光倒影、高山幽居与江湾渡口场景。
- 翻页内核保留 18 段曲面、`SPAN=.449`、`BETA=.60`、`.42 / 1.1` 提交阈值、`170/26` 与 `150/24` 弹簧、动态阴影和高光；六卷数据在 Astro 构建期从真实公开内容生成，DOM 文字、朱砂入口、循环、键盘、缩放、移动端、会话开场、Storage 异常、低动态和无 JS 终态均已接通。
- 自动化通过：`pnpm format:check`；`pnpm check` 为 57 文件 0 问题；`pnpm build` 生成 24 页、96 个优化图像和 3 页 Pagefind 索引；`pnpm test` 为 8/8；Impeccable 全站 layout 扫描返回 `[]`；`git diff --check` 通过。
- 生产浏览器覆盖 `1707×735`、`1440×900`、`390×844` 与 `320×844` 的明暗主题、稳定页和翻页中间帧。320px 下页面 `scrollWidth=320`，朱砂入口约 `45.5×45.5px`、下一卷命中区 `44×51.8px`；干净会话控制台 0 errors / 0 warnings。浏览器和 preview 已关闭，本轮未提交、未推送。
- 样图质感修订后再次实测：`1707×735` 稳定页和 140ms 翻页中帧无白框、黑缝或棋盘；`1440×900` 暗色书宽 736px，`390×844` 书宽 342px，`320×844` 暗色书宽 272px且两种窄屏均无横向溢出；最终控制台 0 errors / 0 warnings。

# 当前任务：热核审查问题修复

目标：修复 Pagefind 检索生命周期竞态，收敛 Header 与 Hero 的职责/模式结构；保持视觉、文案、路由和公开组件接口不变，不新增依赖，不提交、不推送。

- [x] 以浏览器公共界面复现并锁定 Pagefind 初始化期间输入丢失
- [x] 修复 Pagefind 就绪状态，确保初始化完成后自动执行当前查询
- [x] 以浏览器公共界面复现并锁定旧搜索结果覆盖新查询
- [x] 为搜索请求增加过期响应屏蔽与异常降级
- [x] 拆分移动卷目、页眉滚动态与首页章节轨道控制器
- [x] 将 Hero full / light 数值集中为 typed profile，并保持 short 独立
- [x] 完成格式、类型、构建、E2E、差异与真实浏览器回归
- [x] 补充结果审查并确认工作区只含本轮改动

## 计划确认

- 测试缝：只从用户可见的笺录搜索框/结果列表、移动卷目、首页章节读数与 Hero `data-hero-intro` 观察行为；Pagefind 作为构建产物边界以浏览器路由替身控制时序，不测试 React 私有状态。
- TDD：先分别写“初始化完成前输入仍会搜索”和“较慢旧请求不得覆盖新结果”两个失败用例，每次只实现足够通过当前用例的生命周期修复。
- Header：仍由 `initHeaderInteractions()` 作为唯一公开入口；内部拆成三个就地函数，非首页不创建章节坐标、字体等待或 `ResizeObserver`。
- Hero：不重写时间线，不改变任何数值；只把 full / light 的参数集中到模块级只读 profile，由现有时间线消费，short 路径保持原样。
- 验证：运行目标 E2E 红/绿循环，再执行 `pnpm format:check`、`pnpm check`、`pnpm build`、`pnpm test`、`git diff --check`；生产浏览器复核搜索两种时序、移动卷目和 Hero full / light / short / reduced-motion。

## 结果审查

- Pagefind 以两条浏览器级红/绿用例锁定初始化等待与过期响应竞态；就绪模块改用 React 状态触发当前查询，每次 effect 清理同时拦截定时器与在途旧响应，异常保持原降级语义。
- Header 只做原逻辑的就地分拆；非首页在首页章节轨控制器入口立即返回，不再创建章节坐标、字体等待与 `ResizeObserver`。Hero full / light 原数值集中为模块级只读 profile，short 路径未改。
- 验证通过：`pnpm format:check`，`pnpm check` 57 文件 0 问题，`pnpm build` 24 页且 Pagefind 索引 3 页，`pnpm test` 在生产 preview 中 6/6 通过，`git diff --check` 通过。代码图覆盖未记录缺口，但本轮文件为 `metadata_changed`，已以源码差异与浏览器结果核验。
- 工作区只含本轮 5 个预期文件；未改视觉、文案、路由、公开接口或依赖，无需同步设计/进度契约，未提交、未推送。

# 当前任务：全项目代码质量五项修复

目标：以内部脚本模块化收敛 Header / Hero 职责，修复灯箱快速切换与 Storage 异常，并以 Playwright 回归测试作为 GitHub Pages 部署门禁；不改变视觉、内容、路由或公开接口，不提交、不推送。

- [x] 以一次性幻灯片身份修复灯箱快速切换重复曝光
- [x] 抽离 `initHeaderInteractions()` 与 `initThemeToggle()`，消除收起定时器和 Storage 裸访问
- [x] 抽离 `initHeroMotion()`，保持会话开场、主动跳过与卷首交棒不变
- [x] 新增 Playwright 关键交互测试与 GitHub Actions quality 门禁
- [x] 同步设计、验证、进度、命令文档与本地 sidecar
- [x] 完成静态、自动化、真实视口验收和结果审查

## 计划确认

- 模块边界：`Header.astro`、`Hero.astro` 继续拥有原有 HTML / SVG / scoped CSS；只把客户端交互分别迁入 `src/scripts/header-interactions.ts`、`src/scripts/theme.ts` 与 `src/scripts/hero-motion.ts`，不新增展示组件或通用管理器。
- 灯箱：用 `openingSlideSrc` 锁定首次打开的底片包装层，560ms 或关闭时清理；相邻页切换不得继承翻底片与曝光动画。
- 安全边界：首屏主题恢复和运行时主题读写均容忍 Storage 抛错，仍建立 `js/reveal-ready` 并允许主题即时切换。
- 自动化：根级 Playwright 配置与一个关键交互测试集覆盖灯箱快速切换、移动卷目、Storage 禁用、Hero 首访 / 回访 / 跳过 / reduced-motion；CI 先执行 format、check、E2E，成功后才允许 Pages build。
- 验证：运行 `pnpm format:check`、`pnpm check`、`pnpm build`、`pnpm test`、`git diff --check`，并复核 `1707×735 @ DPR1.5`、`390×844 @ DPR1.5` 与 320px；结束后停止预览并确认端口无监听。

## 结果审查

### 实施结果

- 灯箱以 `openingSlideSrc` 锁定首次打开的底片包装层，560ms 或关闭时清理；CSS 入场类直接落在匹配包装层。30ms 快速切换后，新当前页实测无 `negative-turn`、`negative-exposure` 或入场类，图片保持 `filter: none`。
- `Header.astro` 从 1078 行降至 824 行：移动卷目与首页章节进度迁入 `initHeaderInteractions()`，收起以 `animationend / animationcancel` 收口并删除 110ms JS 定时器；主题交互迁入 `initThemeToggle()`，所有运行时 Storage 读写均走安全边界。
- `Hero.astro` 从 986 行降至 756 行：会话级 full / light / short 开场、用户输入跳过、桌面滚动交棒与印章磁吸原样迁入 `initHeroMotion()`；HTML、SVG、scoped CSS、session key 和低动态静态终态保持不变。
- 新增根级 Playwright 配置与 4 项关键交互回归；GitHub Actions 增加 `quality` job，完成依赖、Chromium、format、check 与 E2E 后，Pages `build` 才可启动。报告与测试产物已忽略，命令和验证文档已同步。
- 生产回归同时捕获并修复了画廊 reveal 在 React 岛 hydration 前写入 class / style 的竞态：现在等待 `astro:hydrate` 后再启动观察器，服务端与客户端共享确定性的 `--reveal-order`，避免灯箱因 hydration mismatch 失效。
- `pnpm test` 通过最小编排脚本启动生产预览，并在成功、失败和异常路径统一停止服务；移动卷目同帧重开再收起时会取消旧 CSS 时间线，仍仅由 `animationend / animationcancel` 完成收口。

### 验证证据

- 静态：`pnpm format:check` 全绿；`pnpm check` 为 57 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引；`git diff --check` 通过。
- 自动化：`pnpm test` 的灯箱快切、Storage 禁用、移动卷目、Hero 首访 / 回访 / 跳过 / reduced-motion 共 4 项全绿；移动入口实测六项均 48px 高，快速撤销关闭、同帧重开再外点关闭和跨 640px 断点均无残留状态，测试结束后生产预览自动停止。
- 生产预览 `1707×735 @ DPR1.5`：Hero 新会话为 full，200ms 内滚轮可立即到完整终态，刷新为 short；标题 opacity 1、无横向溢出。灯箱 30ms 切图后新页动画名均为 none。
- 生产预览 `390×844 @ DPR1.5` 与 320px：Enter / Space、Escape 回焦、外点关闭和断点清理通过；六项完整、最小高度 48px，320px 无横向溢出。Storage 全部拒绝时 0 page errors，主题仍由 false 切为 true 并即时落到 dark。
- reduced-motion 下 Hero 不建立 intro 中间态，题名完整可见；灯箱无位移或曝光且图片 `filter: none`。无 JS 下 Hero、题名、六个卷目入口及六幅画廊图均可见；生产会话控制台 0 errors / 0 warnings。
- `AGENTS.md / CLAUDE.md` 硬链接已重建并由 `fsutil hardlink list` 验证。隔离浏览器已关闭，dev / preview 已停止，4321 与 4322 均确认拒连；本轮未提交、未推送。

# 当前任务：移动端“卷目”二级菜单

目标：将 `<640px` 的横滑主导航改为“当前栏目 + 卷目下拉”，在页眉下方悬浮展开 2×3 纸笺菜单；桌面六项导航、首页卷尺进度与既有路由保持不变，不提交、不推送。

- [x] 统一计算导航链接、激活态与当前栏目
- [x] 实现原生 details / summary 与 2×3 悬浮菜单
- [x] 补充外部点击、Escape、断点清理与 reduced-motion 降级
- [x] 同步设计契约、进度与本地 sidecar
- [x] 完成静态检查、浏览器验收与结果审查

## 计划确认

- 移动断点沿用 `<640px`；摘要显示当前栏目图标、名称与 Lucide 下箭头，菜单默认收起且不保存状态。
- 菜单绝对定位于页眉下方，不推动正文、不锁滚动；六项按 3 列 × 2 行排列，每个入口至少 44px，当前项以朱砂图标、墨线与 `aria-current="page"` 标识。
- 原生 disclosure 保证点击、Enter / Space 和无 JS 可用；小型脚本只增强外部点击关闭、Escape 关闭并回焦、切换桌面断点即时清理。展开 160ms、收起 110ms，低动态取消位移并即时收口。
- 验证覆盖 `1707×735 @ DPR1.5`、`390×844 @ DPR1.5`、320px 窄屏、明暗主题、键盘、触摸、reduced-motion、无 JS、控制台与横向溢出；结束后关闭会话和预览。

## 结果审查

- `Header.astro` 复用同一份 `navigation` 结果驱动桌面卷尺与移动卷目；根路径精确匹配，首页、器作等页面均只保留一个 `aria-current="page"`，摘要同步显示当前栏目。
- `<640px` 使用原生 `details / summary` 和 3 列 × 2 行悬浮纸笺菜单；面板不改变页眉高度，六项实测均为 48px 高，390px 与 320px 均无横向溢出，也不遮挡主题按钮。
- 渐进增强已覆盖外部点击、Escape 回焦、快速撤销关闭与跨越 640px 断点清理；Enter / Space 可展开。reduced-motion 下动画名和 transform 均为 `none`，无 JS 下默认收起且原生点击可展示全部六项。
- 明暗主题及器作内页实测通过；桌面 `1707×735 @ DPR1.5` 六项同排，首页卷尺标记随滚动移动，页眉高度保持 81px。四个浏览器会话均为 0 errors / 0 warnings。
- `pnpm format:check`、`pnpm check`（52 files，0/0/0）、`pnpm build`（24 pages）、`git diff --check` 与 sidecar JSON 解析通过；Impeccable 仅提示页眉既有及契约允许的小字号 advisory，未发现布局违规。
- 测试会话与临时文件已清理，preview PID 24984 已停止且 4321 无监听；本轮未提交、未推送。

# 当前任务：导航新增“卷首”入口

目标：在主导航首位加入指向首页的“卷首”标签，复用现有导航视觉与响应式横滑能力，不改变其他路由和页眉交互。

- [x] 在导航配置中登记首页入口
- [x] 确保“卷首”只在首页激活
- [x] 完成格式、类型、构建与桌面 / 移动浏览器验收
- [x] 补充结果审查

## 计划确认

- 使用既有 `navItems` 数据入口和 Lucide 内联图标，不新增组件或样式。
- 首页根路径采用精确匹配，避免 `/` 的前缀判断误激活所有内页。
- 在 `1707×735 @ DPR1.5` 与 `390×844` 下检查六项导航、首页激活态、内页互斥激活和横向溢出。

## 结果审查

- `src/site.config.ts` 在主导航首位加入“卷首”，使用既有 Lucide `BookOpen` 内联路径并经 `withBase('/')` 指向首页；未新增组件、样式或客户端脚本。
- `Header.astro` 对根路径改用既有 `isHome` 精确判定，避免 `/` 的前缀匹配让内页同时激活“卷首”。
- `pnpm format:check`、`pnpm check`（52 files，0/0/0）、`pnpm build`（24 pages）与 `git diff --check` 通过；Impeccable 仅报告页眉既有字号档位 advisory，本轮无新增样式告警。
- Playwright 实测桌面 `1707×735 @ DPR1.5` 六项完整同排，移动 `390×844 @ DPR1.5` 无页面横向溢出且可横滑 110px 完整到达末项；首页仅“卷首”激活，笺录与器作内页各自仅激活当前项，两端控制台 0 errors / 0 warnings。
- 桌面与移动隔离会话均已关闭，preview PID 14532 已停止；本轮未提交、未推送。

# 当前任务：展览级数字长卷动效升级（Phase 2）

目标：在已确认的 Phase 1 视觉方向上完成器作装裱回正与暗室翻底片；保持内容、路由、组件接口和既有共享图像接棒不变，不新增依赖、动效管理器或全局状态，不提交、不推送。

- [x] 核对器作索引、灯箱切换与清理链的现有实现
- [x] 确认 Phase 2 的最小实现范围与可验证终态
- [x] 实现器作三档装裱角、hover / focus 回正与 reduced-motion 降级
- [x] 实现灯箱 520ms 翻底片、360ms 曝光层与 250ms 相邻切换
- [x] 同步 `DESIGN.md`、`.impeccable/design.json` 与 `docs/progress.md`
- [x] 完成格式、类型、构建、差异与生产浏览器验收
- [x] 补充结果审查并清理预览进程

## 计划确认

- 阶段边界：只修改 `/projects/` 器作索引和 `/gallery/` 共享灯箱；不改首页器作、项目详情、内容数据、导航或 Phase 1 时间线。
- 器作画框：三类展品分别采用约 `-0.8deg / +0.7deg / -0.35deg` 的静态装裱角；仅桌面细指针 hover 与 `focus-within` 在 250ms 内回正并上移 6px，移动端不挂载 hover，低动态只保留颜色、墨线与阴影反馈。
- 暗室底片：复用 YARL 的 `slideContainer` 增加必要包装层；齿孔框与最高 0.18 的纸白曝光层只由伪元素绘制，首次打开以 `rotate(-1.2deg) scale(.96)` 在 520ms 内回正，图片全程 `filter: none`。
- 切换与清理：共享图像打开/关闭仍为 250ms；上一幅、下一幅的 swipe / navigation 统一为 250ms，切换不重复曝光；快速开关通过现有 promise、异常分支、超时和局部状态清理 View Transition 名称与临时入场态。
- 验证覆盖：完整静态四项；生产预览覆盖 `1707×735 @ DPR1.5`、`390×844`、明暗主题、键盘焦点、触摸门控、连续开关/切换、reduced-motion、无 JS、控制台、横向溢出与长任务；结束后停止预览并确认端口拒连。

## 结果审查

### 实施结果

- `/projects/` 三类展品直接复用现有媒体节点，以 `-0.8deg / +0.7deg / -0.35deg` 静置；细指针 hover 与键盘 `focus-visible` 在 250ms 内回正并上移 6px，继续使用既有环境阴影、编号落砂和展签复笔，不新增包装层或脚本。
- 灯箱复用 YARL `slideContainer` 增加一个内部底片包装层；齿孔框和纸白曝光层只由伪元素绘制，打开时以 520ms 从 `rotate(-1.2deg) scale(.96)` 回正，曝光最高 0.18 并在 360ms 消退。图片全程 `filter: none`，包装层与图片尺寸实测差为 0。
- `negativeOpening` 仅在打开时短暂存在并以 560ms 超时兜底清理；关闭会立即撤销，相邻切换不重新设置。YARL swipe / navigation 统一为 250ms，既有共享图像 View Transition、异常分支、promise 与 280ms 名称清理保持不变。
- `DESIGN.md`、本地 `.impeccable/design.json` 与 `docs/progress.md` 已同步；sidecar 同时校正古铜 `#7d6549` 与缺失的 `folio-turn` 记录，仍按忽略规则仅保留本地。

### 验证证据

- 静态：`pnpm format:check` 全绿；`pnpm check` 为 52 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引；`git diff --check` 与 sidecar JSON 解析通过。
- 器作（Playwright，`1707×735 @ DPR1.5`）：三件展品角度实测为 `-0.8 / +0.7 / -0.35deg`；hover 与键盘焦点均回到 0deg、上移 6px并切换卷首影。`390×844 @ DPR1.5` 粗指针下 `hover: hover` 为 false，真实 tap 前后保持 `-0.8deg / 0px`，两端均无横向溢出；明暗主题结果一致。
- 暗室（同两视口）：打开 40ms 时底片动画名、520ms 时长、约 `-1.2deg / .96` 矩阵、曝光动画 360ms 与 opacity 0.18 均命中；570ms 后临时类、transform 与曝光归零。下一幅和键盘 ArrowRight 均不重复曝光，图片 `filter: none`，明暗主题均无溢出。
- 连续三次 80ms 快速开关后灯箱节点、入场类、View Transition 名称全部为 0，焦点回到原触发按钮；剩余运行动画仅为既有 `mist-drift-a` 与 `bamboo-sway`。桌面与移动控制台均为 0 errors / 0 warnings。
- reduced-motion：器作 transform 为 `none`，颜色 / 阴影反馈为 150ms；灯箱不建立翻底片入场，曝光为 0、图片清晰、View Transition 名称为 0。无 JS 下 3 件器作与 6 幅画廊图全部可见；打开、切换、关闭期间未记录到 >50ms Long Task。
- Impeccable 机械检查只报告既有字号 / 色值 advisory；本轮新出现的暗室阴影色已立即收敛回现有 `rgb(0 0 0 / 0.42)` 契约。三个 Playwright 会话均已关闭，临时脚本 / 配置 / 截图已删除，preview PID 13904 已停止，4321 确认拒连。

# 当前任务：展览级数字长卷动效升级（Phase 1）

目标：按已确认的“集中式高潮”方向完成首页会话级墨滴开卷、题名运笔与四类内页卷首交棒；本阶段不改内容、导航、路由或数据，不实施器作画框与暗室底片，不提交、不推送。

- [x] 核对既有动效入口、共享工具、设计契约与历史教训
- [x] 确认 Phase 1 的最小实现范围与可验证终态
- [x] 实现首页完整/短版开场、手工 SVG 笔路与主动跳过
- [x] 收敛桌面卷首高度并实现四类无 pin 滚动交棒
- [x] 同步 `DESIGN.md`、`.impeccable/design.json` 与 `docs/progress.md`
- [x] 完成格式、类型、构建、差异与生产浏览器验收
- [x] 补充结果审查并停在 Phase 1 等待视觉方向确认

## 计划确认

- 阶段边界：本轮只做 Phase 1；Phase 2 的器作装裱回正与暗室翻底片保持原样，待桌面和移动实测结果由用户确认后再实施。
- 首页开场：以 `sessionStorage['mojian:hero-intro:v1']` 区分每标签会话首次完整开场与约 450ms 短版；存储不可用、reduced-motion 或无 JS 时直接采用短版/静态终态。
- 视觉结构：在现有 Hero 内加入三层不规则墨斑和“墨”“笺”手工分段 SVG 遮罩；完整时间线不超过 1.6s，不锁滚动，滚轮、触摸、按键或点击可立即推进终态并清理监听。
- 卷首交棒：桌面 `PageIntro` 收敛至 45–55svh，四类场景复用 `onDesktopViewport()` 创建无 pin、`scrub: 0.5` 的 ScrollTrigger；滚动帧只写 `transform`、`opacity`、`clip-path`，不读取布局。
- 移动与无障碍：移动端不运行卷首滚动时间线，入口动画控制在 750ms 内；reduced-motion 关闭完整开场和空间叙事，内容默认完整可见。
- 验证覆盖：完整静态四项，生产预览覆盖 `1707×735 @ DPR1.5`、`390×844`、明暗主题、会话状态、主动跳过、reduced-motion、无 JS、控制台与横向溢出；结束后停止预览并确认端口拒连。

## 结果审查

### 实施结果

- 首页加入三层不规则 SVG 墨斑与“墨 / 笺”各九段手工笔路遮罩；`data-hero-intro` 仅记录 `full / light / short` 内部态。桌面首次完整开场总长 1.54s，移动首次轻量版约 0.68s，回访短版约 0.46s。
- `sessionStorage['mojian:hero-intro:v1']` 在首次进入时写入；刷新/返回走短版，存储读写异常也回落短版。wheel、touchstart、keydown、pointerdown、click 均可推进终态，并统一移除临时监听、隐藏过渡 SVG、恢复真实题字和清理行内 transform。
- `PageIntro` 桌面实测收敛为 50.1–53.5svh；四类场景复用 `onDesktopViewport()` 建立无 pin、`scrub: 0.5` 的 ScrollTrigger，只更新纸层、题字、图像、手记的 transform / opacity。移动端不创建交棒时间线。
- 展览卷首针对 735px 短视口收紧题文纸边，首件展品在首屏真实露出 231px 且完成显影；未改项目列表或共享 reveal 阈值。Phase 2 的器作画框和暗室底片保持原样。

### 验证证据

- 静态：`pnpm format:check` 全绿；`pnpm check` 为 52 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引；`git diff --check` 与本地 sidecar JSON 解析通过。
- 桌面（Playwright，`1707×735 @ DPR1.5`）：首次 200ms 实测 `mode=full`、会话标记为 `1`、三层墨斑 opacity 约 0.266–0.280、笔路 SVG 可见；1.65s 后内容隐藏数 0、笔路/墨斑归零、题字与细节无残留行内 transform。刷新进入 `short` 并在约 460ms 收口；200ms 内滚轮可在 60ms 内完成终态；存储异常分支同样为 `short`。
- 卷首与首屏：reading / exhibition / darkroom / personal 分别为 50.1 / 52.0 / 52.0 / 53.5svh；真实后续内容分别露出 286 / 231 / 272 / 261px，opacity 均为 1。滚动前后根容器 width / height / margin / padding 不变，四场景目标 transform / opacity 按方向更新，pin-spacer 为 0、横向溢出为 0。
- 移动（Playwright，`390×844 @ DPR1.5`，触摸 / 无 hover）：首次为 `light` 且笔路可见，约 0.68s 后内容隐藏数 0、无横向溢出、无新增长任务；四类卷首滚动前后 transform 完全一致、pin-spacer 为 0。
- reduced-motion：Hero 不建立会话开场，笔路 opacity 为 0、页面动画数 0；器作卷首滚动前后图像与巨字矩阵一致，内容隐藏数 0。无 JS 下首页与四类内页题名、图像均静态可见，五页无溢出。
- 清洁控制台会话依次访问首页与四类内页为 0 errors / 0 warnings；动画观测未出现 >50ms 长任务。四个主验收会话与补充折叠测量会话均已关闭，preview PID 28020 / 2032 已停止，4321 / 4322 均确认拒连。

### 边界

- `.impeccable/design.json` 已同步高潮预算、会话开场与卷首交棒契约，但仍按 `.gitignore` 仅保留本地；跟踪文件只有 Hero、PageIntro 与三份阶段/设计文档。
- 未新增依赖、公开 API、组件属性、路由、内容或全局状态；未实施 Phase 2；未提交、未推送、未部署，等待用户确认视觉方向。

# 当前任务：动效专项九项修复

目标：落实已确认的动效专项修复方案，使键盘交互即时、高频反馈不超过 250ms、滚动只更新合成属性、图片不动画 `filter`，并将 reduced-motion 从全局清零改为逐项温和降级；不新增依赖、公开接口或共享抽象，不提交、不推送。

- [x] 核对审查证据、调用路径、索引覆盖与设计契约冲突
- [x] 修复轮播键盘导航、主题切换、页眉卷尺与 Hero 细节入场
- [x] 收敛页面/链接/按钮时长并以遮罩替代图片 filter 显影
- [x] 将 reduced-motion 改为逐项静止与轻反馈
- [x] 同步 `DESIGN.md`、`.impeccable/design.json` 与 `docs/progress.md`
- [x] 完成格式、类型、构建、差异及真实浏览器验收
- [x] 补充结果审查，确认工作区仅含本轮与既有审查记录

## 计划确认

- 输入来源：轮播方向键与按钮 Enter/Space 即时切换，指针/触摸维持 250ms；主题按钮键盘/辅助技术即时切换，指针保留 250ms 圆形换纸。
- 合成约束：页眉滚动只写标记自身 `translate3d`，非首页桌面刊号固定占位；Hero 次要信息从 8px 纵向来源归位。
- 显影约束：按钮从 `scale(.95) + opacity: 0` 起步；通用媒体和画廊以 250ms 暗层遮罩替代 `filter` 过渡，最终图像固定 `filter: none`。
- 低动态约束：删除全局 0.01ms 清零，仅禁用位移、缩放、裁切、滚动叙事和 View Transition；颜色、边框、透明度可保留至多 160ms。
- 验证覆盖：`1707×735 @ DPR1.5`、`390×844`、明暗主题与 reduced-motion；静态执行 format / check / build / diff 四项，不提交、不推送。

## 结果审查

### 实施结果

- 轮播按输入来源统一导航：方向键及按钮 Enter/Space 同帧关闭 Embla、Motion 与进度条过渡，指针/触摸仍保留平滑移动；reduced-motion 下所有幻灯片完整显示并即时切换。
- 主题键盘/辅助技术激活不再启动 View Transition；指针换纸与页面进入均收至 250ms。补充快照层指针穿透和印钮坐标续接，真实 25ms 间隔三连点可全部接收，最终主题、类名与 CSS 变量正确收口。
- 页眉删除父级 `--chapter-offset` 与桌面刊号布局折叠，滚动帧只写朱砂标记自身 `translate3d`；Hero 次要信息从 8px 纵向来源归位，完成后清理行内 transform。
- 按钮墨层改为 `.95 + opacity 0` 到 `1 + opacity 1` 的 160ms 轻落；通用媒体与画廊均以 250ms 独立暗层显影，图像固定 `filter: none`，缩放提示位于遮罩之上。
- 删除全局 0.01ms 清零，并补齐原先依赖该兜底的页眉、联系、笺录条目/标签/正文、器作列表与首页展墙路径：空间移动停用，颜色、边框、阴影或透明度反馈限制在 150–160ms。

### 验证证据

- 静态：`pnpm format:check` 全绿；`pnpm check` 为 52 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引；`git diff --check` 与 sidecar JSON 解析通过。
- 桌面（Playwright，`1707×735 @ DPR1.5`）：Hero 初态实测 `translateY(8px)` / opacity 0，终态 transform none / opacity 1；页面与主题均 250ms；轮播两种键盘入口轨道前后 90ms 矩阵不变且 figure / progress 动画数为 0，指针入口连续变换；页眉父级变量为空、标记自身矩阵连续更新、非首页刊号宽 120px 且无布局 transition / 重叠。
- 主题与显影：键盘换主题 View Transition 调用数 0；指针换纸期间时长 250ms；25ms 间隔三连点调用数 3，最后请求生效且无残留。按钮伪层 `.95→1` / `0→1` 于 160ms 收口；通用暗层 `.52→0`、画廊暗层 `.55→0` 于 250ms 收口，图像 transition-property 仅 transform、filter 为 none。
- 低动态：View Transition 关闭、滚动为 auto、朱砂卷尺标记隐藏但章名继续更新；Hero 内容全显；轮播、画廊与图片无空间动画；按钮仍保留 150ms opacity 反馈，body 不存在 0.01ms 全局覆盖。
- 移动（Playwright，`390×844 @ DPR1.5`，粗指针 / 无 hover）：首页、光影、器作详情逐屏即时滚动后 reveal 隐藏数均为 0，三页无横向溢出；非首页刊号保持隐藏，轮播按钮均为 44×44px。
- 控制台 0 errors / 0 warnings；独立浏览器已关闭，preview PID 24996 已停止，4321 端口确认拒连。

### 边界

- `.impeccable/design.json` 已同步本轮动效契约但位于 `.gitignore` 的 `.impeccable/` 内，仅作为本地 sidecar；其余 17 个跟踪文件均属于本轮实现、契约/进度同步及此前已存在于同一 `todo.md` 的审查记录。
- 未新增依赖、公开 API 或共享抽象；未提交、未推送、未部署。

# 当前任务：全项目代码与动效专项审查

目标：以当前 `main`（`85fda21`）的完整源码树为审查对象，同时执行 Standards / Spec 双轴代码审查与 Emil 动效专项审查；只报告并记录可复核问题，不修改业务代码、不提交、不推送。

- [x] 固定完整源码树快照、规范/规格来源与图谱覆盖边界
- [x] 并行完成 Standards 与 Spec 双轴审查
- [x] 盘点全项目动画入口并按动效十项硬标准审查
- [x] 逐项复核代码证据、严重度与建议修复方向
- [x] 汇总代码审查双轴报告、动效 Findings 表与明确 Verdict
- [x] 补充结果审查，确认工作区仅含本轮文档记录

## 计划确认

- 用户要求审查“项目代码”而非某个未合并分支；当前 `main...origin/main` 为空，因此以空树 `4b825dc` 到 `HEAD 85fda21` 的当前完整源码快照为等价审查范围，源码命令固定为 `git diff 4b825dc642cb6eb9a060e54bf8d69288fbee4904 HEAD -- src`。
- Spec 以 `PRODUCT.md`、`docs/mojian_plan.md`、`DESIGN.md` 与 `docs/progress.md` 的已实现契约为主；Standards 以 `AGENTS.md`、`docs/agents/` 相关约定、`DESIGN.md` 与 Fowler 异味基线为主。
- 动效审查覆盖 CSS transition / animation / keyframes、GSAP / ScrollTrigger、Motion、Canvas 动画、View Transitions 与 hover / reduced-motion 分支；精确时长和曲线以 `$review-animations` 的 `STANDARDS.md` 为准。
- 代码图谱采用 Tier 2；结构发现优先图谱，字符串/CSS/配置检索回退源码；所有最终引用路径统一检查索引覆盖，缺口直接读取源码。
- 本轮只审查和记录，不执行修复，也不提交或推送；发现待用户选择后另开修复任务。

## 结果审查

- Standards：6 项——5 项硬违例、1 项判断项；新增的最高风险为 Pagefind 首次输入不重跑/并发结果倒灌，以及 GalleryLightbox 在不支持 IntersectionObserver 时永久压暗；既有三档小字、shadow-sm/第二处玻璃、GSAP 职责越界与 Header fallback 仍成立。
- Spec：6 项——搜索可用性与无 JS 项目轮播内容不可达为 P1；全站加载/越界使用 GSAP、三档小字、结构阴影与灯箱第二处玻璃为 P2/P3。真实资料、giscus/Formspree 等明确待配置项已排除。
- 动效专项：9 项，Verdict 为 Block；硬阻断包括键盘切轮播仍平滑移动、键盘切主题仍播放 400ms 换纸、按钮从 `scale(0)` 晕出、页眉通过父级 CSS 变量驱动子节点且动画 width/margin/padding、图片 filter 过渡。另报告 400ms 全页导航、Hero 次要信息纯淡入与全局 0.01ms reduced-motion 清零策略。
- 契约冲突：按钮 `scale(0→1)` / 400ms、页面与主题换纸 400ms、低动态整体静止均为当前 `DESIGN.md` 明文；它们符合项目契约但不通过 `$review-animations` 的 Emil 高工艺标准，修复时必须同步裁决设计契约，不能只改 CSS。
- 图谱与源码：Tier 2，当前索引 545 节点 / 799 边、0 skipped / 0 parse-partial；`src` 范围唯一缺口为 15 个 WebP 二进制资产。精确路径覆盖仍返回 `metadata_changed`，因此所有最终结论均以当前源码逐行复核为准。
- 边界：本轮未修改业务代码、未做浏览器慢放主观评判；仅记录可由静态代码证明的问题。工作区预期只包含 `docs/tasks/todo.md` 本轮审查记录，不提交、不推送。

# 上一任务：合并 `tight-volumes` 到 `main` 并发布

目标：将已验证的 `tight-volumes` 全部工作合并到 `main`，推送 `origin/main` 触发 GitHub Pages 部署，并清理已完成的特性分支。

- [x] 提交全项目代码续审记录
- [x] 以 `--ff-only` 将 `tight-volumes` 合并到 `main`
- [x] 在合并后的 `main` 上复验 check / build / format
- [x] 补充本任务结果审查并提交
- [x] 推送 `origin/main` 并核对远端 SHA
- [x] 删除本地 `tight-volumes`；若存在远端同名分支则一并删除

## 计划确认

- 当前 `main`（`9e60c2d`）是 `tight-volumes`（`43f34d8`）的直接祖先，使用 fast-forward，不制造无信息量的合并提交。
- 工作区仅 `docs/tasks/todo.md` 含本轮审查记录；先独立提交，避免切分支时丢失。
- `main` 推送会触发 GitHub Pages 自动部署；用户已明确授权提交、推送与分支清理。
- 删除前先核对分支已被 `main` 包含；远端分支仅在确认存在后删除。

## 结果审查

- 合并：全项目续审记录提交为 `5245db7`；`main` 从 `9e60c2d` fast-forward 到该提交，无冲突、无额外合并提交。
- 验证：合并态 `pnpm check` 为 52 文件 0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页与 Pagefind 索引；`pnpm format:check`、`git diff --check` 全绿。
- 硬链接：Git 切分支后 `AGENTS.md ↔ CLAUDE.md` 曾被写断；确认两文件 SHA-256 一致后重建硬链接，`fsutil hardlink list` 复验同时列出两路径。
- 发布：`origin/main` 从 `eb66d05` 推进至本任务结果提交，推送后以 `git ls-remote` 核对远端 SHA 与本地 `main` 一致；GitHub Pages 自动部署随之触发。
- 清理：本地 `tight-volumes` 在确认已被 `main` 完整包含后删除；远端未曾存在同名分支，无需远端删除。
- 已知风险：上一任务报告的 Standards 5 项与 Spec 4 项未在本轮修复，按用户发布指令原样进入 `main`。

# 上一任务：全项目代码续审（Standards / Spec 双轴）

目标：以 `main` 为固定点，审查 `main...HEAD` 的 9 个提交与 49 个变更文件；在上一轮八项修复后继续发现标准违例、代码异味、规格遗漏、实现偏差和范围蔓延。本轮只审查与记录，不修改业务代码、不提交。

- [x] 固定审查点并确认差异非空：`main` / merge-base `9e60c2d`
- [x] 确认图索引状态、架构概览与变更影响范围
- [x] 确认规格来源、标准来源与图索引覆盖
- [x] 并行完成 Standards 与 Spec 双轴审查
- [x] 复核每项发现的代码证据与严重度
- [x] 汇总审查结论并补充结果审查

## 计划确认

- 审查命令固定为 `git diff main...HEAD`，提交清单固定为 `git log main..HEAD --oneline`。
- 规格以 `docs/tasks/todo.md` 各任务目标、计划确认和结果审查为主，辅以 `DESIGN.md` 与 `docs/progress.md`；提交信息未引用 GitHub Issue。
- 标准以根 `AGENTS.md` 及 `docs/agents/` 相关约定、`DESIGN.md` 为主，并应用 `$code-review` 的 Fowler 异味基线；格式、类型等工具已覆盖项不重复报告。
- 代码图谱采用 Tier 2；对所有实际引用路径检查覆盖，覆盖缺口回退到源码读取。
- 本轮不执行修复、不提交、不推送；审查结论待用户选择后另开修复任务。

## 结果审查

- Standards：5 项——4 项硬违例（档外小字、阴影契约、灯箱第二处玻璃、GSAP 职责越界）与 1 项判断项（Header 不可达 fallback / Speculative Generality）；最严重为阴影契约系统性漂移。
- Spec：4 项——普通揭示迁移超出布局任务边界、两处 `shadow-sm` 与设计契约冲突、`docs/progress.md` 漏记 `43f34d8` 阶段、三项打磨任务顺带加入 `.zcode/` 忽略项；前三项 P2，末项 P3。
- 图谱证据：本轮全量索引为 544 节点 / 798 边，0 skipped / 0 parse-partial；覆盖服务仍把 49 个差异路径标为 `metadata_changed`，因此所有结论均回退到完整 diff 与当前源码复核，15 个未索引 WebP 仅为二进制资产。
- 验证：`git diff --check`、`pnpm check`（52 文件 0/0/0）、`pnpm build`（24 页 + Pagefind）与 `pnpm format:check` 全绿。
- 边界：本轮未做浏览器视觉验收、未修复发现、未提交、未推送；待用户选择修复项后另开任务。

# 上一任务：code-review 八项审查修复（契约收敛 + 定向去重）

目标：按全项目 code-review（Standards/Spec 双轴 + 架构审计）结论修复用户选定的八项：三档小字回归、journal 取数共享、年月格式化、主题解析共享、断点生命周期与磁吸工具化、navItems 集中、白文方印原语。

- [x] ① Header 小字：0.6→0.62×2、移动 0.5→0.62 / 0.65→0.68；edition 移动端左外扩 0.75rem 容纳内容
- [x] ② 新建 utils/journal.ts（getJournalPosts + byPubDateDesc），六处取数替换（category/tags 的 getStaticPaths filter 后免再 sort）
- [x] ③ utils/date.ts 新增 formatYearMonth，替换 CurrentFolio/home Journal 两处手写
- [x] ④ 新建 scripts/theme.ts（resolveTheme）；Header 主题脚本 is:inline→打包 module（补参数类型），GiscusWall 同步接入
- [x] ⑤ scroll.ts 新增 onDesktopViewport（命名弃 use 前缀：非 React 环境）；Hero/ScrollJourney/Gallery 三处替换
- [x] ⑥ scroll.ts 新增 attachSealMagnet；两处磁吸各缩为 1 行调用
- [x] ⑦ navItems 集中 site.config.ts（href 根路径 + Lucide path），Header 改 import + withBase
- [x] ⑧ global.css 新增 .seal-block 白文原语；SectionHeading/Hero×2/ScrollJourney/终印四处组合类收敛；DESIGN.md 入册
- [x] 验证：check/build/format 全绿 + 浏览器八项复测全 PASS

## 结果审查

- 契约回归：页眉三处档外小字收敛后移动端 readout 初测溢出 2.7px/侧（edition 固定 3rem < 0.62rem 内容 53.5px），以移动端 inset 左外扩 0.75rem 修复，复测 53.45px ≤ 72px 容器、单行、零裁剪、零页面溢出。
- 去重收益：journal 取数六处→1 个共享函数；主题解析两处→1；断点重建三处→onDesktopViewport；磁吸两处→attachSealMagnet；印章共性四处→.seal-block；navItems 出 Header 入 site.config（新增页面少改一处）。
- 行为差异声明：Header 主题脚本由 is:inline 改为打包 module（defer 执行）——绑定时机略晚但无渲染期时序依赖，且获得类型检查（补了 applyTheme/clearTransition 参数类型）与 bundle 缓存。
- 验证证据：桌面/移动字号计算值精确命中（9.92/10.88px）；journal 六路由数据回归（列表 3 篇最新在前、archive 分组、分类/标签计数、RSS 3 item、首页期次文案）；主题往返与 aria-pressed 同步；390→1440 断点重建与反向清零；磁吸 ±3px 归零；四处印章背景/字体/display 全中；双视口 console 0/0、零溢出、reveal 零残留。
- 边界：页眉其余档外值（0.78/0.86/0.88/0.95rem）与 fallbackTitles、shadow-sm/灯箱 blur 契约裁决不在本轮清单，留待后续。

# 上一任务：三项动效落地（合卷收束 / 翻页接棒 / 印泥磁吸）

目标：按动效提案落地解评审遗留痛点的三项——长卷 peak-end 强化、章界接棒、钤印磁吸与移动端落款仪式。

- [x] 合卷收束：长卷 9.4/10 起 mount 自右缘 clip-path 收拢（scrub 双向），题跋提前至 0.8 加速启动
- [x] 翻页接棒：新增 `folio-turn` reveal 变体（rotateX 9° 自上缘翻起），章肆主稿卡接入；group 下放 catalog
- [x] 印泥磁吸：Hero 钤印与卷尾「山水」细指针 quickTo 弹性跟随（±3px 上限）
- [x] 移动端落款：statement 卡右上角新增小印 `hero__seal--inset`（桌面 display:none）
- [x] 验证：check/build/format 全绿 + 浏览器六项复测
- [x] 结果审查

## 结果审查

- 合卷：96% 行程实测 `inset(... 30.08% ...)`、100% 收至 94%、回滚 90% 恢复 none——scrub 双向成立，卷尾印落定后整幅卷框自右缘收拢离场。
- 翻页：初态 matrix3d 实测 rotateX(9°) 精确吻合（cos/sin 逐位对上）+ 透视与 y 平移分量；终态精确保留常态 rotate(-0.45deg)；reduced-motion 直出常态无翻页。首版初态被组件 scoped transform 权重覆盖（:where() 预置态 0,1,0 < 组件 0,2,0），已在组件内以 `:global(html.js.reveal-ready) :not(.is-revealed)` 补声明。
- 磁吸：两处印章 pointermove 后 inline translate 非零且封顶 ±3px、pointerleave 后归零；触屏不启用。
- 移动印章：390×844 下位于 statement 上缘右侧（top -17px / right 13px）；注：getComputedStyle 对 inline-flex 返回计算值 flex 属标准规范化，非缺陷。
- 启动提前：长卷 10% 行程题跋 opacity 0.17 > 0，展墙到题字的空档缩短。
- 回归：双视口 console 0/0、无横向溢出、滚到底 reveal 隐藏 0/42。
- 边界：reveal.ts 观察目标新增 folio-turn 选择器；DESIGN.md 的 Reveal 契约值域未同步（folio-turn 待下次文档刷新一并入册）。

# 上一任务：用户真实视口复现与展墙/Hero 修复

目标：用户截图反馈首页器作板块"文字溢出"、Hero 太占空间；经用户实际 Chrome（CDP 附加，视口 1707×735 @DPR1.5）复现定位并修复。

- [x] 线上旧版复现：展签卡 padding 0、题名"墨"字与卡片左缘 0px 贴齐（视觉即"溢出"）
- [x] 新版展墙 96rem→82rem 对齐 section 裁切边界（左右余量恢复，页面零溢出）
- [x] Hero 桌面压缩 min(75svh, 46rem)，图片改固定 height 防 3:2 自然比撑高
- [x] 补漏：详情页 project-hero__copy 去 backdrop blur（玻璃拟态仅页眉契约）
- [x] DESIGN.md 同步 Hero 契约（七成半屏、首屏露出近况章头）
- [x] 用户 Chrome 实测验收 + 提交

## 结果审查

- 复现路径：无头 Chromium（1440×1000）测不到该问题——用户视口 1707×735 下线上旧版展签卡无 padding、题名贴边；教训是无头验证必须覆盖用户真实视口与 DPR。
- 展墙：82rem 定宽后用户视口实测左余量 16px、item--3 右余量 4px、题名卡内边距 30px、页面溢出 0。
- Hero：min-height 551.5px 生效后仍被图片自然比例（1116 宽×3:2=751px）撑至 844px；改 `height: min(48vh, 36rem)` 后实测 552px=75.1svh，章壹首屏露出 183px。
- 回归：用户 Chrome 内 console 0/0、页面零溢出；check/build/format 全绿。
- 边界：移动端（390）由子代理验证未回归；preview 服务保留供主人查看 localhost:4321；线上仍为旧版（eb66d05），修复待推送后生效。

# 上一任务：评审后三项精致化打磨

目标：按 Impeccable + Emil 双视角评审结论修复三项局部瑕疵：Hero CTA 视觉重量、题跋弹层免延迟、长卷无字空窗。

- [x] ① Hero CTA「读笺录/看器作」常驻淡墨下划线，hover 加深至全墨（150ms）
- [x] ② InscriptionTip 首次弹出后进入即时态（模块标记 + 实例幂等置位 + pointerenter 同步）
- [x] ③ 长卷卷尾印入场 7.6→7.1，与诗句退场交叉半拍消空窗
- [x] 验证：check/build/format 全绿 + 浏览器复测三项
- [x] 结果审查

## 结果审查

- ① 实测：双视口 `text-decoration-line: underline`、offset 精确 0.4em、常驻色为墨 38%、hover 后 rgb(37,38,34) 全墨；字号与触控热区未动。
- ② 实测：首枚 362ms（仪式保留）、同枚复开 ≤0ms 即时；跨实例首次仍约 314ms——Base UI 在 pointerenter 时按当时 delay 同步排程 timer，React 重渲染无法撤销已排程计时。边界判定：彻底免延迟需受控 open 自控时序（键盘/触屏/Escape 全套），而全站每页仅两枚钤印且跨页后新实例经模块初值直接即时，收益不配复杂度，按 stop-polishing 收口。
- ③ 实测：73% 行程 ending opacity 0.59、76% 为 1，诗句退场与卷尾印交叉，无全空拍；框高留白（视觉判断项）按计划留档不动。
- 回归：console 0/0、双视口无横向溢出；`.gitignore` 补 `.zcode/`（ZCode 计划存档，工具产物）。
- 静态：定向 Prettier 通过、全仓 format:check 全绿、check 0/0/0、build 0 error。

# 上一任务：critique 五项修复（P1 resize + P2 对比度/章高 + P3 契约收敛/长卷跳过）

目标：按 2026-08-22 critique 快照修复全部 5 个优先问题；章高按用户决定继续压密度至 55–75svh 契约，不修改 DESIGN.md 数字。

- [x] P1：ScrollJourney/Hero/Gallery 监听 768 断点 change，重建或救济未初始化的预隐藏态
- [x] P2：昼间 `--bronze` 提亮过 4.5:1（双通道同步检查）
- [x] P2：桌面壹/贰/肆/伍章高压向 55–75svh；移动端内容完整不动
- [x] P3：0.58/0.6rem 收敛 0.62；小字区间候选值按用途归档；Hero statement 去 backdrop blur
- [x] P3：卷尾印章可聚焦，回车「展毕」跳章肆
- [x] 验证：check/build/format + 浏览器复测（resize 复现场景、章高、对比度）
- [x] 结果审查

## 计划确认

- 修复范围：用户选定全部 5 个；P1 先行；章高继续压密度而非改契约。
- 降级边界：所有修复不破坏 reduced-motion / 无 JS / 移动端静态终态。
- Git 边界：修复完成后提交至 `tight-volumes` 分支，不推送。

## 结果审查

### 修复内容

- P1 断点重建：ScrollJourney / Hero handoff / Gallery 视差三处 GSAP 时间线改为 `matchMedia('(min-width:768px)')` change 时重建或 kill + `clearProps`，与 CSS 预隐藏态的媒体查询保持同断点；390 加载转 1440 后长卷题字/诗句/进度条实测恢复驱动，反向转 390 后三元素回到 opacity:1 静态终态且无 inline 残留。
- P2 对比度：昼间 `--bronze` #8b7355→#7d6549（夜与暗室深底值不动），folio-label 对宣纸实测 4.7791:1；DESIGN.md frontmatter 已同步。
- P2 章高（1440×1000）：壹 81.5→74.7、贰 85.1→75.2、肆 78.8→74.9、伍 93.2→82.8；手段为 chapter 章标下距统一收紧、各章 py / min-height / aspect 比例 / 错位量定点收敛。贰最后一轮 4px 微调被相邻 margin 折叠吸收，停在 75.2svh（差 2px，舍入误差级，按 stop-polishing 收口）；伍按 A 建议以 ≤85svh 为界（暗室四幅完整保留 + 上下过渡带是设计系统明文规则）。
- P3 契约收敛：0.58/0.6→0.62rem（SectionHeading 移动展签、长卷进度刻度）；0.78→0.72rem（长卷题跋、笺录 more、PageIntro meta）；0.75→0.72rem（器作 meta、光影年份）；0.875→0.72rem（光影图注）；Hero statement 移除 `backdrop-filter: blur(8px)`（全站玻璃拟态回归仅页眉一处）。Hero CTA 0.82rem 保留——Jordan 视角 CTA 视觉重量本已偏弱，不再缩小。
- P3 长卷跳过：卷尾「山水」印章由 span 改为 `<a href="#home-journal">`（章肆 section 补 id），`focus-within` 强制卷尾在时间线透明态下可见，Lenis 开启 `anchors: true` 接管锚点平滑滚动；实测 focus 后 opacity 立即为 1、点击后 #home-journal 顶距 0px 到位；无 JS / reduced-motion 下退化为原生锚点。

### 验证证据

- 静态：目标文件 Prettier 通过、全仓 `format:check` 全绿；`pnpm check` 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功。
- 浏览器（playwright，1440×1000 + 390×844）：22+ 项断言——P1 双向 resize 复现场景通过（修复前必失败组全部恢复）；对比度 4.7791:1；console 全程 0/0；双视口无横向溢出；移动端滚到底 reveal 隐藏 0/41；章高三轮收敛数据如上。
- 边界：`.impeccable/design.json` 未刷新（sidecar 仍 stale，bronze 与字号档变化待 `$impeccable document` 一并同步）；浏览器证据为 Chromium 仿真。

# 上一任务：分支提交与格式基线清零

目标：将「紧卷成册」布局重构的 36 文件工作区改动在独立分支提交；随后以 `.gitattributes` 统一仓库 LF 行尾，清零 `format:check` 的 32 文件历史基线。

- [x] 建立 `tight-volumes` 分支并提交「紧卷成册」全部改动（`6cd93a9`）
- [x] 新增 `.gitattributes`（`* text=auto eol=lf` + ico/webp binary）并 renormalize
- [x] 全仓 `pnpm format` 重写工作区行尾，`format:check` 首次全绿
- [x] 格式基线提交直接落在 `main`（`9e60c2d`，经用户纠正重排）并验证 check / build 全绿
- [x] 记录结果审查

## 结果审查

- 行尾根因：`core.autocrlf=true` 使 Windows checkout 转 CRLF，而 Prettier 3 默认 `endOfLine: lf`；32 个从未被 prettier 触碰的文件持续报红。`git diff --ignore-cr-at-eol` 证实差异仅为行尾，无任何内容差异。
- renormalize 结果：除新增 `.gitattributes` 外零变化，证明仓库入库历史已是 LF；工作区由 `pnpm format` 重写为 LF 后，幻影 M 在 `git add` 后全部归位，格式基线提交实际仅含 `.gitattributes` 6 行。
- 验证：`pnpm format:check` 在 `main` 与分支均全绿（All matched files use Prettier code style）；`pnpm check` 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功含 Pagefind 索引；两侧工作区均干净。
- 归宿重排：按用户纠正，基线类提交不留在特性分支——`chore` 经 cherry-pick 落于 `main`（`9e60c2d`），再以 `rebase --onto` 将任务记录重放回仅含 `feat` 的分支；分支上已无 `.gitattributes` 变更，后续合并不冲突。
- 边界：「紧卷成册」与任务记录在 `tight-volumes` 分支（`6cd93a9`、`05822fd`），格式基线在 `main`（`9e60c2d`）；`main` 本就领先 `origin/main` 两个提交（`fe860d4`、`d6461fc` 未推送），本轮全部未推送。

# 上一任务：全站「紧卷成册」布局重构

目标：修复本应叠放的网格项被自动排入下一行的结构错误，以“首屏见内容、普通章半屏编辑流、仅长卷多屏”为密度原则，重排卷首、首页章节、详情页与全局卷尾。

- [x] 修复 PageIntro、首页近况与器作详情的网格自动换行根因
- [x] 将四类内页卷首收至桌面 45–55svh，并保持移动端内容完整
- [x] 将 Hero 收至一屏，重排首页近况、器作、笺录与光影为紧凑编辑流
- [x] 收紧详情页、列表页、404、内容段落间距与全局 Footer
- [x] 同步 `DESIGN.md` 的卷首高度、章节密度和巨字不撑高规则
- [x] 完成静态验证、联合浏览器巡检、单次 layout detector 与结果审查

## 计划确认

- 结构根因：PageIntro reading / personal、首页近况和器作详情存在列区重叠却未显式指定同一 `grid-row`，浏览器将文案自动排入下一行；先修网格关系，再收紧间距。
- 桌面目标：Hero 不超过一屏；内页卷首约 45–55svh，compact 约 35–42svh；首页普通章约 55–75svh；Footer 约 360–420px；桌面长卷仍为唯一 260svh pinned 章节。
- 移动目标：器作与光影采用“主图 + 缩略组”，所有内容仍可进入；装饰巨字只裁切在纸层内，不参与父容器高度计算。
- 内容边界：正文保持 16px 与约 42rem 阅读宽度；不改文案、URL、内容模型、公开组件接口、字体、颜色或依赖。
- 动效边界：Motion、GSAP 与 CSS 的既有职责保持不变；低动态、无 JS 与异常时内容完整可见。
- Git 边界：保护当前工作区全部已有改动，不提交、不推送；不刷新 `.impeccable/design.json`。

## 结果审查

### 结构与密度

- 为 PageIntro reading / personal、首页近况和器作详情的同屏元素显式指定同一网格行，修复列区重叠后被 Grid 自动排入下一行的根因；普通 reveal 初态改为纵向位移，避免横向动画扩大页面滚动宽度。
- 四类 PageIntro 重构为横向刊头、横向装裱、接触印样和短手札。2560×1200 下笺录卷首由 1172px 收至 624px，此间由 1336px 收至 624px；移动端代表卷首为 413–571px，后续内容均能在首屏露出。
- 首页 Hero 由 1536px 收至 1120px；近况由 1935px 收至 834px、器作由 2397px 收至 883px、笺录由 1227px 收至 835px、光影由 2443px 收至 942px。长卷继续保持唯一 260svh pinned 章节。
- 移动端器作由 1689px 收至 927px、光影由 1338px 收至 995px，均采用主图加缩略组并保留全部内容；首页总高度在 2560×1200 为 8803px、390×844 为 6618px。
- 器作详情 Hero 由 1614px 收至 734px，并将轮播控制区让出左侧叠放展签，修复按钮可见但被纸页截获的问题；Footer 由约 600px 收至 394px（移动端 418px）。

### 验证证据

- 静态：全部变更目标 Prettier 检查通过，`git diff --check` 通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引。
- 格式基线：全仓 `pnpm format:check` 仍只命中 32 个既有、未触及文件，本轮变更目标全部通过，未批量改写无关文件。
- 联合巡检覆盖 2560×1200、1440×1000、768×1024、390×844，以及首页、笺录列表 / 正文 / 归档 / 标签 / 分类、器作列表 / 详情、光影 / 灯箱、此间、留墨与 404；全部代表路由隐藏内容数为 0、页面级横向溢出为 false、正文为 16px、控制台错误为 0。
- 交互：主题往返后没有过渡类残留；器作轮播可由 01 / 02 切换至 02 / 02；灯箱可打开、Escape 关闭并归还焦点；连续输入“墨”与“墨痕”后检索框即时保留最终值。
- 视觉证据：`layout-tight-hero-wide.png`、`layout-tight-current-wide.png`、`layout-tight-projects-wide.png`、`layout-tight-gallery-wide.png`、`layout-tight-journal-wide.png` 及对应移动截图保存在本次 Codex visualizations 目录。
- Detector：全部 UI 完成后仅运行一次 `layout` scope，JSON 结果为 `[]`，没有发现布局反模式。

### 已知边界

- 浏览器证据来自 Chromium 视口仿真，不替代真实 iOS / Android 硬件测试；光影桌面章因完整保留四幅作品，在 2560×1200 下为约 78.5svh，但已从两屏以上收至单屏编辑场面。
- `.impeccable/design.json` 继续按任务边界保持 stale；本轮未启动 live、未新增依赖、未提交、未推送，验证浏览器与生产预览在收尾后停止。

# 上一任务：按真实宽屏观感二次收敛字号

目标：以用户提供的 2560×1440 浏览器截图为视觉基准，修正上一轮“计算值达标但实际仍过大”的判断偏差；进一步压低 Hero、章节题名和首页事实文案，同时保留正文、书卷结构与现有动效。

- [x] 下调 Hero 主 / 副字、页面题名、章节题名、内容题名与装饰字角色
- [x] 调整首页近况文案行宽，避免字号缩小后产生碎裂换行
- [x] 同步 `DESIGN.md` 的真实字号上限与宽屏验收规则
- [x] 执行目标格式、类型、构建与 `git diff --check`
- [x] 覆盖 2560×1200、1440×1000、390×844 的生产预览联合巡检
- [x] 完成本轮单次类型 detector，并记录结果审查与已知边界

## 计划确认

- 视觉判断：截图中的 Hero“墨”、chapter“此间近况”和正文事实句仍共同争抢视觉主位；本轮不再以“低于旧值”作为完成标准，而以同屏层级和用户实际窗口观感为准。
- 字号目标：Hero 主字最高 288px、副字最高 128px；页面真实题名最高 80px；chapter 最高 64px；首页 section / 事实题名最高 44px；移动端真实题名控制在约 32–43px。
- 角色边界：保留马善政题字、Noto 正文、三档小字、16px 正文与 42rem 阅读宽度；只调展示字号角色和必要行宽，不改内容、组件接口或动效职责。
- 验证边界：将用户截图对应的超宽窗口纳入首要验收，再联合检查普通桌面与移动端；集中修复后最多确认一次。
- Git 边界：本轮不提交、不推送，不刷新 `.impeccable/design.json`。

## 结果审查

### 字号收敛

- 将 Hero 主字由 368px 降至 288px、副字由约 179px 降至 128px；首页 chapter 题名由 86.4px 降至最高 64px，近况事实句由 72px 降至 44px。
- 页面真实题名桌面统一不超过 80px；装饰字仍承担纸层构图，但与真实标题分开设限。移动端首页 chapter 为 32px，内页题名约 40px，404 为 44px。
- 近况事实句最大行宽由 10em 调至 14em，使缩小后的 44px 文案保持完整短行；正文继续为 16px、约 42rem 阅读宽度。

### 验证证据

- 静态：目标文件 Prettier 检查通过，`git diff --check` 通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引。
- 宽屏：首页在 2560×1200 下实测 Hero 288 / 128px、chapter 64px、事实句 44px；在 1440×1000 下为 288 / 128px、chapter 61.2px、事实句 44px。笺录、器作、光影、此间与 404 的桌面真实题名均不超过 80px。
- 移动：首页在 390×844 下 Hero 128 / 64px、chapter 32px、事实句 32px；代表内页真实题名为 40px，404 为 44px。
- 联合巡检覆盖首页、笺录、器作、光影、此间和 404；各视口隐藏内容数为 0、页面级横向溢出为 false、控制台 warning / error 为 0。
- 视觉证据：`type-wide-hero.png`、`type-wide-current.png`、`type-quiet-mobile.png` 保存在本次 Codex visualizations 目录。
- Detector：全部 UI 完成后仅运行一次字号检测；返回 8 条 advisory、无 warning / error。命中项均为既有正文或小字常量与设计文档字号表的机械匹配差异，没有发现本轮展示字号回退或内容显隐问题。

### 已知边界

- 浏览器证据来自 Chromium 视口仿真，不替代真实移动设备测试；本轮以用户提供的 2560×1440 实际浏览器截图作为首要宽屏视觉基准。
- `.impeccable/design.json` 仍按任务边界保持 stale，可在后续独立 `$impeccable document` 任务中刷新。
- 本轮未启动 live、未新增依赖、未提交、未推送；生产预览与浏览器验证会话在收尾后停止。

# 上一任务：全站字体收敛与内容显隐修复

目标：修复普通揭示元素进入视口后仍保持透明的问题，并按“明显克制”档统一收敛装饰巨字与真实标题；保留现有叙事动效、正文尺度、内容与接口。

- [x] 降低揭示初态选择器权重，确保 `is-revealed` 终态与媒体遮罩可靠生效
- [x] 建立装饰字、页面标题与章节标题的统一展示字号角色
- [x] 将 Hero、PageIntro、SectionHeading 与各栏目入口收敛到目标尺度
- [x] 同步 `DESIGN.md` 的字号层级与可见性降级约束
- [x] 执行格式、类型、构建与生产预览三视口联合巡检
- [x] 仅运行一次 Impeccable detector，并记录结果审查与已知边界

## 计划确认

- 根因边界：IntersectionObserver 已正确添加 `is-revealed`；内容持续透明来自初态选择器权重高于终态选择器，因此只修正层叠契约，不改用其他动画库。
- 字号边界：装饰巨字缩小约 35–40%，真实标题缩小约 45–55%；正文维持 1rem、约 42rem 阅读宽度，小字仍使用 0.62 / 0.68 / 0.72rem 三档。
- 动效边界：Motion 继续负责 React 交互，GSAP 继续负责 Hero、桌面长卷、暗室与页面接棒，普通揭示继续使用 CSS + IntersectionObserver。
- 内容边界：不改文案、URL、内容模型、公开组件接口、颜色、字体或依赖；只在字号缩小造成空洞时同步收紧局部留白。
- 降级边界：无 JS、`prefers-reduced-motion`、不支持 IntersectionObserver 或模块异常时，内容必须直接呈现完整终态。
- 验证边界：联合巡检桌面 / 平板 / 移动端，集中修复后最多复核一次；全部 UI 完成后 detector 仅运行一次。
- Git 边界：本轮不提交、不推送；`.impeccable/design.json` 的 stale 状态不在本轮顺带修复。

## 结果审查

### 修复与设计收敛

- 显隐根因：IntersectionObserver 原本已正确添加 `is-revealed`，但 `html.js.reveal-ready …` 初态选择器权重更高。现以 `:where(html.js.reveal-ready)` 将门控权重归零，标题、列表子项、墨线、媒体遮罩和 PageIntro 终态均能可靠覆盖；普通揭示继续使用 CSS + IntersectionObserver，没有移除 Motion 或 GSAP。
- 字号系统：全局新增 Hero 主 / 副字、页面装饰字、页面题名、章节装饰字、chapter / section / card 题名共九个内部展示角色。Hero 主字桌面 368px、移动 179.4px；页面真实标题桌面最高 96px、移动最高 54.6px；首页 chapter 题名为 86.4px / 39px；正文保持 16px 与约 42rem 阅读宽度。
- 版式节奏：PageIntro 普通 / 展陈场景同步收紧最小高度与留白，暗室仍保留视口级停顿；文章卷首由 92svh 收至 72svh。联合巡检发现移动文章页装饰“录”字造成 31px 横向溢出，已在卷首建立 `overflow: clip` 装饰裁切边界，确认 `scrollWidth 390 === clientWidth 390`。
- 设计文档：`DESIGN.md` 已记录装饰字与真实标题的双轨规则、各展示字号角色和 `:where()` 低权重 reveal 契约；文案、URL、内容模型、公开组件接口、字体、颜色与依赖均未改变。

### 验证证据

- 静态：本轮目标文件定向 Prettier 通过；`git diff --check` 通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引。
- 格式基线：全仓 `pnpm format:check` 仍只命中 32 个既有、未触及文件，本轮目标文件全部通过，未批量改写无关基线。
- 联合巡检：生产预览覆盖首页、笺录列表 / 正文、器作列表 / 详情、光影 / 灯箱、此间、留墨与 404；1440×1000 和 390×844 全覆盖，首页 / 器作详情 / 此间另覆盖 768×1024。全部视口 reveal 隐藏数为 0、媒体遮罩残留数为 0，最终无页面级横向溢出，控制台 warning / error 为 0。
- 交互与降级：器作轮播控制已水合且可点击；灯箱可打开、Escape 关闭并归还焦点；主题 dark → light 后无过渡类残留；reduced-motion 与无 JS 的隐藏元素数均为 0，无 JS 移动首页无溢出且正文仍为 16px。
- 视觉证据：`type-reveal-home-desktop.png`、`type-reveal-journal-mobile.png`、`type-reveal-article-mobile.png` 保存在本次 Codex visualizations 目录。
- Detector：全部 UI 完成后仅运行一次。两条 warning 为既有且已文档化的 prose h2 3px 墨线题签与 `ease-seal` 印章回弹；其余 advisory 来自本地设计侧车尚未刷新及既有字号 / 材料字面量，未发现本轮新增的内容裁切或可见性机械缺陷。

### 已知边界

- 浏览器证据来自 Chromium 桌面 / 平板 / 移动仿真，不替代真实 iOS / Android 硬件测试。
- `.impeccable/design.json` 继续保持 stale，本轮遵循边界不顺带修复；可由后续独立 `$impeccable document` 任务刷新。
- 本轮未启动 live、未新增依赖、未提交、未推送；验证会话与生产预览在收尾后停止。

# 上一任务：全站「夺卷入画」大胆化重构

目标：把现有“标题 + 网格 + 小角度错位”的章节模板重构成可滚动展开的数字手卷；以巨幅汉字、真实图像、纸层接棒和少数夺屏场面建立鲜明观看机制，同时保持正文与表单安静可读。

- [x] 建立横向拉卷页面转场、卷尺式页眉章标与 chapter / quiet 标题模式
- [x] 重写 Hero 为巨字入画、纸层揭卷与向下一章接棒的单一主秀
- [x] 让首页近况、器作、长卷、笺录、光影、年谱各自形成不同场面
- [x] 为笺录、器作、光影、此间、留墨与 404 建立极端但可读的独立卷首
- [x] 完成桌面动效、触屏静态构图、低动态与无 JS 完整终态
- [x] 同步 `DESIGN.md` 与本地 Impeccable 设计侧车
- [x] 执行格式、类型、构建、生产预览与三视口联合浏览器巡检
- [x] 记录结果审查、截图证据、性能结果与已知边界

## 计划确认

- 视觉方向：采用用户确认的“夺卷入画 + 全站入口极端”；大胆必须来自观看机制、巨字裁切、纸层空间和媒体接棒，不以增加零碎 hover 或粒子数量代替结构变化。
- 内容边界：保留事实文案、首页章节顺序、URL、内容集合与配置 schema；不虚构身份、经历、社会证明或新作品。
- 材料边界：只使用现有汉字字体、宣纸、墨色、朱砂与真实图片资产；不新增颜色、字体、远程素材、WebGL 或依赖。
- 动效边界：Hero、桌面长卷、暗室和页面接棒承担低频叙事；高频交互继续使用 150 / 250ms 可中断反馈，章节揭卷 550–700ms，页面拉卷约 400ms。
- 降级边界：触屏不执行位移型 hover，移动端取消 pinned 与大范围视差；`prefers-reduced-motion`、无 JS 与动画异常时直接显示完整终态。
- 验证边界：全部 UI 完成后联合巡检桌面 / 平板 / 移动端，集中修复后最多复核一次；Impeccable detector 仅运行一次。
- Git 边界：本轮不提交、不推送。

## 结果审查

### 设计与实现

- 卷轴骨架：页面切换改为只作用于正文的横向拉卷，刊头与卷尾保持稳定；Header 变成读取 `data-home-chapter` 的卷尺导航，滚动时显示章号 / 章名，朱砂圆目沿墨线移动；`SectionHeading` 落成 chapter / quiet 两档。
- 夺卷入画：Hero 推倒左右网格，以完整巨“墨”承载山水、朱砂“笺”从侧纸压入，纸层、图像、题字与钤印组成单一时间线；首页近况、器作、长卷、笺录、暗室与年谱分别采用手记压页、跨视口展墙、唯一 pinned 长卷、巨“录”书脊、主片接触印样与细卷尾。
- 全站入口：`PageIntro` 以 `glyph` / `artTreatment` 形成 reading、exhibition、darkroom、personal 四种空间；笺录 / 归档 / 标签 / 分类使用“录／年／签／类”，器作 / 光影 / 此间 / 留墨使用“器／影／间／留”，404 使用断裂空卷与巨“无”。文章正文仍保持约 42rem 阅读宽度。
- 动效契约：普通题名、墨线、展签与媒体揭示改为 CSS + IntersectionObserver，GSAP 只留给 Hero、桌面长卷和有限视差；普通隐藏由 `html.js.reveal-ready` 门控，初始化异常 2.2s 自动解除。灯箱使用原图与所点缩略图的原位 View Transition 接棒，并保留 250 / 400ms 导航与手势节拍。
- 文档同步：`DESIGN.md` 与本地 `.impeccable/design.json` 已记录“夺卷入画”、横向拉卷、卷尺页眉、四类卷首、chapter / quiet 与内部动效契约；URL、内容集合、frontmatter、配置 schema、依赖和事实文案均未改变。

### 验证证据

- 静态：变更目标定向 Prettier 全部通过；`git diff --check` 通过；`pnpm check` 为 50 files、0 errors / 0 warnings / 0 hints；`pnpm build` 成功生成 24 页、99 个优化图像与 3 页 Pagefind 索引。
- 格式基线：全仓 `pnpm format:check` 仍只命中 32 个既有、未触及文件；本轮修改文件不在警告清单，未批量改写无关基线。
- 联合巡检：生产预览覆盖首页六章、笺录入口、器作入口 / 详情、光影 / 灯箱、此间与 404，视口为 1440×1000、768×1024、390×844。最终 Hero 巨字桌面边界为 272–813px，桌面 / 移动 transform 均归零且无页面级横向溢出；1024px 器作详情 `scrollWidth === clientWidth`。
- 交互与降级：主题快速往返后过渡类与定位变量均清空；灯箱可打开、Escape 关闭并归还焦点，共享图像名称与 `is-gallery-transitioning` 均零残留；reduced-motion 与无 JS 的隐藏元素数为 0；控制台 warning / error 为 0。
- 视觉证据：最终截图保存在本次 Codex visualizations 目录，核心文件为 `bold-final-hero-desktop.png`、`bold-final-hero-mobile.png`；联合巡检另含 `bold-home-projects-desktop.png`、`bold-home-darkroom-desktop.png`、`bold-projects-desktop.png`、`bold-gallery-desktop.png`、`bold-about-tablet.png`、`bold-journal-mobile.png` 与 `bold-404-mobile.png`。
- Detector：按 Impeccable 要求只运行一次。可见 warning 对应设计系统已明确允许的印章 `ease-seal` 回弹和 prose h2 3px 墨线题签；字号 advisory 主要来自本轮有意加入的裁切巨字 / 流体端点，已在 DESIGN 与侧车中建立语义，不据此退回保守尺度。

### 性能与已知边界

- Hero 的可访问 fallback 与字形填图复用同一原图 URL，避免再生成一份最高规格位图；PageIntro 字形背景上限收敛到 720px，移动端停用第二份字形位图；构建优化图像由巡检前的 102 个降至 99 个。
- Header 滚动帧只读取缓存的章节坐标并写 transform；章节测量只在初始化、resize、load、字体就绪与 ResizeObserver 触发时更新，避免每帧强制布局。
- 浏览器证据来自 Chromium 桌面 / 平板 / 移动仿真，不替代真实 iOS / Android 硬件；灯箱共享图像在不支持 View Transition 或低动态环境中直接切换，功能保持完整。
- `.impeccable/design.json` 继续作为本地忽略侧车；本轮未启动 live、未新增依赖、未提交、未推送，验证浏览器与预览服务均已停止。

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
