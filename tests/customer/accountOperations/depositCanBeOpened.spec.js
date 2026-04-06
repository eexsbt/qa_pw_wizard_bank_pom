import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Customer deposit operations', () => {
  let customerLoginPage;
  let accountPage;

  test.beforeEach(async ({ page }) => {
    customerLoginPage = new CustomerLoginPage(page);
    accountPage = new CustomerAccountPage(page);
  });

  test('Assert the deposit can be opened', async () => {
    await customerLoginPage.loginAsCustomer('Harry Potter');
    await accountPage.clickDepositButton();

    const amount = faker.number.int(100).toString();

    await accountPage.fillAmountInputField(amount);
    await accountPage.clickDepositFormButton();
    await accountPage.assertDepositSuccessfulMessageIsVisible();
  });
});
