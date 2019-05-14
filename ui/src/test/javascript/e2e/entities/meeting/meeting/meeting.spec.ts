/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MeetingComponentsPage, MeetingDeleteDialog, MeetingUpdatePage } from './meeting.page-object';

const expect = chai.expect;

describe('Meeting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let meetingUpdatePage: MeetingUpdatePage;
  let meetingComponentsPage: MeetingComponentsPage;
  /*let meetingDeleteDialog: MeetingDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Meetings', async () => {
    await navBarPage.goToEntity('meeting');
    meetingComponentsPage = new MeetingComponentsPage();
    await browser.wait(ec.visibilityOf(meetingComponentsPage.title), 5000);
    expect(await meetingComponentsPage.getTitle()).to.eq('uiApp.meetingMeeting.home.title');
  });

  it('should load create Meeting page', async () => {
    await meetingComponentsPage.clickOnCreateButton();
    meetingUpdatePage = new MeetingUpdatePage();
    expect(await meetingUpdatePage.getPageTitle()).to.eq('uiApp.meetingMeeting.home.createOrEditLabel');
    await meetingUpdatePage.cancel();
  });

  /* it('should create and save Meetings', async () => {
        const nbButtonsBeforeCreate = await meetingComponentsPage.countDeleteButtons();

        await meetingComponentsPage.clickOnCreateButton();
        await promise.all([
            meetingUpdatePage.setTitleInput('title'),
            meetingUpdatePage.setDescriptionInput('description'),
            meetingUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            meetingUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            meetingUpdatePage.meetingRoomSelectLastOption(),
            // meetingUpdatePage.participantSelectLastOption(),
        ]);
        expect(await meetingUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await meetingUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await meetingUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30', 'Expected startDate value to be equals to 2000-12-31');
        expect(await meetingUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30', 'Expected endDate value to be equals to 2000-12-31');
        await meetingUpdatePage.save();
        expect(await meetingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await meetingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Meeting', async () => {
        const nbButtonsBeforeDelete = await meetingComponentsPage.countDeleteButtons();
        await meetingComponentsPage.clickOnLastDeleteButton();

        meetingDeleteDialog = new MeetingDeleteDialog();
        expect(await meetingDeleteDialog.getDialogTitle())
            .to.eq('uiApp.meetingMeeting.delete.question');
        await meetingDeleteDialog.clickOnConfirmButton();

        expect(await meetingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
