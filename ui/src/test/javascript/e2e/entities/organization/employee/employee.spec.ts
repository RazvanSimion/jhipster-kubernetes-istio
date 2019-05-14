/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EmployeeComponentsPage, EmployeeDeleteDialog, EmployeeUpdatePage } from './employee.page-object';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  let employeeComponentsPage: EmployeeComponentsPage;
  /*let employeeDeleteDialog: EmployeeDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Employees', async () => {
    await navBarPage.goToEntity('employee');
    employeeComponentsPage = new EmployeeComponentsPage();
    await browser.wait(ec.visibilityOf(employeeComponentsPage.title), 5000);
    expect(await employeeComponentsPage.getTitle()).to.eq('uiApp.organizationEmployee.home.title');
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.clickOnCreateButton();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle()).to.eq('uiApp.organizationEmployee.home.createOrEditLabel');
    await employeeUpdatePage.cancel();
  });

  /* it('should create and save Employees', async () => {
        const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();

        await employeeComponentsPage.clickOnCreateButton();
        await promise.all([
            employeeUpdatePage.setCodeInput('code'),
            employeeUpdatePage.setFirstNameInput('firstName'),
            employeeUpdatePage.setLastNameInput('lastName'),
            employeeUpdatePage.genderSelectLastOption(),
            employeeUpdatePage.setEmailInput('email'),
            employeeUpdatePage.setPhoneInput('phone'),
            employeeUpdatePage.setAddressLine1Input('addressLine1'),
            employeeUpdatePage.setAddressLine2Input('addressLine2'),
            employeeUpdatePage.setCityInput('city'),
            employeeUpdatePage.setCountryInput('country'),
            employeeUpdatePage.departmentSelectLastOption(),
        ]);
        expect(await employeeUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
        expect(await employeeUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
        expect(await employeeUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
        expect(await employeeUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
        expect(await employeeUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
        expect(await employeeUpdatePage.getAddressLine1Input()).to.eq('addressLine1', 'Expected AddressLine1 value to be equals to addressLine1');
        expect(await employeeUpdatePage.getAddressLine2Input()).to.eq('addressLine2', 'Expected AddressLine2 value to be equals to addressLine2');
        expect(await employeeUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
        expect(await employeeUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
        await employeeUpdatePage.save();
        expect(await employeeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Employee', async () => {
        const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
        await employeeComponentsPage.clickOnLastDeleteButton();

        employeeDeleteDialog = new EmployeeDeleteDialog();
        expect(await employeeDeleteDialog.getDialogTitle())
            .to.eq('uiApp.organizationEmployee.delete.question');
        await employeeDeleteDialog.clickOnConfirmButton();

        expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
