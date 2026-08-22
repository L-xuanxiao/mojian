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
