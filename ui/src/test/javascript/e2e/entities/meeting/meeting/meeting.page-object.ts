import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MeetingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meeting div table .btn-danger'));
  title = element.all(by.css('jhi-meeting div h2#page-heading span')).first();

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

export class MeetingUpdatePage {
  pageTitle = element(by.id('jhi-meeting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  meetingRoomSelect = element(by.id('field_meetingRoom'));
  participantSelect = element(by.id('field_participant'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
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

  async meetingRoomSelectLastOption(timeout?: number) {
    await this.meetingRoomSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async meetingRoomSelectOption(option) {
    await this.meetingRoomSelect.sendKeys(option);
  }

  getMeetingRoomSelect(): ElementFinder {
    return this.meetingRoomSelect;
  }

  async getMeetingRoomSelectedOption() {
    return await this.meetingRoomSelect.element(by.css('option:checked')).getText();
  }

  async participantSelectLastOption(timeout?: number) {
    await this.participantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async participantSelectOption(option) {
    await this.participantSelect.sendKeys(option);
  }

  getParticipantSelect(): ElementFinder {
    return this.participantSelect;
  }

  async getParticipantSelectedOption() {
    return await this.participantSelect.element(by.css('option:checked')).getText();
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

export class MeetingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-meeting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-meeting'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
