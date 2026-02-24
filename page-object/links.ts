import { expect, Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class Links extends BasePage {
    readonly homeSimpleLink: Locator;
    readonly homeDynamicLink: Locator;
    readonly createdLink: Locator;
    readonly noContentLink: Locator
    readonly movedLink: Locator;
    readonly badRequestLink: Locator
    readonly unauthorizedLink: Locator;
    readonly forbiddenLink: Locator;
    readonly notFoundLink: Locator;
    readonly outputMessage: Locator;

    constructor(page: Page) {
        super(page, PAGE_URLS.LINKS);
        this.homeSimpleLink = this.page.locator('#simpleLink');
        this.homeDynamicLink = this.page.locator('#dynamicLink');
        this.createdLink = this.page.locator('#created');
        this.noContentLink = this.page.locator('#no-content');
        this.movedLink = this.page.locator('#moved');
        this.badRequestLink = this.page.locator('#bad-request');
        this.unauthorizedLink = this.page.locator('#unauthorized');
        this.forbiddenLink = this.page.locator('#forbidden');
        this.notFoundLink = this.page.locator('#invalid-url');
        this.outputMessage = this.page.locator('#linkResponse');
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

    async clickApiLink(
        linkType:
            'created' |
            'no-content' |
            'moved' |
            'bad-request' |
            'unauthorized' |
            'forbidden' |
            'not-found'
    ) {
        let linkLocator: Locator;
        switch (linkType) {
            case 'created':
                linkLocator = this.createdLink;
                break;
            case 'no-content':
                linkLocator = this.noContentLink;
                break;
            case 'moved':
                linkLocator = this.movedLink;
                break;
            case 'bad-request':
                linkLocator = this.badRequestLink;
                break;
            case 'unauthorized':
                linkLocator = this.unauthorizedLink;
                break;
            case 'forbidden':
                linkLocator = this.forbiddenLink;
                break;
            case 'not-found':
                linkLocator = this.notFoundLink;
                break;
            default:
                throw new Error(`Invalid link type: ${linkType}`);
        }

        const expectedStatusCode = this.getExpectedStatusCode(linkType);
        const [response] = await Promise.all([
            this.page.waitForResponse(
                response =>
                    response.url().includes('demoqa.com') &&
                    response.status() === expectedStatusCode,
                { timeout: 10000 }
            ),
            linkLocator.click({ timeout: 5000 })
        ]);
        const actualStatusCode = response.status();
        expect(actualStatusCode,
            `Verify status code for ${linkType} link`).toBe(
                expectedStatusCode
            );

        await expect(this.outputMessage,
            `Verify output message for ${linkType} link`).toContainText(
                expectedStatusCode.toString(),
                { timeout: 5000 }
            );
    }

    getExpectedStatusCode(linkType: string): number {
        switch (linkType) {
            case 'created':
                return 201;
            case 'no-content':
                return 204;
            case 'moved':
                return 301;
            case 'bad-request':
                return 400;
            case 'unauthorized':
                return 401;
            case 'forbidden':
                return 403;
            case 'not-found':
                return 404;
            default:
                throw new Error(`Invalid link type: ${linkType}`);
        }
    }
}