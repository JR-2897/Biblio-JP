import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExemplaireComponentsPage, ExemplaireDeleteDialog, ExemplaireUpdatePage } from './exemplaire.page-object';

const expect = chai.expect;

describe('Exemplaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let exemplaireComponentsPage: ExemplaireComponentsPage;
  let exemplaireUpdatePage: ExemplaireUpdatePage;
  let exemplaireDeleteDialog: ExemplaireDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Exemplaires', async () => {
    await navBarPage.goToEntity('exemplaire');
    exemplaireComponentsPage = new ExemplaireComponentsPage();
    await browser.wait(ec.visibilityOf(exemplaireComponentsPage.title), 5000);
    expect(await exemplaireComponentsPage.getTitle()).to.eq('biblioJpApp.exemplaire.home.title');
    await browser.wait(ec.or(ec.visibilityOf(exemplaireComponentsPage.entities), ec.visibilityOf(exemplaireComponentsPage.noResult)), 1000);
  });

  it('should load create Exemplaire page', async () => {
    await exemplaireComponentsPage.clickOnCreateButton();
    exemplaireUpdatePage = new ExemplaireUpdatePage();
    expect(await exemplaireUpdatePage.getPageTitle()).to.eq('biblioJpApp.exemplaire.home.createOrEditLabel');
    await exemplaireUpdatePage.cancel();
  });

  it('should create and save Exemplaires', async () => {
    const nbButtonsBeforeCreate = await exemplaireComponentsPage.countDeleteButtons();

    await exemplaireComponentsPage.clickOnCreateButton();

    await promise.all([exemplaireUpdatePage.livreSelectLastOption()]);

    const selectedDisponibilite = exemplaireUpdatePage.getDisponibiliteInput();
    if (await selectedDisponibilite.isSelected()) {
      await exemplaireUpdatePage.getDisponibiliteInput().click();
      expect(await exemplaireUpdatePage.getDisponibiliteInput().isSelected(), 'Expected disponibilite not to be selected').to.be.false;
    } else {
      await exemplaireUpdatePage.getDisponibiliteInput().click();
      expect(await exemplaireUpdatePage.getDisponibiliteInput().isSelected(), 'Expected disponibilite to be selected').to.be.true;
    }

    await exemplaireUpdatePage.save();
    expect(await exemplaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await exemplaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Exemplaire', async () => {
    const nbButtonsBeforeDelete = await exemplaireComponentsPage.countDeleteButtons();
    await exemplaireComponentsPage.clickOnLastDeleteButton();

    exemplaireDeleteDialog = new ExemplaireDeleteDialog();
    expect(await exemplaireDeleteDialog.getDialogTitle()).to.eq('biblioJpApp.exemplaire.delete.question');
    await exemplaireDeleteDialog.clickOnConfirmButton();

    expect(await exemplaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
