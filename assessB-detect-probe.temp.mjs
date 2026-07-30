import puppeteer from 'puppeteer-core';

const LIVE_PORT = 8400;

const run = async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9333' });
  const pages = await browser.pages();
  let page = pages.find((p) => p.url().includes('localhost:4323/Beauty-salon'));
  if (!page) {
    page = await browser.newPage();
    await page.goto('http://localhost:4323/Beauty-salon/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } else {
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 15000 });
  }

  const consoleMsgs = [];
  page.on('console', (msg) => {
    consoleMsgs.push({ type: msg.type(), text: msg.text() });
  });
  page.on('pageerror', (err) => {
    consoleMsgs.push({ type: 'pageerror', text: String(err) });
  });

  await new Promise((r) => setTimeout(r, 1500));

  await page.addScriptTag({ url: `http://localhost:${LIVE_PORT}/detect.js` });

  await new Promise((r) => setTimeout(r, 3000));

  const impeccableMsgs = consoleMsgs.filter((m) => /impeccable/i.test(m.text));
  console.log('===ALL_CONSOLE_COUNT===', consoleMsgs.length);
  console.log('===IMPECCABLE_MSGS===');
  console.log(JSON.stringify(impeccableMsgs, null, 2));
  console.log('===ALL_MSGS_FALLBACK===');
  console.log(JSON.stringify(consoleMsgs, null, 2));

  await browser.disconnect();
};

run().catch((e) => {
  console.log(JSON.stringify({ ok: false, error: String((e && e.stack) || e) }));
  process.exit(1);
});
