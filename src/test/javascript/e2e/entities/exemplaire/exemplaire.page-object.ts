import { element, by, ElementFinder } from 'protractor';

export class ExemplaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-exemplaire div table .btn-danger'));
  title = element.all(by.css('jhi-exemplaire div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ExemplaireUpdatePage {
  pageTitle = element(by.id('jhi-exemplaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  disponibiliteInput = element(by.id('field_disponibilite'));

  livreSelect = element(by.id('field_livre'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getDisponibiliteInput(): ElementFinder {
    return this.disponibiliteInput;
  }

  async livreSelectLastOption(): Promise<void> {
    await this.livreSelect.all(by.tagName('option')).last().click();
  }

  async livreSelectOption(option: string): Promise<void> {
    await this.livreSelect.sendKeys(option);
  }

  getLivreSelect(): ElementFinder {
    return this.livreSelect;
  }

  async getLivreSelectedOption(): Promise<string> {
    return await this.livreSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ExemplaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-exemplaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-exemplaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
