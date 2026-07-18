# 导航与首屏 Design QA

- Source visual truth: `C:\Users\30885\AppData\Local\Temp\codex-clipboard-fa1f2298-907c-4b5b-9762-5a5eb549d66d.png`
- Implementation screenshot: `C:\Users\30885\AppData\Local\Temp\mojian-wide-final-full.png`
- Mobile screenshot: `C:\Users\30885\AppData\Local\Temp\mojian-mobile-final-390x844.png`
- Viewport: desktop `2048 × 900`（顶部对照区域 `2048 × 552`）；mobile `390 × 844`
- State: 首页顶部、浅色主题；移动端菜单关闭与展开状态均验证

## Full-view comparison evidence

- Firefly 的宽幅悬浮圆角导航结构已复现；最终导航边界约为 `x=92 / width=1848 / height=70`，与参考图约 `x=93 / width=1867` 接近。
- 首屏改为紧凑横幅，桌面高度约 `612px`；指定水墨山图完整覆盖横幅，保留墨笺原有纸色、宋体层级与朱砂强调。
- 内容与主题色刻意不复制 Firefly，仅采用导航比例、图标信息层级和横幅组织方式。

## Focused region comparison evidence

- 导航：品牌位于左侧、图标文字入口位于右侧；圆角、边距、投影和密度与参考导航同类。
- 首屏：标题仍为视觉中心，山水图使用真实项目资产，不存在占位图、拉伸或横向溢出。
- 图标：使用 Material Symbols，与 Firefly 仓库采用的 Iconify 图标体系一致；图标尺寸、线性风格统一。

## Required fidelity surfaces

- Fonts and typography: 保留原有中文衬线字体栈；导航名使用相同衬线体系，移动端标题换行自然。
- Spacing and layout rhythm: 桌面导航左右留白对齐参考；手机导航宽度 `354.7px`，页面 `scrollWidth=375px`，无横向溢出。
- Colors and visual tokens: 保留纸白、墨黑、苔绿、朱砂变量；激活态对比清楚。
- Image quality and asset fidelity: 使用 `ink-mountains.png` 经 Astro 输出响应式 WebP，宽屏与手机裁切均清晰。
- Copy and content: 导航改为“墨庐、笺录、卷藏、此间”，并保留明确的无障碍标签。

## Findings

- 无 P0/P1/P2 问题。
- [P3] 宽屏导航入口少于 Firefly，留白更大；这是当前仅有四个有效入口的预期结果，不应为填满导航而创建空页面。

## Comparison history

1. 初次宽屏对照发现导航最大宽度仅 `1500px`，相较参考图明显偏窄（P2）。
2. 将宽屏宽度调整为 `min(calc(100% - 9vw), 1860px)`；复测得到 `x=92 / width=1848`，问题消除。
3. 修正后重新验证桌面和 `390 × 844` 手机布局，未发现新的 P0/P1/P2 问题。

## Primary interactions and console

- 移动菜单可展开；点击“笺录”后菜单关闭并跳转到 `#articles`。
- 桌面图标导航、手机折叠导航按断点正确切换。
- 浏览器控制台：0 error，0 warning。

## Implementation checklist

- [x] Firefly 式悬浮导航
- [x] Material Symbols 图标
- [x] 古韵导航命名
- [x] 指定水墨山图横幅
- [x] 桌面与手机响应式验证

final result: passed
