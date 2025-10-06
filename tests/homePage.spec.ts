import { test, expect } from "@playwright/test";

test('TC-01 | Verify all cards are visible', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    const cards = page.locator('.top-card');
    for (let i = 0; i < await cards.count(); i++) {
        await expect(cards.nth(i),
            `Card #${i + 1} should be visible`).toBeVisible(
                { timeout: 3000 }
            );
    }
})

test('TC-02 | Verify all cards are clickable', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    const cards = page.locator('.top-card');
    for (let i = 0; i < await cards.count(); i++) {
        await expect.soft(cards.nth(i),
            `Card #${i + 1} should be clickable`).toBeEnabled(
                { timeout: 3000 }
            );
    }
})

test('TC-03 | Verify all cards texts matches visible', async ({ page }) => {
    const expectedTexts = [
        'Elements',
        'Forms',
        'Alerts, Frame & Windows',
        'Widgets',
        'Interactions',
        'Book Store Application'
    ];
    await page.goto('https://demoqa.com/');
    const cardTexts = page.locator('h5');
    for (let i = 0; i < await cardTexts.count(); i++) {
        await expect.soft(cardTexts.nth(i),
            `Card #${i + 1} should be: "${expectedTexts[i]}"`).toHaveText(
                expectedTexts[i],
                { timeout: 3000 }
            );
    }
})