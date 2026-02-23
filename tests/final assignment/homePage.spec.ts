import {test} from '../../helpers/test-fixture';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.homePage.navigateToHomePage();
});

test('TC-01 | Verify all main categories are visible', async ({ pageManager }) => {
    await pageManager.homePage.verifyPageLoaded();
    await pageManager.homePage.verifyCategoryCards();
});