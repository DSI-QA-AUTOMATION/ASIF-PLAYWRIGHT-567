import { expect, Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class WebTable extends BasePage {
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly ageInput: Locator
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;
    readonly searchBar: Locator;
    readonly searchIcon: Locator;
    readonly table: Locator;
    readonly tableRows: Locator;

    constructor(page: Page) {
        super(page, PAGE_URLS.WEB_TABLE);
        this.addButton = this.page.getByRole('button', { 
            name: 'Add' 
        });
        this.firstNameInput = this.page.locator('#firstName');
        this.lastNameInput = this.page.locator('#lastName');
        this.emailInput = this.page.locator('#userEmail');
        this.ageInput = this.page.locator('#age');
        this.salaryInput = this.page.locator('#salary');
        this.departmentInput = this.page.locator('#department');
        this.submitButton = this.page.getByRole('button', { 
            name: 'Submit' 
        });
        this.searchBar = this.page.locator('#searchBox');
        this.searchIcon = this.page.locator('#basic-addon2');
        this.table = this.page.locator('.table');
        this.tableRows = this.table.locator('tbody tr');
    }

    async addNewRecordInTable(
        firstName: string, 
        lastName: string, 
        email: string, 
        age: number, 
        salary: number, 
        department: string
    ): Promise<void> {
        await this.addButton.click({timeout: 3000});
        await this.firstNameInput.fill(firstName, { timeout: 3000 });
        await this.lastNameInput.fill(lastName, { timeout: 3000 });
        await this.emailInput.fill(email, { timeout: 3000 });
        await this.ageInput.fill(age.toString(), { timeout: 3000 });
        await this.salaryInput.fill(salary.toString(), { timeout: 3000 });
        await this.departmentInput.fill(department, { timeout: 3000 });
        await this.submitButton.click({timeout: 3000});
    }

    async searchTableForExactMatch(value: string): Promise<void> {
        await this.searchBar.fill(value, { timeout: 3000 });
        await this.searchIcon.click({ timeout: 3000 });
        await expect(this.tableRows,
            'Table rows count should be 1 after search').toHaveCount(1, { 
                timeout: 5000 
            });
    }

    async getAllValueFromRow(rowIndex: number): Promise<string[]> {
        const row = this.tableRows.nth(rowIndex);
        const cells = row.locator('td');
        const cellValues: string[] = [];
        for (let i = 0; i < (await cells.count() - 1); i++) {
            cellValues.push(await cells.nth(i).innerText({ 
                timeout: 3000 
            }));
        }
        return cellValues;
    }
}