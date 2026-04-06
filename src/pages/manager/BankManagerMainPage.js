import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customerSelect = page.locator('#userSelect');
    this.customerSelectOptions = this.customerSelect.locator('option');
    
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickBankManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }

  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }
  
  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async goToOpenAccount() {
    await this.open();
    await this.waitForOpened();
    await this.clickOpenAccountButton();
  }

  async selectCustomer(customerName) {
    await this.page.locator('#userSelect').selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async assertSelectedCurrencyIs(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

}
