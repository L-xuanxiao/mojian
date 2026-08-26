import { gsap, prefersReducedMotion, onDesktopViewport, attachSealMagnet } from './scroll';

const paintedIntroProfiles = {
  full: {
    spot: { opacity: 0.28, duration: 0.33, interval: 0.06, fadeDuration: 0.18, fadeAt: 0.4 },
    sheetDuration: 0.72,
    art: { duration: 0.82, at: 0.1 },
    ink: { duration: 0.28, stagger: 0.07, at: 0.28 },
    paper: { duration: 0.26, stagger: 0.07, at: 0.52 },
    title: { duration: 0.12, at: 1.22 },
    details: { duration: 0.52, stagger: 0.06, at: 0.56 },
    seal: { duration: 0.38, at: 1.16 },
  },
  light: {
    spot: { opacity: 0.2, duration: 0.2, interval: 0.035, fadeDuration: 0.12, fadeAt: 0.23 },
    sheetDuration: 0.42,
    art: { duration: 0.52, at: 0.04 },
    ink: { duration: 0.12, stagger: 0.035, at: 0.12 },
    paper: { duration: 0.12, stagger: 0.035, at: 0.2 },
    title: { duration: 0.1, at: 0.57 },
    details: { duration: 0.3, stagger: 0.04, at: 0.25 },
    seal: { duration: 0.26, at: 0.42 },
  },
} as const;

export function initHeroMotion(hero: HTMLElement) {
  if (prefersReducedMotion) return;

  const sessionKey = 'mojian:hero-intro:v1';
  let isFirstSession = false;
  try {
    isFirstSession = sessionStorage.getItem(sessionKey) !== '1';
    if (isFirstSession) sessionStorage.setItem(sessionKey, '1');
  } catch {
    // 隐私模式或存储被禁用时采用短版，不让一次性开场退化为每次重播。
    isFirstSession = false;
  }

  const introMode = isFirstSession
    ? window.matchMedia('(min-width: 768px)').matches
      ? 'full'
      : 'light'
    : 'short';
  hero.dataset.heroIntro = introMode;

  const titleLines = hero.querySelectorAll<HTMLElement>('.hero-title-line');
  const details = hero.querySelectorAll<HTMLElement>(
    '.hero__eyebrow, .hero__statement, .hero__colophon, .hero__scroll',
  );
  const inkSpots = hero.querySelectorAll<SVGPathElement>('[data-hero-ink-spot]');
  const brushSvgs = hero.querySelectorAll<SVGSVGElement>('[data-hero-brush]');
  const inkStrokes = hero.querySelectorAll<SVGPathElement>(
    '[data-hero-brush="ink"] .hero-brush-paths path',
  );
  const paperStrokes = hero.querySelectorAll<SVGPathElement>(
    '[data-hero-brush="paper"] .hero-brush-paths path',
  );
  const brushStrokes = [...inkStrokes, ...paperStrokes];
  const sheet = hero.querySelector<HTMLElement>('[data-hero-sheet]');
  const art = hero.querySelector<HTMLElement>('[data-hero-art]');
  const paperTitle = hero.querySelector<HTMLElement>('.hero-title-mask--paper');
  const seal = hero.querySelector<HTMLElement>('[data-hero-seal]');
  const layers = [
    { element: hero.querySelector<HTMLElement>('[data-hero-layer="far"]'), yPercent: 2 },
    { element: hero.querySelector<HTMLElement>('[data-hero-layer="mid"]'), yPercent: 5 },
    { element: hero.querySelector<HTMLElement>('[data-hero-layer="near"]'), yPercent: 8 },
  ].filter((layer): layer is { element: HTMLElement; yPercent: number } => Boolean(layer.element));

  brushStrokes.forEach((stroke) => {
    const length = stroke.getTotalLength();
    gsap.set(stroke, { strokeDasharray: length, strokeDashoffset: length });
  });

  let entranceComplete = false;
  const removeSkipListeners = () => {
    window.removeEventListener('wheel', skipEntrance);
    window.removeEventListener('touchstart', skipEntrance);
    window.removeEventListener('keydown', skipEntrance);
    window.removeEventListener('pointerdown', skipEntrance);
    window.removeEventListener('click', skipEntrance);
  };
  const finishEntrance = () => {
    if (entranceComplete) return;
    entranceComplete = true;
    removeSkipListeners();
    hero.classList.add('hero--intro-complete');
    gsap.set(inkSpots, { opacity: 0 });
    gsap.set(brushSvgs, { opacity: 0 });
    gsap.set(titleLines, { opacity: 1, clearProps: 'transform' });
    gsap.set(details, { opacity: 1, clearProps: 'transform' });
    if (sheet) gsap.set(sheet, { clipPath: 'inset(0 0% 0 0)', clearProps: 'transform' });
    if (art) gsap.set(art, { clipPath: 'inset(0 0% 0 0)', clearProps: 'transform' });
    if (seal) gsap.set(seal, { clearProps: 'transform' });
  };
  const entrance = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: finishEntrance });
  function skipEntrance() {
    entrance.progress(1, false);
    finishEntrance();
  }

  if (introMode === 'full' || introMode === 'light') {
    const profile = paintedIntroProfiles[introMode];
    gsap.set(brushSvgs, { opacity: 1 });
    gsap.set(titleLines, { yPercent: 0, opacity: 0 });
    inkSpots.forEach((spot, index) =>
      entrance.fromTo(
        spot,
        { scale: 0.08, opacity: 0 },
        { scale: 1, opacity: profile.spot.opacity, duration: profile.spot.duration },
        index * profile.spot.interval,
      ),
    );
    entrance.to(
      inkSpots,
      { opacity: 0, duration: profile.spot.fadeDuration, stagger: 0.02 },
      profile.spot.fadeAt,
    );
    if (sheet)
      entrance.fromTo(
        sheet,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: profile.sheetDuration },
        0,
      );
    if (art)
      entrance.fromTo(
        art,
        { clipPath: 'inset(0 100% 0 0)', xPercent: 4 },
        { clipPath: 'inset(0 0% 0 0)', xPercent: 0, duration: profile.art.duration },
        profile.art.at,
      );
    entrance
      .to(
        inkStrokes,
        {
          strokeDashoffset: 0,
          duration: profile.ink.duration,
          stagger: profile.ink.stagger,
          ease: 'power2.out',
        },
        profile.ink.at,
      )
      .to(
        paperStrokes,
        {
          strokeDashoffset: 0,
          duration: profile.paper.duration,
          stagger: profile.paper.stagger,
          ease: 'power2.out',
        },
        profile.paper.at,
      )
      .to(titleLines, { opacity: 1, duration: profile.title.duration }, profile.title.at)
      .to(brushSvgs, { opacity: 0, duration: profile.title.duration }, profile.title.at)
      .fromTo(
        details,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: profile.details.duration,
          stagger: profile.details.stagger,
        },
        profile.details.at,
      );
    if (seal)
      entrance.fromTo(
        seal,
        { scale: 1.36, rotate: -7 },
        {
          scale: 1,
          rotate: 0,
          duration: profile.seal.duration,
          ease: 'back.out(2.4)',
        },
        profile.seal.at,
      );
  } else {
    if (sheet)
      entrance.fromTo(
        sheet,
        { clipPath: 'inset(0 42% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.32 },
        0,
      );
    if (art)
      entrance.fromTo(
        art,
        { clipPath: 'inset(0 36% 0 0)', xPercent: 2 },
        { clipPath: 'inset(0 0% 0 0)', xPercent: 0, duration: 0.4 },
        0.03,
      );
    entrance
      .fromTo(
        titleLines,
        { yPercent: 18, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.36, stagger: 0.04 },
        0.05,
      )
      .fromTo(
        details,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.24, stagger: 0.025 },
        0.14,
      );
    if (seal)
      entrance.fromTo(
        seal,
        { scale: 1.18, rotate: -4 },
        { scale: 1, rotate: 0, duration: 0.2, ease: 'back.out(2)' },
        0.24,
      );
  }

  window.addEventListener('wheel', skipEntrance, { passive: true });
  window.addEventListener('touchstart', skipEntrance, { passive: true });
  window.addEventListener('keydown', skipEntrance);
  window.addEventListener('pointerdown', skipEntrance, { passive: true });
  window.addEventListener('click', skipEntrance);

  // 桌面滚动视差跟随 768 断点重建或清理：避免旋转屏后残留位移或转桌面后缺少视差
  onDesktopViewport(() => {
    const handoff = gsap.timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    if (sheet) handoff.to(sheet, { xPercent: -7, ease: 'none' }, 0);
    if (art) handoff.to(art, { xPercent: 9, ease: 'none' }, 0);
    if (paperTitle) handoff.to(paperTitle, { xPercent: 16, ease: 'none' }, 0);
    layers.forEach((layer) =>
      handoff.to(layer.element, { yPercent: layer.yPercent, ease: 'none' }, 0),
    );

    return () => {
      handoff.scrollTrigger?.kill();
      handoff.kill();
      const parallaxTargets = [sheet, art, paperTitle, ...layers.map((layer) => layer.element)];
      gsap.set(
        parallaxTargets.filter((target): target is HTMLElement => Boolean(target)),
        { clearProps: 'transform' },
      );
    };
  });

  // 印泥磁吸：细指针下卷首钤印被指尖轻带、弹性回位（印泥有黏性）
  if (seal) {
    const colophon = hero.querySelector<HTMLElement>('.hero__colophon');
    if (colophon) attachSealMagnet(seal, colophon);
  }
}
