/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MeetingRoomComponentsPage, MeetingRoomDeleteDialog, MeetingRoomUpdatePage } from './meeting-room.page-object';

const expect = chai.expect;

describe('MeetingRoom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let meetingRoomUpdatePage: MeetingRoomUpdatePage;
  let meetingRoomComponentsPage: MeetingRoomComponentsPage;
  let meetingRoomDeleteDialog: MeetingRoomDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MeetingRooms', async () => {
    await navBarPage.goToEntity('meeting-room');
    meetingRoomComponentsPage = new MeetingRoomComponentsPage();
    await browser.wait(ec.visibilityOf(meetingRoomComponentsPage.title), 5000);
    expect(await meetingRoomComponentsPage.getTitle()).to.eq('uiApp.meetingMeetingRoom.home.title');
  });

  it('should load create MeetingRoom page', async () => {
    await meetingRoomComponentsPage.clickOnCreateButton();
    meetingRoomUpdatePage = new MeetingRoomUpdatePage();
    expect(await meetingRoomUpdatePage.getPageTitle()).to.eq('uiApp.meetingMeetingRoom.home.createOrEditLabel');
    await meetingRoomUpdatePage.cancel();
  });

  it('should create and save MeetingRooms', async () => {
    const nbButtonsBeforeCreate = await meetingRoomComponentsPage.countDeleteButtons();

    await meetingRoomComponentsPage.clickOnCreateButton();
    await promise.all([
      meetingRoomUpdatePage.setCodeInput('code'),
      meetingRoomUpdatePage.setLocationInput('location'),
      meetingRoomUpdatePage.setNameInput('name')
    ]);
    expect(await meetingRoomUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await meetingRoomUpdatePage.getLocationInput()).to.eq('location', 'Expected Location value to be equals to location');
    expect(await meetingRoomUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await meetingRoomUpdatePage.save();
    expect(await meetingRoomUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await meetingRoomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MeetingRoom', async () => {
    const nbButtonsBeforeDelete = await meetingRoomComponentsPage.countDeleteButtons();
    await meetingRoomComponentsPage.clickOnLastDeleteButton();

    meetingRoomDeleteDialog = new MeetingRoomDeleteDialog();
    expect(await meetingRoomDeleteDialog.getDialogTitle()).to.eq('uiApp.meetingMeetingRoom.delete.question');
    await meetingRoomDeleteDialog.clickOnConfirmButton();

    expect(await meetingRoomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
