// 普通题名、墨线、展签与图像只由 CSS 负责过渡；脚本仅判定何时进入视口。
// 初态由 reveal-ready 门控，模块异常时 BaseLayout 的超时兜底会解除隐藏。
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = (element: HTMLElement) => {
  element.classList.add('is-revealed');

  if (element.matches('[data-page-intro]')) {
    element.querySelector<HTMLElement>('[data-page-intro-art]')?.classList.add('is-revealed');
  }
};

const afterHydration = (element: HTMLElement, action: () => void) => {
  const island = element.closest<HTMLElement>('astro-island');
  if (!island) {
    action();
    return;
  }

  const runAfterPaint = () => requestAnimationFrame(() => requestAnimationFrame(action));
  if (island.hasAttribute('ssr')) {
    // React 岛屿水合前不能写入其 SSR 标记，否则客户端首帧会出现属性不一致。
    island.addEventListener('astro:hydrate', runAfterPaint, { once: true });
  } else {
    // Astro 移除 ssr 属性后 React 仍可能在提交首帧；再等两帧再写揭示样式。
    runAfterPaint();
  }
};

const targets = Array.from(
  document.querySelectorAll<HTMLElement>(
    '[data-page-intro], [data-reveal-variant="folio"], [data-reveal-variant="folio-turn"], [data-reveal-title], [data-reveal-line], [data-reveal-group], .media-reveal',
  ),
).filter((element) => {
  if (element.matches('[data-reveal-title], [data-reveal-line]')) {
    return !element.closest('[data-page-intro], [data-reveal-variant="folio"]');
  }
  if (element.matches('.media-reveal')) return !element.closest('[data-page-intro]');
  return true;
});

document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
  afterHydration(group, () => {
    Array.from(group.children).forEach((item, index) => {
      if (item instanceof HTMLElement) item.style.setProperty('--reveal-order', String(index));
    });
  });
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  targets.forEach((target) => afterHydration(target, () => reveal(target)));
  root.classList.remove('reveal-ready');
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
  );

  targets.forEach((target) => afterHydration(target, () => observer.observe(target)));

  // 只有观察器成功建立后才取消失败兜底；reveal-ready 保留，供未入视口元素维持初态。
  window.clearTimeout(
    (window as Window & { __mojianRevealFallback?: number }).__mojianRevealFallback,
  );
}
