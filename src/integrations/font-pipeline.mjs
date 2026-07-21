import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
import subsetFont from 'subset-font';

const require = createRequire(import.meta.url);
const FONT_MARKER = /<meta\s+name="mojian-fonts"\s+content="pending"\s*\/?\s*>/g;
const RESERVE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ，。！？；：、（）《》〈〉【】『』「」—…·';
const SOURCE_EXTENSIONS = new Set(['.astro', '.css', '.md', '.mjs', '.ts']);
const TEXT_ATTRIBUTES = ['aria-label', 'placeholder', 'title', 'value'];
const MAX_FACE_BYTES = 220 * 1024;
const MAX_TOTAL_BYTES = 750 * 1024;

const FONT_FAMILIES = [
  {
    role: 'serif',
    family: 'Noto Serif SC',
    packageName: '@fontsource/noto-serif-sc',
    slug: 'noto-serif-sc',
    weights: [400, 500, 700],
  },
  {
    role: 'cal',
    family: 'Ma Shan Zheng',
    packageName: '@fontsource/ma-shan-zheng',
    slug: 'ma-shan-zheng',
    weights: [400],
  },
  {
    role: 'hand',
    family: 'Long Cang',
    packageName: '@fontsource/long-cang',
    slug: 'long-cang',
    weights: [400],
  },
];

export function normalizeCorpus(value, { includeReserve = true } = {}) {
  const source = includeReserve ? `${value}${RESERVE}` : value;
  return [...new Set([...source.normalize('NFC')])]
    .sort((a, b) => a.codePointAt(0) - b.codePointAt(0))
    .join('');
}

export function codePointsToUnicodeRange(value) {
  const points = [...new Set([...value].map((char) => char.codePointAt(0)))].sort((a, b) => a - b);
  if (points.length === 0) return '';

  const ranges = [];
  let start = points[0];
  let end = start;

  for (const point of points.slice(1)) {
    if (point === end + 1) {
      end = point;
      continue;
    }
    ranges.push([start, end]);
    start = end = point;
  }
  ranges.push([start, end]);

  return ranges
    .map(([from, to]) => `U+${from.toString(16).toUpperCase()}${from === to ? '' : `-${to.toString(16).toUpperCase()}`}`)
    .join(',');
}

export function parseUnicodeRanges(value) {
  return value.split(',').map((part) => {
    const [from, to = from] = part.trim().slice(2).split('-');
    return [Number.parseInt(from, 16), Number.parseInt(to, 16)];
  });
}

function containsCodePoint(ranges, codePoint) {
  return ranges.some(([from, to]) => codePoint >= from && codePoint <= to);
}

export function splitCorpusByCoverage(corpus, latinRanges, chineseRanges) {
  const latin = [];
  const chinese = [];
  const unsupported = [];

  for (const char of normalizeCorpus(corpus)) {
    const codePoint = char.codePointAt(0);
    if (containsCodePoint(latinRanges, codePoint)) latin.push(char);
    else if (containsCodePoint(chineseRanges, codePoint)) chinese.push(char);
    else unsupported.push(char);
  }

  return { latin: latin.join(''), chinese: chinese.join(''), unsupported: unsupported.join('') };
}

function collectAttributes($, selector) {
  let value = '';
  $(selector).each((_, element) => {
    const append = (node) => {
      for (const attribute of TEXT_ATTRIBUTES) value += $(node).attr(attribute) ?? '';
    };
    append(element);
    $(element).find('*').each((__, child) => append(child));
  });
  return value;
}

export function extractHtmlCorpora(html) {
  const $ = load(html, { decodeEntities: false });
  $('script,style,template,noscript').remove();

  const textFor = (selector) => normalizeCorpus(
    `${$(selector).text()}${collectAttributes($, selector)}`,
    { includeReserve: false },
  );
  return {
    serif: textFor('body'),
    cal: textFor('[data-font-role="cal"]'),
    hand: textFor('[data-font-role="hand"]'),
  };
}

export function hashBuffer(value) {
  return createHash('sha256').update(value).digest('hex').slice(0, 12);
}

export function injectFontMarkup(html, markup) {
  const matches = html.match(FONT_MARKER) ?? [];
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one mojian font marker, found ${matches.length}`);
  }
  return html.replace(FONT_MARKER, markup);
}

export async function readRequiredFile(path, label) {
  try {
    return await readFile(path);
  } catch (cause) {
    throw new Error(`Missing required ${label}: ${path}`, { cause });
  }
}

async function listFiles(root, predicate) {
  const output = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) output.push(...await listFiles(path, predicate));
    else if (predicate(path)) output.push(path);
  }
  return output;
}

async function readSourceCorpus(srcDir) {
  const files = await listFiles(srcDir, (path) => SOURCE_EXTENSIONS.has(extname(path)));
  return normalizeCorpus((await Promise.all(files.map((path) => readFile(path, 'utf8')))).join(''));
}

function packageRoot(font) {
  return dirname(require.resolve(`${font.packageName}/chinese-simplified-${font.weights[0]}.css`));
}

async function fontCoverage(root) {
  const unicode = JSON.parse(await readRequiredFile(join(root, 'unicode.json'), 'font coverage'));
  return {
    latin: parseUnicodeRanges(unicode.latin),
    chinese: Object.entries(unicode)
      .filter(([key]) => key.startsWith('['))
      .flatMap(([, value]) => parseUnicodeRanges(value)),
  };
}

async function compileFontAssets(corpora, { enforceBudgets = false } = {}) {
  const faces = [];
  const unsupported = {};

  for (const font of FONT_FAMILIES) {
    const root = packageRoot(font);
    const coverage = await fontCoverage(root);
    const split = splitCorpusByCoverage(corpora[font.role], coverage.latin, coverage.chinese);
    unsupported[font.role] = [...split.unsupported].map((char) => `U+${char.codePointAt(0).toString(16).toUpperCase()}`);

    for (const weight of font.weights) {
      for (const subset of ['latin', 'chinese']) {
        const characters = split[subset];
        if (!characters) continue;

        const sourceSubset = subset === 'chinese' ? 'chinese-simplified' : 'latin';
        const source = join(root, 'files', `${font.slug}-${sourceSubset}-${weight}-normal.woff2`);
        const input = await readRequiredFile(source, 'font source');
        const output = await subsetFont(input, characters, { targetFormat: 'woff2' });
        const hash = hashBuffer(output);
        const file = `${font.slug}-${subset}-${weight}.${hash}.woff2`;

        if (enforceBudgets && output.length > MAX_FACE_BYTES) {
          throw new Error(`${file} is ${output.length} bytes; limit is ${MAX_FACE_BYTES}`);
        }

        faces.push({
          role: font.role,
          family: font.family,
          weight,
          subset,
          characters,
          unicodeRange: codePointsToUnicodeRange(characters),
          hash,
          file,
          data: output,
        });
      }
    }
  }

  const totalBytes = faces.reduce((total, face) => total + face.data.length, 0);
  if (enforceBudgets && totalBytes > MAX_TOTAL_BYTES) {
    throw new Error(`Font assets total ${totalBytes} bytes; limit is ${MAX_TOTAL_BYTES}`);
  }

  const css = faces.map((face) => `/* ${face.family} ${face.subset} ${face.weight} */\n@font-face {\n  font-family: '${face.family}';\n  font-style: normal;\n  font-display: swap;\n  font-weight: ${face.weight};\n  src: url('./${face.file}') format('woff2');\n  unicode-range: ${face.unicodeRange};\n}`).join('\n\n');
  const cssFile = `fonts.${hashBuffer(css)}.css`;

  return { css, cssFile, faces, totalBytes, unsupported };
}

function intersects(left, right) {
  const rightPoints = new Set([...right]);
  return [...left].some((char) => rightPoints.has(char));
}

function pageFontMarkup(base, assets, corpora) {
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  const href = `${baseWithSlash}_fonts/${assets.cssFile}`;
  const preloads = assets.faces.filter((face) => {
    if (face.weight !== 400 || face.role === 'hand') return false;
    if (face.role === 'cal' && corpora.cal.length === 0) return false;
    return intersects(face.characters, corpora[face.role]);
  });

  return [
    `<link rel="stylesheet" href="${href}">`,
    ...preloads.map((face) => `<link rel="preload" href="${baseWithSlash}_fonts/${face.file}" as="font" type="font/woff2" crossorigin>`),
  ].join('');
}

async function writeAssets(outDir, assets) {
  const fontsDir = join(outDir, '_fonts');
  const licensesDir = join(fontsDir, 'licenses');
  await mkdir(licensesDir, { recursive: true });
  await Promise.all([
    writeFile(join(fontsDir, assets.cssFile), assets.css),
    ...assets.faces.map((face) => writeFile(join(fontsDir, face.file), face.data)),
    ...FONT_FAMILIES.map(async (font) => {
      const license = await readRequiredFile(join(packageRoot(font), 'LICENSE'), 'font license');
      await writeFile(join(licensesDir, `${font.slug}-OFL-1.1.txt`), license);
    }),
  ]);

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalBytes: assets.totalBytes,
    faces: assets.faces.map(({ data, characters, ...face }) => ({
      ...face,
      bytes: data.length,
      characterCount: [...characters].length,
    })),
    unsupported: assets.unsupported,
  };
  await writeFile(join(fontsDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

export async function compileProductionFonts(dir, base) {
  const outDir = fileURLToPath(dir);
  const htmlFiles = await listFiles(outDir, (path) => extname(path) === '.html');
  if (htmlFiles.length === 0) throw new Error(`No HTML output found in ${outDir}`);
  const pages = [];
  const combined = { serif: '', cal: '', hand: '' };

  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    const corpora = extractHtmlCorpora(html);
    pages.push({ path, html, corpora });
    for (const role of Object.keys(combined)) combined[role] += corpora[role];
  }

  for (const role of Object.keys(combined)) combined[role] = normalizeCorpus(combined[role]);
  const assets = await compileFontAssets(combined, { enforceBudgets: true });
  await writeAssets(outDir, assets);

  await Promise.all(pages.map(({ path, html, corpora }) =>
    writeFile(path, injectFontMarkup(html, pageFontMarkup(base, assets, corpora)))
  ));

  return assets;
}

function devMiddleware(assets) {
  const files = new Map([
    ['fonts.css', { type: 'text/css; charset=utf-8', data: Buffer.from(assets.css) }],
    ...assets.faces.map((face) => [face.file, { type: 'font/woff2', data: face.data }]),
  ]);

  return (request, response, next) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
    const marker = '/__fonts/';
    const markerIndex = pathname.indexOf(marker);
    if (markerIndex === -1) return next();

    const asset = files.get(pathname.slice(markerIndex + marker.length));
    if (!asset) return next();
    response.setHeader('Content-Type', asset.type);
    response.setHeader('Cache-Control', 'no-store');
    response.end(asset.data);
  };
}

export function fontPipeline() {
  let config;

  return {
    name: 'mojian-font-pipeline',
    hooks: {
      'astro:config:done': ({ config: resolvedConfig }) => {
        config = resolvedConfig;
      },
      'astro:server:setup': async ({ server, logger }) => {
        let middleware;
        let rebuilding;
        let rebuildQueued = false;
        let timer;

        const rebuild = () => {
          rebuildQueued = true;
          if (!rebuilding) {
            rebuilding = (async () => {
              while (rebuildQueued) {
                rebuildQueued = false;
                const corpus = await readSourceCorpus(fileURLToPath(config.srcDir));
                const assets = await compileFontAssets({ serif: corpus, cal: corpus, hand: corpus });
                middleware = devMiddleware(assets);
                logger.info(`开发字体已生成：${Math.round(assets.totalBytes / 1024)} KiB`);
              }
            })().finally(() => {
              rebuilding = undefined;
            });
          }
          return rebuilding;
        };

        await rebuild();
        server.middlewares.use((request, response, next) => middleware(request, response, next));
        const scheduleRebuild = (path) => {
          if (!path.startsWith(fileURLToPath(config.srcDir))) return;
          clearTimeout(timer);
          timer = setTimeout(() => rebuild().catch((error) => logger.error(error.message)), 120);
        };
        server.watcher.on('add', scheduleRebuild);
        server.watcher.on('change', scheduleRebuild);
        server.watcher.on('unlink', scheduleRebuild);
      },
      'astro:build:done': async ({ dir, logger }) => {
        const assets = await compileProductionFonts(dir, config.base);
        logger.info(`生产字体已生成：${assets.faces.length} 个文件，${Math.round(assets.totalBytes / 1024)} KiB`);
      },
    },
  };
}
