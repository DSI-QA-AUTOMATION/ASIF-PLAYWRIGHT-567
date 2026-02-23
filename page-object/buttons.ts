import { Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class Buttons extends BasePage {
    readonly doubleClickButton: Locator;
    readonly rightClickButton: Locator
    readonly clickMeButton: Locator;
    readonly doubleClickMessage: Locator;
    readonly rightClickMessage: Locator
    readonly clickMeMessage: Locator;
    
    constructor(page: Page) {
        super(page, PAGE_URLS.BUTTONS);
        this.doubleClickButton = this.page.getByRole('button', { 
            name: 'Double Click Me' 
        });
        this.rightClickButton = this.page.getByRole('button', { 
            name: 'Right Click Me' 
        });
        this.clickMeButton = this.page.getByRole('button', { 
            name: 'Click Me', 
            exact: true 
        });
        this.doubleClickMessage = this.page.locator('#doubleClickMessage');
        this.rightClickMessage = this.page.locator('#rightClickMessage');
        this.clickMeMessage = this.page.locator('#dynamicClickMessage');
    }
}