import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EmployeeLeaveComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-employee-leave div table .btn-danger'));
  title = element.all(by.css('jhi-employee-leave div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EmployeeLeaveUpdatePage {
  pageTitle = element(by.id('jhi-employee-leave-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  employeeCodeInput = element(by.id('field_employeeCode'));
  totalInput = element(by.id('field_total'));
  availableInput = element(by.id('field_available'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEmployeeCodeInput(employeeCode) {
    await this.employeeCodeInput.sendKeys(employeeCode);
  }

  async getEmployeeCodeInput() {
    return await this.employeeCodeInput.getAttribute('value');
  }

  async setTotalInput(total) {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput() {
    return await this.totalInput.getAttribute('value');
  }

  async setAvailableInput(available) {
    await this.availableInput.sendKeys(available);
  }

  async getAvailableInput() {
    return await this.availableInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EmployeeLeaveDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-employeeLeave-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeLeave'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
