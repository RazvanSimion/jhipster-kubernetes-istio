/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ParticipantComponentsPage, ParticipantDeleteDialog, ParticipantUpdatePage } from './participant.page-object';

const expect = chai.expect;

describe('Participant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let participantUpdatePage: ParticipantUpdatePage;
  let participantComponentsPage: ParticipantComponentsPage;
  let participantDeleteDialog: ParticipantDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Participants', async () => {
    await navBarPage.goToEntity('participant');
    participantComponentsPage = new ParticipantComponentsPage();
    await browser.wait(ec.visibilityOf(participantComponentsPage.title), 5000);
    expect(await participantComponentsPage.getTitle()).to.eq('uiApp.meetingParticipant.home.title');
  });

  it('should load create Participant page', async () => {
    await participantComponentsPage.clickOnCreateButton();
    participantUpdatePage = new ParticipantUpdatePage();
    expect(await participantUpdatePage.getPageTitle()).to.eq('uiApp.meetingParticipant.home.createOrEditLabel');
    await participantUpdatePage.cancel();
  });

  it('should create and save Participants', async () => {
    const nbButtonsBeforeCreate = await participantComponentsPage.countDeleteButtons();

    await participantComponentsPage.clickOnCreateButton();
    await promise.all([participantUpdatePage.setEmailInput('email')]);
    expect(await participantUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    await participantUpdatePage.save();
    expect(await participantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await participantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Participant', async () => {
    const nbButtonsBeforeDelete = await participantComponentsPage.countDeleteButtons();
    await participantComponentsPage.clickOnLastDeleteButton();

    participantDeleteDialog = new ParticipantDeleteDialog();
    expect(await participantDeleteDialog.getDialogTitle()).to.eq('uiApp.meetingParticipant.delete.question');
    await participantDeleteDialog.clickOnConfirmButton();

    expect(await participantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
