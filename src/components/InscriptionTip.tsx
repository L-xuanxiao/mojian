import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Tooltip } from '@base-ui-components/react/tooltip';

// 题跋释义：印章、题跋等饰件的出处注解。题跋本是注释传统，故以此名。
// 无 JS 时以原生 title 兜底；水合后移除 title，避免与 Tooltip 重复弹出。

// 首个题跋弹出后，后续题跋立即出现（免延迟免动画）——
// 模块级共享：相邻钤印快速浏览时，350ms×每次会让整站感觉比实际慢。
let hasRevealedTip = false;

interface Props {
  /** 释义文字，同时作为可访问名称与无 JS 兜底 */
  text: string;
  children?: ReactNode;
}

export default function InscriptionTip({ text, children }: Props) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  // 水合晚于首次弹出的实例（如换页后的新岛屿）经此初值直接进入即时态
  const [instant, setInstant] = useState(hasRevealedTip);

  useEffect(() => {
    triggerRef.current?.removeAttribute('title');
  }, []);

  return (
    <Tooltip.Provider delay={instant ? 0 : 350}>
      <Tooltip.Root
        onOpenChange={(open) => {
          // 无条件幂等置位：任何实例首次弹出后，自身与后续实例都进入即时态
          if (open) {
            hasRevealedTip = true;
            setInstant(true);
          }
        }}
      >
        <Tooltip.Trigger
          render={
            <span
              ref={triggerRef}
              className="inscription-tip"
              tabIndex={0}
              title={text}
              onPointerEnter={() => {
                // 已有题跋弹出过时，悬停即同步本实例，赶在延迟计时生效前
                if (hasRevealedTip) setInstant(true);
              }}
            />
          }
        >
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={8}>
            <Tooltip.Popup
              className={`inscription-tip__popup${instant ? ' inscription-tip__popup--instant' : ''}`}
            >
              {text}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
