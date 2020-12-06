import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmplacementComponentsPage, EmplacementDeleteDialog, EmplacementUpdatePage } from './emplacement.page-object';

const expect = chai.expect;

describe('Emplacement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emplacementComponentsPage: EmplacementComponentsPage;
  let emplacementUpdatePage: EmplacementUpdatePage;
  let emplacementDeleteDialog: EmplacementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Emplacements', async () => {
    await navBarPage.goToEntity('emplacement');
    emplacementComponentsPage = new EmplacementComponentsPage();
    await browser.wait(ec.visibilityOf(emplacementComponentsPage.title), 5000);
    expect(await emplacementComponentsPage.getTitle()).to.eq('biblioJpApp.emplacement.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(emplacementComponentsPage.entities), ec.visibilityOf(emplacementComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Emplacement page', async () => {
    await emplacementComponentsPage.clickOnCreateButton();
    emplacementUpdatePage = new EmplacementUpdatePage();
    expect(await emplacementUpdatePage.getPageTitle()).to.eq('biblioJpApp.emplacement.home.createOrEditLabel');
    await emplacementUpdatePage.cancel();
  });

  it('should create and save Emplacements', async () => {
    const nbButtonsBeforeCreate = await emplacementComponentsPage.countDeleteButtons();

    await emplacementComponentsPage.clickOnCreateButton();

    await promise.all([emplacementUpdatePage.setNomEmplacementInput('nomEmplacement')]);

    expect(await emplacementUpdatePage.getNomEmplacementInput()).to.eq(
      'nomEmplacement',
      'Expected NomEmplacement value to be equals to nomEmplacement'
    );

    await emplacementUpdatePage.save();
    expect(await emplacementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await emplacementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Emplacement', async () => {
    const nbButtonsBeforeDelete = await emplacementComponentsPage.countDeleteButtons();
    await emplacementComponentsPage.clickOnLastDeleteButton();

    emplacementDeleteDialog = new EmplacementDeleteDialog();
    expect(await emplacementDeleteDialog.getDialogTitle()).to.eq('biblioJpApp.emplacement.delete.question');
    await emplacementDeleteDialog.clickOnConfirmButton();

    expect(await emplacementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
