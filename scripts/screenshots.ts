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
const RESPONSIVE_ROUTES = [
  { path: 'sign-in', name: 'sign-in' },
  { path: 'dashboard', name: 'dashboard' },
  { path: 'review/action-queue?tab=team', name: 'action-queue-team' },
  { path: 'review/sources/src-nova', name: 'sources-detail' },
];

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

  // Figma fills the first inbox row with `surface`; it is treated as the hover state.
  await page.goto(`${baseUrl}/review/action-queue`, { waitUntil: 'networkidle' });
  await page
    .getByRole('link', { name: /Inbound RFQ Replies/ })
    .first()
    .hover();
  await shoot(page, 'action-queue@1440');

  await page.goto(`${baseUrl}/review/action-queue/rfq-meridian`, { waitUntil: 'networkidle' });
  await shoot(page, 'action-queue-detail@1440-full', true);

  await page.goto(`${baseUrl}/review/action-queue?tab=team`, { waitUntil: 'networkidle' });
  await shoot(page, 'action-queue-team@1440');

  await page.goto(`${baseUrl}/review/action-queue/esc-meridian-tolerance`, {
    waitUntil: 'networkidle',
  });
  await shoot(page, 'action-queue-team-detail@1440');

  await page.goto(`${baseUrl}/review/sources`, { waitUntil: 'networkidle' });
  await page
    .getByRole('link', { name: /Delta Circuits/ })
    .first()
    .hover();
  await shoot(page, 'sources@1440');

  await page.goto(`${baseUrl}/review/sources/src-nova`, { waitUntil: 'networkidle' });
  await shoot(page, 'sources-detail@1440');

  for (const width of RESPONSIVE_WIDTHS) {
    await page.setViewportSize({ width, height: 1024 });
    for (const { path: route, name } of RESPONSIVE_ROUTES) {
      await page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' });
      await shoot(page, `${name}@${width}`, true);
    }
  }

  await browser.close();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
