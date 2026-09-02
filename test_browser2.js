const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', error => console.log('ERR:', error.message));
  await page.goto('file:///Users/babyonk1/Desktop/CLASE/es/clase-01.html');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
