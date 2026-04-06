import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Customer account data', () => {
  let loginPage;
  let accountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new CustomerLoginPage(page);
    accountPage = new CustomerAccountPage(page);
  });

  test('Assert customer has correct bank data', async () => {
    await loginPage.loginAsCustomer('Hermoine Granger');
    await accountPage.assertAccountIdInDropDownHasValue('number:1001');
    await accountPage.assertAccountLineContainsText('Account Number : 1001');
    await accountPage.assertAccountLineContainsText('Balance : 5096');
    await accountPage.assertAccountLineContainsText('Currency : Dollar');
  });
});
