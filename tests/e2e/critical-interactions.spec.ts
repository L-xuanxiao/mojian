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
  const toggle = page.getByRole('button', { name: '切换昼夜主题' });
  const pressed = await toggle.getAttribute('aria-pressed');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-pressed', pressed === 'true' ? 'false' : 'true');
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(pageErrors).toEqual([]);
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

  await summary.evaluate((element: HTMLElement) => element.click());
  await expect(details).toHaveAttribute('data-closing', '');
  await summary.evaluate((element: HTMLElement) => element.click());
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

test('Hero 首访、主动跳过、回访与低动态终态保持一致', async ({ page }) => {
  await page.goto('.');
  await page.evaluate(() => sessionStorage.removeItem('mojian:hero-intro:v1'));
  await page.reload();

  const hero = page.locator('[data-hero]');
  await expect(hero).toHaveAttribute('data-hero-intro', 'full');
  await page.mouse.wheel(0, 16);
  await expect(hero).toHaveClass(/hero--intro-complete/);
  await expect(hero.locator('.hero-title-line').first()).toBeVisible();

  await page.reload();
  await expect(hero).toHaveAttribute('data-hero-intro', 'short');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => sessionStorage.removeItem('mojian:hero-intro:v1'));
  await page.reload();
  await expect(hero).toHaveAttribute('data-hero-intro', 'light');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(hero).not.toHaveAttribute('data-hero-intro');
  await expect(hero.locator('.hero-title-line').first()).toBeVisible();
});
