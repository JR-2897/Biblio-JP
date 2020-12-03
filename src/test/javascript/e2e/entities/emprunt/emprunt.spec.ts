import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmpruntComponentsPage, EmpruntDeleteDialog, EmpruntUpdatePage } from './emprunt.page-object';

const expect = chai.expect;

describe('Emprunt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let empruntComponentsPage: EmpruntComponentsPage;
  let empruntUpdatePage: EmpruntUpdatePage;
  let empruntDeleteDialog: EmpruntDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Emprunts', async () => {
    await navBarPage.goToEntity('emprunt');
    empruntComponentsPage = new EmpruntComponentsPage();
    await browser.wait(ec.visibilityOf(empruntComponentsPage.title), 5000);
    expect(await empruntComponentsPage.getTitle()).to.eq('biblioJpApp.emprunt.home.title');
    await browser.wait(ec.or(ec.visibilityOf(empruntComponentsPage.entities), ec.visibilityOf(empruntComponentsPage.noResult)), 1000);
  });

  it('should load create Emprunt page', async () => {
    await empruntComponentsPage.clickOnCreateButton();
    empruntUpdatePage = new EmpruntUpdatePage();
    expect(await empruntUpdatePage.getPageTitle()).to.eq('biblioJpApp.emprunt.home.createOrEditLabel');
    await empruntUpdatePage.cancel();
  });

  it('should create and save Emprunts', async () => {
    const nbButtonsBeforeCreate = await empruntComponentsPage.countDeleteButtons();

    await empruntComponentsPage.clickOnCreateButton();

    await promise.all([
      empruntUpdatePage.setDateEmpruntInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      empruntUpdatePage.setNbNotifRetardInput('5'),
      empruntUpdatePage.setDerniereDateNotifInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      empruntUpdatePage.exemplaireSelectLastOption(),
    ]);

    expect(await empruntUpdatePage.getDateEmpruntInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateEmprunt value to be equals to 2000-12-31'
    );
    expect(await empruntUpdatePage.getNbNotifRetardInput()).to.eq('5', 'Expected nbNotifRetard value to be equals to 5');
    expect(await empruntUpdatePage.getDerniereDateNotifInput()).to.contain(
      '2001-01-01T02:30',
      'Expected derniereDateNotif value to be equals to 2000-12-31'
    );

    await empruntUpdatePage.save();
    expect(await empruntUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await empruntComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Emprunt', async () => {
    const nbButtonsBeforeDelete = await empruntComponentsPage.countDeleteButtons();
    await empruntComponentsPage.clickOnLastDeleteButton();

    empruntDeleteDialog = new EmpruntDeleteDialog();
    expect(await empruntDeleteDialog.getDialogTitle()).to.eq('biblioJpApp.emprunt.delete.question');
    await empruntDeleteDialog.clickOnConfirmButton();

    expect(await empruntComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
