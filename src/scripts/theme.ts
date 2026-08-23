/**
 * 主题解析共享：页眉印钮与 giscus 留言墙同用一份口径。
 * data-theme 显式值优先，未设置时回落系统偏好。
 */
export function resolveTheme(): 'dark' | 'light' {
  const theme = document.documentElement.dataset.theme;
  if (theme === 'dark' || theme === 'light') return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
