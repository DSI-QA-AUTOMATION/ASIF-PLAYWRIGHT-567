import { expect, Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class PracticeForm extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly emailInput: Locator;
    readonly genderRadioButton: Locator;
    readonly mobileNumberInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly subjectsInput: Locator;
    readonly subjectsAutoCompleteOptions: Locator;
    readonly hobbiesCheckbox: Locator
    readonly pictureUploadInput: Locator;
    readonly currentAddressInput: Locator
    readonly stateDropdown: Locator;
    readonly cityDropdown: Locator
    readonly submitButton: Locator;
    readonly confirmationModal: Locator;

    constructor(page: Page) {
        super(page, PAGE_URLS.PRACTICE_FORM);
        this.firstNameInput = this.page.locator('#firstName');
        this.lastNameInput = this.page.locator('#lastName');
        this.emailInput = this.page.locator('#userEmail');
        this.genderRadioButton = this.page.locator(
            'input[name="gender"]'
        );
        this.mobileNumberInput = this.page.locator('#userNumber');
        this.dateOfBirthInput = this.page.locator('#dateOfBirthInput');
        this.subjectsInput = this.page.locator('#subjectsInput');
        this.subjectsAutoCompleteOptions = this.page.locator(
            '.subjects-auto-complete__menu-list .subjects-auto-complete__option'
        );
        this.hobbiesCheckbox = this.page.locator(
            'input.form-check-input[type="checkbox"]'
        );
        this.pictureUploadInput = this.page.locator('#uploadPicture');
        this.currentAddressInput = this.page.locator('#currentAddress');
        this.stateDropdown = this.page.locator('#state');
        this.cityDropdown = this.page.locator('#city');
        this.submitButton = this.page.locator('#submit');
        this.confirmationModal = this.page.locator('.modal-content');
    }

    async fillUpForm(
        firstName: string,
        lastName: string,
        email: string,
        mobileNumber: string,
        dateOfBirth: string,
        subjects: string[],
        picturePath: string,
        currentAddress: string,
        state: string,
        city: string
    ) {
        await this.firstNameInput.fill(firstName, {
            timeout: 5000
        });
        await this.lastNameInput.fill(lastName, {
            timeout: 5000
        });
        await this.emailInput.fill(email, {
            timeout: 5000
        });
        await this.genderRadioButton.first().check({
            timeout: 5000
        });
        await this.mobileNumberInput.fill(mobileNumber, {
            timeout: 5000
        });
        await this.dateOfBirthInput.fill(dateOfBirth, {
            timeout: 5000
        });
        await this.dateOfBirthInput.press('Enter');

        for (const subject of subjects) {
            await this.subjectsInput.fill(subject, {
                timeout: 5000
            });
            await expect(this.subjectsAutoCompleteOptions,
                'Verify subject auto-complete options are displayed').toBeVisible({
                    timeout: 5000
                });
            await this.subjectsInput.press('Enter');
        }

        for (let i = 0; i <= 2; i++) {
            await this.hobbiesCheckbox.nth(i).check({
                timeout: 5000
            });
        }

        if (picturePath) {
            await this.pictureUploadInput.setInputFiles(picturePath, {
                timeout: 5000
            });
        }

        await this.currentAddressInput.fill(currentAddress, {
            timeout: 5000
        });

        await this.selectStateOrCity('state', state);
        await this.selectStateOrCity('city', city);
    }

    async selectStateOrCity(
        selectChoice: 'state' | 'city',
        value: string,
    ): Promise<void> {
        const dropdown =
            selectChoice === 'state' ? this.stateDropdown : this.cityDropdown;
        await dropdown.click({ timeout: 5000 });

        const inputBase = this.page.locator(
            'input[id^="react-select"][id$="-input"]'
        );
        const input = selectChoice === 'state'
            ? inputBase.first()
            : inputBase.last();

        await expect(
            input,
            `Verify the ${selectChoice} input is visible`,
        ).toBeVisible({ timeout: 5000 });
        await input.fill(value, { timeout: 5000 });

        const option = this.page.locator(
            'div[id^="react-select"][id*="-option"]',
            { hasText: value },
        );
        await expect(
            option,
            `Verify the ${selectChoice} option "${value}" is visible`,
        ).toBeVisible({ timeout: 5000 });
        await option.click({ timeout: 5000 });
    }

    async submitFormAndValidate() {
        await this.submitButton.click({ timeout: 5000 });
        await expect(this.confirmationModal,
            'Verify confirmation modal is visible after form submission').toBeVisible({
                timeout: 5000
            });
    }
}

