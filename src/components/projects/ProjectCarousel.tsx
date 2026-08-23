import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import './project-carousel.css';

export interface ProjectSlide {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

interface Props {
  title: string;
  slides: ProjectSlide[];
}

export default function ProjectCarousel({ title, slides }: Props) {
  const reducedMotion = useReducedMotion();
  const carouselId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: slides.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [instantTransition, setInstantTransition] = useState(false);
  const instantFrame = useRef(0);

  const syncState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    syncState();
    emblaApi.on('select', syncState).on('reInit', syncState);

    return () => {
      emblaApi.off('select', syncState).off('reInit', syncState);
    };
  }, [emblaApi, syncState]);

  useEffect(
    () => () => {
      if (instantFrame.current) window.cancelAnimationFrame(instantFrame.current);
    },
    [],
  );

  const navigate = (direction: 'prev' | 'next', instant: boolean) => {
    const shouldJump = Boolean(reducedMotion) || instant;

    if (instant && !reducedMotion) {
      // 键盘切换同帧关闭卡片与进度条过渡；下一帧恢复指针交互的平滑反馈。
      if (instantFrame.current) window.cancelAnimationFrame(instantFrame.current);
      setInstantTransition(true);
      instantFrame.current = window.requestAnimationFrame(() => {
        instantFrame.current = 0;
        setInstantTransition(false);
      });
    }

    if (direction === 'prev') emblaApi?.scrollPrev(shouldJump);
    else emblaApi?.scrollNext(shouldJump);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>, direction: 'prev' | 'next') =>
    navigate(direction, event.detail === 0);

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // 图集画布提供方向键语义；按钮仍保留独立 Tab 停靠点。
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigate('prev', true);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigate('next', true);
    }
  };

  return (
    <section
      className={`project-carousel${instantTransition ? ' is-instant' : ''}`}
      aria-label={`${title}图集`}
      data-ink-avoid
    >
      <div
        className="project-carousel__viewport"
        id={carouselId}
        ref={emblaRef}
        role="group"
        tabIndex={slides.length > 1 ? 0 : -1}
        aria-label="图集画布，使用左右方向键切换"
        onKeyDown={handleCarouselKeyDown}
      >
        <div className="project-carousel__track">
          {slides.map((slide, index) => (
            <motion.figure
              className="project-carousel__slide"
              key={slide.src}
              animate={
                reducedMotion || selectedIndex === index
                  ? { opacity: 1, transform: 'scale(1)' }
                  : { opacity: 0.64, transform: 'scale(0.985)' }
              }
              transition={{
                duration: reducedMotion || instantTransition ? 0 : 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              {slide.caption && <figcaption>{slide.caption}</figcaption>}
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="project-carousel__controls">
        <div className="project-carousel__buttons">
          <button
            type="button"
            aria-label="上一幅"
            aria-controls={carouselId}
            disabled={!canScrollPrev}
            onClick={(event) => handleButtonClick(event, 'prev')}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="下一幅"
            aria-controls={carouselId}
            disabled={!canScrollNext}
            onClick={(event) => handleButtonClick(event, 'next')}
          >
            <ArrowRight aria-hidden="true" strokeWidth={1.5} />
          </button>
        </div>
        <div className="project-carousel__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(selectedIndex + 1) / slides.length})` }} />
        </div>
        <p aria-live="polite" aria-atomic="true">
          <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> / </span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </p>
      </div>
    </section>
  );
}
