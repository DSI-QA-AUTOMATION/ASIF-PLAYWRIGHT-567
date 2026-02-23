
import { expect } from '@playwright/test';
import { test } from '../../helpers/test-fixture';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.checkBoxPage.navigateToPage();
});

test('TC-03 | Verify all checkboxes are checkable and uncheckable', async ({ pageManager }) => {
    while (await pageManager.checkBoxPage.expandAllButton.count() !== 0) {
        const expandButtons = pageManager.checkBoxPage.expandAllButton;
        for (let i = 0; i < await expandButtons.count(); i++) {
            await expandButtons.nth(i).click({ timeout: 3000 });
        }
    }

    const allCheckboxes = pageManager.checkBoxPage.checkBox;
    for (let i = 0; i < await allCheckboxes.count(); i++) {
        const checkbox = allCheckboxes.nth(i);

        await expect(checkbox,
            `Checkbox #${i + 1} should be clickable`
        ).toBeEnabled({ timeout: 3000 });

        await checkbox.check({ timeout: 3000 });
        await expect.soft(checkbox,
            `Checkbox #${i + 1} should be checked`
        ).toBeChecked({ timeout: 3000 });

        await checkbox.uncheck({ timeout: 3000 });
        await expect.soft(checkbox,
            `Checkbox #${i + 1} should be unchecked`
        ).not.toBeChecked({ timeout: 3000 });
    }
});
