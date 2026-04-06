import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'; 

test.describe('Manager can delete customer', () => {
  let addCustomerPage;
  let bankHomePage;
  let bankManagerMainPage;
  let customerFirstName;
  let customerLastName;
  let customerPostCode;

  test.beforeEach(async ({ page }) => {
    addCustomerPage = new AddCustomerPage(page);
    await addCustomerPage.open();
    await addCustomerPage.waitForOpened();

    customerFirstName = faker.person.firstName();
    customerLastName = faker.person.lastName();
    customerPostCode = faker.location.zipCode();

    await addCustomerPage.addCustomer(
      customerFirstName,
      customerLastName,
      customerPostCode,
    );
  });

  test('Assert manager can delete customer', async ({ page }) => {
    await addCustomerPage.openCustomersPage();
    await addCustomerPage.clickDeleteButtonForCustomer(customerFirstName);
    await addCustomerPage.assertCustomerRowIsNotPresent(customerFirstName);
    await page.reload();
    await addCustomerPage.assertCustomerRowIsNotPresent(customerFirstName);
  });



  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
