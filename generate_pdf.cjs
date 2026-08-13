const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const manualContent = [];

  const capturePage = async (title, url, needsLogin = false) => {
    console.log(`Capturing ${title} at ${url}...`);
    try {
      if (needsLogin) {
        await page.goto('http://localhost:5173/#/admin-login', { waitUntil: 'networkidle2' });
        await page.waitForSelector('input[type="email"]');
        // Clear inputs just in case
        await page.click('input[type="email"]', { clickCount: 3 });
        await page.type('input[type="email"]', 'admindtc@pawinplc.com');
        await page.click('input[type="password"]', { clickCount: 3 });
        await page.type('input[type="password"]', 'admin123'); // From AUTH.md default
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000); 
      }

      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForTimeout(2000); // give animations time to settle

      const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });
      
      manualContent.push(`
        <div style="page-break-after: always; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="padding: 20px; background: #0d1117; color: white; border-bottom: 4px solid #ffae1f;">
            <h1 style="margin: 0;">${title}</h1>
            <p style="margin: 5px 0 0 0; color: #888;">URL: ${url}</p>
          </div>
          <div style="padding: 20px; text-align: center; background: #f0f0f0;">
            <img src="data:image/png;base64,${screenshot}" style="max-width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
          </div>
        </div>
      `);
      console.log(`Successfully captured ${title}`);
    } catch (err) {
      console.error(`Error capturing ${title}:`, err);
    }
  };

  await capturePage('1. Homepage', 'http://localhost:5173/');
  await capturePage('2. About Us', 'http://localhost:5173/#/about');
  await capturePage('3. Contact Page', 'http://localhost:5173/#/contact');
  await capturePage('4. Admin Login', 'http://localhost:5173/#/admin-login');
  await capturePage('5. Admin Dashboard', 'http://localhost:5173/#/admin', true);

  console.log('Generating PDF...');
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>PAWIN PLC - Visual Site Manual</title>
        <style>
          body { margin: 0; padding: 0; background-color: #fff; }
          .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; background: #05070a; color: white; font-family: 'Segoe UI', sans-serif; page-break-after: always; }
          .cover h1 { font-size: 56px; margin: 0; background: linear-gradient(to right, #ffae1f, #fe4f51); -webkit-background-clip: text; color: transparent; }
          .cover h2 { font-size: 28px; color: #888; font-weight: normal; margin-top: 10px; }
          .cover p { margin-top: 50px; color: #555; }
        </style>
      </head>
      <body>
        <div class="cover">
          <h1>PAWIN PLC</h1>
          <h2>Complete Visual Site Manual</h2>
          <p>Automatically Generated Documentation</p>
        </div>
        ${manualContent.join('')}
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const outputPath = '/home/mrdino/Desktop/DTC/Pawin/pawin-frontend/docs/PAWIN_Site_Manual.pdf';
  await page.pdf({ 
    path: outputPath, 
    format: 'A4', 
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  console.log('PDF saved to: ' + outputPath);

  await browser.close();
})();
