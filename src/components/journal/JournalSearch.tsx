// 笺录检索：全站首个 React Island。
// 数据层为 Pagefind 纯 JS API（构建期生成 /pagefind/ 索引，dev 下不存在 → 优雅降级）；
// React 管状态机，Motion 管结果落墨入场，reduced-motion 时直达最终态。
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { Search, X } from 'lucide-react';
import { withBase } from '../../site.config';

// Pagefind 索引为构建产物，无类型声明，按接口最小收敛
interface PagefindSearchData {
  url: string;
  excerpt: string;
  meta: Record<string, string>;
}

interface PagefindModule {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: { data: () => Promise<PagefindSearchData> }[] }>;
}

interface ResultItem {
  url: string;
  title: string;
  excerpt: string;
}

type Status = 'idle' | 'unavailable' | 'loading' | 'done';

export default function JournalSearch() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<ResultItem[]>([]);
  const pagefindRef = useRef<PagefindModule | null>(null);
  const reducedMotion = useReducedMotion();

  // 组件进入视口即后台加载索引模块；失败则进入降级态
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // 非字面量 + @vite-ignore：构建期不解析，运行时从站点根加载
        const pagefindPath = withBase('/pagefind/pagefind.js');
        const mod = (await import(/* @vite-ignore */ pagefindPath)) as PagefindModule;
        await mod.init();
        if (!cancelled) pagefindRef.current = mod;
      } catch {
        if (!cancelled) setStatus('unavailable');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 输入防抖 200ms；索引未就绪时静默等待，不清空已有结果
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setStatus((prev) => (prev === 'unavailable' ? prev : 'idle'));
      return;
    }
    const pagefind = pagefindRef.current;
    if (!pagefind) return;

    setStatus('loading');
    const timer = setTimeout(async () => {
      const search = await pagefind.search(q);
      const items = await Promise.all(
        search.results.slice(0, 10).map(async (result) => {
          const data = await result.data();
          return {
            // Pagefind 结果 URL 取自页面 canonical（已含部署 base）；无 canonical 的旧索引才补 base
            url: data.url.startsWith(import.meta.env.BASE_URL) ? data.url : withBase(data.url),
            // 页面 <title> 带站点后缀「 · 墨笺」，检索结果只留文章题名
            title: (data.meta['title'] ?? data.url).replace(/ · 墨笺$/, ''),
            excerpt: data.excerpt,
          };
        }),
      );
      setResults(items);
      setStatus('done');
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const clear = () => {
    setQuery('');
    setResults([]);
    setStatus('idle');
  };

  // 目录式轻入场：只用短距离位移与透明度，避免重复全站旧式大模糊。
  const listVariants: Variants = {
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.06 } },
  };
  const itemVariants: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: reducedMotion
      ? { opacity: 1, transition: { duration: 0 } }
      : { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <section aria-label="检索笺录" className="search-island">
      <div className="group relative">
        <Search
          className="text-ink-soft pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="检索笺录…"
          aria-label="检索笺录文章"
          className="border-line text-ink placeholder:text-ink-soft/60 w-full border-0 border-b bg-transparent py-2.5 pr-8 pl-7 font-sans text-base focus:outline-none"
        />
        {/* 聚焦墨线：自左向右写出 */}
        <span
          className="bg-ink pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-400 ease-ink group-focus-within:scale-x-100"
          aria-hidden
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="清空检索"
            className="text-ink-soft hover:text-ink absolute top-1/2 right-0 -translate-y-1/2 p-1 transition-colors duration-150"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      <div aria-live="polite" className="mt-6 min-h-6 font-sans text-sm">
        {status === 'unavailable' && <p className="text-ink-soft m-0">检索将于站点构建后可用。</p>}
        {status === 'loading' && <p className="text-ink-soft m-0">研墨中…</p>}
        {status === 'done' && query.trim() && results.length === 0 && (
          <p className="text-ink-soft m-0">未寻得「{query.trim()}」相关篇目。</p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.ol
            key={query.trim()}
            className="m-0 mt-2 list-none p-0"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.15 } }}
          >
            {results.map((item) => (
              <motion.li
                key={item.url}
                variants={itemVariants}
                whileHover={reducedMotion ? undefined : { x: 4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="border-line border-b last:border-b-0"
              >
                <a href={item.url} className="block py-4 no-underline">
                  <span className="text-ink block text-base leading-snug">{item.title}</span>
                  {/* Pagefind excerpt 自带 <mark> 高亮，样式见 global.css */}
                  <span
                    className="text-ink-soft search-excerpt mt-1 block text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.excerpt }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </section>
  );
}
