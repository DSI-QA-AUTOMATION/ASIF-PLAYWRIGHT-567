import { test } from '../../helpers/test-fixture';
import { DataHelper } from '../../helpers/dataHelper';

test.beforeEach(async ({ pageManager }) => {
    await pageManager.practiceFormPage.navigateToPage();
});

test('TC-09 | Fill up form', async ({ pageManager }) => {
    const firstName = DataHelper.getValidFirstName();
    const lastName = DataHelper.getValidLastName();
    const randomEmail = DataHelper.getValidEmail(
        firstName,
        lastName
    );
    const mobileNumber = DataHelper.getValidMobileNumber();
    const dateOfBirth = DataHelper.getRandomDateOfBirth();
    const subjects = ['Maths', 'Physics'];
    const picturePath = pageManager.uploadDownloadPage.imagefilePath;
    const currentAddress = DataHelper.getRandomCurrentAddress();
    const state = DataHelper.getRandomState();
    const city = DataHelper.getRandomCity(state);

    await pageManager.practiceFormPage.fillUpForm(
        firstName,
        lastName,
        randomEmail,
        mobileNumber,
        dateOfBirth,
        subjects,
        picturePath,
        currentAddress,
        state,
        city
    );
    await pageManager.practiceFormPage.submitFormAndValidate();
});