import {test} from '../../helpers/test-fixture';
import { expect } from '@playwright/test';
import { DataHelper } from '../../helpers/dataHelper';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.webTablePage.navigateToPage();
});

test('TC-05 | Add new record in the web table', async ({ pageManager }) => {
    const firstName = DataHelper.getValidFirstName();
    const lastName = DataHelper.getValidLastName();
    const randomEmail = DataHelper.getValidEmail(
        firstName, 
        lastName
    );
    const age = DataHelper.getRandomAge();
    const salary = DataHelper.getRandomSalary(); 
    const department = DataHelper.getRandomDepartment();

    await pageManager.webTablePage.addNewRecordInTable(
        firstName, 
        lastName, 
        randomEmail, 
        age, 
        salary, 
        department
    );
    const expectedRowValues = [
        firstName, 
        lastName, 
        age.toString(), 
        randomEmail, 
        salary.toString(), 
        department
    ];
    await pageManager.webTablePage.searchTableForExactMatch(
        randomEmail
    );
    const actualRowValues = 
        await pageManager.webTablePage.getAllValueFromRow(0);
    expect(actualRowValues,
        'After search, the newly added record should show the expected values').toEqual(
            expectedRowValues
    );
})