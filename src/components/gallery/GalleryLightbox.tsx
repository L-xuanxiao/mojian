import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { flushSync } from 'react-dom';
import Lightbox, { type Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './gallery-lightbox.css';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  alt: string;
  thumb: string;
  src: string;
  width: number;
  height: number;
  year: number;
  medium: string;
  orientation: 'landscape' | 'portrait' | 'wide';
  projectHref?: string;
}

interface Props {
  items: GalleryItem[];
}

const negativeFrameStyle = (slide: Slide): CSSProperties => {
  if (
    !('width' in slide) ||
    !('height' in slide) ||
    typeof slide.width !== 'number' ||
    typeof slide.height !== 'number'
  ) {
    return {};
  }

  const ratio = slide.width / slide.height;
  return ratio >= 1
    ? { width: `min(84vw, ${ratio * 78}vh)`, aspectRatio: `${slide.width} / ${slide.height}` }
    : { height: `min(78vh, ${78 / ratio}vw)`, aspectRatio: `${slide.width} / ${slide.height}` };
};

export default function GalleryLightbox({ items }: Props) {
  const reducedMotion = useReducedMotion();
  const supportsViewTransition =
    typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [openingSlideSrc, setOpeningSlideSrc] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);
  const transitionTargetRef = useRef<HTMLImageElement | null>(null);
  const transitionActiveRef = useRef(false);
  const slides = useMemo(
    () => items.map(({ src, alt, width, height }) => ({ src, alt, width, height })),
    [items],
  );

  useEffect(() => {
    if (!open) triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!openingSlideSrc) return;
    const cleanupTimer = window.setTimeout(() => setOpeningSlideSrc(null), 560);
    return () => window.clearTimeout(cleanupTimer);
  }, [openingSlideSrc]);

  // 显影：入视口的画面渐次加 .is-developed（暗态预置在 gallery-lightbox.css，仅 html.js + no-preference 生效）
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    const figures = grid.querySelectorAll('.gallery-entry');
    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-developed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    figures.forEach((figure) => observer.observe(figure));
    return () => observer.disconnect();
  }, [reducedMotion]);

  const gridImageAt = (nextIndex: number) =>
    gridRef.current?.querySelector<HTMLImageElement>(`[data-gallery-index="${nextIndex}"] img`) ??
    null;

  const transitionBetween = (
    from: HTMLImageElement | null,
    update: () => void,
    getTarget: () => HTMLImageElement | null,
  ) => {
    const startViewTransition = document.startViewTransition?.bind(document);
    if (reducedMotion || !startViewTransition || !from || transitionActiveRef.current) {
      update();
      return;
    }

    let updated = false;
    let cleanupTimer: number | undefined;
    const clearNames = () => {
      if (cleanupTimer) window.clearTimeout(cleanupTimer);
      from.style.removeProperty('view-transition-name');
      transitionTargetRef.current?.style.removeProperty('view-transition-name');
      gridRef.current
        ?.querySelectorAll<HTMLElement>('[style*="view-transition-name"]')
        .forEach((element) => element.style.removeProperty('view-transition-name'));
      transitionTargetRef.current = null;
      transitionActiveRef.current = false;
      document.documentElement.classList.remove('is-gallery-transitioning');
    };

    transitionActiveRef.current = true;
    document.documentElement.classList.add('is-gallery-transitioning');
    from.style.setProperty('view-transition-name', 'gallery-photo');

    try {
      const transition = startViewTransition(async () => {
        flushSync(() => {
          update();
          updated = true;
        });
        from.style.setProperty('view-transition-name', 'none');

        // YARL 在 React 提交后挂载图像；等一帧再把新旧快照接到同一个名字。
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        const target = getTarget();
        if (target) {
          target.style.setProperty('view-transition-name', 'gallery-photo');
          transitionTargetRef.current = target;
        }
      });
      // 快照建立后即可清理源 DOM 契约；伪元素动画会独立继续，快速关闭也不会残留类名。
      transition.ready.then(clearNames, clearNames);
      transition.finished.then(clearNames, clearNames);
      cleanupTimer = window.setTimeout(clearNames, 280);
    } catch {
      if (!updated) update();
      clearNames();
    }
  };

  const openAt = (nextIndex: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    transitionBetween(
      gridImageAt(nextIndex),
      () => {
        setIndex(nextIndex);
        setOpeningSlideSrc(reducedMotion ? null : (items[nextIndex]?.src ?? null));
        setOpen(true);
      },
      () => document.querySelector<HTMLImageElement>('.ink-lightbox .yarl__slide_image'),
    );
  };

  const closeLightbox = () => {
    transitionBetween(
      document.querySelector<HTMLImageElement>('.ink-lightbox .yarl__slide_image'),
      () => {
        setOpeningSlideSrc(null);
        setOpen(false);
      },
      () => gridImageAt(index),
    );
  };

  return (
    <>
      <section
        className="gallery-grid"
        aria-label="光影作品"
        ref={gridRef}
        data-reveal-group
        data-reveal-variant="contact-sheet"
      >
        {items.map((item, itemIndex) => (
          <figure
            className={`gallery-entry gallery-entry--${item.orientation}`}
            key={item.id}
            data-ink-avoid
            style={{ '--reveal-order': itemIndex } as CSSProperties}
          >
            <span className="gallery-entry__number" aria-hidden="true">
              {String(itemIndex + 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="gallery-entry__image"
              aria-label={`放大查看：${item.title}`}
              aria-haspopup="dialog"
              data-gallery-index={itemIndex}
              onClick={(event) => openAt(itemIndex, event.currentTarget)}
            >
              <span className="gallery-entry__develop">
                <img
                  src={item.thumb}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={itemIndex < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </span>
              <span className="gallery-entry__zoom" aria-hidden="true">
                细看
              </span>
            </button>
            <figcaption>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              <p className="gallery-entry__meta">
                <span>{item.year}</span>
                <span>{item.medium}</span>
                {item.projectHref && <a href={item.projectHref}>相关器作</a>}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>

      <Lightbox
        className="ink-lightbox"
        open={open}
        close={closeLightbox}
        index={index}
        slides={slides}
        on={{ view: ({ index: nextIndex }) => setIndex(nextIndex) }}
        labels={{ Close: '关闭', Next: '下一幅', Previous: '上一幅' }}
        carousel={{ finite: false, padding: '4%', imageFit: 'contain' }}
        controller={{ closeOnBackdropClick: true }}
        animation={
          reducedMotion
            ? { fade: 0, swipe: 0, navigation: 0 }
            : {
                fade: supportsViewTransition ? 0 : 250,
                swipe: 250,
                navigation: 250,
              }
        }
        render={{
          iconPrev: () => <ChevronLeft aria-hidden="true" strokeWidth={1.5} />,
          iconNext: () => <ChevronRight aria-hidden="true" strokeWidth={1.5} />,
          iconClose: () => <X aria-hidden="true" strokeWidth={1.5} />,
          slideContainer: ({ slide, children }) => (
            <div
              className={`ink-lightbox__negative${slide.src === openingSlideSrc ? ' ink-lightbox__negative--enter' : ''}`}
              style={negativeFrameStyle(slide)}
            >
              {children}
            </div>
          ),
          slideFooter: ({ slide }) => {
            const current = items.find((item) => item.src === slide.src);
            if (!current) return null;
            return (
              <div className="ink-lightbox__caption">
                <strong>{current.title}</strong>
                <span>
                  {current.year} · {current.medium}　{current.description}
                </span>
              </div>
            );
          },
        }}
      />
    </>
  );
}
