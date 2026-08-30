import { expect, test, type Page } from '@playwright/test';

type PagefindTiming = {
  initDelay?: number;
  searchDelays?: Record<string, number>;
};

const servePagefind = (page: Page, { initDelay = 0, searchDelays = {} }: PagefindTiming = {}) =>
  page.route('**/pagefind/pagefind.js', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `
        const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        const searchDelays = ${JSON.stringify(searchDelays)};
        export async function init() {
          await wait(${initDelay});
        }
        export async function search(query) {
          await wait(searchDelays[query] ?? 0);
          return {
            results: [{
              data: async () => ({
                url: '/mojian/journal/mock/',
                excerpt: '<mark>' + query + '</mark>',
                meta: { title: query + ' · 墨笺' },
              }),
            }],
          };
        }
      `,
    }),
  );

const delaySketchbookPages = (page: Page, delay = 2500) =>
  page.route(
    /\/mojian\/_astro\/(?:cover|journal|projects|gallery|about|guestbook)(?:-unified)?\..+\.webp$/,
    async (route) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await route.continue();
    },
  );

const dispatchTestPageSwap = (page: Page, destination: string) =>
  page.evaluate((url) => {
    let skipped = false;
    const event = new Event('pageswap');
    Object.defineProperties(event, {
      viewTransition: { value: { skipTransition: () => (skipped = true) } },
      activation: { value: { entry: { url } } },
    });
    window.dispatchEvent(event);
    return skipped;
  }, destination);

test('键盘跨页会跳过拉卷过渡', async ({ page }) => {
  await page.goto('.');

  const journalLink = page
    .getByRole('navigation', { name: '主导航' })
    .getByRole('link', { name: '笺录' });
  const journalHref = await journalLink.evaluate((link) => (link as HTMLAnchorElement).href);
  await journalLink.focus();
  await journalLink.evaluate((link) => {
    link.addEventListener('click', (event) => event.preventDefault(), { once: true });
    (link as HTMLAnchorElement).click();
  });

  expect(await dispatchTestPageSwap(page, journalHref)).toBe(true);
});

test('主指针跨页仍保留拉卷过渡', async ({ page }) => {
  await page.goto('.');
  const journalLink = page
    .getByRole('navigation', { name: '主导航' })
    .getByRole('link', { name: '笺录' });
  const journalHref = await journalLink.evaluate((link) => (link as HTMLAnchorElement).href);
  await journalLink.evaluate((link) => {
    link.addEventListener('click', (event) => event.preventDefault(), { once: true });
    link.dispatchEvent(
      new MouseEvent('click', { bubbles: true, button: 0, cancelable: true, detail: 1 }),
    );
  });

  expect(await dispatchTestPageSwap(page, journalHref)).toBe(false);
});

test('灯箱快速切换不会让新幻灯片重复曝光', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.addInitScript(() => {
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('gallery/');
  const island = page.locator('astro-island[component-url*="GalleryLightbox"]');
  await expect.poll(() => island.getAttribute('ssr'), { timeout: 30_000 }).toBeNull();
  await page
    .getByRole('button', { name: /放大查看/ })
    .first()
    .click();

  const currentFrame = page.locator('.yarl__slide_current .ink-lightbox__negative');
  await expect(currentFrame).toBeVisible();
  await expect(currentFrame).toHaveClass(/ink-lightbox__negative--enter/);
  const openingSrc = await currentFrame.locator('img').getAttribute('src');
  await page.waitForTimeout(30);
  await page
    .getByRole('button', { name: '下一幅' })
    .evaluate((button: HTMLButtonElement) => button.click());

  await expect.poll(() => currentFrame.locator('img').getAttribute('src')).not.toBe(openingSrc);
  const animations = await currentFrame.evaluate((frame) => ({
    frame: getComputedStyle(frame).animationName,
    exposure: getComputedStyle(frame, '::after').animationName,
  }));
  expect(animations).toEqual({ frame: 'none', exposure: 'none' });
  expect(consoleErrors).toEqual([]);
});

test('灯箱键盘打开会直接显示稳定底片', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('gallery/');
  const island = page.locator('astro-island[component-url*="GalleryLightbox"]');
  await expect.poll(() => island.getAttribute('ssr'), { timeout: 30_000 }).toBeNull();
  const trigger = page.getByRole('button', { name: /放大查看/ }).first();

  await trigger.focus();
  await page.keyboard.press('Enter');

  const currentFrame = page.locator('.yarl__slide_current .ink-lightbox__negative');
  expect(await currentFrame.getAttribute('class')).not.toContain('ink-lightbox__negative--enter');
});

test('灯箱方向键切换会同步显示下一幅', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('gallery/');
  const island = page.locator('astro-island[component-url*="GalleryLightbox"]');
  await expect.poll(() => island.getAttribute('ssr'), { timeout: 30_000 }).toBeNull();
  const trigger = page.getByRole('button', { name: /放大查看/ }).first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  const currentImage = page.locator('.yarl__slide_current .yarl__slide_image');
  const openingSrc = await currentImage.getAttribute('src');

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(16);

  expect(await currentImage.getAttribute('src')).not.toBe(openingSrc);
});

test('灯箱键盘关闭即时完成，指针翻幅保留动效', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('gallery/');
  const island = page.locator('astro-island[component-url*="GalleryLightbox"]');
  await expect.poll(() => island.getAttribute('ssr'), { timeout: 30_000 }).toBeNull();
  const trigger = page.getByRole('button', { name: /放大查看/ }).first();

  await trigger.click();
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: '下一幅' }).click();
  const runningPointerAnimations = await page
    .locator('.yarl__root')
    .evaluate(
      (root) =>
        root
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    );
  expect(runningPointerAnimations).toBeGreaterThan(0);

  await page.keyboard.press('Escape');
  expect(await page.getByRole('dialog').count()).toBe(0);
});

test('Pagefind 初始化期间输入会在就绪后执行', async ({ page }) => {
  await servePagefind(page, { initDelay: 1200 });

  await page.goto('journal/');
  const input = page.getByRole('searchbox', { name: '检索笺录文章' });
  await expect(input).toBeEditable();
  await input.fill('初始化查询');

  await expect(page.getByRole('link', { name: /初始化查询/ })).toBeVisible({ timeout: 4000 });
});

test('较慢的旧搜索不会覆盖最新查询', async ({ page }) => {
  await servePagefind(page, { searchDelays: { 旧查询: 800, 新查询: 100 } });

  await page.goto('journal/');
  const input = page.getByRole('searchbox', { name: '检索笺录文章' });
  await expect(input).toBeEditable();
  await input.fill('旧查询');
  await page.waitForTimeout(250);
  await input.fill('新查询');

  const result = page.locator('.search-island ol');
  await expect(result).toContainText('新查询');
  await page.waitForTimeout(800);
  await expect(result).toContainText('新查询');
  await expect(result).not.toContainText('旧查询');
});

test('Storage 被禁用时首屏与主题切换仍可用', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperties(Storage.prototype, {
      getItem: {
        configurable: true,
        value: () => {
          throw new Error('Storage blocked');
        },
      },
      setItem: {
        configurable: true,
        value: () => {
          throw new Error('Storage blocked');
        },
      },
    });
  });
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('.');
  await expect(page.locator('html')).toHaveClass(/\bjs\b/);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('status', { name: '当前卷' })).toContainText('卷首');
  await expect(page.getByRole('button', { name: '下一卷' })).toBeEnabled();
  const toggle = page.getByRole('button', { name: '切换昼夜主题' });
  const pressed = await toggle.getAttribute('aria-pressed');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-pressed', pressed === 'true' ? 'false' : 'true');
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(pageErrors).toEqual([]);
});

test('主题键盘切换不会播放印钮字形过渡', async ({ page }) => {
  await page.goto('.');
  const toggle = page.getByRole('button', { name: '切换昼夜主题' });
  await toggle.focus();
  await page.keyboard.press('Enter');

  const runningGlyphAnimations = await toggle
    .locator('.theme-glyph')
    .evaluateAll((glyphs) =>
      glyphs
        .flatMap((glyph) => glyph.getAnimations())
        .filter((animation) => animation.playState === 'running'),
    );
  expect(runningGlyphAnimations).toHaveLength(0);
});

test('移动卷目键盘开合不会播放面板动画', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('journal/');
  const details = page.locator('[data-mobile-nav]');
  const summary = details.locator('summary');
  const panel = details.locator('.mobile-nav__panel');

  await summary.focus();
  await page.keyboard.press('Enter');
  expect(await panel.evaluate((element) => element.getAnimations().length)).toBe(0);

  await page.keyboard.press('Escape');
  expect(await details.getAttribute('open')).toBeNull();
  await expect(summary).toBeFocused();
});

test('移动卷目支持键盘、外点关闭与跨断点清理', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('journal/');

  const details = page.locator('[data-mobile-nav]');
  const summary = details.locator('summary');
  await expect(details).not.toHaveAttribute('open', '');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await expect(details.getByRole('link')).toHaveCount(6);
  const linkHeights = await details
    .getByRole('link')
    .evaluateAll((links) => links.map((link) => link.getBoundingClientRect().height));
  expect(linkHeights.every((height) => height >= 44)).toBe(true);

  await summary.dispatchEvent('click', { button: 0, detail: 1 });
  await expect(details).toHaveAttribute('data-closing', '');
  await summary.dispatchEvent('click', { button: 0, detail: 1 });
  await expect(details).toHaveAttribute('open', '');
  await expect(details).not.toHaveAttribute('data-closing');

  await page.keyboard.press('Escape');
  await expect(details).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();

  await page.keyboard.press('Space');
  await expect(details).toHaveAttribute('open', '');
  await page.locator('main').dispatchEvent('pointerdown');
  await expect(details).not.toHaveAttribute('open', '');

  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await page.setViewportSize({ width: 700, height: 844 });
  await expect(details).not.toHaveAttribute('open', '');

  await page.setViewportSize({ width: 320, height: 844 });
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('列表键盘聚焦只保留即时视觉终态', async ({ page }) => {
  await page.goto('projects/');
  await page.waitForTimeout(1000);
  const project = page.locator('.project-index__item').first();
  const projectMedia = project.locator('.project-index__media');
  const projectTransform = await projectMedia.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await project.locator('.project-index__copy a').focus();
  await page.waitForTimeout(16);
  expect(await projectMedia.evaluate((element) => getComputedStyle(element).transform)).toBe(
    projectTransform,
  );
  expect(
    await project.evaluate(
      (element) =>
        element
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0);

  await page.goto('.');
  await page.waitForTimeout(1000);
  const preview = page.locator('.project-preview__item').first();
  const previewImage = preview.locator('.project-preview__image');
  const previewTransform = await previewImage.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await preview.locator('.project-preview__copy a').focus();
  await page.waitForTimeout(16);
  expect(await previewImage.evaluate((element) => getComputedStyle(element).transform)).toBe(
    previewTransform,
  );
  expect(
    await preview.evaluate(
      (element) =>
        element
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0);

  await page.goto('gallery/');
  await page.waitForTimeout(1000);
  const galleryEntry = page.locator('.gallery-entry').first();
  const galleryTransform = await galleryEntry.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await galleryEntry.locator('.gallery-entry__image').focus();
  await page.waitForTimeout(16);
  expect(await galleryEntry.evaluate((element) => getComputedStyle(element).transform)).toBe(
    galleryTransform,
  );
  expect(
    await galleryEntry.evaluate(
      (element) =>
        element
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0);
  await expect(galleryEntry.locator('.gallery-entry__zoom')).toHaveCSS('opacity', '1');

  await page.goto('journal/');
  await page.waitForTimeout(1000);
  const journalEntry = page.locator('.entry-list > li').first();
  await journalEntry.locator('h3 a').focus();
  await page.waitForTimeout(16);
  expect(
    await journalEntry.evaluate(
      (element) =>
        element
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0);
  expect(
    await journalEntry.evaluate((element) => getComputedStyle(element, '::before').opacity),
  ).toBe('1');

  const search = page.getByRole('searchbox', { name: '检索笺录文章' });
  await search.focus();
  const searchLine = search.locator('xpath=following-sibling::span[1]');
  expect(
    await searchLine.evaluate(
      (element) =>
        element.getAnimations().filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0);
  await expect(searchLine).toHaveCSS('scale', '1');
});

test('Header 不插值模糊，粗指针 Hero 箭头不缩放', async ({ page, browser }) => {
  await page.goto('.');
  const transitionProperties = await page
    .locator('.site-header')
    .evaluate((header) => getComputedStyle(header).transitionProperty.split(', '));
  expect(transitionProperties).not.toContain('backdrop-filter');

  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 1024, height: 768 },
  });
  const touchPage = await context.newPage();
  await touchPage.addInitScript(() => sessionStorage.setItem('mojian:hero-intro:v1', '1'));
  await touchPage.goto('http://127.0.0.1:4322/mojian/');
  const next = touchPage.getByRole('button', { name: '下一卷' });
  const initialTransform = await next.evaluate((button) => getComputedStyle(button).transform);
  const bounds = await next.boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) await touchPage.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  expect(await next.evaluate((button) => getComputedStyle(button).transform)).toBe(
    initialTransform,
  );
  await context.close();
});

test('Hero 方向键只在册页焦点域生效', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('mojian:hero-intro:v1', '1'));
  await page.goto('.');
  const current = page.getByRole('status', { name: '当前卷' });

  await page.locator('#main-content').focus();
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(800);

  await expect(current).toContainText('卷首');
});

test('Hero 键盘翻页会同步进入终态', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('mojian:hero-intro:v1', '1'));
  await page.goto('.');
  const book = page.getByRole('group', { name: '可翻页素描本' });
  const current = page.getByRole('status', { name: '当前卷' });

  await book.focus();
  await page.keyboard.press('ArrowLeft');

  expect(await current.textContent()).toContain('留墨');
});

test('Hero 键盘缩放会同步进入终态', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('mojian:hero-intro:v1', '1'));
  await page.goto('.');
  const zoomIn = page.getByRole('button', { name: '放大素描本' });
  const status = page.getByRole('status', { name: '素描本缩放' });

  await zoomIn.focus();
  await page.keyboard.press('Enter');

  expect(await status.textContent()).toContain('110%');
  expect(
    await page.getByRole('group', { name: '可翻页素描本' }).evaluate((book) => {
      const wrap = book.closest<HTMLElement>('.sketchbook__book-wrap');
      return wrap ? getComputedStyle(wrap).getPropertyValue('--book-scale') : '';
    }),
  ).toBe('1.1000');
});

test('可翻页 Hero 支持拖拽、回弹、循环、键盘、缩放与稳定后导航', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('mojian:hero-intro:v1', '1'));
  await page.goto('.');

  const book = page.getByRole('group', { name: '可翻页素描本' });
  const current = page.getByRole('status', { name: '当前卷' });
  const seal = book.getByRole('link');
  const bounds = await book.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) return;

  await page.mouse.move(bounds.x + bounds.width * 0.82, bounds.y + bounds.height * 0.62);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.24, bounds.y + bounds.height * 0.62, {
    steps: 8,
  });
  await expect(seal).toHaveAttribute('aria-disabled', 'true');
  await page.mouse.up();
  await expect(current).toContainText('笺录');

  await page.mouse.move(bounds.x + bounds.width * 0.82, bounds.y + bounds.height * 0.62);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.69, bounds.y + bounds.height * 0.62, {
    steps: 4,
  });
  await page.waitForTimeout(120);
  await page.mouse.move(bounds.x + bounds.width * 0.69, bounds.y + bounds.height * 0.62);
  await page.mouse.up();
  await expect(current).toContainText('笺录');
  await expect(book.getByRole('link')).not.toHaveAttribute('aria-disabled', 'true');

  await page.mouse.move(bounds.x + bounds.width * 0.18, bounds.y + bounds.height * 0.62);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.78, bounds.y + bounds.height * 0.62, {
    steps: 8,
  });
  await page.mouse.up();
  await expect(current).toContainText('卷首');

  await book.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(current).toContainText('留墨');
  await page.keyboard.press('ArrowRight');
  await expect(current).toContainText('卷首');

  await page.getByRole('button', { name: '放大素描本' }).click();
  await expect(page.getByRole('status', { name: '素描本缩放' })).toContainText('110%');
  await book.dblclick();
  await expect(page.getByRole('status', { name: '素描本缩放' })).toContainText('100%');

  await page.getByRole('button', { name: '下一卷' }).click();
  await expect(current).toContainText('笺录');
  const journalSeal = page.getByRole('link', { name: '进入笺录' });
  await expect(journalSeal).not.toHaveAttribute('aria-disabled', 'true');
  await expect(journalSeal).toHaveAttribute('href', '/mojian/journal/');
  await journalSeal.click();
  await expect(page).toHaveURL(/\/mojian\/journal\/$/);
});

test('Hero 开场每会话一次，并在移动端与低动态下保持完整终态', async ({ page }) => {
  await page.goto('.');
  const current = page.getByRole('status', { name: '当前卷' });
  const next = page.getByRole('button', { name: '下一卷' });

  await expect.poll(() => current.textContent(), { timeout: 3000 }).not.toContain('卷首');
  await expect(current).toContainText('卷首', { timeout: 6000 });
  await expect(next).toBeEnabled();

  await page.reload();
  await expect(current).toContainText('卷首');
  await page.waitForTimeout(800);
  await expect(current).toContainText('卷首');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => sessionStorage.removeItem('mojian:hero-intro:v1'));
  await page.reload();
  await expect.poll(() => current.textContent(), { timeout: 3000 }).not.toContain('卷首');
  await expect(current).toContainText('卷首', { timeout: 6000 });
  await expect(next).toBeEnabled();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => sessionStorage.removeItem('mojian:hero-intro:v1'));
  await page.reload();
  await expect(current).toContainText('卷首');
  await expect(next).toBeEnabled();
  await page.waitForTimeout(800);
  await expect(current).toContainText('卷首');
});

test('Hero 预载期间的方向键会终止开场并只执行用户翻页', async ({ page }) => {
  await delaySketchbookPages(page);

  await page.goto('.', { waitUntil: 'domcontentloaded' });
  const book = page.getByRole('group', { name: '可翻页素描本' });
  const current = page.getByRole('status', { name: '当前卷' });
  const next = page.getByRole('button', { name: '下一卷' });

  await book.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(current).toContainText('留墨');
  await expect(next).toBeEnabled({ timeout: 1800 });

  const settledPage = await current.textContent();
  await page.waitForTimeout(3200);
  await expect(current).toHaveText(settledPage ?? '');
});

test('Hero 预载期间的外侧箭头可以接管并终止开场', async ({ page }) => {
  await delaySketchbookPages(page);

  await page.goto('.', { waitUntil: 'domcontentloaded' });
  const current = page.getByRole('status', { name: '当前卷' });
  const previous = page.getByRole('button', { name: '上一卷' });

  await expect(previous).toBeEnabled({ timeout: 800 });
  await previous.click();
  await expect(current).toContainText('留墨');
  await expect(previous).toBeEnabled();

  const settledPage = await current.textContent();
  await page.waitForTimeout(3200);
  await expect(current).toHaveText(settledPage ?? '');
});

test('Hero 翻动开场中的方向键会结算当前页且不再续播', async ({ page }) => {
  await page.goto('.');
  const book = page.getByRole('group', { name: '可翻页素描本' });
  const current = page.getByRole('status', { name: '当前卷' });
  const next = page.getByRole('button', { name: '下一卷' });

  await expect.poll(() => current.textContent(), { timeout: 3000 }).not.toContain('卷首');
  await book.focus();
  await page.keyboard.press('ArrowRight');
  await expect(next).toBeEnabled({ timeout: 2000 });

  const settledPage = await current.textContent();
  await page.waitForTimeout(2200);
  await expect(current).toHaveText(settledPage ?? '');
});

test('无 JavaScript 时卷首册页和六个路由入口仍可访问', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/mojian/');

  await expect(
    page
      .getByRole('group', { name: '可翻页素描本' })
      .getByRole('heading', { name: '墨笺', exact: true }),
  ).toBeVisible();
  const routes = page.getByRole('navigation', { name: '六卷入口' });
  await expect(routes.getByRole('link')).toHaveCount(6);
  await expect(routes.getByRole('link', { name: '笺录' })).toHaveAttribute(
    'href',
    '/mojian/journal/',
  );
  await context.close();
});
