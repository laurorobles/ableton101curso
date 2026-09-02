const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('file:///Users/babyonk1/Desktop/CLASE/es/clase-02.html');
  
  // Click the play button
  await page.click('#btn-play');
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Change slider
  await page.evaluate(() => {
    document.getElementById('tempo-slider').value = 100;
    document.getElementById('tempo-slider').dispatchEvent(new Event('input'));
  });
  
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
