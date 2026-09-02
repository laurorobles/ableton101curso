const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///Users/babyonk1/Desktop/CLASE/es/clase-01.html');
  await new Promise(r => setTimeout(r, 1000));
  await page.click('#n-kb');
  await new Promise(r => setTimeout(r, 1000));
  const svgHTML = await page.$eval('#routeSVG', el => el.innerHTML);
  console.log('SVG HTML:', svgHTML);
  await browser.close();
})();
