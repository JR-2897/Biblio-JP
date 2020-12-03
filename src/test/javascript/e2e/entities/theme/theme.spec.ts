import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ThemeComponentsPage, ThemeDeleteDialog, ThemeUpdatePage } from './theme.page-object';

const expect = chai.expect;

describe('Theme e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let themeComponentsPage: ThemeComponentsPage;
  let themeUpdatePage: ThemeUpdatePage;
  let themeDeleteDialog: ThemeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Themes', async () => {
    await navBarPage.goToEntity('theme');
    themeComponentsPage = new ThemeComponentsPage();
    await browser.wait(ec.visibilityOf(themeComponentsPage.title), 5000);
    expect(await themeComponentsPage.getTitle()).to.eq('biblioJpApp.theme.home.title');
    await browser.wait(ec.or(ec.visibilityOf(themeComponentsPage.entities), ec.visibilityOf(themeComponentsPage.noResult)), 1000);
  });

  it('should load create Theme page', async () => {
    await themeComponentsPage.clickOnCreateButton();
    themeUpdatePage = new ThemeUpdatePage();
    expect(await themeUpdatePage.getPageTitle()).to.eq('biblioJpApp.theme.home.createOrEditLabel');
    await themeUpdatePage.cancel();
  });

  it('should create and save Themes', async () => {
    const nbButtonsBeforeCreate = await themeComponentsPage.countDeleteButtons();

    await themeComponentsPage.clickOnCreateButton();

    await promise.all([themeUpdatePage.setThemeInput('theme')]);

    expect(await themeUpdatePage.getThemeInput()).to.eq('theme', 'Expected Theme value to be equals to theme');

    await themeUpdatePage.save();
    expect(await themeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await themeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Theme', async () => {
    const nbButtonsBeforeDelete = await themeComponentsPage.countDeleteButtons();
    await themeComponentsPage.clickOnLastDeleteButton();

    themeDeleteDialog = new ThemeDeleteDialog();
    expect(await themeDeleteDialog.getDialogTitle()).to.eq('biblioJpApp.theme.delete.question');
    await themeDeleteDialog.clickOnConfirmButton();

    expect(await themeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
