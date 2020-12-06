import { element, by, ElementFinder } from 'protractor';

export class AuteurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-auteur div table .btn-danger'));
  title = element.all(by.css('jhi-auteur div h2#page-heading span')).first();
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

export class AuteurUpdatePage {
  pageTitle = element(by.id('jhi-auteur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  auteurInput = element(by.id('field_auteur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAuteurInput(auteur: string): Promise<void> {
    await this.auteurInput.sendKeys(auteur);
  }

  async getAuteurInput(): Promise<string> {
    return await this.auteurInput.getAttribute('value');
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

export class AuteurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-auteur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-auteur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
