import { expect, Locator, Page } from "@playwright/test";

export const PAGE_URLS = {
    ELEMENTS: 'https://demoqa.com/elements',
    HOME: 'https://demoqa.com/',
    TEXT_BOX: 'https://demoqa.com/text-box',
    CHECKBOX: 'https://demoqa.com/checkbox',
    RADIO_BUTTON: 'https://demoqa.com/radio-button',
    WEB_TABLE: 'https://demoqa.com/webtables',
    BUTTONS: 'https://demoqa.com/buttons',
    LINKS: 'https://demoqa.com/links',
} as const;

export class BasePage {
    static readonly PAGE_URL: string = '';
    url: string;
    readonly page: Page;
    readonly logo: Locator;
    readonly homePageCards: Locator;
    readonly sideBarTextBoxLink: Locator;
    readonly sideBarCheckBoxLink: Locator;
    readonly sideBarRadioButtonLink: Locator;
    readonly sideBarWebTableLink: Locator;
    readonly sideBarButtonsLink: Locator;
    readonly sideBarLinksLink: Locator;

    constructor(page: Page, url: string) {
        this.url = url;
        this.page = page;
        this.homePageCards = this.page.locator('.category-cards a');
        this.logo = this.page.locator("a[href='https://demoqa.com'] img");
        this.sideBarTextBoxLink = this.page.getByRole('link', { 
            name: 'Text Box' 
        });
        this.sideBarCheckBoxLink = this.page.getByRole('link', { 
            name: 'Check Box' 
        });
        this.sideBarRadioButtonLink = this.page.getByRole('link', { 
            name: 'Radio Button' 
        });
        this.sideBarWebTableLink = this.page.getByRole('link', { 
            name: 'Web Tables' 
        });
        this.sideBarButtonsLink = this.page.getByRole('link', { 
            name: 'Buttons' 
        });
        this.sideBarLinksLink = this.page.getByRole('link', { 
            name: 'Links',
            exact: true 
        });
    }

    async navigateToHomePage() {
        await this.page.goto(PAGE_URLS.HOME, { 
            timeout: 10000, 
            waitUntil: 'domcontentloaded' 
        });
        await expect(this.logo, 'Verify logo is visible on Home Page').toBeVisible(
            { timeout: 10000 }
        );
    }

    /**
    * Navigates to the page represented by the current page object instance.
    *
    * The method uses the `url` defined in the page class constructor (`super(page, url)`)
    * to determine the navigation flow. Therefore, it must be called from the page
    * instance you want to navigate to.
    *
    * @example
    * await pageManager.textBoxPage.navigateToPage(); 
    * -- > Navigates to Text Box page
    *
    * @throws Error if navigation logic is not defined for the page's URL.
    */
    async navigateToPage(): Promise<void> {
        switch (this.url) {
            case PAGE_URLS.HOME:
                await this.navigateToHomePage();
                break;
            case PAGE_URLS.TEXT_BOX:
                await this.navigateToHomePage();
                await this.clickCatagoryCard(0);
                await this.sideBarTextBoxLink.click({ timeout: 5000 });
                await this.verifyPageLoaded();
                break;
            case PAGE_URLS.CHECKBOX:
                await this.navigateToHomePage();
                await this.clickCatagoryCard(0);
                await this.sideBarCheckBoxLink.click({ timeout: 5000 });
                await this.verifyPageLoaded();
                break;
            case PAGE_URLS.RADIO_BUTTON:
                await this.navigateToHomePage();
                await this.clickCatagoryCard(0);
                await this.sideBarRadioButtonLink.click({ timeout: 5000 });
                await this.verifyPageLoaded();
                break;
            case PAGE_URLS.WEB_TABLE:
                await this.navigateToHomePage();
                await this.clickCatagoryCard(0);
                await this.sideBarWebTableLink.click({ timeout: 5000 });
                await this.verifyPageLoaded();
                break;
            case PAGE_URLS.BUTTONS:
                await this.navigateToHomePage();
                await this.clickCatagoryCard(0);
                await this.sideBarButtonsLink.click({ timeout: 5000 });
                await this.verifyPageLoaded();
                break;
            case PAGE_URLS.LINKS:
                await this.navigateToHomePage();
                await this.clickCatagoryCard(0);
                await this.sideBarLinksLink.click({ timeout: 5000 });
                await this.verifyPageLoaded();
                break;
            default:
                throw new Error(
                    `No navigation flow defined in BasePage for URL: ${this.url}`
                );
        }
    }

    async clickCatagoryCard(zeroBasedCardIndex: number) {
        await this.homePageCards.nth(zeroBasedCardIndex).click({ timeout: 15000 });
        switch (zeroBasedCardIndex) {
            case 0:
                await expect(
                    this.page,
                    `Verify URL is: ${PAGE_URLS.ELEMENTS}`).toHaveURL(
                        PAGE_URLS.ELEMENTS, {
                        timeout: 15000, 
                    });
                break;
            default:
                throw new Error(
                    `No navigation flow defined in BasePage for category card index: ${zeroBasedCardIndex}`
                );
        }
    }

    async verifyPageLoaded() {
        await expect(this.page, `Verify URL is: ${this.url}`).toHaveURL(this.url, {
            timeout: 30000,
        });
        await expect(this.logo, 'Verify logo is visible on loaded page').toBeVisible(
            { timeout: 10000 }
        );
    }
}