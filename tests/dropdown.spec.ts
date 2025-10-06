import { test, expect } from "@playwright/test";

test('TC-06 | Verify all dropdowns work are selectable', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');

    // Custom dropdowns (React Select)
    const selectDropdowns = [
        { open: '#withOptGroup div', option: 'Group 2, option 2' },
        { open: '#selectOne div', option: 'Mr.' }
    ];

    for (const dropdown of selectDropdowns) {
        await page.locator(dropdown.open).first().click({ timeout: 3000 });
        await page.getByText(dropdown.option, { exact: true }).click({ timeout: 3000 });
    }

    // Native dropdown
    await page.locator('#oldSelectMenu').selectOption('2');
    await expect(page.locator('#oldSelectMenu'),`Option "2" should be selected`).toHaveValue('2');

    // Multi-select custom dropdown (React Select)
    const multiDropdown = page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2);
    await multiDropdown.scrollIntoViewIfNeeded({ timeout: 3000 });
    await multiDropdown.click({ timeout: 3000 });

    const selectMultiOptions = [
        { option: '#react-select-4-option-0', text: 'Blue' },
        { option: '#react-select-4-option-1', text: 'Green' }
    ];
    for (const options of selectMultiOptions) {
        await page.locator(options.option).click({ timeout: 3000 });
    }
    const selectedTexts = await page.locator('div[class*="multiValue"]').allTextContents();
    const expectedTexts = selectMultiOptions.map(opt => opt.text);
    for (const expected of expectedTexts) {
        expect(selectedTexts,'Selected options should match').toContain(expected);
    }
    const carDropdown = page.locator('#cars');
    await carDropdown.scrollIntoViewIfNeeded({ timeout: 3000 });
    await carDropdown.selectOption(['saab', 'opel', 'audi']);

    const selectedCars = await carDropdown.evaluate((select: HTMLSelectElement) =>
        Array.from(select.selectedOptions).map(option => option.value)
    );
    expect(selectedCars,'selected car should match').toEqual(expect.arrayContaining(['saab', 'opel', 'audi']));
});