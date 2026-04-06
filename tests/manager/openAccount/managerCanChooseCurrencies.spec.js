import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test.describe('Manager can choose currencies for account', () => {
  let bankManagerMainPage;

  test.beforeEach(async ({ page }) => {
    bankManagerMainPage = new BankManagerMainPage(page);
    await bankManagerMainPage.open();
    await bankManagerMainPage.waitForOpened();
    await bankManagerMainPage.clickOpenAccountButton();
  });

  test('Assert manager can choose currencies for account', async ({ page }) => {
    await bankManagerMainPage.selectCurrency('Dollar');
    await bankManagerMainPage.assertSelectedCurrencyIs('Dollar');
    await bankManagerMainPage.selectCurrency('Pound');
    await bankManagerMainPage.assertSelectedCurrencyIs('Pound');
    await bankManagerMainPage.selectCurrency('Rupee');
    await bankManagerMainPage.assertSelectedCurrencyIs('Rupee');
  
  });
});
