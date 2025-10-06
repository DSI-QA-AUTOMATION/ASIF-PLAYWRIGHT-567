import { test, expect } from "@playwright/test";

test('TC-05 | Verify all checkboxes are checkable and uncheckable', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    await page.getByTitle('Expand all').click({ timeout: 3000 });
    const allCheckboxes = page.locator('label span.rct-checkbox');
    for (let i = 0; i < await allCheckboxes.count(); i++) {
        await expect(allCheckboxes.nth(i),
            `Checkbox #${i + 1} should be clickable`).toBeEnabled(
                { timeout: 3000 }
            );
        await allCheckboxes.nth(i).check({ timeout: 3000 });
        await expect.soft(allCheckboxes.nth(i),
            `Checkbox #${i + 1} should be checked`).toBeChecked(
                { timeout: 3000 }
            );
        await allCheckboxes.nth(i).uncheck({ timeout: 3000 });
        await expect.soft(allCheckboxes.nth(i),
            `Checkbox #${i + 1} should be unchecked`).not.toBeChecked(
                { timeout: 3000 }
            );
    }
})