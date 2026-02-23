import {test} from '../../helpers/test-fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.radioButtonPage.navigateToPage();
});

test('TC-04 | Select radio button', async ({ pageManager }) => {
    await pageManager.radioButtonPage.yesRadioButton.check({
        timeout: 3000});
    await pageManager.radioButtonPage.verifyButtonIsSelected(
        pageManager.radioButtonPage.yesRadioButton
    );

    await pageManager.radioButtonPage.impressiveRadioButton.check({
        timeout: 3000});
    await pageManager.radioButtonPage.verifyButtonIsSelected(
        pageManager.radioButtonPage.impressiveRadioButton
    );

    await expect(pageManager.radioButtonPage.noRadioButton, 
        'Verify No radio button is disabled').
        toBeDisabled({ timeout: 3000 });
})