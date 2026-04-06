import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).nth(1);
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.customersTable = page.locator('table');
    this.customersTableRows = this.customersTable.locator('tbody tr');
    this.lastCustomerRow = this.customersTableRows.last();
    this.lastCustomerFirstName = this.lastCustomerRow.locator('td').nth(0);
    this.lastCustomerLastName = this.lastCustomerRow.locator('td').nth(1);
    this.lastCustomerPostCode = this.lastCustomerRow.locator('td').nth(2);
    this.lastCustomerAccountNumber = this.lastCustomerRow.locator('td').nth(3);
    this.lastCustomerDeleteButton = this.lastCustomerRow.locator('td').nth(4).getByRole('button', { name: 'Delete' });
    this.searchCustomerInput = page.locator('input[ng-model="searchCustomer"]');

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postCode);
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Customer added successfully');
      await dialog.accept();
    });
    await this.addCustomerButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertLastCustomerRowHasFirstName(firstName) {
    await expect(this.lastCustomerFirstName).toHaveText(firstName);
  }

  async assertLastCustomerRowHasLastName(lastName) {
    await expect(this.lastCustomerLastName).toHaveText(lastName);
  }

  async assertLastCustomerRowHasPostCode(postCode) {
    await expect(this.lastCustomerPostCode).toHaveText(postCode);
  }

  async assertLastCustomerRowHasNoAccountNumber() {
    await expect(this.lastCustomerAccountNumber).toHaveText('');
  }

  async assertLastCustomerRowHasAccountNumber() {
    await expect(this.lastCustomerAccountNumber).not.toHaveText('');
  }

  async openCustomersPage() {
    await this.customersButton.click();
  }

  async clickDeleteButtonForLastCustomer() {
    await this.lastCustomerDeleteButton.click();
  }

  async assertLastCustomerRowIsNotPresent() {
    await expect(this.lastCustomerRow).toBeHidden();
  }

  async clickDeleteButtonForCustomer(firstName) {
    const customerRow = this.customersTableRows.filter({ has: this.page.locator('td').first().filter({ hasText: firstName }) });
    const deleteButton = customerRow.locator('td').nth(4).getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

  async assertCustomerRowIsNotPresent(firstName) {
    const customerRows = this.customersTableRows.filter({ has: this.page.locator('td').first().filter({ hasText: firstName }) });
    await expect(customerRows).toHaveCount(0);
  }

  async searchCustomerByFirstName(firstName) {
    await this.searchCustomerInput.fill(firstName);
  }

  async searchCustomer(text) {
    await this.searchCustomerInput.fill(text);
  }

  async assertCustomerRowIsPresent(text) {
    const customerRows = this.customersTableRows.filter({ hasText: text });
    await expect(customerRows).toHaveCount(1);
  }

  async assertOnlyOneCustomerRowIsPresent() {
    await expect(this.customersTableRows).toHaveCount(1);
  }

}
