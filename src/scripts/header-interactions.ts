function initMobileNav(header: HTMLElement) {
  const mobileNav = header.querySelector<HTMLDetailsElement>('[data-mobile-nav]');
  if (!mobileNav) return;

  const summary = mobileNav.querySelector<HTMLElement>('summary');
  const panel = mobileNav.querySelector<HTMLElement>('.mobile-nav__panel');
  const desktopViewport = window.matchMedia('(min-width: 640px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let restoreFocusOnClose = false;

  const cancelClose = () => {
    restoreFocusOnClose = false;
    mobileNav.removeAttribute('data-closing');
  };

  const finishClose = () => {
    const restoreFocus = restoreFocusOnClose;
    restoreFocusOnClose = false;
    mobileNav.removeAttribute('data-closing');
    mobileNav.open = false;
    if (restoreFocus) summary?.focus();
  };

  const closeMenu = (restoreFocus = false, instant = reducedMotion.matches) => {
    if (!mobileNav.open) return;
    if (instant || !panel) {
      restoreFocusOnClose = restoreFocus;
      finishClose();
      return;
    }
    if (mobileNav.hasAttribute('data-closing')) return;

    restoreFocusOnClose = restoreFocus;
    // 同帧重新展开再关闭时，先取消旧动画，确保 CSS 关闭动画拥有新的时间线。
    panel.getAnimations().forEach((animation) => animation.cancel());
    mobileNav.setAttribute('data-closing', '');
  };

  summary?.addEventListener('click', (event) => {
    if (!mobileNav.open) return;
    event.preventDefault();
    if (mobileNav.hasAttribute('data-closing')) {
      // 收卷途中再次点击视为撤销关闭，避免快速操作留下半透明面板。
      cancelClose();
      return;
    }
    closeMenu();
  });

  const finishAnimatedClose = (event: AnimationEvent) => {
    if (
      event.target === panel &&
      event.animationName === 'mobile-nav-close' &&
      mobileNav.hasAttribute('data-closing')
    ) {
      finishClose();
    }
  };
  panel?.addEventListener('animationend', finishAnimatedClose);
  panel?.addEventListener('animationcancel', finishAnimatedClose);

  document.addEventListener('pointerdown', (event) => {
    if (mobileNav.open && event.target instanceof Node && !mobileNav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !mobileNav.open) return;
    event.preventDefault();
    closeMenu(true);
  });

  desktopViewport.addEventListener('change', (event) => {
    if (event.matches) closeMenu(false, true);
  });
}

function initScrolledHeader(header: HTMLElement) {
  let frame = 0;
  const sync = () => {
    frame = 0;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(sync);
  };

  window.addEventListener('scroll', requestSync, { passive: true });
  sync();
}

function initHomeChapterRail(header: HTMLElement) {
  if (!header.hasAttribute('data-home')) return;

  const track = header.querySelector<HTMLElement>('.nav-rail__track');
  const marker = header.querySelector<HTMLElement>('[data-chapter-marker]');
  const indexLabel = header.querySelector<HTMLElement>('[data-chapter-index]');
  const titleLabel = header.querySelector<HTMLElement>('[data-chapter-title]');
  const fallbackTitles: Record<string, string> = {
    卷: '卷首',
    壹: '此间近况',
    贰: '器作',
    叁: '山水长卷',
    肆: '近来所记',
    伍: '光影集',
    陆: '卷尾年谱',
  };

  // 首页章节由各 section 的 data-home-chapter 声明；标题优先复用 aria-labelledby 的真实文本。
  const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-home-chapter]')).map(
    (section) => {
      const labelledBy = section.getAttribute('aria-labelledby');
      const labelledElement = labelledBy ? document.getElementById(labelledBy) : null;
      return {
        element: section,
        index: section.dataset.homeChapter ?? '',
        title:
          section.dataset.homeChapterTitle ??
          labelledElement?.textContent?.trim() ??
          fallbackTitles[section.dataset.homeChapter ?? ''] ??
          '',
      };
    },
  );
  if (!marker || chapters.length === 0) return;

  let frame = 0;
  let layoutFrame = 0;
  let chapterAnchors: number[] = [];
  let trackWidth = 0;

  const sync = () => {
    frame = 0;
    const readingLine = window.scrollY + Math.min(window.innerHeight * 0.36, 320);
    const lastIndex = chapters.length - 1;
    let active = -1;

    for (let index = 0; index <= lastIndex; index += 1) {
      if (readingLine >= chapterAnchors[index]) active = index;
    }

    let progress = 0;
    if (active >= 0 && lastIndex > 0) {
      if (active >= lastIndex) {
        progress = 1;
      } else {
        const start = chapterAnchors[active];
        const end = chapterAnchors[active + 1];
        const localProgress = end > start ? (readingLine - start) / (end - start) : 0;
        progress = (active + Math.min(Math.max(localProgress, 0), 1)) / lastIndex;
      }
    }

    marker.style.transform = `translate3d(calc(${progress * trackWidth}px - 50%), -50%, 0)`;
    const chapter = active >= 0 ? chapters[active] : null;
    if (indexLabel) indexLabel.textContent = chapter?.index || '序';
    if (titleLabel) titleLabel.textContent = chapter?.title || '卷首';
  };

  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(sync);
  };

  // 章节坐标只在版式发生变化时测量；滚动帧只消费缓存，避免连续强制布局。
  const measureLayout = () => {
    layoutFrame = 0;
    const scrollY = window.scrollY;
    chapterAnchors = chapters.map(
      (chapter) => chapter.element.getBoundingClientRect().top + scrollY,
    );
    trackWidth = track?.getBoundingClientRect().width ?? 0;
    requestSync();
  };

  const requestMeasure = () => {
    if (layoutFrame) return;
    layoutFrame = window.requestAnimationFrame(measureLayout);
  };

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestMeasure, { passive: true });
  window.addEventListener('load', requestMeasure, { once: true });
  document.fonts?.ready.then(requestMeasure);

  if ('ResizeObserver' in window) {
    const layoutObserver = new ResizeObserver(requestMeasure);
    layoutObserver.observe(document.body);
  }

  measureLayout();
}

export function initHeaderInteractions(header: HTMLElement) {
  // 三类交互生命周期不同，保持就地控制器，避免首页逻辑泄漏到所有内页。
  initMobileNav(header);
  initScrolledHeader(header);
  initHomeChapterRail(header);
}
