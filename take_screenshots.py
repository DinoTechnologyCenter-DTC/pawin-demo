import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    docs_dir = "/home/mrdino/Desktop/DTC/Pawin/pawin-frontend/docs"
    screenshots_dir = os.path.join(docs_dir, "screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        print("Navigating to Homepage...")
        await page.goto("http://localhost:5173/")
        await page.wait_for_timeout(2000)
        await page.screenshot(path=os.path.join(screenshots_dir, "home.png"))
        
        print("Navigating to Admin Login...")
        await page.goto("http://localhost:5173/#/admin-login")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(screenshots_dir, "admin_login.png"))
        
        print("Logging in to Admin Portal...")
        await page.fill('input[type="email"]', 'admindtc@pawinplc.com')
        await page.fill('input[type="password"]', 'admin123')
        await page.click('button[type="submit"]')
        await page.wait_for_timeout(2000)
        
        print("Navigating to Events...")
        await page.goto("http://localhost:5173/#/admin")
        await page.wait_for_timeout(2000)
        await page.click('button:has-text("Events")')
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(screenshots_dir, "admin_events.png"))

        print("Navigating to Media...")
        await page.click('button:has-text("Media")')
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(screenshots_dir, "admin_media.png"))

        print("Screenshots taken successfully!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
