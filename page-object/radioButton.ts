import { expect, Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class RadioButton extends BasePage {
    readonly yesRadioButton: Locator;
    readonly impressiveRadioButton: Locator
    readonly noRadioButton: Locator;
    readonly outPutDisplay: Locator;

    constructor(page: Page) {
        super(page, PAGE_URLS.RADIO_BUTTON);
        this.yesRadioButton = this.page.getByRole('radio', { name: 'Yes' });
        this.impressiveRadioButton = this.page.getByRole('radio', { name: 'Impressive' });
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.outPutDisplay = this.page.locator('p:has-text("You have selected")');
    }

    async verifyButtonIsSelected(button: Locator) {
        await expect(button, 'Verify radio button is selected').toBeChecked(
            { timeout: 3000 });
        await expect(this.outPutDisplay, 'Verify output display is visible').toBeVisible(
            { timeout: 3000 });
        await expect(this.outPutDisplay, 'Verify output display text matches').toHaveText(
            `You have selected ${await button.locator('..').locator('label').innerText()}`,
            { timeout: 3000 });
    }
}