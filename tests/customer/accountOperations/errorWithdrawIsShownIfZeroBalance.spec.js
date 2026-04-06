import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Customer withdrawal operations', () => {
  let customerLoginPage;
  let accountPage;

  test.beforeEach(async ({ page }) => {
    customerLoginPage = new CustomerLoginPage(page);
    accountPage = new CustomerAccountPage(page);
  });

  test('Assert the customer cannot withdraw money with empty balance', async () => {
    await customerLoginPage.loginAsCustomer('Ron Weasly');
    await accountPage.assertAccountLineContainsText('Balance : 0');
    await accountPage.clickWithdrawlButton();

    const amount = faker.number.int(100).toString();

    await accountPage.fillAmountInputField(amount);
    await accountPage.clickWithdrawlFormButton();
    await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
  });
});
