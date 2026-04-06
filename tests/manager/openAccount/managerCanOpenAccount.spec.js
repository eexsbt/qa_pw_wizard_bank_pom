import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test.describe('Manager can open account', () => {
  let addCustomerPage;
  let bankManagerMainPage;
  let firstName;
  let lastName;
  let postCode;

  test.beforeEach(async ({ page }) => {
    addCustomerPage = new AddCustomerPage(page);
    bankManagerMainPage = new BankManagerMainPage(page);

    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.waitForOpened();
    await addCustomerPage.addCustomer(firstName, lastName, postCode);
  });

  test('Assert manager can open account', async ({ page }) => {
    await bankManagerMainPage.open();
    await bankManagerMainPage.waitForOpened();
    await bankManagerMainPage.clickOpenAccountButton();
    await bankManagerMainPage.selectCustomer(`${firstName} ${lastName}`);
    await bankManagerMainPage.selectCurrency('Dollar');
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Account created successfully');
      await dialog.accept();
    });
    await bankManagerMainPage.clickProcessButton();
    await page.reload();

    await addCustomerPage.openCustomersPage();
    await addCustomerPage.assertLastCustomerRowHasAccountNumber();
  });


  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
