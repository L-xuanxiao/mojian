/**
 * 主题解析共享：页眉印钮与 giscus 留言墙同用一份口径。
 * data-theme 显式值优先，未设置时回落系统偏好。
 */
export function resolveTheme(): 'dark' | 'light' {
  const theme = document.documentElement.dataset.theme;
  if (theme === 'dark' || theme === 'light') return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const readStoredTheme = (): 'dark' | 'light' | null => {
  try {
    const theme = localStorage.getItem('theme');
    return theme === 'dark' || theme === 'light' ? theme : null;
  } catch {
    return null;
  }
};

const writeStoredTheme = (theme: 'dark' | 'light') => {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // 隐私模式等环境可能禁用存储；主题本身仍应即时生效。
  }
};

export function initThemeToggle(button: HTMLElement) {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let transitionId = 0;
  let requestedTheme = resolveTheme();

  const sync = () => button.setAttribute('aria-pressed', String(resolveTheme() === 'dark'));

  const applyTheme = (next: 'dark' | 'light') => {
    root.dataset.theme = next;
    writeStoredTheme(next);
    sync();
  };

  const clearTransition = (id: number) => {
    if (id !== transitionId) return;
    root.classList.remove('is-theme-transitioning');
    root.style.removeProperty('--theme-x');
    root.style.removeProperty('--theme-y');
    root.style.removeProperty('--theme-radius');
  };

  const requestTheme = (instant: boolean) => {
    const next = requestedTheme === 'dark' ? 'light' : 'dark';
    requestedTheme = next;
    const id = ++transitionId;
    const startViewTransition = document.startViewTransition?.bind(document);

    if (reducedMotion.matches || instant || !startViewTransition) {
      clearTransition(id);
      applyTheme(next);
      return;
    }

    const bounds = button.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius =
      Math.ceil(
        Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)),
      ) + 1;

    root.style.setProperty('--theme-x', `${x}px`);
    root.style.setProperty('--theme-y', `${y}px`);
    root.style.setProperty('--theme-radius', `${radius}px`);
    root.classList.add('is-theme-transitioning');

    try {
      const transition = startViewTransition(() => {
        if (id === transitionId) applyTheme(next);
      });
      transition.finished.then(
        () => clearTransition(id),
        () => {
          // 浏览器中止或更新回调异常时，确保最终主题仍与最后一次点击一致。
          if (id === transitionId) applyTheme(next);
          clearTransition(id);
        },
      );
    } catch {
      clearTransition(id);
      applyTheme(next);
    }
  };

  button.addEventListener('click', (event) => requestTheme(event.detail === 0));

  root.addEventListener('click', (event) => {
    if (!root.classList.contains('is-theme-transitioning') || event.target !== root) return;
    const bounds = button.getBoundingClientRect();
    const hitButton =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    // Chromium 的换纸快照会把连点重定向到 html；仅在印钮原坐标补接该次指针输入。
    if (hitButton) requestTheme(false);
  });

  media.addEventListener('change', () => {
    if (!readStoredTheme()) {
      requestedTheme = resolveTheme();
      sync();
    }
  });

  sync();
}
