import { Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class CheckBox extends BasePage {
    readonly expandAllButton: Locator;
    readonly checkBox: Locator;
    
    constructor(page: Page) {
        super(page, PAGE_URLS.CHECKBOX);
        this.expandAllButton = this.page.locator('span.rc-tree-switcher_close');
        this.checkBox = this.page.getByRole('checkbox');
    }
}