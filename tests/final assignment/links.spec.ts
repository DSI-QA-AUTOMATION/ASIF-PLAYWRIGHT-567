import { test } from '../../helpers/test-fixture';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.linksPage.navigateToPage();
});

test('TC-07 | Verify link navigation', async ({ pageManager }) => {
    await pageManager.linksPage.clickHomeLink('simple');
    await pageManager.linksPage.clickHomeLink('dynamic');
    await pageManager.linksPage.clickApiLink('created');
    await pageManager.linksPage.clickApiLink('no-content');
    await pageManager.linksPage.clickApiLink('moved');
    await pageManager.linksPage.clickApiLink('bad-request');
    await pageManager.linksPage.clickApiLink('unauthorized');
    await pageManager.linksPage.clickApiLink('forbidden');
    await pageManager.linksPage.clickApiLink('not-found');
});