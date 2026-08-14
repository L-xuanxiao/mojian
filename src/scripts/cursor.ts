// 毛笔尖光标：桌面细指针专属。墨点以 GSAP quickTo 弹性随行，悬停可交互元素时晕开。
// 不隐藏原生光标；reduced-motion 或触屏设备不启用。
import { gsap, prefersReducedMotion } from './scroll';

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!prefersReducedMotion && finePointer) {
  const cursor = document.createElement('div');
  cursor.className = 'ink-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  const dot = document.createElement('div');
  dot.className = 'ink-cursor__dot';
  cursor.appendChild(dot);
  document.body.appendChild(cursor);

  // quickTo：弹性跟随，避免每帧直接写 transform 的生硬
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });

  window.addEventListener(
    'mousemove',
    (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
    },
    { passive: true },
  );

  // 事件委托判断悬停目标是否可交互
  const interactive = 'a, button, [role="button"], input, textarea, summary';
  document.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(interactive)) {
      cursor.classList.add('is-active');
    }
  });
  document.addEventListener('mouseout', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(interactive)) {
      cursor.classList.remove('is-active');
    }
  });
}
