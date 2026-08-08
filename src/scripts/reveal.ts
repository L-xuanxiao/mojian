// 全场统一的「书写揭示 + 落墨 stagger」系统
// 初始隐藏态全部由本脚本在非 reduced-motion 下用 gsap.set 设置，
// CSS 不含任何隐藏态：无 JS 或 prefers-reduced-motion 时页面直达最终态
import { gsap, prefersReducedMotion } from './scroll';

if (!prefersReducedMotion) {
  // GSAP 不接受 cubic-bezier 字符串，这里对 --ease-ink（0.22, 1, 0.36, 1）做二分求值，
  // 保证 JS 动画与 CSS 过渡是同一条墨韵曲线
  const cx = 3 * 0.22;
  const bx = 3 * (0.36 - 0.22) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * 1;
  const by = 3 * (1 - 1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const easeInk = (p: number): number => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = p;
    for (let i = 0; i < 24; i++) {
      t = (lo + hi) / 2;
      if (sampleX(t) < p) lo = t;
      else hi = t;
    }
    return sampleY(t);
  };

  // ① 章节标题书写式揭示：文字自左向右收拢揭示，标题下墨线随之展开
  document.querySelectorAll<HTMLElement>('main h2').forEach((heading) => {
    // 墨线是装饰元素，样式直接由脚本内联设置，不新增样式表
    const line = document.createElement('span');
    line.setAttribute('aria-hidden', 'true');
    // 标题已统一为 SectionHeading（.section-heading 为 flex 行），墨线不能再塞进 h2 或容器内，
    // 否则会被 flex 当成行内子项；插到容器之后，用负 margin 贴回标题下方
    const container = heading.closest('.section-heading');
    if (container) {
      container.insertAdjacentElement('afterend', line);
    } else {
      heading.appendChild(line);
    }
    gsap.set(line, {
      display: 'block',
      width: '100%',
      height: '1px',
      // 容器自带 margin-block-end: 2rem，上提 1.25rem 让墨线落在标题下约 0.75rem 处，
      // 下方补回 1.25rem，整体排版间距与原先基本一致
      marginTop: container ? '-1.25rem' : '0.75rem',
      marginBottom: container ? '1.25rem' : '0',
      maxWidth: container ? 'none' : '3rem',
      backgroundColor: 'var(--ink)',
      transformOrigin: 'left center',
      scaleX: 0,
    });

    gsap.set(heading, { clipPath: 'inset(0 100% 0 0)', filter: 'blur(4px)' });

    // 编号小印：钤印式入场，先放大微斜再盖回原位（GSAP 会保留 CSS 里的 translateY）
    const seal = container?.querySelector<HTMLElement>('.index-seal');
    if (seal) gsap.set(seal, { rotate: -8, scale: 1.4 });

    const trigger = { trigger: heading, start: 'top 82%', once: true };
    gsap.to(heading, {
      clipPath: 'inset(0 0% 0 0)',
      filter: 'blur(0px)',
      duration: 0.9,
      ease: easeInk,
      scrollTrigger: trigger,
    });
    // 墨线比文字稍晚起笔，模拟书写后的顿笔
    gsap.to(line, {
      scaleX: 1,
      duration: 0.6,
      delay: 0.15,
      ease: easeInk,
      scrollTrigger: trigger,
    });
    // 小印比标题稍晚 0.1s 落下，取「题字后钤印」的顺序
    if (seal) {
      gsap.to(seal, {
        rotate: 0,
        scale: 1,
        duration: 0.5,
        delay: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: trigger,
      });
    }
  });

  // ② 落墨 stagger：列表条目如墨迹落纸，依次浮现
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    if (items.length === 0) return;

    gsap.set(items, { y: 14, opacity: 0, filter: 'blur(6px)' });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger: 0.08,
      ease: easeInk,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
}
