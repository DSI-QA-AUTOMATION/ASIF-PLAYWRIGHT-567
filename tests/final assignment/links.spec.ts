import {test} from '../../helpers/test-fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.linksPage.navigateToPage();
});

test('TC-07 | Verify link navigation', async ({ pageManager, page }) => {
    await pageManager.linksPage.clickHomeLink('simple');
    await pageManager.linksPage.clickHomeLink('dynamic');
});