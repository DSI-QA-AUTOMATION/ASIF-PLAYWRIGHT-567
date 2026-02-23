import {test} from '../../helpers/test-fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.buttonsPage.navigateToPage();
});

test('TC-06 | Perform single, double and right click', async ({ pageManager }) => {
    await pageManager.buttonsPage.doubleClickButton.dblclick({ 
        timeout: 3000 
    });
    await expect(pageManager.buttonsPage.doubleClickMessage, 
        'Verify double click message is visible').toBeVisible({ 
            timeout: 3000 
    });
    await pageManager.buttonsPage.rightClickButton.click({ 
        button: 'right', 
        timeout: 5000 
    });
    await expect(pageManager.buttonsPage.rightClickMessage, 
        'Verify right click message is visible').toBeVisible({ 
            timeout: 3000 
    });
    await pageManager.buttonsPage.clickMeButton.click({ 
        timeout: 3000 
    });
    await expect(pageManager.buttonsPage.clickMeMessage, 
        'Verify single click message is visible').toBeVisible({ 
            timeout: 3000 
    });
})