/**
 * Captures each screen at the Figma viewport (1440×1024) plus the responsive fallbacks.
 * Usage: npm run dev  →  npm run screenshots [-- http://localhost:5173]
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { chromium, type Page } from 'playwright';

const baseUrl = process.argv[2] ?? 'http://localhost:5173';
const outDir = path.resolve('docs/screenshots');

const DESKTOP = { width: 1440, height: 1024 };
const RESPONSIVE_WIDTHS = [1280, 1024, 768, 375];

async function shoot(page: Page, name: string, fullPage = false) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage });
  console.log(`captured ${name}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: DESKTOP, deviceScaleFactor: 1 });
  page.setDefaultTimeout(30_000);
  page.setDefaultNavigationTimeout(30_000);

  await page.goto(`${baseUrl}/sign-in`, { waitUntil: 'networkidle' });
  await shoot(page, 'sign-in@1440');

  await page.goto(`${baseUrl}/sign-up`, { waitUntil: 'networkidle' });
  await shoot(page, 'sign-up@1440');

  await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle' });
  await shoot(page, 'dashboard@1440');
  await shoot(page, 'dashboard@1440-full', true);

  await page.getByRole('button', { name: 'New Order' }).click();
  await page.getByRole('dialog').waitFor();
  await shoot(page, 'dashboard-new-order@1440');
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: 'Filter dashboard' }).click();
  await page.getByRole('dialog').waitFor();
  await shoot(page, 'dashboard-filter@1440');
  await page.keyboard.press('Escape');

  for (const width of RESPONSIVE_WIDTHS) {
    await page.setViewportSize({ width, height: 1024 });
    for (const route of ['sign-in', 'dashboard']) {
      await page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' });
      await shoot(page, `${route}@${width}`, true);
    }
  }

  await browser.close();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
