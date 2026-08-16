import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import Lightbox from 'yet-another-react-lightbox';
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

export default function GalleryLightbox({ items }: Props) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);
  const slides = useMemo(
    () => items.map(({ src, alt, width, height }) => ({ src, alt, width, height })),
    [items],
  );

  useEffect(() => {
    if (!open) triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

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

  const openAt = (nextIndex: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIndex(nextIndex);
    setOpen(true);
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
          >
            <span className="gallery-entry__number" aria-hidden="true">
              {String(itemIndex + 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="gallery-entry__image"
              aria-label={`放大查看：${item.title}`}
              aria-haspopup="dialog"
              onClick={(event) => openAt(itemIndex, event.currentTarget)}
            >
              <img
                src={item.thumb}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading={itemIndex < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
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
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: nextIndex }) => setIndex(nextIndex) }}
        labels={{ Close: '关闭', Next: '下一幅', Previous: '上一幅' }}
        carousel={{ finite: false, padding: '4%', imageFit: 'contain' }}
        controller={{ closeOnBackdropClick: true }}
        animation={
          reducedMotion
            ? { fade: 0, swipe: 0, navigation: 0 }
            : { fade: 250, swipe: 400, navigation: 250 }
        }
        render={{
          iconPrev: () => <ChevronLeft aria-hidden="true" strokeWidth={1.5} />,
          iconNext: () => <ChevronRight aria-hidden="true" strokeWidth={1.5} />,
          iconClose: () => <X aria-hidden="true" strokeWidth={1.5} />,
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
