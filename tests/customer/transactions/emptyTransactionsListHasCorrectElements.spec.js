import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test.describe('Customer transactions', () => {
  let customerLoginPage;
  let accountPage;
  let transactionsPage;

  test.beforeEach(async ({ page }) => {
    customerLoginPage = new CustomerLoginPage(page);
    accountPage = new CustomerAccountPage(page);
    transactionsPage = new TransactionsPage(page);
  });

  test('Assert the empty transactions list has correct values', async () => {
    await customerLoginPage.loginAsCustomer('Albus Dumbledore');
    await accountPage.clickTransactionsButton();
    await transactionsPage.assertHeaderFirstCellContainsText('Date-Time');
    await transactionsPage.assertHeaderSecondCellContainsText('Amount');
    await transactionsPage.assertHeaderThirdCellContainsText('Transaction Type');
    await transactionsPage.assertFirstRowIsHidden();
  });
});
