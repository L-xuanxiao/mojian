import { useEffect, useRef, type ReactNode } from 'react';
import { Tooltip } from '@base-ui-components/react/tooltip';

// 题跋释义：印章、题跋等饰件的出处注解。题跋本是注释传统，故以此名。
// 无 JS 时以原生 title 兜底；水合后移除 title，避免与 Tooltip 重复弹出。
interface Props {
  /** 释义文字，同时作为可访问名称与无 JS 兜底 */
  text: string;
  children?: ReactNode;
}

export default function InscriptionTip({ text, children }: Props) {
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    triggerRef.current?.removeAttribute('title');
  }, []);

  return (
    <Tooltip.Provider delay={350}>
      <Tooltip.Root>
        <Tooltip.Trigger
          render={<span ref={triggerRef} className="inscription-tip" tabIndex={0} title={text} />}
        >
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={8}>
            <Tooltip.Popup className="inscription-tip__popup">{text}</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
