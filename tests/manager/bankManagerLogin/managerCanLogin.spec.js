import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test.describe('Manager can Login', () => {
  let bankHomePage;
  let bankManagerMainPage;
  
  test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    bankManagerMainPage = new BankManagerMainPage(page);
  });

  test('Assert manager can Login', async ({ page }) => {
    await bankHomePage.loginAsManager();
    await bankManagerMainPage.waitForOpened();
    await bankManagerMainPage.assertAddCustomerButtonIsVisible();
    await bankManagerMainPage.assertOpenAccountButtonIsVisible();
    await bankManagerMainPage.assertCustomersButtonIsVisible();
  });
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
});
