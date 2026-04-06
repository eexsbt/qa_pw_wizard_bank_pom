import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.describe('Customer logout', () => {
  let bankHomePage;
  let customerLoginPage;
  let accountPage;

  test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    customerLoginPage = new CustomerLoginPage(page);
    accountPage = new CustomerAccountPage(page);
  });

  test('Assert correct customer Logout', async () => {
    await bankHomePage.open();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.selectCustomer('Neville Longbottom');
    await customerLoginPage.clickLoginButton();
    await accountPage.clickLogoutButton();
    await customerLoginPage.waitForOpened();
    await customerLoginPage.assertSelectCustomerDropdownIsVisible();
    await customerLoginPage.assertSelectCustomerDropdownContainsValue('');
  });
});
