type Direction = 'next' | 'prev';

type SketchbookPage = {
  chapter: string;
  kicker: string;
  title: string;
  summary: string;
  meta: string;
  href: string;
  seal: string;
  image: string;
  alt: string;
};

type TurnState = {
  direction: Direction;
  from: number;
  to: number;
  progress: number;
};

type TurnAnimation =
  | {
      kind: 'spring';
      target: 0 | 1;
      velocity: number;
      stiffness: number;
      damping: number;
      done: () => void;
    }
  | {
      kind: 'tween';
      from: number;
      target: 1;
      duration: number;
      elapsed: number;
      done: () => void;
    };

type DragState = {
  pointerId: number;
  direction: Direction;
  startX: number;
  width: number;
  distance: number;
  previousProgress: number;
  previousTime: number;
  velocity: number;
};

// 来源：MengTo/sketchbook index.html @ c1e4778。只机械适配作用域和页面数据；放大镜逻辑未迁入。
const SEGMENTS = 18;
const SPAN = 0.449;
const BETA = 0.6;
const COMMIT_PROGRESS = 0.42;
const COMMIT_VELOCITY = 1.1;
const COMMIT_SPRING = { stiffness: 170, damping: 26 } as const;
const CANCEL_SPRING = { stiffness: 150, damping: 24 } as const;

// 全幅册页的纸纹从画布边缘开始；保持 1:1 映射才能让书脊在翻页前后不漂移。
const ARTWORK_SCALE = 1;
const SESSION_KEY = 'mojian:hero-intro:v1';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const makeElement = (className: string) => {
  const element = document.createElement('div');
  element.className = className;
  return element;
};

export function initHeroMotion(hero: HTMLElement) {
  const book = hero.querySelector<HTMLElement>('[data-sketchbook-book]');
  const bookWrap = hero.querySelector<HTMLElement>('[data-sketchbook-book-wrap]');
  const frame = hero.querySelector<HTMLElement>('[data-sketchbook-frame]');
  const surface = hero.querySelector<HTMLElement>('[data-sketchbook-surface]');
  const copy = hero.querySelector<HTMLElement>('[data-sketchbook-copy]');
  const prevButton = hero.querySelector<HTMLButtonElement>('button[aria-label="上一卷"]');
  const nextButton = hero.querySelector<HTMLButtonElement>('button[aria-label="下一卷"]');
  const zoomOut = hero.querySelector<HTMLButtonElement>('[data-sketchbook-zoom-out]');
  const zoomReset = hero.querySelector<HTMLButtonElement>('[data-sketchbook-zoom-reset]');
  const zoomIn = hero.querySelector<HTMLButtonElement>('[data-sketchbook-zoom-in]');
  const zoomStatus = hero.querySelector<HTMLElement>('[data-sketchbook-zoom-status]');
  const seal = hero.querySelector<HTMLAnchorElement>('[data-sketchbook-seal]');
  const sealText = hero.querySelector<HTMLElement>('[data-sketchbook-seal-text]');
  const currentChapter = hero.querySelector<HTMLElement>('[data-sketchbook-current]');
  const currentCount = hero.querySelector<HTMLElement>('[data-sketchbook-count]');
  const currentAlt = hero.querySelector<HTMLElement>('[data-sketchbook-alt]');
  const kicker = hero.querySelector<HTMLElement>('[data-sketchbook-kicker]');
  const title = hero.querySelector<HTMLElement>('[data-sketchbook-title]');
  const chapter = hero.querySelector<HTMLElement>('[data-sketchbook-chapter]');
  const summary = hero.querySelector<HTMLElement>('[data-sketchbook-summary]');
  const meta = hero.querySelector<HTMLElement>('[data-sketchbook-meta]');

  if (
    !book ||
    !bookWrap ||
    !frame ||
    !surface ||
    !copy ||
    !prevButton ||
    !nextButton ||
    !zoomOut ||
    !zoomReset ||
    !zoomIn ||
    !zoomStatus ||
    !seal ||
    !sealText ||
    !currentChapter ||
    !currentCount ||
    !currentAlt ||
    !kicker ||
    !title ||
    !chapter ||
    !summary ||
    !meta
  )
    return;

  const pages = [...hero.querySelectorAll<HTMLTemplateElement>('[data-sketchbook-page]')]
    .map((template): SketchbookPage | null => {
      const { chapter, kicker, title, summary, meta, href, seal, image, alt } = template.dataset;
      if (!chapter || !kicker || !title || !summary || !meta || !href || !seal || !image || !alt)
        return null;
      return { chapter, kicker, title, summary, meta, href, seal, image, alt };
    })
    .filter((page): page is SketchbookPage => Boolean(page));

  if (pages.length < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let current = 0;
  let overlayIndex = 0;
  let turn: TurnState | null = null;
  let drag: DragState | null = null;
  let curl: HTMLElement | null = null;
  let strips: HTMLElement[] = [];
  let turnShadows: HTMLElement[] = [];
  let lastMotionTime = 0;
  let turnAnimation: TurnAnimation | null = null;
  let turnFrame = 0;
  let introRunning = false;
  let riffleDurations: number[] = [];
  let riffleIndex = 0;
  let tapTimer = 0;

  let scale = 1;
  let targetScale = 1;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let poseFrame = 0;

  const setBackground = (
    element: HTMLElement,
    pageIndex: number,
    positionX: number,
    imageWidth: number,
  ) => {
    element.style.backgroundImage = `url("${pages[pageIndex].image}")`;
    element.style.backgroundSize = `${imageWidth}px auto`;
    element.style.backgroundPositionX = `${positionX}px`;
  };

  const getArtworkMetrics = () => {
    const width = book.clientWidth;
    const imageWidth = width * ARTWORK_SCALE;
    return { width, imageWidth, cropX: (imageWidth - width) / 2 };
  };

  const paintOverlay = (pageIndex: number, announce = false) => {
    const page = pages[pageIndex];
    overlayIndex = pageIndex;
    kicker.textContent = page.kicker;
    title.textContent = page.title;
    chapter.textContent = page.chapter;
    summary.textContent = page.summary;
    meta.textContent = page.meta;
    seal.href = page.href;
    seal.setAttribute('aria-label', `进入${page.chapter}`);
    sealText.textContent = page.seal;
    currentAlt.textContent = page.alt;
    if (announce) {
      currentChapter.textContent = page.chapter;
      currentCount.textContent = `${String(pageIndex + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    }
  };

  const setInteractionState = () => {
    const busy = Boolean(turn) || introRunning;
    // 与上游箭头一致：开场可被显式接管，普通翻页期间仍防止重复点击。
    const navigationBusy = Boolean(turn) && !introRunning;
    prevButton.disabled = navigationBusy;
    nextButton.disabled = navigationBusy;
    zoomOut.disabled = introRunning;
    zoomReset.disabled = introRunning;
    zoomIn.disabled = introRunning;
    if (busy) {
      seal.setAttribute('aria-disabled', 'true');
      seal.tabIndex = -1;
    } else {
      seal.removeAttribute('aria-disabled');
      seal.removeAttribute('tabindex');
    }
  };

  const makeHalf = (
    side: 'left' | 'right',
    pageIndex: number,
    width: number,
    imageWidth: number,
    cropX: number,
  ) => {
    const half = makeElement(`sketchbook__half sketchbook__half--${side}`);
    setBackground(half, pageIndex, -cropX - (side === 'right' ? width / 2 : 0), imageWidth);
    return half;
  };

  const makeCurl = (
    direction: Direction,
    from: number,
    to: number,
    width: number,
    imageWidth: number,
    cropX: number,
  ) => {
    strips = [];
    const root = makeElement(`sketchbook__curl sketchbook__curl--${direction}`);
    const stripWidth = (width * SPAN) / SEGMENTS;
    const gutter = width / 2;
    let host = root;

    for (let index = 0; index < SEGMENTS; index += 1) {
      const strip = makeElement('sketchbook__strip');
      // 嵌套叶片必须保持同一绝对宽度；百分比会相对父叶片逐层缩小，令曲面压扁在书脊。
      strip.style.width = `${stripWidth}px`;
      const front = makeElement('sketchbook__face sketchbook__face--front');
      const back = makeElement('sketchbook__face sketchbook__face--back');
      const frontOffset = -cropX - gutter - index * stripWidth;
      const backOffset = -cropX + (index + 1) * stripWidth - gutter;
      setBackground(front, from, direction === 'next' ? frontOffset : backOffset, imageWidth);
      setBackground(back, to, direction === 'next' ? backOffset : frontOffset, imageWidth);
      strip.append(front, back);
      host.append(strip);
      host = strip;
      strips.push(strip);
    }
    return root;
  };

  const renderStable = () => {
    const { width, imageWidth, cropX } = getArtworkMetrics();
    const spread = makeElement('sketchbook__spread');
    setBackground(spread, current, -cropX, imageWidth);
    surface.replaceChildren(spread);
    surface.style.removeProperty('--turn-lift');
    frame.style.removeProperty('--turn-lift');
    curl = null;
    strips = [];
    turnShadows = [];
    copy.style.opacity = '1';
    paintOverlay(current, true);
    setInteractionState();
    void width;
  };

  const renderTurn = () => {
    if (!turn) return;
    const { width, imageWidth, cropX } = getArtworkMetrics();
    const forward = turn.direction === 'next';
    const left = makeHalf('left', forward ? turn.from : turn.to, width, imageWidth, cropX);
    const right = makeHalf('right', forward ? turn.to : turn.from, width, imageWidth, cropX);
    curl = makeCurl(turn.direction, turn.from, turn.to, width, imageWidth, cropX);
    const gutter = makeElement('sketchbook__gutter');
    turnShadows = Array.from({ length: 3 }, (_, index) => {
      const shadow = makeElement('sketchbook__turn-shadow');
      shadow.style.filter = `blur(${0.42 + index * 0.2}rem)`;
      return shadow;
    });
    surface.replaceChildren(left, right, ...turnShadows, gutter, curl);
    setInteractionState();
  };

  const applyTurn = (progress: number) => {
    if (!turn || !curl) return;
    const activeTurn = turn;
    turn.progress = clamp(progress);
    const theta = Math.PI * turn.progress;
    const beta = BETA * Math.sin(Math.PI * turn.progress);
    const total = theta + beta;
    const delta = (2 * beta) / SEGMENTS;
    const directionSign = turn.direction === 'next' ? -1 : 1;
    curl.style.transform = `rotateY(${directionSign * ((total * 180) / Math.PI)}deg)`;

    strips.forEach((strip, index) => {
      if (index > 0)
        strip.style.transform = `rotateY(${directionSign * -((delta * 180) / Math.PI)}deg)`;
      const near = Math.abs(Math.cos(total - index * delta));
      const far = Math.abs(Math.cos(total - (index + 1) * delta));
      strip.style.setProperty('--shade-a', ((1 - near) * 0.58).toFixed(3));
      strip.style.setProperty('--shade-b', ((1 - far) * 0.58).toFixed(3));
      strip.style.setProperty('--glint', (Math.max(0, 1 - near) * 0.16).toFixed(3));
    });

    const lift = Math.sin(Math.PI * turn.progress);
    surface.style.setProperty('--turn-lift', lift.toFixed(3));
    frame.style.setProperty('--turn-lift', lift.toFixed(3));
    turnShadows.forEach((shadow, index) => {
      const offset = (activeTurn.progress - 0.5) * book.clientWidth * 0.24 + index * 5;
      shadow.style.opacity = `${lift * (0.2 - index * 0.045)}`;
      shadow.style.transform = `translateX(${directionSign * offset}px) scaleX(${directionSign})`;
    });

    const nextOverlay = turn.progress < 0.5 ? turn.from : turn.to;
    if (overlayIndex !== nextOverlay) paintOverlay(nextOverlay);
    copy.style.opacity = `${turn.progress < 0.5 ? clamp(1 - turn.progress / 0.32) : clamp((turn.progress - 0.68) / 0.32)}`;
  };

  // 对齐上游 startTurn：新翻页取得唯一动画所有权，并先结算仍在途的旧页。
  const startTurn = (direction: Direction, progress = 0) => {
    turnAnimation = null;
    if (turn) {
      current = turn.to;
      turn = null;
    }
    const step = direction === 'next' ? 1 : -1;
    turn = {
      direction,
      from: current,
      to: (current + step + pages.length) % pages.length,
      progress,
    };
    renderTurn();
    applyTurn(progress);
  };

  const finishTurn = (target: 0 | 1) => {
    if (!turn) return;
    current = target === 1 ? turn.to : turn.from;
    turn = null;
    drag = null;
    renderStable();
  };

  const tickTurn = (now: number) => {
    turnFrame = 0;
    const deltaTime = Math.min(0.032, (now - lastMotionTime) / 1000 || 0.016);
    lastMotionTime = now;
    const animation = turnAnimation;

    if (animation && turn) {
      if (animation.kind === 'tween') {
        animation.elapsed += deltaTime;
        const raw = clamp(animation.elapsed / animation.duration);
        // 保留本站已批准的开场缓动，仅迁移上游的单一调度所有权。
        const eased = raw * raw * (3 - 2 * raw);
        applyTurn(animation.from + (animation.target - animation.from) * eased);
        if (raw >= 1) {
          turnAnimation = null;
          animation.done();
        }
      } else {
        const displacement = turn.progress - animation.target;
        animation.velocity +=
          (-animation.stiffness * displacement - animation.damping * animation.velocity) *
          deltaTime;
        applyTurn(turn.progress + animation.velocity * deltaTime);
        if (
          Math.abs(turn.progress - animation.target) < 0.002 &&
          Math.abs(animation.velocity) < 0.02
        ) {
          applyTurn(animation.target);
          turnAnimation = null;
          animation.done();
        }
      }
    }

    // 完成回调可能已经排入下一帧，避免为同一动画重复调度。
    if (turnAnimation && turn && !turnFrame) turnFrame = requestAnimationFrame(tickTurn);
  };

  const kickTurn = () => {
    if (turnFrame) return;
    lastMotionTime = performance.now();
    turnFrame = requestAnimationFrame(tickTurn);
  };

  const animateTo = (target: 0 | 1, initialVelocity = 0) => {
    if (!turn) return;
    if (reducedMotion) {
      applyTurn(target);
      finishTurn(target);
      return;
    }

    const spring = target === 1 ? COMMIT_SPRING : CANCEL_SPRING;
    turnAnimation = {
      kind: 'spring',
      target,
      velocity: initialVelocity,
      stiffness: spring.stiffness,
      damping: spring.damping,
      done: () => finishTurn(target),
    };
    kickTurn();
  };

  const tweenTo = (duration: number, done: () => void) => {
    if (!turn) return;
    turnAnimation = {
      kind: 'tween',
      from: turn.progress,
      target: 1,
      duration: duration / 1000,
      elapsed: 0,
      done,
    };
    kickTurn();
  };

  const endIntro = () => {
    introRunning = false;
    delete hero.dataset.heroIntro;
    hero.classList.add('hero--intro-complete');
  };

  // 对齐上游 step：用户输入先终止开场，再结算旧页并提交新的翻页。
  const step = (direction: Direction) => {
    if (introRunning) endIntro();
    startTurn(direction);
    animateTo(1);
  };

  const requestTurn = (direction: Direction) => {
    if (tapTimer) {
      window.clearTimeout(tapTimer);
      tapTimer = 0;
    }
    step(direction);
  };

  const finishDrag = (cancel = false) => {
    if (!drag) return;
    const released = drag;
    drag = null;
    if (!turn) {
      if (!cancel && released.distance < 6) {
        if (tapTimer) window.clearTimeout(tapTimer);
        tapTimer = window.setTimeout(() => requestTurn(released.direction), 300);
      }
      return;
    }
    const commit =
      !cancel &&
      (released.distance < 6 ||
        turn.progress > COMMIT_PROGRESS ||
        released.velocity > COMMIT_VELOCITY);
    animateTo(commit ? 1 : 0, released.velocity);
  };

  book.addEventListener('pointerdown', (event) => {
    if (
      event.button !== 0 ||
      turn ||
      introRunning ||
      (event.target instanceof Element && event.target.closest('[data-sketchbook-seal]'))
    )
      return;
    const rect = book.getBoundingClientRect();
    event.preventDefault();
    book.setPointerCapture(event.pointerId);
    drag = {
      pointerId: event.pointerId,
      direction: event.clientX > rect.left + rect.width / 2 ? 'next' : 'prev',
      startX: event.clientX,
      width: rect.width,
      distance: 0,
      previousProgress: 0,
      previousTime: performance.now(),
      velocity: 0,
    };
  });

  book.addEventListener('pointermove', (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    drag.distance = Math.max(drag.distance, Math.abs(deltaX));
    if (!turn && drag.distance >= 3) startTurn(drag.direction);
    if (!turn) return;
    const raw = (drag.direction === 'next' ? -deltaX : deltaX) / (drag.width * 0.62);
    const progress = clamp(raw);
    const now = performance.now();
    drag.velocity =
      (progress - drag.previousProgress) / Math.max(0.001, (now - drag.previousTime) / 1000);
    drag.previousProgress = progress;
    drag.previousTime = now;
    applyTurn(progress);
  });

  book.addEventListener('pointerup', (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (book.hasPointerCapture(event.pointerId)) book.releasePointerCapture(event.pointerId);
    finishDrag();
  });
  book.addEventListener('pointercancel', () => finishDrag(true));

  const schedulePose = () => {
    if (poseFrame) return;
    const tick = () => {
      poseFrame = 0;
      const amount = reducedMotion ? 1 : 0.14;
      scale += (targetScale - scale) * amount;
      tiltX += (targetTiltX - tiltX) * amount;
      tiltY += (targetTiltY - tiltY) * amount;
      bookWrap.style.setProperty('--book-scale', scale.toFixed(4));
      bookWrap.style.setProperty('--book-tilt-x', `${tiltX.toFixed(3)}deg`);
      bookWrap.style.setProperty('--book-tilt-y', `${tiltY.toFixed(3)}deg`);
      if (
        Math.abs(targetScale - scale) > 0.001 ||
        Math.abs(targetTiltX - tiltX) > 0.01 ||
        Math.abs(targetTiltY - tiltY) > 0.01
      )
        poseFrame = requestAnimationFrame(tick);
    };
    poseFrame = requestAnimationFrame(tick);
  };

  const setZoom = (value: number) => {
    targetScale = Math.round(clamp(value, 0.9, 1.5) * 10) / 10;
    zoomStatus.textContent = `${Math.round(targetScale * 100)}%`;
    schedulePose();
  };

  zoomOut.addEventListener('click', () => setZoom(targetScale - 0.1));
  zoomReset.addEventListener('click', () => setZoom(1));
  zoomIn.addEventListener('click', () => setZoom(targetScale + 0.1));
  book.addEventListener('dblclick', (event) => {
    event.preventDefault();
    if (tapTimer) {
      window.clearTimeout(tapTimer);
      tapTimer = 0;
    }
    setZoom(1);
  });

  prevButton.addEventListener('click', () => requestTurn('prev'));
  nextButton.addEventListener('click', () => requestTurn('next'));
  seal.addEventListener('click', (event) => {
    if (turn || introRunning) event.preventDefault();
  });
  window.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      requestTurn('next');
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      requestTurn('prev');
    }
  });

  if (precisePointer && !reducedMotion) {
    frame.addEventListener('pointermove', (event) => {
      if (drag || turn) return;
      const rect = frame.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1) - 0.5;
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1) - 0.5;
      targetTiltX = -y * 9;
      targetTiltY = x * 14;
      schedulePose();
    });
    frame.addEventListener('pointerleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
      schedulePose();
    });
  }

  const preloadPages = () =>
    Promise.all(
      pages.map(
        (page) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = page.image;
          }),
      ),
    );

  const riffleStep = () => {
    if (!introRunning || riffleIndex >= riffleDurations.length) {
      endIntro();
      renderStable();
      return;
    }

    startTurn('next');
    tweenTo(riffleDurations[riffleIndex], () => {
      finishTurn(1);
      riffleIndex += 1;
      if (introRunning && riffleIndex < riffleDurations.length) riffleStep();
      else {
        endIntro();
        renderStable();
      }
    });
  };

  const runIntro = async () => {
    await preloadPages();
    // 上游在预载后才打开 introOn；本站提前标记以允许用户在等待期间取消。
    if (!introRunning) return;
    riffleDurations = pages.map((_, index) => {
      const bell = Math.sin(Math.PI * ((index + 0.5) / pages.length));
      return (0.26 - 0.19 * bell) * 1000;
    });
    riffleIndex = 0;
    riffleStep();
  };

  renderStable();

  let playIntro = false;
  if (!reducedMotion) {
    try {
      playIntro = sessionStorage.getItem(SESSION_KEY) !== '1';
      if (playIntro) sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Storage 异常时直接维持稳定卷首，避免开场在每次访问重复播放。
      playIntro = false;
    }
  }

  if (playIntro) {
    introRunning = true;
    hero.dataset.heroIntro = 'riffle';
    setInteractionState();
    void runIntro();
  }

  window.addEventListener('resize', () => {
    if (!turn) {
      renderStable();
      return;
    }
    const progress = turn.progress;
    renderTurn();
    applyTurn(progress);
  });
}
