import {test} from '../../helpers/test-fixture';
import { DataHelper } from '../../helpers/dataHelper';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.textBoxPage.navigateToPage();
});

test('TC-02 | Submit text box with valid data', async ({ pageManager }) => {
    const firstName = DataHelper.getValidFirstName();
    const lastName = DataHelper.getValidLastName();
    const randomFullName = `${firstName} ${lastName}`;
    const randomEmail = DataHelper.getValidEmail(firstName, lastName);
    const randomAddress = DataHelper.getValidAddress();

    await pageManager.textBoxPage.fullNameInput.fill(randomFullName, { 
        timeout: 3000 });
    await pageManager.textBoxPage.emailInput.fill(randomEmail, { 
        timeout: 3000 });
    await pageManager.textBoxPage.currentAddressInput.fill(randomAddress, { 
        timeout: 3000 });
    await pageManager.textBoxPage.permanentAddressInput.fill(randomAddress, { 
        timeout: 3000 });
    await pageManager.textBoxPage.submitButton.click({ timeout: 5000 });
    await pageManager.textBoxPage.verifyOutputDisplayed(
        randomFullName, 
        randomEmail, 
        randomAddress, 
        randomAddress
    );
})