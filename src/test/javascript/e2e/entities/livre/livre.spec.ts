import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LivreComponentsPage, LivreDeleteDialog, LivreUpdatePage } from './livre.page-object';

const expect = chai.expect;

describe('Livre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let livreComponentsPage: LivreComponentsPage;
  let livreUpdatePage: LivreUpdatePage;
  let livreDeleteDialog: LivreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Livres', async () => {
    await navBarPage.goToEntity('livre');
    livreComponentsPage = new LivreComponentsPage();
    await browser.wait(ec.visibilityOf(livreComponentsPage.title), 5000);
    expect(await livreComponentsPage.getTitle()).to.eq('biblioJpApp.livre.home.title');
    await browser.wait(ec.or(ec.visibilityOf(livreComponentsPage.entities), ec.visibilityOf(livreComponentsPage.noResult)), 1000);
  });

  it('should load create Livre page', async () => {
    await livreComponentsPage.clickOnCreateButton();
    livreUpdatePage = new LivreUpdatePage();
    expect(await livreUpdatePage.getPageTitle()).to.eq('biblioJpApp.livre.home.createOrEditLabel');
    await livreUpdatePage.cancel();
  });

  it('should create and save Livres', async () => {
    const nbButtonsBeforeCreate = await livreComponentsPage.countDeleteButtons();

    await livreComponentsPage.clickOnCreateButton();

    await promise.all([
      livreUpdatePage.setTitreInput('titre'),
      livreUpdatePage.setDescriptionInput('description'),
      livreUpdatePage.setIsbnInput('isbn'),
      livreUpdatePage.setCodeInput('code'),
      // livreUpdatePage.auteurSelectLastOption(),
      // livreUpdatePage.themeSelectLastOption(),
      // livreUpdatePage.emplacementSelectLastOption(),
    ]);

    expect(await livreUpdatePage.getTitreInput()).to.eq('titre', 'Expected Titre value to be equals to titre');
    expect(await livreUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await livreUpdatePage.getIsbnInput()).to.eq('isbn', 'Expected Isbn value to be equals to isbn');
    expect(await livreUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');

    await livreUpdatePage.save();
    expect(await livreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await livreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Livre', async () => {
    const nbButtonsBeforeDelete = await livreComponentsPage.countDeleteButtons();
    await livreComponentsPage.clickOnLastDeleteButton();

    livreDeleteDialog = new LivreDeleteDialog();
    expect(await livreDeleteDialog.getDialogTitle()).to.eq('biblioJpApp.livre.delete.question');
    await livreDeleteDialog.clickOnConfirmButton();

    expect(await livreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
