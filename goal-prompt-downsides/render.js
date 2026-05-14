#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SLIDES_DIR = path.join(__dirname, 'slides');
const PNG_DIR = path.join(__dirname, 'png');
fs.mkdirSync(PNG_DIR, { recursive: true });

(async () => {
  const files = fs
    .readdirSync(SLIDES_DIR)
    .filter((f) => f.endsWith('.html'))
    .sort();

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
  });

  for (const file of files) {
    const url = 'file://' + path.join(SLIDES_DIR, file);
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(PNG_DIR, file.replace(/\.html$/, '.png'));
    await page.screenshot({
      path: out,
      clip: { x: 0, y: 0, width: 1080, height: 1920 },
    });
    await page.close();
    console.log('rendered', path.basename(out));
  }

  await browser.close();
})();
