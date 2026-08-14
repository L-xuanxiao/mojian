// 显式动效语义：题名、墨线、列表、图像各用不同节奏，避免全站同一种模糊上移。
// 初态由 global.css 的 html.js 门控；无 JS / reduced-motion 时直接显示终态。
import { gsap, ScrollTrigger, prefersReducedMotion } from './scroll';

if (!prefersReducedMotion) {
  document.querySelectorAll<HTMLElement>('[data-page-intro]').forEach((intro) => {
    const scene = intro.dataset.pageIntroScene ?? 'reading';
    const folio = intro.querySelector<HTMLElement>('[data-page-intro-folio]');
    const title = intro.querySelector<HTMLElement>('[data-page-intro-title]');
    const details = intro.querySelectorAll<HTMLElement>('[data-page-intro-detail]');
    const rule = intro.querySelector<HTMLElement>('[data-reveal-line]');
    const art = intro.querySelector<HTMLElement>('[data-page-intro-art]');

    const timeline = gsap.timeline({
      defaults: { ease: 'expo.out' },
      scrollTrigger: { trigger: intro, start: 'top 86%', once: true },
    });

    if (scene === 'exhibition' && art) {
      timeline.call(() => art.classList.add('is-revealed'), [], 0);
    }

    if (folio) timeline.to(folio, { y: 0, opacity: 1, duration: 0.55 }, 0.02);
    if (title) {
      timeline.fromTo(
        title,
        { y: 0, yPercent: 100 },
        {
          y: 0,
          yPercent: 0,
          opacity: 1,
          duration: scene === 'personal' ? 1.05 : 0.95,
        },
        scene === 'exhibition' ? 0.15 : 0.08,
      );
    }
    if (rule) timeline.to(rule, { scaleX: 1, duration: 0.75 }, 0.18);
    if (details.length > 0) {
      timeline.to(details, { y: 0, opacity: 1, duration: 0.62, stagger: 0.07 }, 0.34);
    }
    if (art && scene !== 'exhibition') {
      timeline.call(() => art.classList.add('is-revealed'), [], scene === 'reading' ? 0.58 : 0.46);
    }
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-title]').forEach((title) => {
    if (title.closest('[data-page-intro]')) return;
    gsap.to(title, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: title, start: 'top 88%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-line]').forEach((line) => {
    if (line.closest('[data-page-intro]')) return;
    gsap.to(line, {
      scaleX: 1,
      duration: 0.75,
      ease: 'expo.out',
      scrollTrigger: { trigger: line, start: 'top 90%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = Array.from(group.children).filter(
      (item): item is HTMLElement => item instanceof HTMLElement,
    );
    if (items.length === 0) return;

    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: group, start: 'top 88%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('.media-reveal').forEach((media) => {
    if (media.closest('[data-page-intro]')) return;
    ScrollTrigger.create({
      trigger: media,
      start: 'top 88%',
      once: true,
      onEnter: () => media.classList.add('is-revealed'),
    });
  });
}
