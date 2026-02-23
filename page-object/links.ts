import { expect, Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class Links extends BasePage {
    readonly homeSimpleLink: Locator;
    readonly homeDynamicLink: Locator;

    constructor(page: Page) {
        super(page, PAGE_URLS.LINKS);
        this.homeSimpleLink = this.page.locator('#simpleLink');
        this.homeDynamicLink = this.page.locator('#dynamicLink');
    }

    async clickHomeLink(
        linkType: 'simple' | 'dynamic'
    ) {
        let linkLocator: Locator;
        switch (linkType) {
            case 'simple':
                linkLocator = this.homeSimpleLink;
                break;
            case 'dynamic':
                linkLocator = this.homeDynamicLink;
                break;
            default:
                throw new Error(`Invalid link type: ${linkType}`);
        }
        let [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            linkLocator.click({ timeout: 5000 })
        ]);
        await newPage.waitForLoadState();
        await expect(newPage,
            'Verify Home page is loaded on the new tab').toHaveURL(
                PAGE_URLS.HOME, { 
                    timeout: 5000 
                });
        await this.page.bringToFront();
    }
}