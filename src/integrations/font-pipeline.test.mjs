import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import {
  codePointsToUnicodeRange,
  compileProductionFonts,
  extractHtmlCorpora,
  hashBuffer,
  injectFontMarkup,
  normalizeCorpus,
  parseUnicodeRanges,
  readRequiredFile,
  splitCorpusByCoverage,
} from './font-pipeline.mjs';

test('extracts visible text, attributes and font roles', () => {
  const corpora = extractHtmlCorpora(`
    <html><body aria-label="正文">
      <style>不应出现</style><script>也不应出现</script>
      <h1 data-font-role="cal" title="题">墨笺</h1>
      <p data-font-role="hand">闲记</p>
      <input placeholder="落笔" />
    </body></html>
  `);

  assert.ok([...'正文落笔'].every((char) => corpora.serif.includes(char)));
  assert.doesNotMatch(corpora.serif, /不应出现/);
  assert.ok([...'墨笺题'].every((char) => corpora.cal.includes(char)));
  assert.ok([...'闲记'].every((char) => corpora.hand.includes(char)));

  const plain = extractHtmlCorpora('<html><body>只有正文</body></html>');
  assert.equal(plain.cal, '');
  assert.equal(plain.hand, '');
});

test('keeps astral characters as one code point and emits compact ranges', () => {
  const corpus = normalizeCorpus('😀ABBA');
  assert.equal([...corpus].filter((char) => char === '😀').length, 1);
  assert.match(codePointsToUnicodeRange('ABC😀'), /U\+41-43/);
  assert.match(codePointsToUnicodeRange('ABC😀'), /U\+1F600/);
});

test('routes latin, Chinese and unsupported characters', () => {
  const result = splitCorpusByCoverage(
    'A墨😀',
    parseUnicodeRanges('U+0000-00FF'),
    parseUnicodeRanges('U+4E00-9FFF'),
  );
  assert.match(result.latin, /A/);
  assert.match(result.chinese, /墨/);
  assert.match(result.unsupported, /😀/);
});

test('hashes deterministically and requires one injection marker', () => {
  assert.equal(hashBuffer('墨笺'), hashBuffer('墨笺'));
  assert.equal(
    injectFontMarkup('<head><meta name="mojian-fonts" content="pending" /></head>', '<link href="fonts.css">'),
    '<head><link href="fonts.css"></head>',
  );
  assert.throws(() => injectFontMarkup('<head></head>', ''), /found 0/);
  assert.throws(() => injectFontMarkup(
    '<head><meta name="mojian-fonts" content="pending"><meta name="mojian-fonts" content="pending"></head>',
    '',
  ), /found 2/);
});

test('fails for missing font sources and missing HTML output', async () => {
  const output = await mkdtemp(join(tmpdir(), 'mojian-font-empty-'));
  try {
    await assert.rejects(readRequiredFile(join(output, 'missing.woff2'), 'font source'), /Missing required font source/);
    await assert.rejects(compileProductionFonts(pathToFileURL(`${output}/`), '/mojian/'), /No HTML output/);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});

test('identical HTML produces the same asset set without duplicates', async () => {
  const output = await mkdtemp(join(tmpdir(), 'mojian-font-repeat-'));
  const html = '<html><head><meta name="mojian-fonts" content="pending"></head><body data-font-role="serif"><h1 data-font-role="cal">墨笺</h1><p data-font-role="hand">闲记</p></body></html>';
  const outputUrl = pathToFileURL(`${output}/`);

  try {
    await writeFile(join(output, 'index.html'), html);
    await compileProductionFonts(outputUrl, '/mojian/');
    const first = (await readdir(join(output, '_fonts'))).filter((file) => /\.(?:css|woff2)$/.test(file)).sort();

    await writeFile(join(output, 'index.html'), html);
    await compileProductionFonts(outputUrl, '/mojian/');
    const second = (await readdir(join(output, '_fonts'))).filter((file) => /\.(?:css|woff2)$/.test(file)).sort();

    assert.deepEqual(second, first);
    assert.equal(second.length, new Set(second).size);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});
