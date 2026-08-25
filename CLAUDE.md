# AGENTS.md

mojian —— 基于 Astro 7 + React Islands 的个人静态网站（现代东方水墨书卷风格），部署于 GitHub Pages 子路径 `/mojian`。

## 关键事实

- 包管理器：**pnpm**（Node >= 22.12）
- 命令：`pnpm dev` 开发 / `pnpm check` 类型检查 / `pnpm test` 浏览器回归 / `pnpm build` 构建（含 pagefind 索引）/ `pnpm format`、`pnpm format:check` 格式化
- 部署门禁：GitHub Pages 的 `build` 必须等待 `quality` 完成 format、check 与 Playwright E2E；不要绕过该依赖。
- 部署 base 为 `/mojian`：站内手写的根路径链接必须经 `src/site.config.ts` 的 `withBase()` 拼接；Astro 资产管线（Image/getImage/字体）已自动携带 base，勿重复拼接
- 沟通：回复以"喵内が"开头，使用中文，简洁说明结果、验证和必要风险
- 优先级：用户当前要求 > 项目实际代码、配置与约定 > 本文件 > 规划文档（`docs/mojian_plan.md` 是路线图，不代表能力已实现）
- 文档同步：阶段完成或设计契约、动效体系、工作流约定发生变化时，及时更新本文件、`docs/agents/` 附件、`DESIGN.md` 与 `docs/progress.md`，不积压到下次会话

## 详细规则（按需查阅）

- [设计与体验](docs/agents/design.md) — 水墨书卷视觉基调、主题与动效约束
- [代码组织与排错](docs/agents/coding.md) — 技术边界、组件目录约定、修改原则
- [依赖管理](docs/agents/dependencies.md) — 新增依赖的判定标准
- [验证流程](docs/agents/verification.md) — check / build / format 与浏览器验证要求
- [Git 工作流](docs/agents/git.md) — 提交授权、提交信息规范、禁止操作

当前开发进度见 [docs/progress.md](docs/progress.md)。

## Agent skills

### Issue tracker

Issues 跟踪于 GitHub Issues（`gh` CLI）。见 `docs/agents/issue-tracker.md`。

### Triage labels

使用五个规范 triage 角色的默认标签名（`needs-triage` / `needs-info` / `ready-for-agent` / `ready-for-human` / `wontfix`）。见 `docs/agents/triage-labels.md`。

### Domain docs

单上下文：根目录 `CONTEXT.md` + `docs/adr/`（尚未创建，待后续补充）。见 `docs/agents/domain.md`。
