import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test.describe('Manager can search customer by Postal Code', () => {
  let addCustomerPage;
  let bankManagerMainPage;
  let firstName;
  let lastName;
  let postalCode;

  test.beforeEach(async ({ page }) => {
    addCustomerPage = new AddCustomerPage(page);
    bankManagerMainPage = new BankManagerMainPage(page);

    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.waitForOpened();
    await addCustomerPage.addCustomer(firstName, lastName, postalCode);
  });

  test('Assert manager can search customer by Postal Code', async ({ page }) => {
    await bankManagerMainPage.open();
    await bankManagerMainPage.waitForOpened();
    await bankManagerMainPage.clickCustomersButton();
    await addCustomerPage.searchCustomer(postalCode);
    await addCustomerPage.assertCustomerRowIsPresent(postalCode);
    await addCustomerPage.assertOnlyOneCustomerRowIsPresent();
  });
});
