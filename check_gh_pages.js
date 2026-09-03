const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  
  for (let cls of ['index.html', 'es/clase-01.html', 'es/clase-02.html', 'es/clase-03.html']) {
    console.log(`\n--- Checking ${cls} on GitHub Pages ---`);
    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') console.log(`GH LOG [${msg.type()}]:`, msg.text());
    });
    page.on('pageerror', err => console.log('GH ERR:', err.message));
    page.on('requestfailed', request => {
      console.log(`GH REQ FAILED: ${request.url()} - ${request.failure().errorText}`);
    });
    
    await page.goto('https://laurorobles.github.io/ableton101curso/' + cls, {waitUntil: 'networkidle0'});
    await page.close();
  }
  
  await browser.close();
})();
