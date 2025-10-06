import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

test('TC-04 | fill up input boxes', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    const randomFullName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomAddress = faker.location.streetAddress();
    await page.getByPlaceholder('Full Name').fill(randomFullName, { timeout: 3000 });
    await page.getByPlaceholder('name@example.com').fill(randomEmail, { timeout: 3000 });
    await page.getByPlaceholder('Current Address').fill(randomAddress, { timeout: 3000 });
    await page.locator('#permanentAddress').fill(randomAddress, { timeout: 3000 });
    await page.getByRole('button', { name: 'Submit' }).click({ timeout: 3000 });

    const outPutDisplay = page.locator('#output').locator('p');
    await expect.soft(outPutDisplay.nth(0),
        'Name should match').toHaveText(
            `Name:${randomFullName}`,
            { timeout: 3000 }
        );
    await expect.soft(outPutDisplay.nth(1),
        'Email should match').toHaveText(
            `Email:${randomEmail}`,
            { timeout: 3000 }
        );
    await expect.soft(outPutDisplay.nth(2),
        'Current address should match').toHaveText(
            `Current Address :${randomAddress}`,
            { timeout: 3000 }
        );
    await expect.soft(outPutDisplay.nth(3),
        'Permanent address should match').toHaveText(
            `Permananet Address :${randomAddress}`,
            { timeout: 3000 }
        );
})