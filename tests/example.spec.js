const { test, expect } = require('@playwright/test');

test('Articles are in descending chronological order', async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");

    const count = 100;
    const articleTimestamps = [];

    while (articleTimestamps.length < count) {
        await page.waitForSelector('span.age');

        const newTimestamps = await page.$$eval('span.age', spans =>
            spans.map(span => {
                const title = span.getAttribute('title') || '';
                const unixTime = title.split(' ')[1];
                return unixTime;
            })
        );

        const needed = count - articleTimestamps.length;
        articleTimestamps.push(...newTimestamps.slice(0, needed));

        await page.getByRole('link', { name: 'More', exact: true }).click();
    }

    for (let i = 0; i < articleTimestamps.length - 1; i++) {
        const currentDate = parseInt(articleTimestamps[i]); 
        const nextDate = parseInt(articleTimestamps[i + 1]); 
        expect(currentDate).toBeGreaterThanOrEqual(nextDate,
            `Timestamp at index ${i} (${articleTimestamps[i]}) should be >= index ${i + 1} (${articleTimestamps[i + 1]})`
        );
    }
});