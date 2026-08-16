import { useCallback, useEffect, useId, useState } from 'react';
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

  const scrollPrev = () => emblaApi?.scrollPrev(Boolean(reducedMotion));
  const scrollNext = () => emblaApi?.scrollNext(Boolean(reducedMotion));

  return (
    <section className="project-carousel" aria-label={`${title}图集`} data-ink-avoid>
      <div className="project-carousel__viewport" id={carouselId} ref={emblaRef}>
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
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
            onClick={scrollPrev}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="下一幅"
            aria-controls={carouselId}
            disabled={!canScrollNext}
            onClick={scrollNext}
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
