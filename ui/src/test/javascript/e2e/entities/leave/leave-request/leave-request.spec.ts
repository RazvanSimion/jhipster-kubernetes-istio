/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LeaveRequestComponentsPage, LeaveRequestDeleteDialog, LeaveRequestUpdatePage } from './leave-request.page-object';

const expect = chai.expect;

describe('LeaveRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let leaveRequestUpdatePage: LeaveRequestUpdatePage;
  let leaveRequestComponentsPage: LeaveRequestComponentsPage;
  let leaveRequestDeleteDialog: LeaveRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LeaveRequests', async () => {
    await navBarPage.goToEntity('leave-request');
    leaveRequestComponentsPage = new LeaveRequestComponentsPage();
    await browser.wait(ec.visibilityOf(leaveRequestComponentsPage.title), 5000);
    expect(await leaveRequestComponentsPage.getTitle()).to.eq('uiApp.leaveLeaveRequest.home.title');
  });

  it('should load create LeaveRequest page', async () => {
    await leaveRequestComponentsPage.clickOnCreateButton();
    leaveRequestUpdatePage = new LeaveRequestUpdatePage();
    expect(await leaveRequestUpdatePage.getPageTitle()).to.eq('uiApp.leaveLeaveRequest.home.createOrEditLabel');
    await leaveRequestUpdatePage.cancel();
  });

  it('should create and save LeaveRequests', async () => {
    const nbButtonsBeforeCreate = await leaveRequestComponentsPage.countDeleteButtons();

    await leaveRequestComponentsPage.clickOnCreateButton();
    await promise.all([
      leaveRequestUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      leaveRequestUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      leaveRequestUpdatePage.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      leaveRequestUpdatePage.setDepartmentCodeInput('departmentCode'),
      leaveRequestUpdatePage.setEmployeeCodeInput('employeeCode'),
      leaveRequestUpdatePage.setWorkingDaysInput('5'),
      leaveRequestUpdatePage.setDescriptionInput('description'),
      leaveRequestUpdatePage.leaveTypeSelectLastOption(),
      leaveRequestUpdatePage.statusSelectLastOption()
    ]);
    expect(await leaveRequestUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await leaveRequestUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    expect(await leaveRequestUpdatePage.getCreationDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected creationDate value to be equals to 2000-12-31'
    );
    expect(await leaveRequestUpdatePage.getDepartmentCodeInput()).to.eq(
      'departmentCode',
      'Expected DepartmentCode value to be equals to departmentCode'
    );
    expect(await leaveRequestUpdatePage.getEmployeeCodeInput()).to.eq(
      'employeeCode',
      'Expected EmployeeCode value to be equals to employeeCode'
    );
    expect(await leaveRequestUpdatePage.getWorkingDaysInput()).to.eq('5', 'Expected workingDays value to be equals to 5');
    expect(await leaveRequestUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await leaveRequestUpdatePage.save();
    expect(await leaveRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await leaveRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last LeaveRequest', async () => {
    const nbButtonsBeforeDelete = await leaveRequestComponentsPage.countDeleteButtons();
    await leaveRequestComponentsPage.clickOnLastDeleteButton();

    leaveRequestDeleteDialog = new LeaveRequestDeleteDialog();
    expect(await leaveRequestDeleteDialog.getDialogTitle()).to.eq('uiApp.leaveLeaveRequest.delete.question');
    await leaveRequestDeleteDialog.clickOnConfirmButton();

    expect(await leaveRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
