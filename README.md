# Mojian

融合东方美学、个人内容与现代网页体验的数字空间。

## 当前技术基线

- Astro 7
- React 19（按需使用 Island）
- TypeScript（严格模式）
- Tailwind CSS 4 + 原生 CSS
- pnpm

动画、内容、搜索和测试能力按开发阶段逐项引入，不在初始化阶段批量安装。

## 常用命令

| 命令                | 说明                  |
| ------------------- | --------------------- |
| `pnpm dev`          | 启动本地开发服务器    |
| `pnpm check`        | 执行 Astro 与类型检查 |
| `pnpm build`        | 构建生产版本          |
| `pnpm format`       | 格式化项目文件        |
| `pnpm format:check` | 检查项目文件格式      |
| `pnpm preview`      | 本地预览生产构建      |

## 当前结构

```text
src/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

项目定位、技术选型与开发阶段参见 [`docs/mojian_plan.md`](docs/mojian_plan.md)。
