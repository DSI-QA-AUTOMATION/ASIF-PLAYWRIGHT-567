import { Page } from '@playwright/test';
import { HomePage } from './homePage';
import { TextBox } from './textBox';
import { CheckBox } from './checkBox';
import { RadioButton } from './radioButton';
import { WebTable } from './webTable';
import { Buttons } from './buttons';
import { Links } from './links';

export class PageManager {
    private readonly page: Page;
    readonly homePage: HomePage;
    readonly textBoxPage: TextBox;
    readonly checkBoxPage: CheckBox;
    readonly radioButtonPage: RadioButton;
    readonly webTablePage: WebTable;
    readonly buttonsPage: Buttons;
    readonly linksPage: Links;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.textBoxPage = new TextBox(this.page);
        this.checkBoxPage = new CheckBox(this.page);
        this.radioButtonPage = new RadioButton(this.page);
        this.webTablePage = new WebTable(this.page);
        this.buttonsPage = new Buttons(this.page);
        this.linksPage = new Links(this.page);
    }
}