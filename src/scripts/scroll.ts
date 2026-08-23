// 共享动画底座：GSAP + ScrollTrigger + Lenis 平滑滚动
// 各区块脚本从这里取同一实例；reduced-motion 时不启动 Lenis，并供各脚本跳过动画
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

if (!prefersReducedMotion) {
  // Lenis 统一接管平滑滚动，并把滚动帧同步给 ScrollTrigger；
  // anchors 让站内锚点（如长卷卷尾「展毕」印章）也走 Lenis，避免原生跳转与其状态脱节
  lenis = new Lenis({ anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, lenis };

/**
 * 桌面段（≥768px）动效生命周期：进入桌面时执行 setup，离开时调用其返回的清理函数。
 * 与 CSS 预隐藏态的 768 媒体查询同断点——移动视口加载后转桌面（旋转屏、放大字号）时
 * 由 setup 补建时间线，转回移动时清理回到完整静态终态。reduced-motion 下不挂载。
 */
export function onDesktopViewport(setup: () => () => void): void {
  if (prefersReducedMotion) return;

  const query = window.matchMedia('(min-width: 768px)');
  let teardown: (() => void) | null = null;

  const enter = () => {
    teardown = setup();
  };
  const exit = () => {
    teardown?.();
    teardown = null;
  };

  if (query.matches) enter();
  query.addEventListener('change', (event) => (event.matches ? enter() : exit()));
}

/**
 * 印泥磁吸：细指针下印章随指尖轻带 ±3px、弹性回位（印泥有黏性）。
 * 触屏或粗指针不挂载；quickTo 只写 target 自身 x/y，与容器级时间线互不干扰。
 */
export function attachSealMagnet(target: HTMLElement, anchor: HTMLElement): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const xTo = gsap.quickTo(target, 'x', { duration: 0.45, ease: 'power3.out' });
  const yTo = gsap.quickTo(target, 'y', { duration: 0.45, ease: 'power3.out' });

  anchor.addEventListener('pointermove', (event) => {
    const rect = anchor.getBoundingClientRect();
    xTo(gsap.utils.clamp(-3, 3, (event.clientX - (rect.left + rect.width / 2)) * 0.12));
    yTo(gsap.utils.clamp(-3, 3, (event.clientY - (rect.top + rect.height / 2)) * 0.12));
  });
  anchor.addEventListener('pointerleave', () => {
    xTo(0);
    yTo(0);
  });
}
