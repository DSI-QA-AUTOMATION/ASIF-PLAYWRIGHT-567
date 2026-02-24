import { expect } from '@playwright/test';
import { test } from '../../helpers/test-fixture';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.uploadDownloadPage.navigateToPage();
});

test('TC-08 | upload a file', async ({ pageManager }) => {
    await pageManager.uploadDownloadPage.uploadFileInput.setInputFiles(
        pageManager.uploadDownloadPage.imagefilePath
    );
    await expect(
        pageManager.uploadDownloadPage.uploadFilePath,
        'Verify uploaded file path is displayed').toContainText(
            pageManager.uploadDownloadPage.imageFileName, {
            timeout: 5000
        });
});