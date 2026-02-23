import { Page, expect } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class HomePage extends BasePage {
    readonly catagoryCardTitles: string[] =
        [
            'Elements',
            'Forms',
            'Alerts, Frame & Windows',
            'Widgets',
            'Interactions',
            'Book Store Application'
        ];

    constructor(page: Page) {
        super(page, PAGE_URLS.HOME);
    }

    async verifyCategoryCards() {
        await expect(this.homePageCards,
            `Verify all ${this.catagoryCardTitles.length} main categories are visible`)
            .toHaveCount(this.catagoryCardTitles.length,
                { timeout: 3000 });
        for (let i = 0; i < this.catagoryCardTitles.length; i++) {
            await expect(this.homePageCards.nth(i),
                `Verify category #${i + 1} is visible`).toBeVisible(
                    { timeout: 3000 });
            await expect(this.homePageCards.nth(i),
                `Verify category #${i + 1} is enabled`).toBeEnabled(
                    { timeout: 3000 });
            await expect(this.homePageCards.nth(i),
                `Verify category #${i + 1} text matches`).toHaveText(
                    this.catagoryCardTitles[i],
                    { timeout: 3000 });
        }
    }
}