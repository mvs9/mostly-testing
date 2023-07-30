import { test, expect, chromium } from '@playwright/test';

let browser;

test.beforeEach(async ({page}) => {
  browser = await chromium.launch({ headless: false });
  await page.goto('https://mostly.ai/', { waitUntil: 'domcontentloaded' });
})

test.afterEach(async ({}) => {
  await browser.close();
})

test('verify bookmarks', async ({page}) => {
  const bookmarks = page.locator('#-mega-menu-3762-16-1690547245626-1');
  const liBookmarks = await bookmarks.locator('li').all();

  for (const nav of liBookmarks) {
      const textContent = nav.textContent;
      expect(textContent).toContain('Platform');
      expect(textContent).toContain('Synthetic Data');
      expect(textContent).toContain('Resources');
      expect(textContent).toContain('Company');
      expect(textContent).toContain('Pricing');
  }
})

test('verify search result', async ({page}) => {
  await page.click('#open-header-search-4002-16-icon');
  const search = page.locator('input[type="search"]');
  await search.fill('sythetic')
  await search.press('Enter');
  await page.waitForURL('https://mostly.ai/?s=sythetic');

  const textContent = await page.locator('h1#headline-274-1315').textContent();
  expect(textContent).toEqual('Sorry, no results for:');

  const wordContent = await page.locator('h1#code_block-275-1315').textContent();
  expect(wordContent).toEqual('sythetic');
})

test('verify contact form', async ({page}) => {
  page.click('#section-5814-3616');
  const privacyAccept = page.locator('text="ACCEPT"')
  if (await privacyAccept.isEnabled()) {
    await privacyAccept.click();
  }

  const cssSelector = 'li span.oxy-mega-dropdown_link-text:has-text("Company")';
  await page.waitForSelector(cssSelector);
  await page.locator(cssSelector).hover();
  await page.click('#link-3983-16');

  await page.click('#div_block-85-106');
  await page.waitForSelector('#hsForm_27854f4c-b840-41f2-b7af-a3c9f512c9e8');
  await page.locator('input[name="firstname"]').fill('Marielle');
  await page.locator('input[name="lastname"]').fill('Valdez');
  await page.locator('input[name="email"]').fill('marielle@mostly.ai');
  await page.locator('input[name="mobilephone"]').fill('07123456789');
  await page.locator('input[name="company"]').fill('MOSTLY.AI');
  await page.locator('select[name="country"]').selectOption('United Kingdom');
  await page.locator('input[name="how_did_you_hear_about_mostly_ai___free_text"]').fill('LinkedIn');
  await page.locator('textarea[name="message"]').fill('Hello! Please can I get a demo of the product?');
  await page.locator('input[name="LEGAL_CONSENT.subscription_type_5594858"]').click();
  await page.locator('input[value="SEND MESSAGE"]').hover();

  const sendMessage = page.locator('input[value="SEND MESSAGE"]');
  const actualSendMessageCSS = await sendMessage.evaluate(
    (el) => window.getComputedStyle(el).getPropertyValue('background-image')
  );
  const expectSendMessageCSS = 'linear-gradient(90deg, rgb(61, 79, 255), rgb(120, 143, 255), rgb(36, 219, 150), rgb(199, 255, 0))';
  expect(actualSendMessageCSS).toBe(expectSendMessageCSS);
})