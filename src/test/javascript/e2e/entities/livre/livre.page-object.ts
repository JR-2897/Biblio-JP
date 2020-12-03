import { element, by, ElementFinder } from 'protractor';

export class LivreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-livre div table .btn-danger'));
  title = element.all(by.css('jhi-livre div h2#page-heading span')).first();
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

export class LivreUpdatePage {
  pageTitle = element(by.id('jhi-livre-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titreInput = element(by.id('field_titre'));
  descriptionInput = element(by.id('field_description'));
  isbnInput = element(by.id('field_isbn'));
  codeInput = element(by.id('field_code'));

  auteurSelect = element(by.id('field_auteur'));
  themeSelect = element(by.id('field_theme'));
  emplacementSelect = element(by.id('field_emplacement'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitreInput(titre: string): Promise<void> {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput(): Promise<string> {
    return await this.titreInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setIsbnInput(isbn: string): Promise<void> {
    await this.isbnInput.sendKeys(isbn);
  }

  async getIsbnInput(): Promise<string> {
    return await this.isbnInput.getAttribute('value');
  }

  async setCodeInput(code: string): Promise<void> {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput(): Promise<string> {
    return await this.codeInput.getAttribute('value');
  }

  async auteurSelectLastOption(): Promise<void> {
    await this.auteurSelect.all(by.tagName('option')).last().click();
  }

  async auteurSelectOption(option: string): Promise<void> {
    await this.auteurSelect.sendKeys(option);
  }

  getAuteurSelect(): ElementFinder {
    return this.auteurSelect;
  }

  async getAuteurSelectedOption(): Promise<string> {
    return await this.auteurSelect.element(by.css('option:checked')).getText();
  }

  async themeSelectLastOption(): Promise<void> {
    await this.themeSelect.all(by.tagName('option')).last().click();
  }

  async themeSelectOption(option: string): Promise<void> {
    await this.themeSelect.sendKeys(option);
  }

  getThemeSelect(): ElementFinder {
    return this.themeSelect;
  }

  async getThemeSelectedOption(): Promise<string> {
    return await this.themeSelect.element(by.css('option:checked')).getText();
  }

  async emplacementSelectLastOption(): Promise<void> {
    await this.emplacementSelect.all(by.tagName('option')).last().click();
  }

  async emplacementSelectOption(option: string): Promise<void> {
    await this.emplacementSelect.sendKeys(option);
  }

  getEmplacementSelect(): ElementFinder {
    return this.emplacementSelect;
  }

  async getEmplacementSelectedOption(): Promise<string> {
    return await this.emplacementSelect.element(by.css('option:checked')).getText();
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

export class LivreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-livre-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-livre'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
