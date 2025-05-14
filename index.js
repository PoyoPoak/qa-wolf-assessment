// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News first 30
  await page.goto("https://news.ycombinator.com/newest");

  // navigate by URL
  await page.goto("https://news.ycombinator.com/newest?n=31");
  await page.goto("https://news.ycombinator.com/newest?n=61");
  await page.goto("https://news.ycombinator.com/newest?n=91");

  // navigate by clicking the "More" link
  // await page.getByRole('link', { name: 'More', exact: true }).click();
  // await page.getByRole('link', { name: 'More', exact: true }).click();
  // await page.getByRole('link', { name: 'More', exact: true }).click();
}  

(async () => {
  await sortHackerNewsArticles();
})();
