import { Locator, Page } from "@playwright/test";
import { BasePage, PAGE_URLS } from "./basePage";

export class UploadDownload extends BasePage {
    readonly uploadFileInput: Locator;
    readonly uploadFilePath: Locator;
    readonly imagefilePath: string = 'assets\\image\\complete_brand_logo.jpg';
    readonly imageFileName: string = 'complete_brand_logo.jpg';

    constructor(page: Page) {
        super(page, PAGE_URLS.UPLOAD_DOWNLOAD);
        this.uploadFileInput = this.page.locator('#uploadFile');
        this.uploadFilePath = this.page.locator('#uploadedFilePath');
    }
}