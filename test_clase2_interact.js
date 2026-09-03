const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log(`LOG [${msg.type()}]:`, msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));
  
  await page.goto('file:///Users/babyonk1/Desktop/CLASE/es/clase-02.html', {waitUntil: 'networkidle0'});
  console.log("Page loaded. Clicking Play...");
  
  try {
    await page.click('#btn-play'); // The M3 play button
    await new Promise(r => setTimeout(r, 1000));
  } catch (e) {
    console.log("Failed to click play:", e.message);
  }
  
  await browser.close();
})();
