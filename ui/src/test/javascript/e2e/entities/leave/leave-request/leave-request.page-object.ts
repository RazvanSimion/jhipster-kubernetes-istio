import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LeaveRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-leave-request div table .btn-danger'));
  title = element.all(by.css('jhi-leave-request div h2#page-heading span')).first();

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

export class LeaveRequestUpdatePage {
  pageTitle = element(by.id('jhi-leave-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  creationDateInput = element(by.id('field_creationDate'));
  departmentCodeInput = element(by.id('field_departmentCode'));
  employeeCodeInput = element(by.id('field_employeeCode'));
  workingDaysInput = element(by.id('field_workingDays'));
  descriptionInput = element(by.id('field_description'));
  leaveTypeSelect = element(by.id('field_leaveType'));
  statusSelect = element(by.id('field_status'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return await this.endDateInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return await this.creationDateInput.getAttribute('value');
  }

  async setDepartmentCodeInput(departmentCode) {
    await this.departmentCodeInput.sendKeys(departmentCode);
  }

  async getDepartmentCodeInput() {
    return await this.departmentCodeInput.getAttribute('value');
  }

  async setEmployeeCodeInput(employeeCode) {
    await this.employeeCodeInput.sendKeys(employeeCode);
  }

  async getEmployeeCodeInput() {
    return await this.employeeCodeInput.getAttribute('value');
  }

  async setWorkingDaysInput(workingDays) {
    await this.workingDaysInput.sendKeys(workingDays);
  }

  async getWorkingDaysInput() {
    return await this.workingDaysInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setLeaveTypeSelect(leaveType) {
    await this.leaveTypeSelect.sendKeys(leaveType);
  }

  async getLeaveTypeSelect() {
    return await this.leaveTypeSelect.element(by.css('option:checked')).getText();
  }

  async leaveTypeSelectLastOption(timeout?: number) {
    await this.leaveTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(timeout?: number) {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class LeaveRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-leaveRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-leaveRequest'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
