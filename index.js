// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News first 30
  await page.goto("https://news.ycombinator.com/newest");

  // Pages to check
  const count = 100;

  // List of article dates
  const articleTimestamps = [];

  // While the article dates we've collected are less than 100
  while (articleTimestamps.length < count) {
    // Wait for the page to finish up loading ages of each article
    await page.waitForSelector("span.age");

    // Get the dates
    const datesOnPage = await page.$$eval("span.age", spans => // Finds all span elements with class "age" with $$eval
      spans.map(span => {
        const title = span.getAttribute("title") || ""; // Get the title attribute which contains the date
        const unixTime = title.split(" ")[1]; // Split the string by the date and unix time, keep the unix time
        return unixTime;
      })
    );

    // Append up to 100
    const needed = count - articleTimestamps.length;
    articleTimestamps.push(...datesOnPage.slice(0, needed));

    await page.getByRole('link', { name: 'More', exact: true }).click();
  }

  await browser.close();

  // Loop through the unix timestamps and check if they are in chronological order
  for (let i = 0; i < articleTimestamps.length - 1; i++) {
    const currentDate = parseInt(articleTimestamps[i]); // Parse the current date
    const nextDate = parseInt(articleTimestamps[i + 1]); // Parse the next date

    // Check if the current date is greater than the next date, if order is not correct return false
    if (currentDate < nextDate) {
      console.log("The articles are not in chronological order.");
      return false;
    }
  }

  // If the loop finishes fine, then they're in order
  console.log("The articles are in chronological order.");
  return true;
}  

(async () => {
  await sortHackerNewsArticles();
})();
