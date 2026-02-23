import { test as baseTest } from '@playwright/test';

import { PageManager } from '../page-object/pageManager';

type TestOptions = {
  pageManager: PageManager;
};

export const test = baseTest.extend<TestOptions>({
  pageManager: [
    async ({ page }, use) => {
      const pm = new PageManager(page);
      await use(pm);
    },
    { title: 'Set up Page Manager' },
  ],
});