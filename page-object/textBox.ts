import { Locator, Page, expect } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class TextBox extends BasePage {
    readonly fullNameInput: Locator;
    readonly emailInput: Locator
    readonly currentAddressInput: Locator;
    readonly permanentAddressInput: Locator;
    readonly submitButton: Locator;
    readonly outPutDisplay: Locator;

    constructor(page: Page) {
        super(page, PAGE_URLS.TEXT_BOX);
        this.fullNameInput = this.page.locator('#userName');
        this.emailInput = this.page.locator('#userEmail');
        this.currentAddressInput = this.page.locator('#currentAddress');
        this.permanentAddressInput = this.page.locator('#permanentAddress');
        this.submitButton = this.page.getByRole('button', { 
            name: 'Submit' 
        });
        this.outPutDisplay = this.page.locator('#output').locator('p');
    }

    async verifyOutputDisplayed(
        fullName: string,
        email: string,
        currentAddress: string,
        permanentAddress: string
    ): Promise<void> {
        await expect(this.outPutDisplay.nth(0),
            'Verify full name is displayed').toHaveText(
                `Name:${fullName}`, {
                timeout: 3000
            });
        await expect(this.outPutDisplay.nth(1),
            'Verify email is displayed').toHaveText(
                `Email:${email}`, {
                timeout: 3000
            });
        await expect(this.outPutDisplay.nth(2),
            'Verify current address is displayed').toHaveText(
                `Current Address :${currentAddress}`, {
                timeout: 3000
            });
        await expect(this.outPutDisplay.nth(3),
            'Verify permanent address is displayed').toHaveText(
                `Permananet Address :${permanentAddress}`, {
                timeout: 3000
            });
    }
}