import { element, by, ElementFinder } from 'protractor';

export class EmplacementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-emplacement div table .btn-danger'));
  title = element.all(by.css('jhi-emplacement div h2#page-heading span')).first();
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

export class EmplacementUpdatePage {
  pageTitle = element(by.id('jhi-emplacement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomEmplacementInput = element(by.id('field_nomEmplacement'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomEmplacementInput(nomEmplacement: string): Promise<void> {
    await this.nomEmplacementInput.sendKeys(nomEmplacement);
  }

  async getNomEmplacementInput(): Promise<string> {
    return await this.nomEmplacementInput.getAttribute('value');
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

export class EmplacementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-emplacement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-emplacement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
