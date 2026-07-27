# 首页内容三层划分：homeContent / 此刻集合 / 数据派生

首页重构时，把原本写死在组件里的内容按变更频率与性质分为三层：准静态文案归 `src/config/homeContent.ts`（单一出处，改文案不碰组件）；写作性质的高频内容（「案头近况」的此刻状态与一页小记）归 `src/content/now/` 内容集合（frontmatter 存日期与状态条目，正文存小记，更新像写文章而非改代码）；站点统计（文章数、分类数、起始年份）一律由文章数据派生，不手工维护。

- **Considered Options**：全部并入 `siteConfig`（配置膨胀，且把「写作」混进「配置」）；全部建内容集合（准静态文案无 schema 收益，过度设计）；保持组件内写死（改文案需翻组件，正是本次重构要解决的痛点）。
- **Consequences**：`AGENTS.md` 目录约定同步更新；名片文案（署名、一句话、社链）改动只动 `homeContent.ts`；`now.md` 的 frontmatter 由 `content.config.ts` 的 schema 校验，日期不再硬编码。
