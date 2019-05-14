/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EmployeeLeaveComponentsPage, EmployeeLeaveDeleteDialog, EmployeeLeaveUpdatePage } from './employee-leave.page-object';

const expect = chai.expect;

describe('EmployeeLeave e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeLeaveUpdatePage: EmployeeLeaveUpdatePage;
  let employeeLeaveComponentsPage: EmployeeLeaveComponentsPage;
  let employeeLeaveDeleteDialog: EmployeeLeaveDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EmployeeLeaves', async () => {
    await navBarPage.goToEntity('employee-leave');
    employeeLeaveComponentsPage = new EmployeeLeaveComponentsPage();
    await browser.wait(ec.visibilityOf(employeeLeaveComponentsPage.title), 5000);
    expect(await employeeLeaveComponentsPage.getTitle()).to.eq('uiApp.leaveEmployeeLeave.home.title');
  });

  it('should load create EmployeeLeave page', async () => {
    await employeeLeaveComponentsPage.clickOnCreateButton();
    employeeLeaveUpdatePage = new EmployeeLeaveUpdatePage();
    expect(await employeeLeaveUpdatePage.getPageTitle()).to.eq('uiApp.leaveEmployeeLeave.home.createOrEditLabel');
    await employeeLeaveUpdatePage.cancel();
  });

  it('should create and save EmployeeLeaves', async () => {
    const nbButtonsBeforeCreate = await employeeLeaveComponentsPage.countDeleteButtons();

    await employeeLeaveComponentsPage.clickOnCreateButton();
    await promise.all([
      employeeLeaveUpdatePage.setEmployeeCodeInput('employeeCode'),
      employeeLeaveUpdatePage.setTotalInput('5'),
      employeeLeaveUpdatePage.setAvailableInput('5')
    ]);
    expect(await employeeLeaveUpdatePage.getEmployeeCodeInput()).to.eq(
      'employeeCode',
      'Expected EmployeeCode value to be equals to employeeCode'
    );
    expect(await employeeLeaveUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');
    expect(await employeeLeaveUpdatePage.getAvailableInput()).to.eq('5', 'Expected available value to be equals to 5');
    await employeeLeaveUpdatePage.save();
    expect(await employeeLeaveUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await employeeLeaveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last EmployeeLeave', async () => {
    const nbButtonsBeforeDelete = await employeeLeaveComponentsPage.countDeleteButtons();
    await employeeLeaveComponentsPage.clickOnLastDeleteButton();

    employeeLeaveDeleteDialog = new EmployeeLeaveDeleteDialog();
    expect(await employeeLeaveDeleteDialog.getDialogTitle()).to.eq('uiApp.leaveEmployeeLeave.delete.question');
    await employeeLeaveDeleteDialog.clickOnConfirmButton();

    expect(await employeeLeaveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
